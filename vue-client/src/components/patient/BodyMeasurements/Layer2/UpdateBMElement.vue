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
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
        );
      });
    },

    getCurrentValue() {
      this.changeLog = [];
      if (this.type == "weight") {
        let weights = [...this.$store.state.bodyMeasurement.weights];
        weights = this.sortByDate(weights);
        if (weights.length > 0) {
          const currentWeight = weights[weights.length - 1];
          this.bmElementForm = {
            value: currentWeight.weightInPounds,
            notes: currentWeight.Notes,
            date: currentWeight.measurementDate
          };

          for (var weight of weights.slice(0, weights.length - 2)) {
            this.changeLog.push({
              date: weight.measurementDate,
              value: weight.weightInPounds
            });
          }
        }
        return;
      } else if (this.type == "bmi") {
        let bmis = [...this.$store.state.bodyMeasurement.bmis];
        bmis = this.sortByDate(bmis);
        if (bmis.length > 0) {
          const currentBmi = bmis[bmis.length - 1];
          this.bmElementForm = {
            value: currentBmi.bmiValue,
            notes: currentBmi.Notes,
            date: currentBmi.measurementDate
          };

          for (var bmi of bmis.slice(0, bmis.length - 2)) {
            this.changeLog.push({
              date: bmi.measurementDate,
              value: bmi.bmiValue
            });
          }
        }
        return;
      } else if (this.type == "waistCircumference") {
        let waistCircumferences = [
          ...this.$store.state.bodyMeasurement.waistCircumferences
        ];
        waistCircumferences = this.sortByDate(waistCircumferences);
        if (waistCircumferences.length > 0) {
          const currentValue =
            waistCircumferences[waistCircumferences.length - 1];
          this.bmElementForm = {
            value: currentValue.waistCircumferenceInInches,
            notes: currentValue.Notes,
            date: currentValue.measurementDate
          };

          for (var waistCircumference of waistCircumferences.slice(
            0,
            waistCircumferences.length - 2
          )) {
            this.changeLog.push({
              date: waistCircumference.measurementDate,
              value: waistCircumference.waistCircumferenceInInches
            });
          }
        }
        return;
      } else if (this.type == "bloodSugar") {
        let bloodSugars = [...this.$store.state.bodyMeasurement.bloodSugars];
        bloodSugars = this.sortByDate(bloodSugars);
        if (bloodSugars.length > 0) {
          const currentBloodSugar = bloodSugars[bloodSugars.length - 1];
          this.bmElementForm = {
            value: currentBloodSugar.bloodSugar,
            notes: currentBloodSugar.Notes,
            date: currentBloodSugar.measurementDate
          };

          for (var bs of bloodSugars.slice(0, bloodSugars.length - 2)) {
            this.changeLog.push({
              date: bs.measurementDate,
              value: bs.bloodSugar
            });
          }
        }
        return;
      } else if (this.type == "height") {
        let heights = [...this.$store.state.bodyMeasurement.heights];
        heights = this.sortByDate(heights);
        if (heights.length > 0) {
          const currentHeight = heights[heights.length - 1];
          this.bmElementForm = {
            value: currentHeight.heightInInch,
            notes: currentHeight.Notes,
            date: currentHeight.measurementDate
          };

          for (var h of heights.slice(0, heights.length - 2)) {
            this.changeLog.push({
              date: h.measurementDate,
              value: h.heightInInch
            });
          }
        }
        return;
      } else if (this.type == "bloodPressure") {
        let bloodPressures = [
          ...this.$store.state.bodyMeasurement.bloodPressures
        ];
        bloodPressures = this.sortByDate(bloodPressures);
        if (bloodPressures.length > 0) {
          const currentBloodPresure = bloodPressures[bloodPressures.length - 1];
          this.bmElementForm = {
            systolicValue: currentBloodPresure.systolicValue,
            diastolicValue: currentBloodPresure.diastolicValue,
            notes: currentBloodPresure.Notes,
            date: currentBloodPresure.measurementDate
          };

          for (var bp of bloodPressures.slice(0, bloodPressures.length - 2)) {
            this.changeLog.push({
              date: bp.measurementDate,
              value: bp.systolicValue + "/" + bp.diastolicValue
            });
          }
        }
        return;
      } else if (this.type == "oxygenSaturation") {
        let oxygenSaturations = [
          ...this.$store.state.bodyMeasurement.oxygenSaturations
        ];
        oxygenSaturations = this.sortByDate(oxygenSaturations);
        if (oxygenSaturations.length > 0) {
          const currentOxygenSaturation =
            oxygenSaturations[oxygenSaturations.length - 1];
          this.bmElementForm = {
            value: currentOxygenSaturation.oxygenSaturation,
            notes: currentOxygenSaturation.Notes,
            date: currentOxygenSaturation.measurementDate
          };

          for (var os of oxygenSaturations.slice(
            0,
            oxygenSaturations.length - 2
          )) {
            this.changeLog.push({
              date: os.measurementDate,
              value: os.oxygenSaturation
            });
          }
        }
        return;
      } else if (this.type == "pulse") {
        let pulse = [...this.$store.state.bodyMeasurement.pulse];
        pulse = this.sortByDate(pulse);
        if (pulse.length > 0) {
          const currentPulse = pulse[pulse.length - 1];
          this.bmElementForm = {
            value: currentPulse.beatsPerMinuteValue,
            notes: currentPulse.Notes,
            date: currentPulse.measurementDate
          };

          for (var p of pulse.slice(0, pulse.length - 2)) {
            this.changeLog.push({
              date: p.measurementDate,
              value: p.beatsPerMinuteValue
            });
          }
        }
        return;
      } else if (this.type == "temperature") {
        let temperature = [...this.$store.state.bodyMeasurement.temperature];
        temperature = this.sortByDate(temperature);
        if (temperature.length > 0) {
          const currentTemperature = temperature[temperature.length - 1];
          this.bmElementForm = {
            value: currentTemperature.temperatureInFarehnite,
            notes: currentTemperature.Notes,
            date: currentTemperature.measurementDate
          };
          for (var t of temperature.slice(0, temperature.length - 2)) {
            this.changeLog.push({
              date: t.measurementDate,
              value: t.temperatureInFarehnite
            });
          }
        }
        return;
      }

      this.bmElementForm.value = 0;
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
    }
  },
  mounted() {
    this.getCurrentValue();
  },
  watch: {
    dialogVisibility() {
      this.getCurrentValue();
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
