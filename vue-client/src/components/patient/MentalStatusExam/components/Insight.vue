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

      const insights = this.$store.state.mse.insightList;

      let goodData = [];
      let fairData = [];
      let questionData = [];
      let poorData = [];
      let impairedData = [];
      let limitedData = [];

      for (const insight of insights) {
        const { createDate } = insight;

        goodData.push({
          x: createDate,
          y: insight["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: createDate,
          y: insight["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: createDate,
          y: insight["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: createDate,
          y: insight["poor"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: createDate,
          y: insight["impaired"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: createDate,
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