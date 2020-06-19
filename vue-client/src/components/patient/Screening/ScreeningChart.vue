<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickTakeButton">T</el-button>
    </div>
    <ve-line :data="chartData" :legend-visible="true" ref="chart"></ve-line>
  </div>
</template>

<script>
export default {
  props: ["type", "label", "tab"],
  components: {},
  data() {
    return {};
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

    //this.getWeightInfomation();
    this.getPHQ9History();
  },
  methods: {
    handleClickTakeButton() {
      console.log("show take a screen dialog");
      //console.log(data);
      this.$store.commit("showTakeAScreenTabInLayer2");

      /*this.$store.commit("showAddBMElementTabInLayer2", {
        label: this.label,
        type: this.type
      });*/
    },
    getPHQ9History() {
      const params = {
        patientUUID: this.$route.query.patient_id,
        screentype: "PHQ9",
        notify: this.$notify
      };
      this.$store.dispatch("getScreeningAnswerHistory", params);
    },
    getWeightInfomation() {
      this.$store.dispatch("bodyMeasurement/getWeight");
    }
  },
  computed: {
    chartData() {
      let chartData = [];
      let newItem = {};
      //let today = new Date().toISOString().slice(0, 19).replace("T", " ")

      let chartRawData = this.$store.state.screening
        .screenPHQ9AnswerHistoryDetail;

      chartRawData.forEach(items => {
        let subset = Object.fromEntries(
          Object.entries(items).filter(([key]) =>
            [
              "question1",
              "question2",
              "question3",
              "question4",
              "question5",
              "question6",
              "question6",
              "question7",
              "question8",
              "question9",
              "question10"
            ].includes(key)
          )
        );
        let subsetTotal = Object.values(subset).reduce(
          (a, b) => (a ? parseFloat(a) : 0) + (b ? parseFloat(b) : 0),
          0
        );
        newItem = {
          date: items.row_start,
          points: subsetTotal
        };
        chartData.push(newItem);
      });

      chartData = chartData.sort((data1, data2) => {
        return new Date(data1.date) - new Date(data2.date);
      });

      let columns = ["date"];
      columns.push("phq9");
      let rows = [];
      chartData.forEach(item => {
        let date = new Date(item.date);
        const formatDate = date.getDate() + "-" + date.getHours(); // date.getMonth() + 1 + "-" + date.getDate();
        rows.push({
          phq9: item.points,
          date: formatDate
        });
      });

      return {
        columns: columns,
        rows: rows
      };
    },
    getUserId() {
      return this.$store.state.userId;
    },
    userScreenAnswerDetail() {
      return this.$store.state.screening.screenPHQ9AnswerDetail;
    },
    userScreenAnswerHistoryDetail() {
      return this.$store.state.screening.screenPHQ9AnswerHistoryDetail;
    }
  },
  watch: {
    tab() {
      this.$nextTick(() => {
        this.$refs["chart"].echarts.resize();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col-8 {
  padding-top: 6px;
  padding-bottom: 6px;
}

.qstn-submit {
  float: right;
  margin: 0 20px;
}

h3,
h4 {
  float: left;
}

.other-qstn,
h3,
h4 {
  margin: 0 10px;
}
.el-form-item {
  margin-bottom: 3px;
}
.alert {
  color: #f56c6c;
}
</style>