<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Goal"
        actions="A,M,F,D"
        keyId="goal"
        :stateDisplayArea="stateDisplayArea"
        :columns="columns"
        @showTabToAddInSecondLayer="showTabToAddInSecondLayer"
        @showMultiChangeTabInSecondLayer="showMultiChangeTabInSecondLayer"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTable
      title="Goal"
      keyId="goal"
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      :stateDisplayArea="stateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleDiscontinue="handleDiscontinue"
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
    stateDisplayArea: {
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
    showTabToAddInSecondLayer() {
      // For logic: Line 57 of RecommendationCard.vue
      console.log("show add dialog");
      this.$store.commit("showAddGoalTabInSecondLayer");
    },
    showMultiChangeTabInSecondLayer() {
      this.$store.commit("showMultiChangeGoalTabInSecondLayer");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
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
    handleChange(data) {
      console.log("show change dialog");
      this.$store.commit("showChangeGoalsTabInSecondLayer", data);
    },
    handleDiscontinue(data) {
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