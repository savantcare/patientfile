<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" v-for="(component, index) in components" :key="`component-${index}`">
        <component :is="component" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      components: [
        require("./components/BloodPressure").default,
        require("./components/BloodSugar").default,
        require("./components/BMI").default,
        require("./components/Height").default,
        require("./components/OxygenSaturation").default,
        require("./components/Pulse").default,
        require("./components/Temperature").default,
        require("./components/WaistCircumference").default,
        require("./components/Weight").default
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>