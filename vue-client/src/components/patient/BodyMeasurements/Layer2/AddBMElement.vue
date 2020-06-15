<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :model="bmElementForm" ref="bmElementForm" class="demo-dynamic">
            <el-form-item
              v-for="(element, index) in bmElementForm.elements"
              :key="index"
              :rules="{
                  required: true, message: 'Value can not be blank', trigger: 'blur'
              }"
              :prop="'elements.' + index + '.value'"
            >
              <el-card class="box-card" shadow="hover">
                <div>Value</div>
                <el-input-number v-model="element.value" :min="1"></el-input-number>
                <div>Date</div>
                <el-date-picker v-model="element.date" type="date" placeholder="Pick a day"></el-date-picker>
                <div>Notes</div>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="Please input notes"
                  v-model="element.notes"
                />
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('bmElementForm')" size="small">Save</el-button>
              <el-button type="primary" @click="addElement" size="small">Add one more</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CHANGE_RECOMMENDATION } from "@/const/others.js";
export default {
  data() {
    return {
      bmElementForm: { elements: [{ value: 1, date: new Date(), notes: "" }] },
      historyData: {}
    };
  },
  methods: {
    addElement() {
      this.bmElementForm.elements.push({
        value: 1,
        date: new Date(),
        notes: ""
      });
    },

    // -------------- Category 2/2: Managing form submission ---------------------

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log("valid");
          console.log(this.bmElementForm);

          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipJson = await ipResponse.json();
          const ipAddress = ipJson.ip;

          let elementList = [];
          const patientId = this.$route.query.patient_id;
          const myId = this.$store.state.userId;
          this.bmElementForm.elements.forEach(element => {
            const measurementDate = new Date(element.date)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            elementList.push({
              patientUUID: patientId,
              weightInPounds: element.value,
              measurementDate: measurementDate,
              Notes: element.notes,
              recordChangedByUUID: myId,
              recordChangedFromIPAddress: ipAddress
            });
          });

          await this.$store.dispatch("bodyMeasurement/dbAddWeight", {
            data: elementList,
            notify: this.$notify
          });
          this.bmElementForm = {
            elements: [{ value: 1, date: new Date(), notes: "" }]
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    focusToTheInputBox() {
      // console.log("focus to inputbox");
      // this.$refs.description[0].$el.getElementsByTagName("textarea")[0].focus();
      // this.$refs.input_box[0].$el.getElementsByTagName("textarea")[0].focus();
    },
    updateValidateChanges() {}
  },
  computed: {
    type() {
      return this.$store.state.multiTabDialogLayer2.recommendationTabType;
    },
    updateData() {
      return this.$store.state.multiTabDialogLayer2.recommendationData;
    },
    userId() {
      return this.$store.state.userId;
    },
    isEditDialog() {
      return this.type == CHANGE_RECOMMENDATION;
    },
    tabDialogVisibility() {
      return this.$store.state.multiTabDialogLayer2.visibility;
    }
  },
  mounted() {
    if (this.type == CHANGE_RECOMMENDATION) {
      this.bmElementForm = {
        elements: [{ description: this.updateData.recommendationDescription }]
      };
      this.historyData = this.updateData;
    }
    setTimeout(() => {
      this.focusToTheInputBox();
    }, 100);
  },
  watch: {
    updateData() {
      this.bmElementForm = {
        elements: [{ description: this.updateData.recommendationDescription }]
      };
      this.historyData = this.updateData;
    },
    tabDialogVisibility() {
      if (this.tabDialogVisibility) {
        this.$refs.description[0].focusToTextArea();
      }
    }
  },
  components: {}
};
</script>

<style lang="scss">
.changed .el-input__inner,
.changed .el-textarea__inner {
  border-color: #e6a23c;
}
</style>
