// Component type 1/2: Card
// -------------- Category 1/4: User interface of card component ---------------------
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
    /> -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column align="right">
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
      tableData: [{ name: "1. PHQ9" }]
    };
  },
  methods: {

     // -------------- Category 2/4: Functions to manage UI changes from Card Header ---------------------


     // -------------- Category 3/4: Functions to manage UI changes from data row ---------------------

      //-------------- Category 4/4: Functions to manage DB changes -----------------------

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
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

//     let apptDate = new Date().toISOString().slice(0, 19).replace('T', ' ') // Ref: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
// ;
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify,
      userId: this.$store.state.userId,
    };
    this.$store.dispatch("dbGetScreeningsInSM", params);
  },
  computed: {
    tabData() {
      console.log(55555);
      console.log(this.$store.state);
      const screeningList = this.$store.state.screening.screeningList;
      
      return [
        {
          label: "Yours",
          tableData: screeningList,
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