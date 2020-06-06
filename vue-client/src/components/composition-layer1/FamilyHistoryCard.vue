<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Family history"
          actions="A,N"
          :stateDisplayArea="stateDisplayArea"
          @showAddDialog="showAddDialog"
          @showMultiChangeTabInSecondLayer="showMultiChangeTabInSecondLayer"
          @focusPanel="focusPanel"
          @multiDiscontinue="multiDiscontinue"
          ref="card_header"
        />
        <!-- <h5>Om Namah Sibay!!</h5> actions="A,M,F,D" -->

      </div>
      <!-- <DataTable
        title="Family history"

        :tabData="tabData"
        :type="card"
        
      /> -->
      <DataTable
        title="Family history"
        keyId="familyHistory"
        :tabData="tabData"
        :selectedColumns="selectedColumns"
        :stateDisplayArea="stateDisplayArea"
        @handleSelectionChange="handleSelectionChange"
        @handleChange="handleChange"
        @handleDiscontinue="handleDiscontinue"
        @handleUpdateColumns="handleUpdateColumns"
      />
    </el-card>
  </div>
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
    showAddDialog() {
      console.log("show add dialog");
      this.$store.commit("showAddFamilyHistoryModal");
    },
    showMultiChangeTabInSecondLayer() {
      this.$store.commit("showMultiChangeFamilyHistoryModal");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueFamilyHistories", {
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
      this.$store.commit("showChangeFamilyHistoriesModal", data);
    },
    handleDiscontinue(data) {
      this.$store.dispatch("discontinueFamilyHistory", {
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
    this.$store.dispatch("getFamilyHistories", params);
  },
  computed: {
    tabData() {
      const familyHistoryList = this.$store.state.familyHistory.familyHistoryList;
      return [
        {
          label: "Yours",
          tableData: familyHistoryList,
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