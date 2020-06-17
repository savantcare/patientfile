<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Body measurement"
          actions="F,M,G"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          ref="card_header"
        />
      </div>

      <el-tabs tab-position="left" v-model="tab">
        <el-tab-pane v-for="(element, index) in bmElements" :key="`bm-element-${index}`">
          <span slot="label">{{element.label}}</span>

          <BMElementBody :type="element.value" :label="element.label" :tab="tab" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import BMElementBody from "./BMElementBody";
export default {
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  components: {
    CardHeader,
    BMElementBody
  },
  data() {
    return {
      selectedRows: [],
      bmElements: [
        { label: "Weight", value: "weight" },
        { label: "BMI", value: "bmi" },
        { label: "Waist Circumference", value: "waistCircumference" },
        { label: "Blood Sugar", value: "bloodSugar" },
        { label: "Height", value: "height" },
        { label: "Blood Pressure", value: "bloodPressure" },
        { label: "Oxygen Saturation", value: "oxygenSaturation" },
        { label: "Pulse", value: "pulse" },
        { label: "Temperature", value: "temperature" }
      ],
      tab: ""
    };
  },
  methods: {
    handleClickOnGInCardHeader() {
      this.$store.commit("showGraphAllBMTabInLayer2");
    },
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
      const element = "#body-measurement-multi-state";
      this.$scrollTo(element, 500, options);
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("showUpdateAllBMElementTabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>