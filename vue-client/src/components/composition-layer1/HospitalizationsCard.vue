<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Hospitalizations"
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
      title="hospitalization"
    />
  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import DataTable from "@/components/common/DataTable";
export default {
  data() {
    return {
      tabData: [
        {
          label: "Yours",
          tableData: [
            {
              description: "Some dummy description",
              createdAt: "Feb 9, 2017",
              startDate: "Jan 10, 2017",
              id: 1
            },
            {
              description: "Lorem ipsum dolor sit.",
              createdAt: "Mar 16, 2020",
              startDate: "Mar 10, 2020",
              id: 2
            }
          ],
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
            },
            {
              label: "Start Date",
              field: "startDate",
              sortable: true
            }
          ],
          rowActions: ["C", "D"],
          selectedColumn: ["description"]
        }
      ]
    };
  },
  components: {
    CardHeader,
    DataTable
  },
  methods: {
    showAddDialog() {
      console.log("show add dialog");
      // this.$store.commit("showAddRecommendationModal");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      console.log("mult-discontinue");
    },
    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
    },
    showMultiChangeDialog() {}
  }
};
</script>

<style lang="scss" scoped>
</style>