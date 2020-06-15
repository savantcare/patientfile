<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Body measurement"
          actions="A,G"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
          ref="card_header"
        />
      </div>

      <el-tabs tab-position="left">
        <el-tab-pane label="Weight">
          <BMElementBody />
        </el-tab-pane>
        <el-tab-pane label="BMI">BMI</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import BMElementBody from "./BMElementBody";
export default {
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  components: {
    CardHeader,
    BMElementBody
  },
  data() {
    return {
      selectedRows: []
    };
  },
  methods: {
    handleClickOnGInCardHeader() {
      console.log("handleClickOnGInCardHeader");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>