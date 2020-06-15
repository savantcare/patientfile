<template>
  <div>
    <el-button
      type="text"
      size="mini"
      class="bm-element-body-add-button"
      @click="handleClickAddButton"
    >Add</el-button>
    <ve-line :data="chartData" :legend-visible="false" log ref="chart"></ve-line>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    chartData() {
      let chartData = this.$store.state.bodyMeasurement.chartData;
      chartData = chartData.sort((data1, data2) => {
        return (
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
        );
      });

      const columns = ["date", "value"];
      let rows = [];
      chartData.forEach(data => {
        rows.push({
          date: data.measurementDate,
          value: data.weightInPounds
        });
      });
      this.$nextTick(() => {
        this.$refs["chart"].echarts.resize();
      });
      return {
        columns: columns,
        rows: rows
      };
    }
  },
  mounted() {
    this.getWeightInfomation();
    console.log(this.chartData);
  },
  methods: {
    handleClickAddButton() {
      this.$store.commit("showAddBMElementTabInLayer2");
    },
    getWeightInfomation() {
      this.$store.dispatch("bodyMeasurement/getWeight");
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