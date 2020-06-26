<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Psychomotor from "../models/psychomotor";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const psychomotors = Psychomotor.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let normalData = [];
      let agitatedData = [];
      let retardedData = [];

      for (const psychomotor of psychomotors) {
        const { timeOfEvaluation } = psychomotor;

        normalData.push({
          x: timeOfEvaluation,
          y: psychomotor["normal"] == "yes" ? 1 : 0
        });
        agitatedData.push({
          x: timeOfEvaluation,
          y: psychomotor["agitated"] == "yes" ? 1 : 0
        });
        retardedData.push({
          x: timeOfEvaluation,
          y: psychomotor["retarded"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Normal",
          data: normalData
        },
        {
          name: "Agitated",
          data: agitatedData
        },
        {
          name: "Retarded",
          data: retardedData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getPsychomotor", params);
  }
};
</script>

<style>
</style>