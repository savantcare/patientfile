<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :model="bmElementForm" ref="bmElementForm" class="demo-dynamic">
            <el-form-item>
              <el-card class="box-card" shadow="hover">
                <div v-if="type == 'bloodPressure'">
                  <div>Systolic Value</div>
                  <el-input-number v-model="bmElementForm.systolicValue" :min="1"></el-input-number>
                  <div>Diastolic Value</div>
                  <el-input-number v-model="bmElementForm.diastolicValue" :min="1"></el-input-number>
                </div>
                <div v-else>
                  <div>Value</div>
                  <el-input-number v-model="bmElementForm.value" :min="1"></el-input-number>
                </div>
                <div>Date</div>
                <el-date-picker v-model="bmElementForm.date" type="date" placeholder="Pick a day"></el-date-picker>
                <div>Notes</div>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="Please input notes"
                  v-model="bmElementForm.notes"
                />
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('bmElementForm')" size="small">Save</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bmElementForm: { value: 1, date: new Date(), notes: "" }
    };
  },
  methods: {
    addElement() {
      this.bmElementForm.elements = {
        value: 1,
        date: new Date(),
        notes: ""
      };
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipJson = await ipResponse.json();
          const ipAddress = ipJson.ip;

          const patientId = this.$route.query.patient_id;
          const myId = this.$store.state.userId;
          const element = this.bmElementForm;

          const measurementDate = new Date(element.date).toDateString();
          let data = {
            patientUUID: patientId,
            measurementDate: measurementDate,
            Notes: element.notes,
            recordChangedByUUID: myId,
            recordChangedFromIPAddress: ipAddress
          };

          if (this.type == "weight") {
            data["weightInPounds"] = element.value;
          } else if (this.type == "bmi") {
            data["bmiValue"] = element.value;
          } else if (this.type == "waistCircumference") {
            data["waistCircumferenceInInches"] = element.value;
          } else if (this.type == "bloodSugar") {
            data["bloodSugar"] = element.value;
          } else if (this.type == "height") {
            data["heightInInch"] = element.value;
          } else if (this.type == "bloodPressure") {
            data["systolicValue"] = element.systolicValue;
            data["diastolicValue"] = element.diastolicValue;
          } else if (this.type == "oxygenSaturation") {
            data["oxygenSaturation"] = element.value;
          } else if (this.type == "pulse") {
            data["beatsPerMinuteValue"] = element.value;
          } else if (this.type == "temperature") {
            data["temperatureInFarehnite"] = element.value;
          }

          let dispatchName = "";
          if (this.type == "weight") {
            dispatchName = "bodyMeasurement/dbUpdateWeightInSM";
          } else if (this.type == "bmi") {
            dispatchName = "bodyMeasurement/dbUpdateBmiInSM";
          } else if (this.type == "waistCircumference") {
            dispatchName = "bodyMeasurement/dbUpdateWaistCircumferenceInSM";
          } else if (this.type == "bloodSugar") {
            dispatchName = "bodyMeasurement/dbUpdateBloodSugarInSM";
          } else if (this.type == "height") {
            dispatchName = "bodyMeasurement/dbUpdateHeightInSM";
          } else if (this.type == "bloodPressure") {
            dispatchName = "bodyMeasurement/dbAddBloodPressureInSM";
          } else if (this.type == "oxygenSaturation") {
            dispatchName = "bodyMeasurement/dbAddOxygenSaturationInSM";
          } else if (this.type == "pulse") {
            dispatchName = "bodyMeasurement/dbAddPulseInSM";
          } else if (this.type == "temperature") {
            dispatchName = "bodyMeasurement/dbAddTemperatureInSM";
          }

          await this.$store.dispatch(dispatchName, {
            data: data,
            notify: this.$notify
          });
          this.bmElementForm = {
            value: 1,
            date: new Date(),
            notes: ""
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    type() {
      return this.$store.state.multiTabDialogLayer2.bmElementType;
    }
  },
  mounted() {},
  watch: {},
  components: {}
};
</script>

<style lang="scss">
.changed .el-input__inner,
.changed .el-textarea__inner {
  border-color: #e6a23c;
}
</style>
