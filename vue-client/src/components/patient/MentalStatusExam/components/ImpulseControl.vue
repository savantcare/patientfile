<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import ImpulseControl from "../models/impulseControl";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const impulseControls = ImpulseControl.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let goodData = [];
      let questionData = [];
      let poorData = [];
      let impairedData = [];
      let limitedData = [];
      let fairData = [];

      for (const impulseControl of impulseControls) {
        const { timeOfEvaluation } = impulseControl;

        goodData.push({
          x: timeOfEvaluation,
          y: impulseControl["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: timeOfEvaluation,
          y: impulseControl["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: timeOfEvaluation,
          y: impulseControl["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: timeOfEvaluation,
          y: impulseControl["poor"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: timeOfEvaluation,
          y: impulseControl["limited"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: timeOfEvaluation,
          y: impulseControl["impaired"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Good",
          data: goodData
        },
        {
          name: "Fair",
          data: fairData
        },
        {
          name: "Questionable",
          data: questionData
        },
        {
          name: "Poor",
          data: poorData
        },
        {
          name: "Impaired",
          data: impairedData
        },
        {
          name: "Limited",
          data: limitedData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getImpulseControl", params);
  }
};
</script>

<style>
</style>