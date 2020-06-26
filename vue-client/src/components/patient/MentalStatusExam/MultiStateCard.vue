<template>
  <div id="mse-multi-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Mental Status Exam"
          actions="M,F"
          typeOfStateDisplayArea="MultiStateDisplayArea"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          ref="card_header"
        />
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="Value">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openChangeDialog(scope.row)"
            >C</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
// import { mapGetters } from "vuex";
import Appearence from "./models/appearence";
import Attitude from "./models/attitude";
import Cognition from "./models/cognition";
import Constitutional from "./models/constitutional";
import EyeContact from "./models/eyeContact";

import ImpulseControl from "./models/impulseControl";
import Insight from "./models/insight";
import Judgement from "./models/judgement";
import Affect from "./models/affect";
import Neurological from "./models/neurological";
import Perception from "./models/perception";
import Psychomotor from "./models/psychomotor";
import Speech from "./models/speech";
import ThoughtContent from "./models/thoughtContent";
import ThoughtProcess from "./models/thoughtProcess";
export default {
  components: {
    CardHeader
  },
  methods: {
    openChangeDialog(item) {
      const statusList = item.value.split(",");

      this.$store.commit("mse/setSelectedType", item.key);
      this.$store.commit("showChangeMSETabInLayer2");
      this.$store.commit("mse/setCheckedList", statusList);
    },
    handleClickOnMInCardHeader() {
      this.$store.commit(
        "bodyMeasurement/setSelectedDate",
        this.timeOfStateSelectedInHeader
      );
      this.$store.commit("showUpdateAllBMElementTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      var options = {
        container: "#currentStateDisplayArea",
        easing: "ease-in",
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      };
      const element = "#body-measurement-current-state";
      this.$scrollTo(element, 500, options);
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  computed: {
    appearence() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const appearenceData = Appearence.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let appearenceString = "";
      if (appearenceData) {
        Object.keys(appearenceData).forEach(key => {
          if (appearenceData[key] == "yes") {
            appearenceString += key + ",";
          }
        });
      }
      if (appearenceString.length > 0) {
        appearenceString = appearenceString.slice(0, -1);
      } else {
        appearenceString = "-";
      }

      return appearenceString;
    },
    attitude() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const attitudeData = Attitude.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let attitudeString = "";
      if (attitudeData) {
        Object.keys(attitudeData).forEach(key => {
          if (attitudeData[key] == "yes") {
            attitudeString += key + ",";
          }
        });
      }
      if (attitudeString.length > 0) {
        attitudeString = attitudeString.slice(0, -1);
      } else {
        attitudeString = "-";
      }

      return attitudeString;
    },
    cognition() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const cognitionData = Cognition.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (cognitionData) {
        Object.keys(cognitionData).forEach(key => {
          if (cognitionData[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    constitutional() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Constitutional.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    eyeContact() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = EyeContact.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    impulseControl() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = ImpulseControl.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    insight() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Insight.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    judgement() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Judgement.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    affect() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Affect.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    neurological() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Neurological.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    perception() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Perception.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    psychomotor() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Psychomotor.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    speech() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = Speech.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    thoughtContent() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = ThoughtContent.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    thoughtProcess() {
      let timeStampOfStateInsideCt = null;
      if (
        this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader ===
        "2038-01-19 03:14:07.999999"
      ) {
        timeStampOfStateInsideCt = Math.round(new Date().getTime() / 1000);
      } else
        timeStampOfStateInsideCt = Math.round(
          new Date(
            this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
          ).getTime() / 1000
        );
      const data = ThoughtProcess.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      let string = "";
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] == "yes") {
            string += key + ",";
          }
        });
      }
      if (string.length > 0) {
        string = string.slice(0, -1);
      } else {
        string = "-";
      }

      return string;
    },
    tableData() {
      return [
        {
          key: "appearence",
          label: "Appearence",
          value: this.appearence
        },
        {
          label: "Mood/Affect",
          value: this.affect,
          key: "affect"
        },
        {
          label: "Attitude",
          value: this.attitude,
          key: "attitude"
        },
        {
          key: "cognition",
          label: "Cognition",
          value: this.cognition
        },
        {
          key: "constitutional",
          label: "Constitutional",
          value: this.constitutional
        },
        {
          key: "eyeContact",
          label: "Eye Contact",
          value: this.eyeContact
        },
        {
          key: "impulseControl",
          label: "Impulse Control",
          value: this.impulseControl
        },
        {
          key: "insight",
          label: "Insight",
          value: this.insight
        },
        {
          key: "judgement",
          label: "Judgement",
          value: this.judgement
        },
        {
          key: "perception",
          label: "Perception",
          value: this.perception
        },
        {
          key: "psychomotor",
          label: "Psychomotor",
          value: this.psychomotor
        },
        {
          key: "speech",
          label: "Speech",
          value: this.speech
        },
        {
          key: "thoughtContent",
          label: "Thought Content",
          value: this.thoughtContent
        },
        {
          key: "thoughtProcess",
          label: "Thought Process",
          value: this.thoughtProcess
        },
        {
          key: "neurological",
          label: "Neurological",
          value: this.neurological
        }
      ];
    },
    timeOfStateSelectedInHeader() {
      return this.$store.state.multiStateDisplayArea
        .timeOfStateSelectedInHeader;
    }
  },
  mounted() {
    this.$store.commit(
      "bodyMeasurement/setSelectedDate",
      this.timeOfStateSelectedInHeader
    );
  },
  watch: {
    timeOfStateSelectedInHeader() {
      this.$store.commit(
        "bodyMeasurement/setSelectedDate",
        this.timeOfStateSelectedInHeader
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>