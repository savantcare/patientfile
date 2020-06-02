<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Screening"
        actions="A,F,D"
        type="card"
        @showAddDialog="showAddDialog"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        ref="card_header"
      />
      <!-- @showMultiChangeDialog="showMultiChangeDialog" -->
    </div>

    <!-- <DataTable
      :tabData="tabData"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleDiscontinue="handleDiscontinue"
    /> -->
    
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <!-- <el-table-column prop="address" label="Address"> </el-table-column> -->
    </el-table>

  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
//import DataTable from "@/components/common/DataTable";
export default {
  components: {
    CardHeader
    //DataTable
  },
  data() {
    return {
      selectedRows: [],
      tableData: [
          {name: '1. SPIN'}
      ]
    };
  },
  methods: {
    showAddDialog() {
      console.log("show add dialog");
      this.$store.commit("showAddScreenModal");
    },
    showMultiChangeDialog() {
      this.$store.commit("showTakeAScreenModal");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueRecommendations", {
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
      this.$store.commit("showChangeRecommendationsModal", data);
    },
    handleDiscontinue(data) {
      this.$store.dispatch("discontinueRecommendation", {
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
    this.$store.dispatch("getRecommendations", params);
  },
  computed: {
    tabData() {
      const recList = this.$store.state.recommendation.list;
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
              label: "Created At",
              field: "createdAt",
              sortable: true
            }
          ],
          rowActions: ["C", "D"]
        },
        {
          label: "Other's",
          tableData: recList,
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