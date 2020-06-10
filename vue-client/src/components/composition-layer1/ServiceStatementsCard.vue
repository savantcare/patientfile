<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Service statements"
          actions="A,M,F,D"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @informShowTabToAddInLayer2="showAddServiceStatementsDialog"
          @informShowMultiChangeTabInLayer2="showMultiChangeServiceStatementsDialog"
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
      this.$store.commit("showAddServiceStatementsTabInLayer2");
    },
    showMultiChangeServiceStatementsDialog() {
      console.log("open multi change dialog");
      this.$store.commit("showMultiChangeServiceStatementsTabInLayer2");
    },
    informShowTabToAddInLayer2() {},
    informShowMultiChangeTabInLayer2() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>

<style lang="scss" scoped>
</style>




