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

          <component
            :is="element.component"
            :type="element.type"
            :label="element.label"
            :tab="tab"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
export default {
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible type: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  components: {
    CardHeader
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
        {
          label: "BMI",
          type: "bmi",
          component: require("./components/BMI").default
        },
        {
          label: "Waist Circumference",
          type: "waistCircumference",
          component: require("./components/WaistCircumference").default
        },
        {
          label: "Blood Sugar",
          type: "bloodSugar",
          component: require("./components/BloodSugar").default
        },
        {
          label: "Height",
          type: "height",
          component: require("./components/Height").default
        },
        {
          label: "Blood Pressure",
          type: "bloodPressure",
          component: require("./components/BloodPressure").default
        },
        {
          label: "Oxygen Saturation",
          type: "oxygenSaturation",
          component: require("./components/OxygenSaturation").default
        },
        {
          label: "Pulse",
          type: "pulse",
          component: require("./components/Pulse").default
        },
        {
          label: "Temperature",
          type: "temperature",
          component: require("./components/Temperature").default
        }
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
      const today = new Date();
      this.$store.commit("bodyMeasurement/setSelectedDate", today);
      this.$store.commit("showUpdateAllBMElementTabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>