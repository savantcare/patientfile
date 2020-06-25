<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import Appearence from "../models/appearence";
export default {
  components: { Graph },
  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const appearences = Appearence.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let goodGrommingAndHygieneData = [];
      let noApparentDistressData = [];
      let wellDevelopedData = [];
      let statedAgeData = [];
      let yougnerAgeData = [];
      let olderAgeData = [];
      let obeseData = [];
      let thinData = [];
      let disheveledData = [];
      let malodorousData = [];
      console.log(appearences);
      for (const appearence of appearences) {
        let { timeOfEvaluation } = appearence;
        timeOfEvaluation = timeOfEvaluation.split("T")[0];

        goodGrommingAndHygieneData.push({
          x: timeOfEvaluation,
          y: appearence["good-grooming-and-hygiene"] == "yes" ? 1 : 0
        });
        noApparentDistressData.push({
          x: timeOfEvaluation,
          y: appearence["no-apparent-distress"] == "yes" ? 1 : 0
        });
        wellDevelopedData.push({
          x: timeOfEvaluation,
          y: appearence["well-developed-well-nourished"] == "yes" ? 1 : 0
        });
        statedAgeData.push({
          x: timeOfEvaluation,
          y: appearence["appears-stated-age"] == "yes" ? 1 : 0
        });
        yougnerAgeData.push({
          x: timeOfEvaluation,
          y: appearence["appears-younger-then-stated-age"] == "yes" ? 1 : 0
        });
        olderAgeData.push({
          x: timeOfEvaluation,
          y: appearence["appears-older-then-stated-age"] == "yes" ? 1 : 0
        });
        obeseData.push({
          x: timeOfEvaluation,
          y: appearence["obese"] == "yes" ? 1 : 0
        });
        thinData.push({
          x: timeOfEvaluation,
          y: appearence["thin-or-cachetic"] == "yes" ? 1 : 0
        });
        disheveledData.push({
          x: timeOfEvaluation,
          y: appearence["disheveled-unkempt"] == "yes" ? 1 : 0
        });
        malodorousData.push({
          x: timeOfEvaluation,
          y: appearence["malodorus"] == "yes" ? 1 : 0
        });
      }
      series.push(
        {
          name: "Good grooming and hygiene",
          data: goodGrommingAndHygieneData
        },
        {
          name: "No apparent distress",
          data: noApparentDistressData
        },
        {
          name: "Well-developed, well-nourished",
          data: wellDevelopedData
        },
        {
          name: "Appears stated age",
          data: statedAgeData
        },
        {
          name: "Appears younger than stated age",
          data: yougnerAgeData
        },
        {
          name: "Appears older than stated age",
          data: olderAgeData
        },
        {
          name: "Obese",
          data: obeseData
        },
        {
          name: "Thin or cachectic",
          data: thinData
        },
        {
          name: "Disheveled, unkempt",
          data: disheveledData
        },
        {
          name: "Malodorous",
          data: malodorousData
        }
      );

      console.log(series);

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getAppearence", params);
  }
};
</script>

<style>
</style>