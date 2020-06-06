<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Allergies"
          actions="A,M,F,D"
          :stateDisplayArea="stateDisplayArea"
          @showTabToAddInLayer2="showTabToAddInLayer2"
          @showMultiChangeTabInLayer2="showMultiChangeTabInLayer2"
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
    showTabToAddInLayer2() {},
    showMultiChangeTabInLayer2() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>