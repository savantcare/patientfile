<template>
  <div id="body-measurement-multi-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Body measurement"
          actions="G"
          typeOfStateDisplayArea="MultiStateDisplayArea"
          @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
          ref="card_header"
        />
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="Current Value">
          <template slot-scope="scope">{{scope.row.currentValue}}</template>
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
export default {
  components: {
    CardHeader
  },
  methods: {
    handleClickOnGInCardHeader() {
      this.$store.commit("showGraphAllBMTabInLayer2");
    },
    openChangeDialog(item) {
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
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  computed: {
    currentWeight() {
      let weights = this.$store.state.bodyMeasurement.weights;
      if (weights.length > 0) {
        weights = weights.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentWeight = weights[weights.length - 1];
        return currentWeight.weightInPounds + " lb";
      }
      return "-";
    },
    currentBMI() {
      let bmis = this.$store.state.bodyMeasurement.bmis;
      if (bmis.length > 0) {
        bmis = bmis.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });

        const currentBmi = bmis[bmis.length - 1];
        return currentBmi.bmiValue;
      }
      return "-";
    },
    currentWaistCircumference() {
      let waistCircumferences = this.$store.state.bodyMeasurement
        .waistCircumferences;
      if (waistCircumferences.length > 0) {
        waistCircumferences = waistCircumferences.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });

        const currentWaistCircumference =
          waistCircumferences[waistCircumferences.length - 1];
        return currentWaistCircumference.waistCircumferenceInInches + " in";
      }
      return "-";
    },
    currentBloodSugar() {
      let bloodSugars = this.$store.state.bodyMeasurement.bloodSugars;
      if (bloodSugars.length > 0) {
        bloodSugars = bloodSugars.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentBloodSugar = bloodSugars[bloodSugars.length - 1];
        return currentBloodSugar.bloodSugar + " mg/dL";
      }

      return "-";
    },
    currentHeight() {
      let heights = this.$store.state.bodyMeasurement.heights;
      if (heights.length > 0) {
        heights = heights.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentHeight = heights[heights.length - 1];
        return currentHeight.heightInInch + " inches";
      }

      return "-";
    },
    currentBloodPressure() {
      let bloodPressures = this.$store.state.bodyMeasurement.bloodPressures;
      if (bloodPressures.length > 0) {
        bloodPressures = bloodPressures.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentBloodPressure = bloodPressures[bloodPressures.length - 1];
        return (
          currentBloodPressure.systolicValue +
          "/" +
          currentBloodPressure.diastolicValue +
          " mmHg"
        );
      }
      return "-";
    },
    currentOxygenSaturation() {
      let oxygenSaturations = this.$store.state.bodyMeasurement
        .oxygenSaturations;
      if (oxygenSaturations.length > 0) {
        oxygenSaturations = oxygenSaturations.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentOxygenSaturation =
          oxygenSaturations[oxygenSaturations.length - 1];
        return currentOxygenSaturation.oxygenSaturation + " mmHg";
      }
      return "-";
    },
    currentPulse() {
      let pulse = this.$store.state.bodyMeasurement.pulse;
      if (pulse.length > 0) {
        pulse = pulse.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentPulse = pulse[pulse.length - 1];
        return currentPulse.beatsPerMinuteValue + " bpm";
      }
      return "-";
    },
    currentTemperature() {
      let temperatures = this.$store.state.bodyMeasurement.temperature;
      if (temperatures.length > 0) {
        temperatures = temperatures.sort((data1, data2) => {
          return (
            new Date(data1.measurementDate) - new Date(data2.measurementDate)
          );
        });
        const currentTemperature = temperatures[temperatures.length - 1];
        return currentTemperature.temperatureInFarehnite + " F";
      }
      return "-";
    },
    tableData() {
      return [
        {
          label: "Weight",
          currentValue: this.currentWeight,
          type: "weight"
        },
        {
          label: "BMI",
          currentValue: this.currentBMI,
          type: "bmi"
        },
        {
          label: "Waist circumference",
          currentValue: this.currentWaistCircumference,
          type: "waistCircumference"
        },
        {
          label: "Blood sugar",
          currentValue: this.currentBloodSugar,
          type: "bloodSugar"
        },
        {
          label: "Height",
          currentValue: this.currentHeight,
          type: "height"
        },
        {
          label: "Blood pressure",
          currentValue: this.currentBloodPressure,
          type: "bloodPressure"
        },
        {
          label: "Oxygen saturation",
          currentValue: this.currentOxygenSaturation,
          type: "oxygenSaturation"
        },
        {
          label: "Pulse",
          currentValue: this.currentPulse,
          type: "pulse"
        },
        {
          label: "Temperature",
          currentValue: this.currentTemperature,
          type: "temperature"
        }
      ];
    }
  },
  mounted() {
    if (this.currentWeight == "-") {
      this.getWeightInfomation();
    }
    if (this.type == "-") {
      this.getBMIInformation();
    }
    if (this.type == "-") {
      this.getWaistCircumference();
    }
    if (this.type == "-") {
      this.getBloodSugar();
    }
    if (this.type == "-") {
      this.getHeight();
    }
    if (this.type == "-") {
      this.getBloodPressure();
    }
    if (this.type == "-") {
      this.getOxygenSaturation();
    }
    if (this.type == "-") {
      this.getPulse();
    }
    if (this.type == "-") {
      this.getTemperature();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>