<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import ThoughtContent from "../models/thoughtContent";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const thoughtContents = ThoughtContent.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let noSiIntentData = [];
      let noPassiveDeathData = [];
      let noHiIntentData = [];
      let noDelusionalData = [];
      let noObessiveData = [];
      let ruminationData = [];
      let siWithoutData = [];
      let siAsData = [];
      let hiAsData = [];
      let delusionData = [];
      let iorData = [];
      let obessionData = [];
      let passiveData = [];

      for (const thoughtContent of thoughtContents) {
        const { timeOfEvaluation } = thoughtContent;

        noSiIntentData.push({
          x: timeOfEvaluation,
          y: thoughtContent["no-si-intent-or-plan"] == "yes" ? 1 : 0
        });
        noPassiveDeathData.push({
          x: timeOfEvaluation,
          y: thoughtContent["no-passive-death-wish"] == "yes" ? 1 : 0
        });
        noHiIntentData.push({
          x: timeOfEvaluation,
          y: thoughtContent["no-hi-intent-or-plan"] == "yes" ? 1 : 0
        });
        noDelusionalData.push({
          x: timeOfEvaluation,
          y: thoughtContent["no-delusional-thinking-observed"] == "yes" ? 1 : 0
        });
        noObessiveData.push({
          x: timeOfEvaluation,
          y: thoughtContent["no-obsessive-thinking-observed"] == "yes" ? 1 : 0
        });
        ruminationData.push({
          x: timeOfEvaluation,
          y: thoughtContent["ruminations"] == "yes" ? 1 : 0
        });
        siWithoutData.push({
          x: timeOfEvaluation,
          y: thoughtContent["si-without-intent-or-plan"] == "yes" ? 1 : 0
        });
        siAsData.push({
          x: timeOfEvaluation,
          y: thoughtContent["si-as-detailed-below"] == "yes" ? 1 : 0
        });
        hiAsData.push({
          x: timeOfEvaluation,
          y: thoughtContent["hi-as-detailed-below"] == "yes" ? 1 : 0
        });
        delusionData.push({
          x: timeOfEvaluation,
          y: thoughtContent["delusions"] == "yes" ? 1 : 0
        });
        iorData.push({
          x: timeOfEvaluation,
          y: thoughtContent["ior"] == "yes" ? 1 : 0
        });
        obessionData.push({
          x: timeOfEvaluation,
          y: thoughtContent["obsessions"] == "yes" ? 1 : 0
        });
        passiveData.push({
          x: timeOfEvaluation,
          y: thoughtContent["passive-death-wish"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "No SI, intent or plan",
          data: noSiIntentData
        },
        {
          name: "No passive death wish",
          data: noPassiveDeathData
        },
        {
          name: "No HI, intent or plan",
          data: noHiIntentData
        },
        {
          name: "No delusional thinking observed",
          data: noDelusionalData
        },
        {
          name: "No obsessive thinking observed",
          data: noObessiveData
        },
        {
          name: "+ruminations",
          data: ruminationData
        },
        {
          name: "+SI without intent or plan",
          data: siWithoutData
        },
        {
          name: "+SI as detailed below",
          data: siAsData
        },
        {
          name: "+HI as detailed below",
          data: hiAsData
        },
        {
          name: "+delusions",
          data: delusionData
        },
        {
          name: "+IOR",
          data: iorData
        },
        {
          name: "+obsessions",
          data: obessionData
        },
        {
          name: "Passive death wish",
          data: passiveData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getThoughtContent", params);
  }
};
</script>

<style>
</style>