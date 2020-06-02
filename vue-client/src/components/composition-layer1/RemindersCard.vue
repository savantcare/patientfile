<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          title="Reminder"
          actions="A,M,F,D"
          type="CurrentState"
          @showAddDialog="showAddDialog"
          @showMultiChangeDialog="showMultiChangeDialog"
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
// import DataTable from "@/components/common/DataTable";
export default {
  components: {
    CardHeader
    // DataTable
  },
  data() {
    return {
      selectedRows: []
    };
  },
  methods: {
    showAddDialog() {
      console.log("show add dialog");
      this.$store.commit("showAddReminderModal");
    },
    showMultiChangeDialog() {
      this.$store.commit("showMultiChangeRemindersModal");
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
    }
  },
  mounted() {
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify
    };
    this.$store.dispatch("getReminders", params);
  },
  computed: {
    tabData() {
      const remList = this.$store.state.reminder.list;
      return [
        {
          label: "Yours",
          tableData: remList,
          columns: [
            {
              label: "Description",
              field: "description",
              sortable: true
            },
            {
              label: "Created At",
              field: "createdAt",
              sortable: true
            }
          ],
          rowActions: ["C", "D"]
        },
        {
          label: "Other's",
          tableData: remList,
          columns: [
            {
              label: "Description",
              field: "description",
              sortable: true
            },
            {
              label: "Created At",
              field: "createdAt",
              sortable: true
            }
          ],
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