<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :model="remForm" ref="remForm" class="demo-dynamic">
            <el-form-item
              v-for="(domain, index) in remForm.rems"
              :key="index"
              :rules="{
                  required: true, message: 'Description can not be blank', trigger: 'blur'
              }"
              :prop="'rems.' + index + '.description'"
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
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('remForm')" size="small">Save</el-button>
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
 * Multi Add Reminder form.
 * @displayName Add Reminder
 */
import { CHANGE_REMINDER } from "@/const.js";
export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      remForm: { rems: [{ description: "" }] }
    };
  },
  methods: {
    addDomain() {
      this.remForm.rems.push({
        description: ""
      });
    },
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.type == CHANGE_REMINDER) {
            this.updateData["description"] = this.remForm.rems[0].description;
            this.updateData["discontinuedByUserId"] = this.userId;
            this.updateData["createdByUserId"] = this.userId;
            this.$store.dispatch("changeReminder", {
              data: this.updateData,
              notify: this.$notify
            });
          } else {
            // Add
            let remList = [];
            this.remForm.rems.forEach(item => {
              remList.push({
                description: item.description,
                patientUUID: vm.id,
                //uuid: uniqid(),
                recordChangedByUUID: this.userId,
                recordChangedFromIPAddress: this.userId
              });
            });
            await this.$store.dispatch("addReminder", {
              data: remList,
              notify: this.$notify,
              patientId: this.id
            });
            await this.$store.dispatch("getReminders", {
              patientId: this.id,
              notify: this.$notify
            });
            this.remForm = { rems: [{ description: "" }] };
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
      return this.$store.state.tabDialog.reminderTabType;
    },
    updateData() {
      return this.$store.state.tabDialog.reminderData;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  mounted() {
    if (this.type == CHANGE_REMINDER) {
      this.remForm = { rems: [{ description: this.updateData.description }] };
    }
  },
  watch: {
    updateData() {
      this.remForm = { rems: [{ description: this.updateData.description }] };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
