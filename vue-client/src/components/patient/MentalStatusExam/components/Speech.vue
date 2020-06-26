<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Speech from "../models/speech";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const speeches = Speech.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let regularData = [];
      let fluentData = [];
      let incoherentData = [];
      let talkNativeData = [];
      let pressuredData = [];
      let mumblingData = [];

      for (const speech of speeches) {
        const { timeOfEvaluation } = speech;

        regularData.push({
          x: timeOfEvaluation,
          y: speech["regular-rate-and-rhythm"] == "yes" ? 1 : 0
        });
        fluentData.push({
          x: timeOfEvaluation,
          y: speech["fluent"] == "yes" ? 1 : 0
        });
        incoherentData.push({
          x: timeOfEvaluation,
          y: speech["incoherent"] == "yes" ? 1 : 0
        });
        talkNativeData.push({
          x: timeOfEvaluation,
          y: speech["talkative"] == "yes" ? 1 : 0
        });
        pressuredData.push({
          x: timeOfEvaluation,
          y: speech["pressured"] == "yes" ? 1 : 0
        });
        mumblingData.push({
          x: timeOfEvaluation,
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