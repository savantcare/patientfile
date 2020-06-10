<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Service statements"
          actions="A,M,F,D"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @handleClickOnAInCardHeader="showAddServiceStatementsDialog"
          @handleClickOnMInCardHeader="showMultiChangeServiceStatementsDialog"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
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
    handleClickOnAInCardHeader() {},
    handleClickOnMInCardHeader() {},
    handleClickOnFInCardHeader() {},
    handleClickOnDInCardHeader() {}
  }
};
</script>

<style lang="scss" scoped>
</style>




