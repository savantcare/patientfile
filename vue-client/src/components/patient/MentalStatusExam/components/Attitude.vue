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
      const attitudes = this.$store.state.mse.attitudeList;
      let pleasantData = [];
      let uncooperativeData = [];
      let hostileData = [];
      let guardedData = [];
      let evasiveData = [];
      let apatheticData = [];
      let disorganizedData = [];
      for (const attitude of attitudes) {
        const { createDate } = attitude;
        pleasantData.push({
          x: createDate,
          y: attitude["pleasant-and-cooperative"] == "yes" ? 1 : 0
        });
        uncooperativeData.push({
          x: createDate,
          y: attitude["uncooperative"] == "yes" ? 1 : 0
        });
        hostileData.push({
          x: createDate,
          y: attitude["hostile-or-defiant"] == "yes" ? 1 : 0
        });
        guardedData.push({
          x: createDate,
          y: attitude["guarded"] == "yes" ? 1 : 0
        });
        evasiveData.push({
          x: createDate,
          y: attitude["evasive"] == "yes" ? 1 : 0
        });
        apatheticData.push({
          x: createDate,
          y: attitude["apathetic"] == "yes" ? 1 : 0
        });
        disorganizedData.push({
          x: createDate,
          y: attitude["disorganized-behavior"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Pleasant and cooperative",
          data: pleasantData
        },
        {
          name: "Uncooperative",
          data: uncooperativeData
        },
        {
          name: "Hostile or defiant",
          data: hostileData
        },
        {
          name: "Guarded",
          data: guardedData
        },
        {
          name: "Evasive",
          data: evasiveData
        },
        {
          name: "Apathetic",
          data: apatheticData
        },
        {
          name: "Disorganized behavior",
          data: disorganizedData
        }
      );
      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getAttitude", params);
  }
};
</script>

<style>
</style>