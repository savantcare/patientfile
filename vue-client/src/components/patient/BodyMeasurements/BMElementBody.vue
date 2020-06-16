<template>
  <div>
    <el-button
      type="text"
      size="mini"
      class="bm-element-body-add-button"
      @click="handleClickAddButton"
    >Add</el-button>
    <ve-line :data="chartData" :legend-visible="false" ref="chart"></ve-line>
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
      }

      chartData = chartData.sort((data1, data2) => {
        return (
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
        );
      });

      const columns = ["date", "value"];
      let rows = [];
      chartData.forEach(item => {
        let date = new Date(item.measurementDate);
        const formatDate = date.getMonth() + 1 + "-" + date.getDate();

        let value = 0;
        if (this.type == "weight") {
          value = item.weightInPounds;
        } else if (this.type == "bmi") {
          value = item.bmiValue;
        } else if (this.type == "waistCircumference") {
          value = item.waistCircumferenceInInches;
        } else if (this.type == "bloodSugar") {
          value = item.bloodSugar;
        }

        rows.push({
          date: formatDate,
          value: value
        });
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
  position: fixed;
  right: 30px;
  z-index: 100;
}
</style>