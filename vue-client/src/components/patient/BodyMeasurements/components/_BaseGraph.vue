<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickAddButton">C</el-button>
    </div>
    <ve-line :data="chartData" :legend-visible="true" ref="chart"></ve-line>
  </div>
</template>

<script>
export default {
  props: ["chartData", "type", "label", "tab"],
  methods: {
    handleClickAddButton() {
      this.$store.commit("bodyMeasurement/setSelectedDate", new Date());
      this.$store.commit("showAddBMElementTabInLayer2", {
        label: this.label,
        type: this.type
      });
    }
  },
  watch: {
    tab() {
      this.$nextTick(() => {
        this.$refs["chart"].echarts.resize();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>