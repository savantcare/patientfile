<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Cognition from "../models/cognition";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const cognitions = Cognition.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let grosslyIntactData = [];
      let impairedData = [];
      let fluctuatingData = [];

      for (const cognition of cognitions) {
        const { timeOfEvaluation } = cognition;
        grosslyIntactData.push({
          x: timeOfEvaluation,
          y:
            cognition[
              "grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n"
            ] == "yes"
              ? 1
              : 0
        });
        impairedData.push({
          x: timeOfEvaluation,
          y: cognition["impaired"] == "yes" ? 1 : 0
        });
        fluctuatingData.push({
          x: timeOfEvaluation,
          y: cognition["fluctuating"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name:
            "Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention",
          data: grosslyIntactData
        },
        {
          name: "Impaired",
          data: impairedData
        },
        {
          name: "Fluctuating",
          data: fluctuatingData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getCognition", params);
  }
};
</script>

<style>
</style>