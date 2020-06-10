<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Past psych history"
          actions="A,M,F,D"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @informShowTabToAddInLayer2="informShowTabToAddInLayer2"
          @informShowMultiChangeTabInLayer2="informShowMultiChangeTabInLayer2"
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
    informShowTabToAddInLayer2() {},
    informShowMultiChangeTabInLayer2() {},
    focusPanel() {},
    multiDiscontinue() {}
  }
};
</script>