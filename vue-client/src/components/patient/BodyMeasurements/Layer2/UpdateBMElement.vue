<template>
  <component :is="currentComponent" />
</template>

<script>
export default {
  data() {
    return {
      components: {
        weight: require("./components/Weight").default,
        bmi: require("./components/BMI").default,
        waistCircumference: require("./components/WaistCircumference").default,
        bloodSugar: require("./components/BloodSugar").default,
        height: require("./components/Height").default,
        bloodPressure: require("./components/BloodPressure").default,
        oxygenSaturation: require("./components/OxygenSaturation").default,
        pulse: require("./components/Pulse").default,
        temperature: require("./components/Temperature").default
      }
    };
  },
  methods: {},
  computed: {
    currentComponent() {
      const type = this.$store.state.multiTabDialogLayer2.bmElementType;
      return this.components[type];
    }
  },
  mounted() {},
  watch: {
    dialogVisibility() {}
  },
  components: {}
};
</script>

<style lang="scss">
.changed .el-input__inner,
.changed .el-textarea__inner {
  border-color: #e6a23c;
}
</style>
