<template>
  <div id="body-measurement-multi-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Body measurement"
          actions="G,M,F"
          typeOfStateDisplayArea="MultiStateDisplayArea"
          @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          ref="card_header"
        />
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="Current Value">
          <template slot-scope="scope">{{formatBodyMeasurementValue(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openChangeDialog(scope.row)"
            >C</el-button>
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openGraphDialog(scope.row, scope.$index)"
            >G</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import { mapGetters } from "vuex";

import Weight from "./models/weight";
import BloodPressure from "./models/bloodPressure";
import BloodSugar from "./models/bloodSugar";
import Bmi from "./models/bmi";
import Height from "./models/height";
import OxygenSaturation from "./models/oxygenSaturation";
import Pulse from "./models/pulse";
import Temperature from "./models/temperature";
import WaistCircumference from "./models/waistCircumference";

export default {
  components: {
    CardHeader
  },
  methods: {
    handleClickOnGInCardHeader() {
      this.$store.commit("showGraphAllBMTabInLayer2");
    },
    openChangeDialog(item) {
      this.$store.commit("bodyMeasurement/setObjectToUpdate", item);
      this.$store.commit("showAddBMElementTabInLayer2", {
        label: item.label,
        type: item.type
      });
    },
    openGraphDialog(item, index) {
      this.$store.commit("showGraphBMElementTabInLayer2", {
        label: item.label,
        type: item.type,
        index: index
      });
    },
    formatBodyMeasurementValue(bm) {
      return bm.value + bm.unit;
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
    ...mapGetters("bodyMeasurement", ["measurementsByDate"]),
    weight() {
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
      const data = Weight.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.weightInPounds,
          unit: "lb"
        };
      }
      return "-";
    },
    bmi() {
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
      const data = Bmi.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.bmiValue,
          unit: ""
        };
      }
      return "-";
    },
    waistCircumference() {
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
      const data = WaistCircumference.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.waistCircumferenceInInches,
          unit: " in"
        };
      }
      return "-";
    },
    bloodSugar() {
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
      const data = BloodSugar.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.bloodSugar,
          unit: " mg/dL"
        };
      }
      return "-";
    },
    height() {
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
      const data = Height.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.heightInInch,
          unit: " inches"
        };
      }
      return "-";
    },
    bloodPressure() {
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
      const data = BloodPressure.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.systolicValue + "/" + data.diastolicValue,
          unit: " mmHg"
        };
      }
      return "-";
    },
    oxygenSaturation() {
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
      const data = OxygenSaturation.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.oxygenSaturation,
          unit: " mmHg"
        };
      }
      return "-";
    },
    pulse() {
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
      const data = Pulse.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.beatsPerMinuteValue,
          unit: " bpm"
        };
      }
      return "-";
    },
    temperature() {
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
      const data = Temperature.query()
        .where("ROW_START", value => value < timeStampOfStateInsideCt)
        .where("ROW_END", value => value > timeStampOfStateInsideCt)
        .orderBy("ROW_START", "desc")
        .last();

      if (data) {
        return {
          value: data.temperatureInFarehnite,
          unit: " F"
        };
      }
      return "-";
    },
    tableData() {
      return [
        {
          label: "Weight",
          type: "weight",
          ...this.weight
        },
        {
          label: "BMI",
          type: "bmi",
          ...this.bmi
        },
        {
          label: "Waist circumference",
          type: "waistCircumference",
          ...this.waistCircumference
        },
        {
          label: "Blood sugar",
          type: "bloodSugar",
          ...this.bloodSugar
        },
        {
          label: "Height",
          type: "height",
          ...this.height
        },
        {
          label: "Blood pressure",
          type: "bloodPressure",
          ...this.bloodPressure
        },
        {
          label: "Oxygen saturation",
          type: "oxygenSaturation",
          ...this.oxygenSaturation
        },
        {
          label: "Pulse",
          type: "pulse",
          ...this.pulse
        },
        {
          label: "Temperature",
          type: "temperature",
          ...this.temperature
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