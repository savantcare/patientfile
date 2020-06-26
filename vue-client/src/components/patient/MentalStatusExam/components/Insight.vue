<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Insight from "../models/insight";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const insights = Insight.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let goodData = [];
      let fairData = [];
      let questionData = [];
      let poorData = [];
      let impairedData = [];
      let limitedData = [];

      for (const insight of insights) {
        const { timeOfEvaluation } = insight;

        goodData.push({
          x: timeOfEvaluation,
          y: insight["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: timeOfEvaluation,
          y: insight["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: timeOfEvaluation,
          y: insight["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: timeOfEvaluation,
          y: insight["poor"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: timeOfEvaluation,
          y: insight["impaired"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: timeOfEvaluation,
          y: insight["limited"] == "yes" ? 1 : 0
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
    this.$store.dispatch("mse/getInsight", params);
  }
};
</script>

<style>
</style>