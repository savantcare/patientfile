<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Neurological from "../models/neurological";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const neurologicals = Neurological.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let normalData = [];
      let abnormalData = [];

      for (const neurological of neurologicals) {
        const { timeOfEvaluation } = neurological;

        normalData.push({
          x: timeOfEvaluation,
          y: neurological["gait-and-station-normal"] == "yes" ? 1 : 0
        });
        abnormalData.push({
          x: timeOfEvaluation,
          y: neurological["gait-and-station-abnormal"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Gait and station normal",
          data: normalData
        },
        {
          name: "Gait and station abnormal",
          data: abnormalData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getNeurological", params);
  }
};
</script>

<style>
</style>