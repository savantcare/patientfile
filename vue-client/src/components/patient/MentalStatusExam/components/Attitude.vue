<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Attitude from "../models/attitude";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const attitudes = Attitude.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let pleasantData = [];
      let uncooperativeData = [];
      let hostileData = [];
      let guardedData = [];
      let evasiveData = [];
      let apatheticData = [];
      let disorganizedData = [];
      for (const attitude of attitudes) {
        const { timeOfEvaluation } = attitude;
        pleasantData.push({
          x: timeOfEvaluation,
          y: attitude["pleasant-and-cooperative"] == "yes" ? 1 : 0
        });
        uncooperativeData.push({
          x: timeOfEvaluation,
          y: attitude["uncooperative"] == "yes" ? 1 : 0
        });
        hostileData.push({
          x: timeOfEvaluation,
          y: attitude["hostile-or-defiant"] == "yes" ? 1 : 0
        });
        guardedData.push({
          x: timeOfEvaluation,
          y: attitude["guarded"] == "yes" ? 1 : 0
        });
        evasiveData.push({
          x: timeOfEvaluation,
          y: attitude["evasive"] == "yes" ? 1 : 0
        });
        apatheticData.push({
          x: timeOfEvaluation,
          y: attitude["apathetic"] == "yes" ? 1 : 0
        });
        disorganizedData.push({
          x: timeOfEvaluation,
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
      console.log(series);
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