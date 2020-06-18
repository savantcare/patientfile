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
    },
    getWeightInfomation() {
      this.$store.dispatch("bodyMeasurement/getWeight");
    },
    getBMIInformation() {
      this.$store.dispatch("bodyMeasurement/getBmi");
    },
    getWaistCircumference() {
      this.$store.dispatch("bodyMeasurement/getWaistCircumferences");
    },
    getBloodSugar() {
      this.$store.dispatch("bodyMeasurement/getBloodSugar");
    },
    getHeight() {
      this.$store.dispatch("bodyMeasurement/getHeight");
    },
    getBloodPressure() {
      this.$store.dispatch("bodyMeasurement/getBloodPressure");
    },
    getOxygenSaturation() {
      this.$store.dispatch("bodyMeasurement/getOxygenSaturation");
    },
    getPulse() {
      this.$store.dispatch("bodyMeasurement/getPulse");
    },
    getTemperature() {
      this.$store.dispatch("bodyMeasurement/getTemperature");
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  computed: {
    currentWeight() {
      const weights = this.$store.state.bodyMeasurement.weights.filter(
        weight => {
          const measurementDate = weight.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (weights.length > 0) {
        return weights[0].weightInPounds + " lb";
      }

      return "-";
    },
    currentBMI() {
      const bmis = this.$store.state.bodyMeasurement.bmis.filter(bmi => {
        const measurementDate = bmi.measurementDate;
        const timeOfState = new Date(this.timeOfState)
          .toISOString()
          .split("T")[0];

        return measurementDate == timeOfState;
      });

      if (bmis.length > 0) {
        return bmis[0].bmiValue;
      }

      return "-";
    },
    currentWaistCircumference() {
      const waistCircumferences = this.$store.state.bodyMeasurement.waistCircumferences.filter(
        waistCircumference => {
          const measurementDate = waistCircumference.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (waistCircumferences.length > 0) {
        return waistCircumferences[0].waistCircumferenceInInches + " in";
      }

      return "-";
    },
    currentBloodSugar() {
      const bloodSugars = this.$store.state.bodyMeasurement.bloodSugars.filter(
        bloodSugar => {
          const measurementDate = bloodSugar.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (bloodSugars.length > 0) {
        return bloodSugars[0].bloodSugar + " mg/dL";
      }

      return "-";
    },
    currentHeight() {
      const heights = this.$store.state.bodyMeasurement.heights.filter(
        height => {
          const measurementDate = height.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (heights.length > 0) {
        return heights[0].heightInInch + " inches";
      }

      return "-";
    },
    currentBloodPressure() {
      const bloodPressures = this.$store.state.bodyMeasurement.bloodPressures.filter(
        bloodPressure => {
          const measurementDate = bloodPressure.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (bloodPressures.length > 0) {
        return (
          bloodPressures[0].systolicValue +
          "/" +
          bloodPressures[0].diastolicValue +
          " mmHg"
        );
      }

      return "-";
    },
    currentOxygenSaturation() {
      const oxygenSaturations = this.$store.state.bodyMeasurement.oxygenSaturations.filter(
        oxygenSaturation => {
          const measurementDate = oxygenSaturation.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (oxygenSaturations.length > 0) {
        return oxygenSaturations[0].oxygenSaturation + " mmHg";
      }

      return "-";
    },
    currentPulse() {
      const pulse = this.$store.state.bodyMeasurement.pulse.filter(p => {
        const measurementDate = p.measurementDate;
        const timeOfState = new Date(this.timeOfState)
          .toISOString()
          .split("T")[0];

        return measurementDate == timeOfState;
      });

      if (pulse.length > 0) {
        return pulse[0].beatsPerMinuteValue + " bpm";
      }

      return "-";
    },
    currentTemperature() {
      const temperature = this.$store.state.bodyMeasurement.temperature.filter(
        t => {
          const measurementDate = t.measurementDate;
          const timeOfState = new Date(this.timeOfState)
            .toISOString()
            .split("T")[0];

          return measurementDate == timeOfState;
        }
      );

      if (temperature.length > 0) {
        return temperature[0].temperatureInFarehnite + " F";
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
    },
    timeOfState() {
      console.log("....timeOfState");
      return this.$store.state.stateAtSelectedTime.timeOfState;
    }
  },
  mounted() {
    if (this.currentWeight == "-") {
      this.getWeightInfomation();
    }
    if (this.currentBMI == "-") {
      this.getBMIInformation();
    }
    if (this.currentWaistCircumference == "-") {
      this.getWaistCircumference();
    }
    if (this.currentBloodSugar == "-") {
      this.getBloodSugar();
    }
    if (this.currentHeight == "-") {
      this.getHeight();
    }
    if (this.currentBloodPressure == "-") {
      this.getBloodPressure();
    }
    if (this.currentOxygenSaturation == "-") {
      this.getOxygenSaturation();
    }
    if (this.currentPulse == "-") {
      this.getPulse();
    }
    if (this.currentTemperature == "-") {
      this.getTemperature();
    }
  },
  watch: {
    // timeOfState() {
    //   const timeOfState = this.timeOfState.split(" ")[0];
    //   console.log(timeOfState);
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>