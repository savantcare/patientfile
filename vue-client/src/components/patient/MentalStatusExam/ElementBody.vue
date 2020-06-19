<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickChangeButton">C</el-button>
      <apexchart type="heatmap" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "tab", "label"],
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        colors: ["#008000"],
        xaxis: {
          type: "category"
        },
        title: {
          text: ""
        }
      }
    };
  },
  computed: {
    series() {
      const appearences = this.$store.state.mse.appearenceList;
      let series = [];
      if (this.type == "appearence") {
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
      }
      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    if (this.type == "appearence") {
      this.$store.dispatch("mse/getAppearence", params);
    }
  },
  methods: {
    handleClickChangeButton() {
      this.$store.commit("mse/setSelectedType", this.type);
      this.$store.commit("showChangeMSETabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>