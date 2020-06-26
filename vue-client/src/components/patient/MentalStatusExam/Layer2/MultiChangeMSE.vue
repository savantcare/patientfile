<template>
  <div>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Appearance :oldList="appearnces"></Appearance>
      </el-col>
      <el-col :span="12">
        <ThoughtContent :oldList="thoughtContents"></ThoughtContent>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Attitude :oldList="attitudes"></Attitude>
      </el-col>
      <el-col :span="12">
        <Constitutional :oldList="constitutionals"></Constitutional>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <EyeContact :oldList="eyeContacts"></EyeContact>
      </el-col>
      <el-col :span="12">
        <Cognition :oldList="cognitions"></Cognition>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Psychomotor :oldList="psychomotors"></Psychomotor>
      </el-col>
      <el-col :span="12">
        <Insight :oldList="insights"></Insight>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Speech :oldList="speeches"></Speech>
      </el-col>
      <el-col :span="12">
        <Judgement :oldList="judgements"></Judgement>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <ImpulseControl :oldList="impulseControls"></ImpulseControl>
      </el-col>
      <el-col :span="12">
        <MoodAffect :oldList="affects"></MoodAffect>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <ThoughtProcess :oldList="thoughtProcesses"></ThoughtProcess>
      </el-col>
      <el-col :span="12">
        <Neurological :oldList="neurologicals"></Neurological>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Perception :oldList="perceptions"></Perception>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import Appearance from "./components/Appearance";
import ThoughtProcess from "./components/ThoughtProcess";
import Attitude from "./components/Attitude";
import Cognition from "./components/Cognition";
import Constitutional from "./components/Constitutional";
import EyeContact from "./components/EyeContact";
import ImpulseControl from "./components/ImpulseControl";
import Insight from "./components/Insight";
import Judgement from "./components/Judgement";
import MoodAffect from "./components/Affect";
import Neurological from "./components/Neurological";
import Perception from "./components/Perception";
import Psychomotor from "./components/Psychomotor";
import Speech from "./components/Speech";
import ThoughtContent from "./components/ThoughtContent";

import AppearenceModel from "../models/appearence";
import AffectModel from "../models/affect";
import AttitudeModel from "../models/attitude";
import CognitionModel from "../models/cognition";
import ConstitutionalModel from "../models/constitutional";
import EyeContactModel from "../models/eyeContact";
import ImpulseControlModel from "../models/impulseControl";
import InsightModel from "../models/insight";
import JudgementModel from "../models/judgement";
import NeurologicalModel from "../models/neurological";
import PerceptionModel from "../models/perception";
import PsychomotorModel from "../models/psychomotor";
import SpeechModel from "../models/speech";
import ThoughtContentModel from "../models/thoughtContent";
import ThoughtProcessModel from "../models/thoughtProcess";

export default {
  data() {
    return {
      appearnces: [],
      affects: [],
      attitudes: [],
      cognitions: [],
      constitutionals: [],
      eyeContacts: [],
      impulseControls: [],
      insights: [],
      judgements: [],
      neurologicals: [],
      perceptions: [],
      psychomotors: [],
      speeches: [],
      thoughtContents: [],
      thoughtProcesses: []
    };
  },
  components: {
    Appearance,
    ThoughtProcess,
    Attitude,
    Cognition,
    Constitutional,
    EyeContact,
    ImpulseControl,
    Insight,
    Judgement,
    MoodAffect,
    Neurological,
    Perception,
    Psychomotor,
    Speech,
    ThoughtContent
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateRecommendationInSM", {
        data: rec,
        notify: this.$notify
      });
    },
    getMSEValues() {
      const date = this.$store.state.mse.selectedDate;
      const timeStamp = Math.round(new Date(date).getTime() / 1000);

      const appearenceData = AppearenceModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let appearences = [];
      if (appearenceData) {
        Object.keys(appearenceData).forEach(key => {
          if (appearenceData[key] == "yes") {
            appearences.push(key);
          }
        });
      }
      this.appearnces = appearences;

      const affectData = AffectModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let affects = [];
      if (affectData) {
        Object.keys(affectData).forEach(key => {
          if (affectData[key] == "yes") {
            affects.push(key);
          }
        });
      }
      this.affects = affects;

      const attitudeData = AttitudeModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let attitudes = [];
      if (attitudeData) {
        Object.keys(attitudeData).forEach(key => {
          if (attitudeData[key] == "yes") {
            attitudes.push(key);
          }
        });
      }
      this.attitudes = attitudes;

      const cognitionData = CognitionModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let cognitions = [];
      if (cognitionData) {
        Object.keys(cognitionData).forEach(key => {
          if (cognitionData[key] == "yes") {
            cognitions.push(key);
          }
        });
      }
      this.cognitions = cognitions;

      const constitutionalData = ConstitutionalModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let constitutionals = [];
      if (constitutionalData) {
        Object.keys(constitutionalData).forEach(key => {
          if (constitutionalData[key] == "yes") {
            constitutionals.push(key);
          }
        });
      }
      this.constitutionals = constitutionals;

      const eyeContactData = EyeContactModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let eyeContacts = [];
      if (eyeContactData) {
        Object.keys(eyeContactData).forEach(key => {
          if (eyeContactData[key] == "yes") {
            eyeContacts.push(key);
          }
        });
      }
      this.eyeContact = eyeContacts;

      const impulseControlData = ImpulseControlModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let impulseControls = [];
      if (impulseControlData) {
        Object.keys(impulseControlData).forEach(key => {
          if (impulseControlData[key] == "yes") {
            impulseControls.push(key);
          }
        });
      }
      this.impulseControls = impulseControls;

      const insightData = InsightModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let insights = [];
      if (insightData) {
        Object.keys(insightData).forEach(key => {
          if (insightData[key] == "yes") {
            insights.push(key);
          }
        });
      }
      this.insights = insights;

      const judgementData = JudgementModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let judgements = [];
      if (judgementData) {
        Object.keys(judgementData).forEach(key => {
          if (judgementData[key] == "yes") {
            judgements.push(key);
          }
        });
      }
      this.judgements = judgements;

      const neurologicalData = NeurologicalModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let neurologicals = [];
      if (neurologicalData) {
        Object.keys(neurologicalData).forEach(key => {
          if (neurologicalData[key] == "yes") {
            neurologicals.push(key);
          }
        });
      }
      this.neurologicals = neurologicals;

      const perceptionData = PerceptionModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let perceptions = [];
      if (perceptionData) {
        Object.keys(perceptionData).forEach(key => {
          if (perceptionData[key] == "yes") {
            perceptions.push(key);
          }
        });
      }
      this.perceptions = perceptions;

      const psychomotorData = PsychomotorModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let psychomotors = [];
      if (psychomotorData) {
        Object.keys(psychomotorData).forEach(key => {
          if (psychomotorData[key] == "yes") {
            psychomotors.push(key);
          }
        });
      }
      this.psychomotors = psychomotors;

      const speechData = SpeechModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let speeches = [];
      if (speechData) {
        Object.keys(speechData).forEach(key => {
          if (speechData[key] == "yes") {
            speeches.push(key);
          }
        });
      }
      this.speeches = speeches;

      const thoughtContentData = ThoughtContentModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let thoughtContents = [];
      if (thoughtContentData) {
        Object.keys(thoughtContentData).forEach(key => {
          if (thoughtContentData[key] == "yes") {
            thoughtContents.push(key);
          }
        });
      }
      this.thoughtContents = thoughtContents;

      const thoughtProcessData = ThoughtProcessModel.query()
        .where("ROW_START", value => value < timeStamp)
        .where("ROW_END", value => value > timeStamp)
        .orderBy("ROW_START", "desc")
        .last();
      let thoughtProcesses = [];
      if (thoughtProcessData) {
        Object.keys(thoughtProcessData).forEach(key => {
          if (thoughtProcessData[key] == "yes") {
            thoughtProcesses.push(key);
          }
        });
      }
      this.thoughtProcesses = thoughtProcesses;
    }
  },
  computed: {},
  mounted() {
    this.getMSEValues();
  },
  watch: {
    tabDialogVisibility() {}
  }
};
</script>

<style>
/* .box-card {
  width: 500px;
  min-width: 500px;
  min-height: 300px;
} */
</style>