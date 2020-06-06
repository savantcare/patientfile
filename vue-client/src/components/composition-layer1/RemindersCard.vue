<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--   actions="A,M,F,D" if timeOfState from home.vue is NULL.
      If timeOfState is not NULL then action = "Addn" (Addendum)
      -->
      <CardHeader
        title="Reminder"
        actions="A,M,F,D,R"
        keyId="reminder"
        :stateDisplayArea="stateDisplayArea"
        :columns="columns"
        @showAddDialog="showAddDialog"
        @showMultiChangeDialog="showMultiChangeDialog"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTable
      title="Reminder"
      keyId="reminder"
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
      default: "StateAtCurrentTime" // 2 possible values. CurrentStateDisplayArea or MultiStateDisplayArea For details: Top of CardHeader.vue
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
      /* 
      Ref: https://vuex.vuejs.org/guide/mutations.html
      The only way to actually change state in a Vuex store is by committing a mutation. 
      Vuex mutations are very similar to events: each mutation has a string type and a handler. 
      The handler function is 
        1. Where we perform actual state modifications, 
        2. Where we will remeive the state as the first argument.

      The following line invokes the code in: https://github.com/savantcare/patientfile/blob/master/vue-client/src/store/modules/secondLayerTabDialogState.js#L80  

      QUESTION: How is tabDialog getting this event.

      Due to using a single state tree, all state of our application is contained inside one big object. However, as our application grows in scale, the store can get really bloated.
      To help with that, Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules
      Ref: https://vuex.vuejs.org/guide/modules.html

      showAddReminderModal is a mutation inside module -> secondLayerTabDialogState.js but it can be called from here.

      */
      this.$store.commit("showAddReminderModal");
    },
    showMultiChangeDialog() {
      this.$store.commit("showMultiChangeReminderModal");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueReminders", {
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
      this.$store.commit("showChangeReminderModal", data);
    },
    handleDiscontinue(data) {
      this.$store.dispatch("discontinueReminder", {
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
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify
    };
    this.$store.dispatch("getReminders", params);
  },
  computed: {
    tabData() {
      const remList = this.$store.state.reminder.remindersList;
      return [
        {
          label: "Yours",
          tableData: remList,
          rowActions: ["C", "D"]
        },
        {
          label: "Other's",
          tableData: remList,
          rowActions: ["C", "D"],
          selectedColumn: ["description"]
        }
      ];
    }
  }
};
</script>

<style lang="css">
</style>