<template>
  <div>
    <ve-line :data="chartData" ref="chart"></ve-line>
  </div>
</template>

<script>
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

      let weights = this.sortByDate([
        ...this.$store.state.bodyMeasurement.weights
      ]);
      for (const weight of weights) {
        rows.push({
          date: this.formatDate(weight.measurementDate),
          weight: weight.weightInPounds
        });
      }

      let bmis = this.sortByDate([...this.$store.state.bodyMeasurement.bmis]);
      for (const bmi of bmis) {
        rows.push({
          date: this.formatDate(bmi.measurementDate),
          bmi: bmi.bmiValue
        });
      }

      let waistCircumferences = this.sortByDate([
        ...this.$store.state.bodyMeasurement.waistCircumferences
      ]);

      for (const waistCircumference of waistCircumferences) {
        rows.push({
          date: this.formatDate(waistCircumference.measurementDate),
          waistCircumference: waistCircumference.waistCircumferenceInInches
        });
      }

      let bloodSugars = this.sortByDate([
        ...this.$store.state.bodyMeasurement.bloodSugars
      ]);
      for (const bloodSugar of bloodSugars) {
        rows.push({
          date: this.formatDate(bloodSugar.measurementDate),
          bloodSugar: bloodSugar.bloodSugar
        });
      }

      let heights = this.sortByDate([
        ...this.$store.state.bodyMeasurement.heights
      ]);
      for (const height of heights) {
        rows.push({
          date: this.formatDate(height.measurementDate),
          height: height.heightInInch
        });
      }

      let bloodPressures = this.sortByDate([
        ...this.$store.state.bodyMeasurement.bloodPressures
      ]);
      for (const bloodPressure of bloodPressures) {
        rows.push({
          date: this.formatDate(bloodPressure.measurementDate),
          systolicValue: bloodPressure.systolicValue,
          diastolicValue: bloodPressure.diastolicValue
        });
      }

      let oxygenSaturations = this.sortByDate([
        ...this.$store.state.bodyMeasurement.oxygenSaturations
      ]);
      for (const oxygenSaturation of oxygenSaturations) {
        rows.push({
          date: this.formatDate(oxygenSaturation.measurementDate),
          oxygenSaturation: oxygenSaturation.oxygenSaturation
        });
      }

      let pulse = this.sortByDate([...this.$store.state.bodyMeasurement.pulse]);
      for (const p of pulse) {
        rows.push({
          date: this.formatDate(p.measurementDate),
          pulse: p.beatsPerMinuteValue
        });
      }

      let temperature = this.sortByDate([
        ...this.$store.state.bodyMeasurement.temperature
      ]);
      for (const t of temperature) {
        rows.push({
          date: this.formatDate(t.measurementDate),
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
          new Date(data1.measurementDate) - new Date(data2.measurementDate)
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