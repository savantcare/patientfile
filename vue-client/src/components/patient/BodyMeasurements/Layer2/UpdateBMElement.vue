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

          <el-timeline>
            <el-timeline-item
              v-for="(log, index) in pageChangeLog"
              :key="`log-${index}`"
              type="primary"
              size="large"
              :timestamp="log.date"
            >{{log.value}}</el-timeline-item>
          </el-timeline>
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="5"
            :total="changeLog.length"
            :current-page.sync="currentPage"
            hide-on-single-page
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bmElementForm: { value: 1, date: new Date(), notes: "" },
      changeLog: [],
      currentPage: 0
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipJson = await ipResponse.json();
          const ipAddress = ipJson.ip;

          const patientId = this.$route.query.patient_id;
          const myId = this.$store.state.userId;
          const element = this.bmElementForm;

          const timeOfEvaluation = new Date(element.date).toLocaleDateString();
          let data = {
            patientUUID: patientId,
            timeOfEvaluation: timeOfEvaluation,
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
            dispatchName = "bodyMeasurement/dbUpdateBloodPressureInSM";
          } else if (this.type == "oxygenSaturation") {
            dispatchName = "bodyMeasurement/dbUpdateOxygenSaturationInSM";
          } else if (this.type == "pulse") {
            dispatchName = "bodyMeasurement/dbUpdatePulseInSM";
          } else if (this.type == "temperature") {
            dispatchName = "bodyMeasurement/dbUpdateTemperatureInSM";
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
    },

    sortByDate(array) {
      return array.sort((data1, data2) => {
        return (
          new Date(data1.timeOfEvaluation) - new Date(data2.timeOfEvaluation)
        );
      });
    },

    getSelectedValue() {
      this.changeLog = [];
      if (this.type == "bloodPressure" && this.objectToUpdate) {
        this.bmElementForm = {
          systolicValue: this.objectToUpdate.systolicValue,
          diastolicValue: this.objectToUpdate.diastolicValue,
          notes: this.objectToUpdate.notes,
          date: this.objectToUpdate.date
        };
      } else if (this.objectToUpdate) {
        this.bmElementForm = {
          value: this.objectToUpdate.value,
          notes: this.objectToUpdate.notes,
          date: this.objectToUpdate.date
        };
      }
      if (this.type == "weight") {
        let weights = [...this.$store.state.bodyMeasurement.weights];
        weights = this.sortByDate(weights);
        weights = weights.filter(
          weight =>
            weight.weightInPounds != this.objectToUpdate.value &&
            weight.timeOfEvaluation != this.objectToUpdate.date
        );
        if (weights.length > 0) {
          for (var weight of weights) {
            this.changeLog.push({
              date: weight.timeOfEvaluation,
              value: weight.weightInPounds
            });
          }
        }
      } else if (this.type == "bmi") {
        let bmis = [...this.$store.state.bodyMeasurement.bmis];
        bmis = this.sortByDate(bmis);

        bmis = bmis.filter(
          bmi =>
            bmi.bmiValue != this.objectToUpdate.value &&
            bmi.timeOfEvaluation != this.objectToUpdate.date
        );
        if (bmis.length > 0) {
          for (var bmi of bmis) {
            this.changeLog.push({
              date: bmi.timeOfEvaluation,
              value: bmi.bmiValue
            });
          }
        }
      } else if (this.type == "waistCircumference") {
        let waistCircumferences = [
          ...this.$store.state.bodyMeasurement.waistCircumferences
        ];
        waistCircumferences = this.sortByDate(waistCircumferences);

        waistCircumferences = waistCircumferences.filter(
          waistCircumference =>
            waistCircumference.waistCircumferenceInInches !=
              this.objectToUpdate.value &&
            waistCircumference.timeOfEvaluation != this.objectToUpdate.date
        );
        if (waistCircumferences.length > 0) {
          for (var waistCircumference of waistCircumferences) {
            this.changeLog.push({
              date: waistCircumference.timeOfEvaluation,
              value: waistCircumference.waistCircumferenceInInches
            });
          }
        }
      } else if (this.type == "bloodSugar") {
        let bloodSugars = [...this.$store.state.bodyMeasurement.bloodSugars];
        bloodSugars = this.sortByDate(bloodSugars);

        bloodSugars = bloodSugars.filter(
          bloodSugar =>
            bloodSugar.bloodSugar != this.objectToUpdate.value &&
            bloodSugar.timeOfEvaluation != this.objectToUpdate.date
        );
        if (bloodSugars.length > 0) {
          for (var bloodSugar of bloodSugars) {
            this.changeLog.push({
              date: bloodSugar.timeOfEvaluation,
              value: bloodSugar.bloodSugar
            });
          }
        }
      } else if (this.type == "height") {
        let heights = [...this.$store.state.bodyMeasurement.heights];
        heights = this.sortByDate(heights);

        heights = heights.filter(
          height =>
            height.heightInInch != this.objectToUpdate.value &&
            height.timeOfEvaluation != this.objectToUpdate.date
        );
        if (heights.length > 0) {
          for (var height of heights) {
            this.changeLog.push({
              date: height.timeOfEvaluation,
              value: height.heightInInch
            });
          }
        }
      } else if (this.type == "bloodPressure") {
        let bloodPressures = [
          ...this.$store.state.bodyMeasurement.bloodPressures
        ];
        bloodPressures = this.sortByDate(bloodPressures);

        bloodPressures = bloodPressures.filter(
          bloodPressure =>
            bloodPressure.systolicValue != this.objectToUpdate.systolicValue &&
            bloodPressure.diastolicValue !=
              this.objectToUpdate.diastolicValue &&
            bloodPressure.timeOfEvaluation != this.objectToUpdate.date
        );
        if (bloodPressures.length > 0) {
          for (var bloodPressure of bloodPressures) {
            this.changeLog.push({
              date: bloodPressure.timeOfEvaluation,
              value:
                bloodPressure.systolicValue + "/" + bloodPressure.diastolicValue
            });
          }
        }
      } else if (this.type == "oxygenSaturation") {
        let oxygenSaturations = [
          ...this.$store.state.bodyMeasurement.oxygenSaturations
        ];
        oxygenSaturations = this.sortByDate(oxygenSaturations);

        oxygenSaturations = oxygenSaturations.filter(
          oxygenSaturation =>
            oxygenSaturation.oxygenSaturation != this.objectToUpdate.value &&
            oxygenSaturation.timeOfEvaluation != this.objectToUpdate.date
        );
        if (oxygenSaturations.length > 0) {
          for (var oxygenSaturation of oxygenSaturations) {
            this.changeLog.push({
              date: oxygenSaturation.timeOfEvaluation,
              value: oxygenSaturation.oxygenSaturation
            });
          }
        }
      } else if (this.type == "pulse") {
        let pulse = [...this.$store.state.bodyMeasurement.pulse];
        pulse = this.sortByDate(pulse);

        pulse = pulse.filter(
          p =>
            p.beatsPerMinuteValue != this.objectToUpdate.value &&
            p.timeOfEvaluation != this.objectToUpdate.date
        );
        if (pulse.length > 0) {
          for (var p of pulse) {
            this.changeLog.push({
              date: p.timeOfEvaluation,
              value: p.beatsPerMinuteValue
            });
          }
        }
      } else if (this.type == "temperature") {
        let temperature = [...this.$store.state.bodyMeasurement.temperature];
        temperature = this.sortByDate(temperature);

        temperature = temperature.filter(
          t =>
            t.temperatureInFarehnite != this.objectToUpdate.value &&
            t.timeOfEvaluation != this.objectToUpdate.date
        );
        if (temperature.length > 0) {
          for (var t of temperature) {
            this.changeLog.push({
              date: t.timeOfEvaluation,
              value: t.temperatureInFarehnite
            });
          }
        }
      }
    }
  },
  computed: {
    type() {
      const type = this.$store.state.multiTabDialogLayer2.bmElementType;
      return type;
    },
    dialogVisibility() {
      return this.$store.state.multiTabDialogLayer2.visibility;
    },
    pageChangeLog() {
      let result = [];
      for (var i = (this.currentPage - 1) * 5; i < this.currentPage * 5; i++) {
        if (this.changeLog[i] != null) {
          result.push(this.changeLog[i]);
        }
      }
      return result;
    },
    objectToUpdate() {
      return this.$store.state.bodyMeasurement.objectToUpdate;
    }
  },
  mounted() {
    this.getSelectedValue();
  },
  watch: {
    dialogVisibility() {
      this.getSelectedValue();
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
