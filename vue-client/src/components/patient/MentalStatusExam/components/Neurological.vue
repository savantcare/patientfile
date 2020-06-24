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

      const neurologicals = this.$store.state.mse.neurologicalList;

      let normalData = [];
      let abnormalData = [];

      for (const neurological of neurologicals) {
        const { createDate } = neurological;

        normalData.push({
          x: createDate,
          y: neurological["gait-and-station-normal"] == "yes" ? 1 : 0
        });
        abnormalData.push({
          x: createDate,
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