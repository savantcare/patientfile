// Component type 1/2: Card
// -------------- Category 1/4: User interface of card component ---------------------
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Screening"
        actions="A,G,F,D"
        :columns="columns"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
        ref="card_header"
      />
    </div>

    <DataTableWithoutTab
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      ctName="screening"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleClickOnTInDataRow="handleClickOnTInDataRow"
      @handleClickOnGInDataRow="handleClickOnGInDataRow"
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
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  data() {
    return {
      selectedRows: [],
      columns: [],
      selectedColumns: ["scientificName"] ,
    };
  },
  methods: {
     // -------------- Category 2/4: Functions to manage UI changes from Card Header ---------------------
    
    handleClickOnAInCardHeader() {
      console.log("show add dialog");
      this.$store.commit("showAddScreenTabInLayer2");
    },
    handleClickOnGInCardHeader() {
      console.log("show all screen graph dialog");
      //this.$store.commit("showGraphScreenTabInLayer2");
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

     // -------------- Category 3/4: Functions to manage UI changes from data row ---------------------

    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },

    handleClickOnTInDataRow(data) {
      console.log("show take a screen dialog");
      console.log(data);
      this.$store.commit("showTakeAScreenTabInLayer2", data);
    },
    handleClickOnGInDataRow(value) {
      console.log("show screen graph dialog" + value);
      
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
    },
    handleUpdateColumns(value) {
      this.columns = value;
    },

      //-------------- Category 4/4: Functions to manage DB changes -----------------------

  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

//     let apptDate = new Date().toISOString().slice(0, 19).replace('T', ' ') // Ref: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify,
      userId: this.$store.state.userId,
    };
    this.$store.dispatch("dbGetPatientScreeningListInSM", params);
  },
  computed: {
    tabData() {
      const screeningList = this.$store.state.screening.screeningList;
      //console.log(screeningList);
      return {
          label: "Yours",
          tableData: screeningList,
          rowActions: ["T", "G"],
          selectedColumn: ["sciendftificName"]
        };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>