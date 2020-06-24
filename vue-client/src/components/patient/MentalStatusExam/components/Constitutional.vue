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

      const constitutionals = this.$store.state.mse.constitutionalList;
      let vitalData = [];

      for (const constitutional of constitutionals) {
        const { createDate } = constitutional;
        vitalData.push({
          x: createDate,
          y: constitutional["vitals-signs-stable"] == "yes" ? 1 : 0
        });
      }

      series.push({
        name: "Vitals signs stable",
        data: vitalData
      });

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getConstitutional", params);
  }
};
</script>

<style>
</style>