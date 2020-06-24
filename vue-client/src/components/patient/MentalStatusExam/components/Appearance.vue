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
      const appearences = this.$store.state.mse.appearenceList;
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
      for (const appearence of appearences) {
        const { createDate } = appearence;
        goodGrommingAndHygieneData.push({
          x: createDate,
          y: appearence["good-grooming-and-hygiene"] == "yes" ? 1 : 0
        });
        noApparentDistressData.push({
          x: createDate,
          y: appearence["no-apparent-distress"] == "yes" ? 1 : 0
        });
        wellDevelopedData.push({
          x: createDate,
          y: appearence["well-developed-well-nourished"] == "yes" ? 1 : 0
        });
        statedAgeData.push({
          x: createDate,
          y: appearence["appears-stated-age"] == "yes" ? 1 : 0
        });
        yougnerAgeData.push({
          x: createDate,
          y: appearence["appears-younger-then-stated-age"] == "yes" ? 1 : 0
        });
        olderAgeData.push({
          x: createDate,
          y: appearence["appears-older-then-stated-age"] == "yes" ? 1 : 0
        });
        obeseData.push({
          x: createDate,
          y: appearence["obese"] == "yes" ? 1 : 0
        });
        thinData.push({
          x: createDate,
          y: appearence["thin-or-cachetic"] == "yes" ? 1 : 0
        });
        disheveledData.push({
          x: createDate,
          y: appearence["disheveled-unkempt"] == "yes" ? 1 : 0
        });
        malodorousData.push({
          x: createDate,
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