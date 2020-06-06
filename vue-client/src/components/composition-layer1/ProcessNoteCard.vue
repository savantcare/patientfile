<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Process Note"
          actions="A,M,F,D"
          :stateDisplayArea="stateDisplayArea"
          @showTabToAddInSecondLayer="showTabToAddInSecondLayer"
          @showMultiChangeTabInSecondLayer="showMultiChangeTabInSecondLayer"
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
    showTabToAddInSecondLayer() {},
    showMultiChangeTabInSecondLayer() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>