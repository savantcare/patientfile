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

      const perceptions = this.$store.state.mse.perceptionList;

      let noAvhData = [];
      let ahData = [];
      let commandAhData = [];
      let vhData = [];

      for (const perception of perceptions) {
        const { createDate } = perception;

        noAvhData.push({
          x: createDate,
          y: perception["no-avh"] == "yes" ? 1 : 0
        });
        ahData.push({
          x: createDate,
          y: perception["ahData"] == "yes" ? 1 : 0
        });
        commandAhData.push({
          x: createDate,
          y: perception["command-ah"] == "yes" ? 1 : 0
        });
        vhData.push({
          x: createDate,
          y: perception["vh"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "No AVH",
          data: noAvhData
        },
        {
          name: "+AH",
          data: ahData
        },
        {
          name: "+Command AH",
          data: commandAhData
        },
        {
          name: "+VH",
          data: vhData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getPerception", params);
  }
};
</script>

<style>
</style>