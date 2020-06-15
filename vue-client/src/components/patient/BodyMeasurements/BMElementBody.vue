<template>
  <div>
    <el-button
      type="text"
      size="mini"
      class="bm-element-body-add-button"
      @click="handleClickAddButton"
    >Add</el-button>
    <ve-line :data="chartData" :legend-visible="false"></ve-line>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      chartData: {
        columns: ["date", "value"],
        rows: []
      }
    };
  },
  mounted() {
    this.chartData.rows = [
      { date: "01-01", value: 1231 },
      { date: "01-02", value: 1223 },
      { date: "01-03", value: 2123 }
    ];
  },
  methods: {
    handleClickAddButton() {
      console.log("handleClickAddButton");
      this.$store.commit("showAddBMElementTabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
.bm-element-body-add-button {
  position: fixed;
  right: 30px;
  z-index: 100;
}
</style>