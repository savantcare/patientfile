<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickAddButton">C</el-button>
    </div>
    <ve-line :data="chartData" :legend-visible="true" ref="chart"></ve-line>
  </div>
</template>

<script>
export default {
  props: ["type", "label", "tab"],
  components: {},
  data() {
    return {};
  },
  computed: {
    chartData() {
      let chartData = [];
      if (this.type == "weight") {
        chartData = [...this.$store.state.bodyMeasurement.weights];
      } else if (this.type == "bmi") {
        chartData = [...this.$store.state.bodyMeasurement.bmis];
      } else if (this.type == "waistCircumference") {
        chartData = [...this.$store.state.bodyMeasurement.waistCircumferences];
      } else if (this.type == "bloodSugar") {
        chartData = [...this.$store.state.bodyMeasurement.bloodSugars];
      } else if (this.type == "height") {
        chartData = [...this.$store.state.bodyMeasurement.heights];
      } else if (this.type == "bloodPressure") {
        chartData = [...this.$store.state.bodyMeasurement.bloodPressures];
      } else if (this.type == "oxygenSaturation") {
        chartData = [...this.$store.state.bodyMeasurement.oxygenSaturations];
      } else if (this.type == "pulse") {
        chartData = [...this.$store.state.bodyMeasurement.pulse];
      } else if (this.type == "temperature") {
        chartData = [...this.$store.state.bodyMeasurement.temperature];
      }

      chartData = chartData.sort((data1, data2) => {
        return (
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
        );
      });

      let columns = ["date"];
      if (this.type == "weight") {
        columns.push("weightInPounds");
      } else if (this.type == "bmi") {
        columns.push("bmiValue");
      } else if (this.type == "waistCircumference") {
        columns.push("waistCircumferenceInInches");
      } else if (this.type == "bloodSugar") {
        columns.push("bloodSugar");
      } else if (this.type == "height") {
        columns.push("heightInInch");
      } else if (this.type == "bloodPressure") {
        columns.push("systolicValue");
        columns.push("diastolicValue");
      } else if (this.type == "oxygenSaturation") {
        columns.push("oxygenSaturation");
      } else if (this.type == "pulse") {
        columns.push("bpm");
      } else if (this.type == "temperature") {
        columns.push("temperatureInFarehnite");
      }

      let rows = [];
      chartData.forEach(item => {
        let date = new Date(item.measurementDate);
        const formatDate = date.getMonth() + 1 + "-" + date.getDate();

        if (this.type == "weight") {
          rows.push({
            weightInPounds: item.weightInPounds,
            date: formatDate
          });
        } else if (this.type == "bmi") {
          rows.push({
            bmiValue: item.bmiValue,
            date: formatDate
          });
        } else if (this.type == "waistCircumference") {
          rows.push({
            waistCircumferenceInInches: item.waistCircumferenceInInches,
            date: formatDate
          });
        } else if (this.type == "bloodSugar") {
          rows.push({
            bloodSugar: item.bloodSugar,
            date: formatDate
          });
        } else if (this.type == "height") {
          rows.push({
            heightInInch: item.heightInInch,
            date: formatDate
          });
        } else if (this.type == "bloodPressure") {
          const systolicValue = item.systolicValue;
          const diastolicValue = item.diastolicValue;
          rows.push({
            date: formatDate,
            systolicValue: systolicValue,
            diastolicValue: diastolicValue
          });
        } else if (this.type == "oxygenSaturation") {
          rows.push({
            oxygenSaturation: item.oxygenSaturation,
            date: formatDate
          });
        } else if (this.type == "pulse") {
          rows.push({
            bpm: item.beatsPerMinuteValue,
            date: formatDate
          });
        } else if (this.type == "temperature") {
          rows.push({
            temperatureInFarehnite: item.temperatureInFarehnite,
            date: formatDate
          });
        }
      });

      return {
        columns: columns,
        rows: rows
      };
    }
  },
  mounted() {
    if (this.type == "weight") {
      this.getWeightInfomation();
    } else if (this.type == "bmi") {
      this.getBMIInformation();
    } else if (this.type == "waistCircumference") {
      this.getWaistCircumference();
    } else if (this.type == "bloodSugar") {
      this.getBloodSugar();
    } else if (this.type == "height") {
      this.getHeight();
    } else if (this.type == "bloodPressure") {
      this.getBloodPressure();
    } else if (this.type == "oxygenSaturation") {
      this.getOxygenSaturation();
    } else if (this.type == "pulse") {
      this.getPulse();
    } else if (this.type == "temperature") {
      this.getTemperature();
    }
  },
  methods: {
    handleClickAddButton() {
      this.$store.commit("showAddBMElementTabInLayer2", {
        label: this.label,
        type: this.type
      });
    },
    getWeightInfomation() {
      this.$store.dispatch("bodyMeasurement/getWeight");
    },
    getBMIInformation() {
      this.$store.dispatch("bodyMeasurement/getBmi");
    },
    getWaistCircumference() {
      this.$store.dispatch("bodyMeasurement/getWaistCircumferences");
    },
    getBloodSugar() {
      this.$store.dispatch("bodyMeasurement/getBloodSugar");
    },
    getHeight() {
      this.$store.dispatch("bodyMeasurement/getHeight");
    },
    getBloodPressure() {
      this.$store.dispatch("bodyMeasurement/getBloodPressure");
    },
    getOxygenSaturation() {
      this.$store.dispatch("bodyMeasurement/getOxygenSaturation");
    },
    getPulse() {
      this.$store.dispatch("bodyMeasurement/getPulse");
    },
    getTemperature() {
      this.$store.dispatch("bodyMeasurement/getTemperature");
    }
  },
  watch: {
    tab() {
      this.$nextTick(() => {
        this.$refs["chart"].echarts.resize();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bm-element-body-add-button {
  float: right;
}
</style>