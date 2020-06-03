<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form label-position="top" :model="recForm" ref="recForm" class="demo-dynamic">

            <el-card class="box-card" v-for="(domain, index) in recForm.recs" :key="index" style="margin-bottom: 20px;">
              <el-form-item style="font-weight:bold" label="Description:">
                <el-input :span="8" v-model="domain.description" type="textarea" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Score:">
                <el-slider :span="8" v-model="domain.score" :format-tooltip="formatTooltip"></el-slider>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Date:">
                <el-date-picker :span="8" v-model="domain.startDate" type="date" placeholder="Pick a day" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-card>

            <el-form-item>
              <el-button type="success" @click="submitForm('recForm')" size="small">Save</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- </el-tab-pane> -->
  </div>
</template>

<script>
/**
 * Multi Add Goal form.
 * @displayName Add Goal
 */
import uniqid from "uniqid";
import { RATE_GOAL } from "@/const.js";
export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      recForm: { recs: [{ description: "", startDate: "", score: "" }] }
    };
  },
  methods: {
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.type == RATE_GOAL) {
            this.updateData["description"] = this.recForm.recs[0].description;
            this.updateData["startDate"] = this.recForm.recs[0].startDate;
            this.updateData["score"] = this.recForm.recs[0].score;
            this.updateData["discontinuedByUserId"] = this.userId;
            this.updateData["recordChangedByUUID"] = this.userId;
            this.$store.dispatch("updateGoal", {
              data: this.updateData,
              notify: this.$notify
            });
          } else {
            // Add
            let recList = [];
            this.recForm.recs.forEach(item => {
              recList.push({
                description: item.description,
                startDate: item.startDate,
                score: item.score,
                patientUUID: vm.id,
                uuid: uniqid(),
                recordChangedByUUID: this.userId
              });
            });
            await this.$store.dispatch("addGoal", {
              data: recList,
              notify: this.$notify,
              patientUUID: this.id
            });
            await this.$store.dispatch("getGoals", {
              patientUUID: this.id,
              notify: this.$notify
            });
            this.recForm = { recs: [{ description: "", startDate: "", score: "" }] };
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    type() {
      return this.$store.state.tabDialog.goalTabType;
    },
    updateData() {
      return this.$store.state.tabDialog.goalData;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  mounted() {
    if (this.type == RATE_GOAL) {
      this.recForm = { recs: [{ description: this.updateData.description, startDate: this.updateData.startDate, score: this.updateData.score }] };
    }
  },
  watch: {
    updateData() {
      this.recForm = { recs: [{ description: this.updateData.description, startDate: this.updateData.startDate, score: this.updateData.score }] };
    }
  }
};
</script>

<style>
.el-form--label-top .el-form-item__label {
    line-height: 0 !important;
}
</style>