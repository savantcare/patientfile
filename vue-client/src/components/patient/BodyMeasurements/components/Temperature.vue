<template>
  <Graph :type="type" :label="label" :tab="tab" :chartData="chartData" />
</template>

<script>
import Graph from "./_BaseGraph";
import Temperature from "../models/temperature";
export default {
  props: ["type", "label", "tab"],
  components: { Graph },
  computed: {
    chartData() {
      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      let chartData = Temperature.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();
      chartData = chartData.sort((data1, data2) => {
        return (
          new Date(data1.timeOfEvaluation) - new Date(data2.timeOfEvaluation)
        );
      });

      let columns = ["date", "temperatureInFarehnite"];

      let rows = [];
      chartData.forEach(item => {
        let date = new Date(item.timeOfEvaluation);
        const formatDate = date.getMonth() + 1 + "-" + date.getDate();

        rows.push({
          temperatureInFarehnite: item.temperatureInFarehnite,
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
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("bodyMeasurement/getTemperature", params);
  }
};
</script>

<style lang="scss" scoped>
</style>