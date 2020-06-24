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

      const judgements = this.$store.state.mse.judgementList;

      let goodData = [];
      let fairData = [];
      let questionData = [];
      let poorData = [];
      let impairedData = [];
      let limitedData = [];

      for (const judgement of judgements) {
        const { createDate } = judgement;

        goodData.push({
          x: createDate,
          y: judgement["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: createDate,
          y: judgement["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: createDate,
          y: judgement["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: createDate,
          y: judgement["poor"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: createDate,
          y: judgement["impaired"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: createDate,
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