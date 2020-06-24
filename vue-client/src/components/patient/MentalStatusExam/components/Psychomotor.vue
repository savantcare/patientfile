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

      const psychomotors = this.$store.state.mse.psychomotorList;

      let normalData = [];
      let agitatedData = [];
      let retardedData = [];

      for (const psychomotor of psychomotors) {
        const { createDate } = psychomotor;

        normalData.push({
          x: createDate,
          y: psychomotor["normal"] == "yes" ? 1 : 0
        });
        agitatedData.push({
          x: createDate,
          y: psychomotor["agitated"] == "yes" ? 1 : 0
        });
        retardedData.push({
          x: createDate,
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