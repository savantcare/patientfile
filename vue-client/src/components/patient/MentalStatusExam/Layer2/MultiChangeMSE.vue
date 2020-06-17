<template>
  <div>
    <el-row :gutter="12">
      <el-col>
        <Appearance></Appearance>
      </el-col>

      <el-col>
        <ThoughtProcess></ThoughtProcess>
      </el-col>

      <el-col>
        <Attitude></Attitude>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <Constitutional></Constitutional>
      </el-col>
      <el-col>
        <EyeContact></EyeContact>
      </el-col>
      <el-col>
        <Cognition></Cognition>
      </el-col>
    </el-row>

    <el-row>
      <Psychomotor></Psychomotor>
    </el-row>

    <el-row>
      <el-col>
        <Insight></Insight>
      </el-col>

      <el-col></el-col>
    </el-row>

    <el-row>
      <el-col>
        <Judgement></Judgement>
      </el-col>

      <el-col>
        <MoodAffect></MoodAffect>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <ImpulseControl></ImpulseControl>
      </el-col>

      <el-col>
        <ThoughtContent></ThoughtContent>
      </el-col>

      <el-col>
        <Neurological></Neurological>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <Perception></Perception>
      </el-col>
      <el-col></el-col>
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
  width: 700px;
}
</style>