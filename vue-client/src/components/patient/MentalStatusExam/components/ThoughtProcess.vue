<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import ThoughtProcess from "../models/thoughtProcess";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const thoughtProceses = ThoughtProcess.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let linearData = [];
      let disorganizedData = [];
      let circumstantialData = [];
      let tangentialData = [];
      let looseData = [];
      let flightData = [];
      let povertyData = [];

      for (const thoughtProcess of thoughtProceses) {
        const { timeOfEvaluation } = thoughtProcess;

        linearData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["linear-logical-and-goal-directed"] == "yes" ? 1 : 0
        });
        disorganizedData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["disorganized"] == "yes" ? 1 : 0
        });
        circumstantialData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["circumstantial"] == "yes" ? 1 : 0
        });
        tangentialData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["tangential"] == "yes" ? 1 : 0
        });
        looseData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["looseness-of-associations"] == "yes" ? 1 : 0
        });
        flightData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["flight-of-ideas"] == "yes" ? 1 : 0
        });
        povertyData.push({
          x: timeOfEvaluation,
          y: thoughtProcess["poverty-of-thought"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Linear, logical and goal-directed",
          data: linearData
        },
        {
          name: "Disorganized",
          data: disorganizedData
        },
        {
          name: "Circumstantial",
          data: circumstantialData
        },
        {
          name: "Tangential",
          data: tangentialData
        },
        {
          name: "Looseness of associations",
          data: looseData
        },
        {
          name: "Flight of ideas",
          data: flightData
        },
        {
          name: "Poverty of thought",
          data: povertyData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getThoughtProcess", params);
  }
};
</script>

<style>
</style>