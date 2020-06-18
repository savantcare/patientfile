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
    },
    formatBodyMeasurementValue(bm) {
      if (bm[0]) {
        return bm[0];
      }

      if (bm.type == "bloodPressure") {
        return bm.systolicValue + "/" + bm.diastolicValue + bm.unit;
      }
      return bm.value + bm.unit;
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
        return {
          value: weights[weights.length - 1].weightInPounds,
          unit: " lb",
          notes: weights[weights.length - 1].Notes,
          date: weights[weights.length - 1].measurementDate
        };
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
        return {
          value: bmis[bmis.length - 1].bmiValue,
          unit: "",
          notes: bmis[bmis.length - 1].Notes,
          date: bmis[bmis.length - 1].measurementDate
        };
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
        return {
          value:
            waistCircumferences[waistCircumferences.length - 1]
              .waistCircumferenceInInches,
          unit: " in",
          notes: waistCircumferences[waistCircumferences.length - 1].Notes,
          date:
            waistCircumferences[waistCircumferences.length - 1].measurementDate
        };
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
        return {
          value: bloodSugars[bloodSugars.length - 1].bloodSugar,
          unit: " mg/dL",
          notes: bloodSugars[bloodSugars.length - 1].Notes,
          date: bloodSugars[bloodSugars.length - 1].measurementDate
        };
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
        return {
          value: heights[heights.length - 1].heightInInch,
          unit: " inches",
          notes: heights[heights.length - 1].Notes,
          date: heights[heights.length - 1].measurementDate
        };
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
        return {
          systolicValue:
            bloodPressures[bloodPressures.length - 1].systolicValue,
          diastolicValue:
            bloodPressures[bloodPressures.length - 1].diastolicValue,
          notes: bloodPressures[bloodPressures.length - 1].Notes,
          date: bloodPressures[bloodPressures.length - 1].measurementDate,
          unit: " mmHg"
        };
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
        return {
          value:
            oxygenSaturations[oxygenSaturations.length - 1].oxygenSaturation,
          unit: " mmHg",
          notes: oxygenSaturations[oxygenSaturations.length - 1].Notes,
          date: oxygenSaturations[oxygenSaturations.length - 1].measurementDate
        };
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
        return {
          value: pulse[pulse.length - 1].beatsPerMinuteValue,
          unit: " bpm",
          notes: pulse[pulse.length - 1].Notes,
          date: pulse[pulse.length - 1].measurementDate
        };
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
        return {
          value: temperature[temperature.length - 1].temperatureInFarehnite,
          unit: " F",
          notes: temperature[temperature.length - 1].Notes,
          date: temperature[temperature.length - 1].measurementDate
        };
      }

      return "-";
    },
    tableData() {
      return [
        {
          label: "Weight",
          type: "weight",
          ...this.currentWeight
        },
        {
          label: "BMI",
          type: "bmi",
          ...this.currentBMI
        },
        {
          label: "Waist circumference",
          type: "waistCircumference",
          ...this.currentWaistCircumference
        },
        {
          label: "Blood sugar",
          type: "bloodSugar",
          ...this.currentBloodSugar
        },
        {
          label: "Height",
          type: "height",
          ...this.currentHeight
        },
        {
          label: "Blood pressure",
          type: "bloodPressure",
          ...this.currentBloodPressure
        },
        {
          label: "Oxygen saturation",
          type: "oxygenSaturation",
          ...this.currentOxygenSaturation
        },
        {
          label: "Pulse",
          type: "pulse",
          ...this.currentPulse
        },
        {
          label: "Temperature",
          type: "temperature",
          ...this.currentTemperature
        }
      ];
    },
    timeOfState() {
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