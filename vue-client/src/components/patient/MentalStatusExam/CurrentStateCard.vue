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
      <el-collapse>
        <el-collapse-item
          v-for="(element, index) in mseElements"
          :key="`mse-element-${index}`"
          :title="element.label"
          :name="index"
        >
          <ElementBody :type="element.value" :label="element.label" />
        </el-collapse-item>
      </el-collapse>
      <!-- <el-tabs tab-position="left" v-model="tab">
        <el-tab-pane v-for="(element, index) in mseElements" :key="`mse-element-${index}`">
          <span slot="label">{{element.label}}</span>

          <ElementBody :type="element.value" :tab="tab" :label="element.label" />
        </el-tab-pane>
      </el-tabs>-->
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
        { label: "Eye-contact", value: "eyeContact" },
        { label: "Impulse control", value: "impulseControl" },
        { label: "Thought process", value: "thoughtProcess" },
        { label: "Psychomotor", value: "psychomotor" },
        { label: "Insight", value: "insight" },
        { label: "Speech", value: "speech" },
        { label: "Judgement", value: "judgement" },
        { label: "Mood / affect", value: "affect" },
        { label: "Thought content", value: "thoughtContent" },
        { label: "Neurological", value: "neurological" },
        { label: "Perception", value: "perception" }
      ],
      tab: 0
    };
  },
  methods: {
    handleClickOnFInCardHeader() {
      var options = {
        container: "#multiStateDisplayArea",
        easing: "ease-in",
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      };
      const element = "#mse-multi-state";
      this.$scrollTo(element, 500, options);
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("mse/setSelectedDate", new Date());
      this.$store.commit("showMultiChangeMSETabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>