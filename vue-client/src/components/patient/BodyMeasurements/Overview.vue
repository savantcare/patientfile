<template>
  <div>
    <el-row>
      <el-col :span="16">
        <TheMultiStateDisplayAreaHeader />
        <multi-state-card></multi-state-card>
      </el-col>
      <el-col :span="8">
        <current-state-card></current-state-card>
      </el-col>
    </el-row>
    <Layer2MultiTabDialog />
  </div>
</template>

<script>
const TheMultiStateDisplayAreaHeader = () =>
  import("@/components/common/multiStateDisplayArea/theHeader.vue");
const Layer2MultiTabDialog = () =>
  import("@/components/common/Layer2MultiTabDialog/");
import MultiStateCard from "./MultiStateCard";
import CurrentStateCard from "./CurrentStateCard";
export default {
  components: {
    MultiStateCard,
    CurrentStateCard,
    TheMultiStateDisplayAreaHeader,
    Layer2MultiTabDialog
  }
};
</script>

<style lang="scss" scoped>
</style>