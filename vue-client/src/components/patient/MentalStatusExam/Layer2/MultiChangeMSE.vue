<template>
  <div>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Appearance></Appearance>
      </el-col>
      <el-col :span="12">
        <ThoughtContent></ThoughtContent>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Attitude></Attitude>
      </el-col>
      <el-col :span="12">
        <Constitutional></Constitutional>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <EyeContact></EyeContact>
      </el-col>
      <el-col :span="12">
        <Cognition></Cognition>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Psychomotor></Psychomotor>
      </el-col>
      <el-col :span="12">
        <Insight></Insight>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Speech></Speech>
      </el-col>
      <el-col :span="12">
        <Judgement></Judgement>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <ImpulseControl></ImpulseControl>
      </el-col>
      <el-col :span="12">
        <MoodAffect></MoodAffect>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <ThoughtProcess></ThoughtProcess>
      </el-col>
      <el-col :span="12">
        <Neurological></Neurological>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px">
      <el-col :span="12">
        <Perception></Perception>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import Appearance from "@/components/patient/MentalStatusExam/components/Appearance";
import ThoughtProcess from "@/components/patient/MentalStatusExam/components/ThoughtProcess";
import Attitude from "@/components/patient/MentalStatusExam/components/Attitude";
import Cognition from "@/components/patient/MentalStatusExam/components/Cognition";
import Constitutional from "@/components/patient/MentalStatusExam/components/Constitutional";
import EyeContact from "@/components/patient/MentalStatusExam/components/EyeContact";
import ImpulseControl from "@/components/patient/MentalStatusExam/components/ImpulseControl";
import Insight from "@/components/patient/MentalStatusExam/components/Insight";
import Judgement from "@/components/patient/MentalStatusExam/components/Judgement";
import MoodAffect from "@/components/patient/MentalStatusExam/components/MoodAffect";
import Neurological from "@/components/patient/MentalStatusExam/components/Neurological";
import Perception from "@/components/patient/MentalStatusExam/components/Perception";
import Psychomotor from "@/components/patient/MentalStatusExam/components/Psychomotor";
import Speech from "@/components/patient/MentalStatusExam/components/Speech";
import ThoughtContent from "@/components/patient/MentalStatusExam/components/ThoughtContent";

export default {
  data() {
    return {
      checkboxGroup4: ["Shanghai"],
      textarea: ""
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
    }
  },
  computed: {},
  mounted() {},
  watch: {
    tabDialogVisibility() {}
  }
};
</script>

<style>
.box-card {
  width: 500px;
  min-width: 500px;
  min-height: 300px;
}
</style>