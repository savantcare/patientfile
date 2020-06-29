<template>
  <div>
    <ve-line :data="chartData" ref="chart"></ve-line>
  </div>
</template>

<script>
import Weight from "../models/weight";
import BloodPressure from "../models/bloodPressure";
import BloodSugar from "../models/bloodSugar";
import Bmi from "../models/bmi";
import Height from "../models/height";
import OxygenSaturation from "../models/oxygenSaturation";
import Pulse from "../models/pulse";
import Temperature from "../models/temperature";
import WaistCircumference from "../models/waistCircumference";

export default {
  data() {
    return {};
  },
  computed: {
    chartData() {
      const columns = [
        "date",
        "weight",
        "bmi",
        "waistCircumference",
        "bloogSugar",
        "height",
        "systolicValue",
        "diastolicValue",
        "oxygenSaturation",
        "pulse",
        "temperature"
      ];
      let rows = [];

      let weights = Weight.query()
        .orderBy("timeOfEvaluation")
        .get();

      for (const weight of weights) {
        rows.push({
          date: this.formatDate(weight.timeOfEvaluation),
          weight: weight.weightInPounds
        });
      }

      let bmis = Bmi.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const bmi of bmis) {
        rows.push({
          date: this.formatDate(bmi.timeOfEvaluation),
          bmi: bmi.bmiValue
        });
      }

      let waistCircumferences = WaistCircumference.query()
        .orderBy("timeOfEvalutaion")
        .get();

      for (const waistCircumference of waistCircumferences) {
        rows.push({
          date: this.formatDate(waistCircumference.timeOfEvaluation),
          waistCircumference: waistCircumference.waistCircumferenceInInches
        });
      }

      let bloodSugars = BloodSugar.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const bloodSugar of bloodSugars) {
        rows.push({
          date: this.formatDate(bloodSugar.timeOfEvaluation),
          bloodSugar: bloodSugar.bloodSugar
        });
      }

      let heights = Height.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const height of heights) {
        rows.push({
          date: this.formatDate(height.timeOfEvaluation),
          height: height.heightInInch
        });
      }

      let bloodPressures = BloodPressure.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const bloodPressure of bloodPressures) {
        rows.push({
          date: this.formatDate(bloodPressure.timeOfEvaluation),
          systolicValue: bloodPressure.systolicValue,
          diastolicValue: bloodPressure.diastolicValue
        });
      }

      let oxygenSaturations = OxygenSaturation.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const oxygenSaturation of oxygenSaturations) {
        rows.push({
          date: this.formatDate(oxygenSaturation.timeOfEvaluation),
          oxygenSaturation: oxygenSaturation.oxygenSaturation
        });
      }

      let pulse = Pulse.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const p of pulse) {
        rows.push({
          date: this.formatDate(p.timeOfEvaluation),
          pulse: p.beatsPerMinuteValue
        });
      }

      let temperature = Temperature.query()
        .orderBy("timeOfEvalutaion")
        .get();
      for (const t of temperature) {
        rows.push({
          date: this.formatDate(t.timeOfEvaluation),
          temperature: t.temperatureInFarehnite
        });
      }

      return {
        columns: columns,
        rows: rows
      };
    }
  },
  methods: {
    sortByDate(array) {
      return array.sort((data1, data2) => {
        return (
          new Date(data1.timeOfEvaluation) - new Date(data2.timeOfEvaluation)
        );
      });
    },
    formatDate(date) {
      const d = new Date(date);
      return d.getMonth() + 1 + "-" + d.getDate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>