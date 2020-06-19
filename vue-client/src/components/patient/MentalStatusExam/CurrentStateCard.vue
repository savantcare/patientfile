<template>
  <div id="mse-current-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <card-header
          ctName="Mental Status Exam"
          actions="F,M"
          typeOfStateDisplayArea="CurrentStateDisplayArea"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          ref="card_header"
        />
      </div>
      <el-tabs tab-position="left" v-model="tab">
        <el-tab-pane v-for="(element, index) in mseElements" :key="`mse-element-${index}`">
          <span slot="label">{{element.label}}</span>

          <ElementBody :type="element.value" :tab="tab" :label="element.label" />

          <!-- <BMElementBody :type="element.value" :label="element.label" :tab="tab" /> -->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ElementBody from "./ElementBody";
export default {
  components: { ElementBody },
  data() {
    return {
      selectedRows: [],
      mseElements: [
        { label: "Appearence", value: "appearence" },
        { label: "Attitude", value: "attitude" },
        { label: "Cognition", value: "cognition" },
        { label: "Constitutional", value: "constitutional" },
        { label: "Thought process", value: "thoughtProcess" },
        { label: "Psychomotor", value: "psychomotor" },
        { label: "Eye-contact", value: "eyeContact" },
        { label: "Insight", value: "insight" },
        { label: "Speech", value: "speech" },
        { label: "Judgement", value: "judgement" },
        { label: "Mood / affect", value: "moodAffect" },
        { label: "Impulse control", value: "impulseControl" },
        { label: "Thought content", value: "thoughtContent" },
        { label: "Neurological", value: "neurological" },
        { label: "Perception", value: "perception" }
      ],
      tab: 0
    };
  },
  methods: {
    handleClickOnFInCardHeader() {},
    handleClickOnMInCardHeader() {}
  }
};
</script>

<style lang="scss" scoped>
</style>