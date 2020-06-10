<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Screening"
        actions="A,F,D"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        ref="card_header"
      />
      <!-- @handleClickOnMInCardHeader="showTakeAScreenDialog" -->
    </div>

    <!-- <DataTable
      :tabData="tabData"
      @handleSelectionChange="handleSelectionChange"
      @handleClickOnCInDataRow="handleClickOnCInDataRow"
      @handleClickOnDInDataRow="handleClickOnDInDataRow"
    />-->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column align="right">
        <!-- <template slot="header" >
          <el-input v-model="search" size="mini" placeholder="search screen"/>
        </template>-->
        <template slot-scope="scope">
          <el-link type="primary" @click="showTakeAScreenDialog(scope.$index, scope.row)">T</el-link>
        </template>
      </el-table-column>
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
      tableData: [{ name: "1. SPIN" }]
    };
  },
  methods: {
    handleClickOnAInCardHeader() {
      console.log("show add dialog");
      this.$store.commit("showAddScreenTabInLayer2");
    },
    showTakeAScreenDialog(index, row) {
      console.log(index, row);
      this.$store.commit("showTakeAScreenTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      console.log("focus panel");
    },
    handleClickOnDInCardHeader() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("dbMultiDiscontinueRecommendationsInSM", {
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
      this.$store.commit("showChangeRecommendationsTabInLayer2", data);
    },
    handleClickOnDInDataRow(data) {
      this.$store.dispatch("dbDiscontinueRecommendationInSM", {
        data: data,
        notify: this.$notify
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
      const recList = this.$store.state.recommendation.yourRecommendationsList;
      return [
        {
          label: "Yours",
          tableData: recList,
          columns: [
            {
              label: "Description",
              field: "description",
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