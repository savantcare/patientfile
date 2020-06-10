<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--   actions="A,M,F,D" if timeOfState from home.vue is NULL.
      If timeOfState is not NULL then action = "Addn" (Addendum)
      -->
      <CardHeader
        ctName="Reminder"
        actions="A,M,F,D,R"
        keyId="reminder"
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
      ctName="Reminder"
      keyId="reminder"
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
      default: "CurrentStateDisplayArea" // 2 possible values. CurrentStateDisplayArea or MultiStateDisplayArea For details: Top of CardHeader.vue
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
      this.$store.commit("showAddReminderTabInLayer2");
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeReminderTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      console.log("focus panel");
    },
    handleClickOnDInCardHeader() {
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
    handleClickOnCInDataRow(data) {
      console.log("show change dialog");
      this.$store.commit("showChangeReminderTabInLayer2", data);
    },
    handleClickOnDInDataRow(data) {
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