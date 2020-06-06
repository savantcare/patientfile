<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Service statements"
          actions="A,M,F,D"
          :stateDisplayArea="stateDisplayArea"
          @showAddDialog="showAddServiceStatementsDialog"
          @showMultiChangeDialog="showMultiChangeServiceStatementsDialog"
          @focusPanel="focusPanel"
          @multiDiscontinue="multiDiscontinue"
          ref="card_header"
        />
      </div>
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
    showAddServiceStatementsDialog() {
      console.log("open add dialog");
      this.$store.commit("showAddServiceStatementsModal");
    },
    showMultiChangeServiceStatementsDialog() {
      console.log("open multi change dialog");
      this.$store.commit("showMultiChangeServiceStatementsModal");
    },
    showAddDialog() {},
    showMultiChangeDialog() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>

<style lang="scss" scoped>
</style>




