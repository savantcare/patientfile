<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickChangeButton">C</el-button>
      <apexchart
        type="heatmap"
        height="350"
        :options="chartOptions"
        :series="series"
        v-if="series.length > 0"
      ></apexchart>
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
      let series = [];
      if (this.type == "appearence") {
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
      } else if (this.type == "attitude") {
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
      } else if (this.type == "cognition") {
        const cognitions = this.$store.state.mse.cognitionList;
        let grosslyIntactData = [];
        let impairedData = [];
        let fluctuatingData = [];

        for (const cognition of cognitions) {
          const { createDate } = cognition;
          grosslyIntactData.push({
            x: createDate,
            y:
              cognition[
                "grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n"
              ] == "yes"
                ? 1
                : 0
          });
          impairedData.push({
            x: createDate,
            y: cognition["impaired"] == "yes" ? 1 : 0
          });
          fluctuatingData.push({
            x: createDate,
            y: cognition["fluctuating"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name:
              "Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention",
            data: grosslyIntactData
          },
          {
            name: "Impaired",
            data: impairedData
          },
          {
            name: "Fluctuating",
            data: fluctuatingData
          }
        );
      } else if (this.type == "constitutional") {
        const constitutionals = this.$store.state.mse.constitutionalList;
        let vitalData = [];

        for (const constitutional of constitutionals) {
          const { createDate } = constitutional;
          vitalData.push({
            x: createDate,
            y: constitutional["vitals-signs-stable"] == "yes" ? 1 : 0
          });
        }

        series.push({
          name: "Vitals signs stable",
          data: vitalData
        });
      }
      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    if (this.type == "appearence") {
      this.$store.dispatch("mse/getAppearence", params);
    } else if (this.type == "attitude") {
      this.$store.dispatch("mse/getAttitude", params);
    } else if (this.type == "cognition") {
      this.$store.dispatch("mse/getCognition", params);
    } else if (this.type == "constitutional") {
      this.$store.dispatch("mse/getConstitutional", params);
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