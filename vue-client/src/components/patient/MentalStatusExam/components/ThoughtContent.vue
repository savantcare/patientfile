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

      const thoughtContents = this.$store.state.mse.thoughtContentList;

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
        const { createDate } = thoughtContent;

        noSiIntentData.push({
          x: createDate,
          y: thoughtContent["no-si-intent-or-plan"] == "yes" ? 1 : 0
        });
        noPassiveDeathData.push({
          x: createDate,
          y: thoughtContent["no-passive-death-wish"] == "yes" ? 1 : 0
        });
        noHiIntentData.push({
          x: createDate,
          y: thoughtContent["no-hi-intent-or-plan"] == "yes" ? 1 : 0
        });
        noDelusionalData.push({
          x: createDate,
          y: thoughtContent["no-delusional-thinking-observed"] == "yes" ? 1 : 0
        });
        noObessiveData.push({
          x: createDate,
          y: thoughtContent["no-obsessive-thinking-observed"] == "yes" ? 1 : 0
        });
        ruminationData.push({
          x: createDate,
          y: thoughtContent["ruminations"] == "yes" ? 1 : 0
        });
        siWithoutData.push({
          x: createDate,
          y: thoughtContent["si-without-intent-or-plan"] == "yes" ? 1 : 0
        });
        siAsData.push({
          x: createDate,
          y: thoughtContent["si-as-detailed-below"] == "yes" ? 1 : 0
        });
        hiAsData.push({
          x: createDate,
          y: thoughtContent["hi-as-detailed-below"] == "yes" ? 1 : 0
        });
        delusionData.push({
          x: createDate,
          y: thoughtContent["delusions"] == "yes" ? 1 : 0
        });
        iorData.push({
          x: createDate,
          y: thoughtContent["ior"] == "yes" ? 1 : 0
        });
        obessionData.push({
          x: createDate,
          y: thoughtContent["obsessions"] == "yes" ? 1 : 0
        });
        passiveData.push({
          x: createDate,
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