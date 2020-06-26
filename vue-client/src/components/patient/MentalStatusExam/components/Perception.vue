<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Perception from "../models/perception";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const perceptions = Perception.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let noAvhData = [];
      let ahData = [];
      let commandAhData = [];
      let vhData = [];

      for (const perception of perceptions) {
        const { timeOfEvaluation } = perception;

        noAvhData.push({
          x: timeOfEvaluation,
          y: perception["no-avh"] == "yes" ? 1 : 0
        });
        ahData.push({
          x: timeOfEvaluation,
          y: perception["ahData"] == "yes" ? 1 : 0
        });
        commandAhData.push({
          x: timeOfEvaluation,
          y: perception["command-ah"] == "yes" ? 1 : 0
        });
        vhData.push({
          x: timeOfEvaluation,
          y: perception["vh"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "No AVH",
          data: noAvhData
        },
        {
          name: "+AH",
          data: ahData
        },
        {
          name: "+Command AH",
          data: commandAhData
        },
        {
          name: "+VH",
          data: vhData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getPerception", params);
  }
};
</script>

<style>
</style>