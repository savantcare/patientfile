<template>
  <component :is="element.component" :type="element.type" :label="element.label" />
</template>

<script>
export default {
  data() {
    return {
      components: {
        bloodPressure: {
          type: "bloodPressure",
          label: "Blood Pressure",
          component: require("../components/BloodPressure").default
        },
        bloodSugar: {
          type: "bloodSugar",
          label: "Blood Sugar",
          component: require("../components/BloodSugar").default
        },
        bmi: {
          type: "bmi",
          label: "BMI",
          component: require("../components/BMI").default
        },
        height: {
          type: "height",
          label: "Height",
          component: require("../components/Height").default
        },
        oxygenSaturation: {
          type: "oxygenSaturation",
          label: "Oxygen Saturation",
          component: require("../components/OxygenSaturation").default
        },
        pulse: {
          type: "pulse",
          label: "Pulse",
          component: require("../components/Pulse").default
        },
        temperature: {
          type: "temperature",
          label: "Temperature",
          component: require("../components/Temperature").default
        },
        waistCircumference: {
          type: "waistCircumference",
          label: "Waist Circumference",
          component: require("../components/WaistCircumference").default
        },
        weight: {
          type: "weight",
          label: "Weight",
          component: require("../components/Weight").default
        }
      }
    };
  },
  computed: {
    element() {
      const type = this.$store.state.multiTabDialogLayer2.bmElementType;
      return this.components[type];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>