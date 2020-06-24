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

      const impulseControls = this.$store.state.mse.impulseControlList;

      let goodData = [];
      let questionData = [];
      let poorData = [];
      let impairedData = [];
      let limitedData = [];
      let fairData = [];

      for (const impulseControl of impulseControls) {
        const { createDate } = impulseControl;

        goodData.push({
          x: createDate,
          y: impulseControl["good"] == "yes" ? 1 : 0
        });
        fairData.push({
          x: createDate,
          y: impulseControl["fair"] == "yes" ? 1 : 0
        });
        questionData.push({
          x: createDate,
          y: impulseControl["questionable"] == "yes" ? 1 : 0
        });
        poorData.push({
          x: createDate,
          y: impulseControl["poor"] == "yes" ? 1 : 0
        });
        limitedData.push({
          x: createDate,
          y: impulseControl["limited"] == "yes" ? 1 : 0
        });
        impairedData.push({
          x: createDate,
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