<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Constitutional from "../models/constitutional";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const constitutionals = Constitutional.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let vitalData = [];

      for (const constitutional of constitutionals) {
        const { timeOfEvaluation } = constitutional;
        vitalData.push({
          x: timeOfEvaluation,
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