<template>
  <div id="body-measurement-current-state">
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

          <BMElementBody :type="element.type" :label="element.label" :tab="tab" />
          <!-- <component
            :is="element.component"
            :type="element.type"
            :label="element.label"
            :tab="tab"
          />-->
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
      default: "CurrentStateDisplayArea" // Other possible type: MultiStateDisplayArea For logic:Top of CardHeader.vue
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
        {
          label: "Weight",
          type: "weight",
          component: require("./components/Weight").default
        },
        { label: "BMI", type: "bmi" },
        { label: "Waist Circumference", type: "waistCircumference" },
        { label: "Blood Sugar", type: "bloodSugar" },
        { label: "Height", type: "height" },
        { label: "Blood Pressure", type: "bloodPressure" },
        { label: "Oxygen Saturation", type: "oxygenSaturation" },
        { label: "Pulse", type: "pulse" },
        { label: "Temperature", type: "temperature" }
      ],
      tab: 0
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
      const today = new Date().toISOString().split("T")[0];
      this.$store.commit("bodyMeasurement/setSelectedDate", today);
      console.log(today);
      this.$store.commit("showUpdateAllBMElementTabInLayer2");
    },
    gotoNextTab() {
      console.log(this.tab);
      this.tab = "1";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>