<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Substance abuse"
          actions="A,M,F,D"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
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
  data() {
    return {
      selectedRows: []
    };
  },
  methods: {
    handleClickOnAInCardHeader() {},
    handleClickOnMInCardHeader() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>