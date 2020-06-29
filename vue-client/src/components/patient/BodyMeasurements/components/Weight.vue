<template>
  <Graph :type="type" :label="label" :tab="tab" :chartData="chartData" />
</template>

<script>
import Graph from "./_BaseGraph";
export default {
  props: ["type", "label", "tab"],
  components: { Graph },
  computed: {
    chartData() {
      let chartData = [...this.$store.state.bodyMeasurement.weights];
      chartData = chartData.sort((data1, data2) => {
        return (
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
        );
      });
      console.log(chartData);
      let columns = ["date", "weightInPounds"];

      let rows = [];
      chartData.forEach(item => {
        let date = new Date(item.measurementDate);
        const formatDate = date.getMonth() + 1 + "-" + date.getDate();

        rows.push({
          weightInPounds: item.weightInPounds,
          date: formatDate
        });
      });

      return {
        columns: columns,
        rows: rows
      };
    }
  },
  mounted() {
    this.$store.dispatch("bodyMeasurement/getWeight");
  }
};
</script>

<style lang="scss" scoped>
</style>