<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Referral"
          actions="A,M,F,D"
          :stateDisplayArea="stateDisplayArea"
          @showAddDialog="showAddDialog"
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
    showAddDialog() {},
    showMultiChangeTabInSecondLayer() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>