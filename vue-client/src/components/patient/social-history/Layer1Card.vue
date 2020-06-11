<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 
           There is no add in social history since SHX is made up 5 sub components and 10 data points. 
        -->
        <CardHeader
          ctName="Social history"
          actions="M,F"
          :typeOfStateDisplayArea="typeOfStateDisplayArea"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
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
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  methods: {
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeSocialHistoryTabInLayer2");
    },
    handleClickOnFInCardHeader() {},
  }
};
</script>