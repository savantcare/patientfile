<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Diagnosis"
        actions="A,M,F,D"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        :columns="columns"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @multiDiscontinue="multiDiscontinue"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTableWithoutTab
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      ctName="diagnosis"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleClickOnDInDataRow="handleClickOnDInDataRow"
      @handleUpdateColumns="handleUpdateColumns"
    />
  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import DataTableWithoutTab from "@/components/common/DataTableWithoutTab";
export default {
  components: {
    CardHeader,
    DataTableWithoutTab
  },
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  data() {
    return {
      selectedRows: [],
      columns: [],
      selectedColumns: ["diagnosisName"]        // The user can select there own columns. The user selected columns are saved in the local storage. 
    };
  },
  methods: {
    handleClickOnAInCardHeader() {
      // For logic: Line 57 of RecommendationCard.vue
      this.$store.commit("showAddDiagnosisTabInLayer2");
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeAssessmentTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueDiagnosis", {
        selectedIds: selectedIds,
        notify: this.$notify,
        selectedDatas: this.selectedRows
      });
    },
    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },
    handleChange(data) {
      console.log("show change dialog");
      this.$store.commit("showChangeDiagnosisTabInLayer2", data);
    },
    handleClickOnDInDataRow(data) {
      this.$store.dispatch("discontinueDiagnosis", {
        data: data,
        notify: this.$notify
      });
    },
    handleUpdateColumns(value) {
      this.columns = value;
    },
    updateSelectedColumns(value) {
      this.selectedColumns = value;
    }
  },
  mounted() { // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify
    };
    this.$store.dispatch("getDiagnoses", params);
  },
  computed: {
    tabData() {
      const dxList = this.$store.state.diagnosis.diagnosisList;
      console.log(dxList);
      return {
          label: "Yours",
          tableData: dxList,
          rowActions: ["C", "D"],
          selectedColumn: ["diagnosisName"]
        }
      ;
    }
  }
};
</script>

<style lang="css">
</style>