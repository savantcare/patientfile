<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const cognitions = this.$store.state.mse.cognitionList;
      let grosslyIntactData = [];
      let impairedData = [];
      let fluctuatingData = [];

      for (const cognition of cognitions) {
        const { createDate } = cognition;
        grosslyIntactData.push({
          x: createDate,
          y:
            cognition[
              "grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n"
            ] == "yes"
              ? 1
              : 0
        });
        impairedData.push({
          x: createDate,
          y: cognition["impaired"] == "yes" ? 1 : 0
        });
        fluctuatingData.push({
          x: createDate,
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