<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Goal"
        actions="A,M,F,D"
        keyId="goal"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        :columns="columns"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTable
      ctName="Goal"
      keyId="goal"
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleClickOnCInDataRow="handleClickOnCInDataRow"
      @handleClickOnDInDataRow="handleClickOnDInDataRow"
      @handleUpdateColumns="handleUpdateColumns"
    />

  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import DataTable from "@/components/common/DataTable";
export default {
  components: {
    CardHeader,
    DataTable
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
      selectedColumns: ["description"] // The user can select there own columns. The user selected columns are saved in the local storage. 
    };
  },
  methods: {
    handleClickOnAInCardHeader() {
      // For logic: Line 57 of Recommendations/Layer1Card.vue
      console.log("show add dialog");
      this.$store.commit("showAddGoalTabInLayer2");
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeGoalTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      console.log("focus panel");
    },
    handleClickOnDInCardHeader() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueGoals", {
        selectedIds: selectedIds,
        notify: this.$notify,
        selectedDatas: this.selectedRows
      });
    },
    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },
    handleClickOnCInDataRow(data) {
      console.log("show change dialog");
      this.$store.commit("showChangeGoalsTabInLayer2", data);
    },
    handleClickOnDInDataRow(data) {
      this.$store.dispatch("discontinueGoal", {
        data: data,
        toast: this.$notify
      });
    },
    handleUpdateColumns(value) {
      this.columns = value;
    },
    updateSelectedColumns(value) {
      this.selectedColumns = value;
    }
  },
  mounted() {
    const params = {
      patientUUID: this.$route.query.patient_id,
      notify: this.$notify
    };
    this.$store.dispatch("getGoals", params);
  },
  computed: {
    tabData() {
      const goalList = this.$store.state.goal.goalList;
      return [
        {
          label: "Yours",
          tableData: goalList,
          rowActions: ["C", "D"],
          selectedColumn: ["description"]
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>