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

      const affects = this.$store.state.mse.affectList;

      let euthymicData = [];
      let dysphoricData = [];
      let irritableData = [];
      let angryData = [];
      let brightData = [];
      let euphoricData = [];
      let labileData = [];
      let stableData = [];
      let moodCongruentData = [];
      let moodIncogruentData = [];
      let expansiveData = [];
      let fullRangeData = [];
      let constrictedData = [];
      let bluntedData = [];
      let flatData = [];
      let anxiousData = [];
      let tearfulData = [];
      let dysthymicData = [];

      for (const affect of affects) {
        const { createDate } = affect;

        euthymicData.push({
          x: createDate,
          y: affect["euthymic"] == "yes" ? 1 : 0
        });
        dysphoricData.push({
          x: createDate,
          y: affect["dysphoric"] == "yes" ? 1 : 0
        });
        irritableData.push({
          x: createDate,
          y: affect["irritable"] == "yes" ? 1 : 0
        });
        angryData.push({
          x: createDate,
          y: affect["angry"] == "yes" ? 1 : 0
        });
        brightData.push({
          x: createDate,
          y: affect["bright"] == "yes" ? 1 : 0
        });
        euphoricData.push({
          x: createDate,
          y: affect["euphoric"] == "yes" ? 1 : 0
        });
        labileData.push({
          x: createDate,
          y: affect["labile"] == "yes" ? 1 : 0
        });
        stableData.push({
          x: createDate,
          y: affect["stable"] == "yes" ? 1 : 0
        });
        moodCongruentData.push({
          x: createDate,
          y: affect["mood-congruent"] == "yes" ? 1 : 0
        });
        moodIncogruentData.push({
          x: createDate,
          y: affect["mood-incongruent"] == "yes" ? 1 : 0
        });
        expansiveData.push({
          x: createDate,
          y: affect["expansive"] == "yes" ? 1 : 0
        });
        fullRangeData.push({
          x: createDate,
          y: affect["full-range"] == "yes" ? 1 : 0
        });
        constrictedData.push({
          x: createDate,
          y: affect["constricted"] == "yes" ? 1 : 0
        });
        bluntedData.push({
          x: createDate,
          y: affect["blunted"] == "yes" ? 1 : 0
        });
        flatData.push({
          x: createDate,
          y: affect["flat"] == "yes" ? 1 : 0
        });
        anxiousData.push({
          x: createDate,
          y: affect["anxious"] == "yes" ? 1 : 0
        });
        tearfulData.push({
          x: createDate,
          y: affect["tearful"] == "yes" ? 1 : 0
        });
        dysthymicData.push({
          x: createDate,
          y: affect["dysthymic"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Euthymic",
          data: euthymicData
        },
        {
          name: "Dysphoric",
          data: dysphoricData
        },
        {
          name: "Irritable",
          data: irritableData
        },
        {
          name: "Angry",
          data: angryData
        },
        {
          name: "Bright",
          data: brightData
        },
        {
          name: "Euphoric",
          data: euphoricData
        },
        {
          name: "Labile",
          data: labileData
        },
        {
          name: "Stable",
          data: stableData
        },
        {
          name: "Mood congruent",
          data: moodCongruentData
        },
        {
          name: "Mood incongruent",
          data: moodIncogruentData
        },
        {
          name: "Expansive",
          data: expansiveData
        },
        {
          name: "Constricted",
          data: constrictedData
        },
        {
          name: "Blunted",
          data: bluntedData
        },
        {
          name: "Flat",
          data: flatData
        },
        {
          name: "Anxious",
          data: anxiousData
        },
        {
          name: "Tearful",
          data: tearfulData
        },
        {
          name: "Dysthymic",
          data: dysthymicData
        },
        {
          name: "Full-range",
          data: fullRangeData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getAffect", params);
  }
};
</script>

<style>
</style>