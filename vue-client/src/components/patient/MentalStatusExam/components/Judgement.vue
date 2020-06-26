<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Judgement from "../models/judgement";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const judgements = Judgement.query()
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

      for (const judgement of judgements) {
        const { timeOfEvaluation } = judgement;

        goodData.push({
          x: timeOfEvaluation,
          y: judgement["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: timeOfEvaluation,
          y: judgement["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: timeOfEvaluation,
          y: judgement["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: timeOfEvaluation,
          y: judgement["poor"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: timeOfEvaluation,
          y: judgement["impaired"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: timeOfEvaluation,
          y: judgement["limited"] == "yes" ? 1 : 0
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
    this.$store.dispatch("mse/getJudgement", params);
  }
};
</script>

<style>
</style>