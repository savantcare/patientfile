<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Social history"
          actions="A,M,F,D"
          type="card"
          @showAddDialog="showAddDialog"
          @showMultiChangeDialog="showMultiChangeDialog"
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
    showMultiChangeDialog() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>