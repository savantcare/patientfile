<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form label-position="top" :model="recForm" ref="recForm" class="demo-dynamic">

            <!--<el-form-item
              v-for="(domain, index) in recForm.recs"
              :key="index"
              :rules="{
                  required: true, message: 'Description can not be blank', trigger: 'blur'
              }"
              :prop="'recs.' + index + '.description'"
            >
              <el-card class="box-card" shadow="hover">
                <el-input
                  :span="8"
                  type="textarea"
                  v-model="domain.description"
                  placeholder="You may enter multi line text"
                  :autosize="{ minRows: 4}"
                  :autofocus="true"
                ></el-input>
              </el-card>
            </el-form-item>-->

            <el-card class="box-card" v-for="(domain, index) in recForm.recs" :key="index" style="margin-bottom: 20px;">
              <el-row>
                <el-col :span="2" :offset="24">
                  <i class="el-icon-close" @click.prevent="removeDomain(domain)"></i>
                </el-col>
              </el-row>
              <el-form-item
                :prop="'recs.' + index + '.description'"
                style="font-weight:bold"
                label-position="top"
                label="Description"
                :rules="{
                  required: true, message: 'Description can not be blank', trigger: 'blur'
                }"
              >
                <el-input :span="8" type="textarea" v-model="domain.description" placeholder="You may enter multi line text" :autosize="{ minRows: 4}" :autofocus="true"></el-input>
              </el-form-item>

              <el-form-item
                :prop="'recs.' + index + '.start_date'"
                style="font-weight:bold"
                label-position="top"
                label="Start date of goal"
                :rules="{
                  required: true, message: 'Start date of goal can not be blank', trigger: 'blur'
                }"
              >
                <el-date-picker :span="8" v-model="domain.start_date" type="date" placeholder="Pick a day" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item
                :prop="'recs.' + index + '.score'" 
                label-position="top" 
                style="font-weight:bold" 
                label="Score" 
              >
                <el-slider v-model="domain.score" :format-tooltip="formatTooltip"></el-slider>
              </el-form-item>
            </el-card>

            <el-form-item>
              <el-button type="success" @click="submitForm('recForm')" size="small">Save</el-button>
              <el-button type="primary" @click="addDomain" size="small">Add one more</el-button>
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
import { EDIT_GOAL } from "@/const.js";
export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      recForm: { recs: [{ description: "", start_date: "", score: "" }] }
    };
  },
  methods: {
    addDomain() {
      this.recForm.recs.push({
        description: "",
        start_date: "",
        score: ""
      });
    },
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.type == EDIT_GOAL) {
            this.updateData["description"] = this.recForm.recs[0].description;
            this.updateData["discontinuedByUserId"] = this.userId;
            this.updateData["createdByUserId"] = this.userId;
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
                start_date: item.start_date,
                score: item.score,
                patientId: vm.id,
                goalID: uniqid(),
                createdByUserId: this.userId
              });
            });
            await this.$store.dispatch("addGoal", {
              data: recList,
              notify: this.$notify,
              patientId: this.id
            });
            await this.$store.dispatch("getGoals", {
              patientId: this.id,
              notify: this.$notify
            });
            this.recForm = { recs: [{ description: "", start_date: "", score: "" }] };
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
    if (this.type == EDIT_GOAL) {
      this.recForm = { recs: [{ description: this.updateData.description }] };
    }
  },
  watch: {
    updateData() {
      this.recForm = { recs: [{ description: this.updateData.description, start_date: this.updateData.start_date, score: this.updateData.score }] };
    }
  }
};
</script>

<style lang="scss" scoped>
label.el-form-item__label {
    line-height: 0;
}
</style>