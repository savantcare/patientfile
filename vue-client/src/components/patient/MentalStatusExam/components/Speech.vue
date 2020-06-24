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

      const speeches = this.$store.state.mse.speechList;

      let regularData = [];
      let fluentData = [];
      let incoherentData = [];
      let talkNativeData = [];
      let pressuredData = [];
      let mumblingData = [];

      for (const speech of speeches) {
        const { createDate } = speech;

        regularData.push({
          x: createDate,
          y: speech["regular-rate-and-rhythm"] == "yes" ? 1 : 0
        });
        fluentData.push({
          x: createDate,
          y: speech["fluent"] == "yes" ? 1 : 0
        });
        incoherentData.push({
          x: createDate,
          y: speech["incoherent"] == "yes" ? 1 : 0
        });
        talkNativeData.push({
          x: createDate,
          y: speech["talkative"] == "yes" ? 1 : 0
        });
        pressuredData.push({
          x: createDate,
          y: speech["pressured"] == "yes" ? 1 : 0
        });
        mumblingData.push({
          x: createDate,
          y: speech["mumbling"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Regular, rate and rhythm",
          data: regularData
        },
        {
          name: "Fluent",
          data: fluentData
        },
        {
          name: "Incoherent",
          data: incoherentData
        },
        {
          name: "Talkative",
          data: talkNativeData
        },
        {
          name: "Pressured",
          data: pressuredData
        },
        {
          name: "Mumbling",
          data: mumblingData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getSpeech", params);
  }
};
</script>

<style>
</style>