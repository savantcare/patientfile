<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Goal"
        actions="A,M,F,D"
        keyId="goal"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        :columns="columns"
        @informShowTabToAddInLayer2="informShowTabToAddInLayer2"
        @informShowMultiChangeTabInLayer2="informShowMultiChangeTabInLayer2"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
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
    informShowTabToAddInLayer2() {
      // For logic: Line 57 of RecommendationCard.vue
      console.log("show add dialog");
      this.$store.commit("showAddGoalTabInLayer2");
    },
    informShowMultiChangeTabInLayer2() {
      this.$store.commit("showMultiChangeGoalTabInLayer2");
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
      this.$store.commit("showChangeGoalsTabInLayer2", data);
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