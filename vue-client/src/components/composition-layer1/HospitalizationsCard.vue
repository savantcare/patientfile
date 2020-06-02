<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Hospitalizations"
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
    <DataTable
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      title="hospitalization"
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
import DataTable from "@/components/common/DataTable";
export default {
  components: {
    CardHeader,
    DataTable
  },
  props: {
    type: {
      type: String,
      default: "CurrentState" // There are two possible types. CurrentState and stateOnASelectedTime
    }
  },
  data() {
    return {
      selectedRows: [],
      columns: [],
      selectedColumns: ["description"]        // The user can select there own columns. The user selected columns are saved in the local storage. 
    };
  },
  methods: {
    showAddDialog() {
      console.log("show add dialog");
      this.$store.commit("showAddHospitalizationModal");
    },
    showMultiChangeDialog() {
      //this.$store.commit("showMultiChangeRecommendationModal");
    },
    focusPanel() {
      console.log("focus panel");
    },
    multiDiscontinue() {
      console.log("mult-discontinue");
    },
    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },
    handleChange(data) {
      console.log("show change dialog",data);
      //this.$store.commit("showChangeRecommendationsModal", data);
    },
    handleDiscontinue(data) {
      console.log('handle discontinue called',data)
      // this.$store.dispatch("discontinueRecommendation", {
      //   data: data,
      //   toast: this.$notify
      // });
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
    this.$store.dispatch("getRecommendations", params);
  },  
  computed: {
    tabData() {
      const recList = this.$store.state.recommendation.list; // will change later
      return [
        {
          label: "Yours",
          tableData: recList,
          rowActions: ["C", "D"]
        },
        {
          label: "Other's",
          tableData: recList,
          rowActions: ["C", "D"],
          selectedColumn: ["description"]
        }
      ];
    }
  }
  // data2() {
  //   return {
  //     tabData: [
  //       {
  //         label: "Yours",
  //         tableData: [
  //           {
  //             description: "Some dummy description",
  //             createdAt: "Feb 9, 2017",
  //             startDate: "Jan 10, 2017",
  //             id: 1
  //           },
  //           {
  //             description: "Lorem ipsum dolor sit.",
  //             createdAt: "Mar 16, 2020",
  //             startDate: "Mar 10, 2020",
  //             id: 2
  //           }
  //         ],
  //         columns: [
  //           {
  //             label: "Description",
  //             field: "description",
  //             sortable: true
  //           },
  //           {
  //             label: "Created At",
  //             field: "createdAt",
  //             sortable: true
  //           },
  //           {
  //             label: "Start Date",
  //             field: "startDate",
  //             sortable: true
  //           }
  //         ],
  //         rowActions: ["C", "D"],
  //         selectedColumn: ["description"]
  //       }
  //     ]
  //   };
  // },
};
</script>

<style lang="scss" scoped>
</style>