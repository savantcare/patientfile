<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Goals"
        actions="A,M,F,D"
        type="card"
        @showAddDialog="showAddDialog"
        @showMultiChangeDialog="showMultiChangeDialog"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        ref="card_header"
      />
    </div>
    <DataTable
      :tabData="tabData"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleDiscontinue="handleDiscontinue"
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
  data() {
    return {
      selectedRows: []
    };
  },
  methods: {
    showAddDialog() {
      console.log("show add dialog");
      this.$store.commit("showAddGoalModal");
    },
    showMultiChangeDialog() {
      this.$store.commit("showMultiChangeGoalModal");
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
      this.$store.commit("showChangeGoalsModal", data);
    },
    handleDiscontinue(data) {
      this.$store.dispatch("discontinueGoal", {
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
    this.$store.dispatch("getGoals", params);
  },
  computed: {
    tabData() {
      const recList = this.$store.state.goal.list;
      return [
        {
          label: "Yours",
          tableData: recList,
          columns: [
            {
              label: "Description",
              field: "description",
              sortable: true
            },
            {
              label: "Score",
              field: "score",
              sortable: true
            },
            {
              label: "Start date",
              field: "start_date",
              sortable: true
            },
            {
              label: "Created At",
              field: "createdAt",
              sortable: true
            }
          ],
          rowActions: ["C", "D"]
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>