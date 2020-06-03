<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Diagnosis"
        actions="A,M,F,D"
        :type="type"
        :columns="columns"
        @showAddDialog="showAddDialog"
        @showMultiChangeDialog="showMultiChangeDialog"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTableWithoutTab
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      title="diagnosis"
      :type="type"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleDiscontinue="handleDiscontinue"
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
    type: {
      type: String,
      default: "StateAtCurrentTime" // There are two possible types. StateAtCurrentTime and stateAtSelectedTime
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
    showAddDialog() {
      /* 
      Ref: https://vuex.vuejs.org/guide/mutations.html
      The only way to actually change state in a Vuex store is by committing a mutation. 
      Vuex mutations are very similar to events: each mutation has a string type and a handler. 
      The handler function is 
        1. Where we perform actual state modifications, 
        2. Where we will receive the state as the first argument.

      The following line invokes the code in: https://github.com/savantcare/patientfile/blob/master/vue-client/src/store/modules/secondLayerTabDialogState.js#L80  

      QUESTION: How is tabDialog getting this event.

      Due to using a single state tree, all state of our application is contained inside one big object. However, as our application grows in scale, the store can get really bloated.
      To help with that, Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules
      Ref: https://vuex.vuejs.org/guide/modules.html

      showAddRecommendationModal is a mutation inside module -> secondLayerTabDialogState.js but it can be called from here.

      */
      this.$store.commit("showAddDiagnosisModal");
    },
    showMultiChangeDialog() {
      this.$store.commit("showMultiChangeAssessmentModal");
    },
    focusPanel() {
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
      this.$store.commit("showChangeDiagnosisModal", data);
    },
    handleDiscontinue(data) {
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