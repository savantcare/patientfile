<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Diagnosis"
        actions="A,M,F,D"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        :columns="columns"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        @updateSelectedColumns="updateSelectedColumns"
      />
    </div>
    <DataTableWithoutTab
      :tabData="tabData"
      :selectedColumns="selectedColumns"
      ctName="diagnosis"
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
import DataTableWithoutTab from "@/components/common/DataTableWithoutTab";
import Diagnosis from "./models/Diagnosis";
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
      selectedColumns: ["diagnosisName"] // The user can select there own columns. The user selected columns are saved in the local storage.
    };
  },
  methods: {
    handleClickOnAInCardHeader() {
      // For logic: Line 57 of Recommendations/Layer1Card.vue
      this.$store.commit("showAddDiagnosisTabInLayer2");
    },
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeAssessmentTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      console.log("focus panel");
    },
    handleClickOnDInCardHeader() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueDiagnosis", {
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
      this.$store.commit("showChangeDiagnosisTabInLayer2", data);
    },
    handleClickOnDInDataRow(data) {
      this.$store.dispatch("discontinueDiagnosis", {
        data: data,
        notify: this.$notify
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

    /*
      One dx can not have multiple row ends
      For a discontinued DX a delete query is run and new row is not inserted.

      UUIDs are:
        sxsxz -> current 
        sdfsdf -> discontinued on 6th Jan at 10AM

      Why assessments are not stored with UUID like DX?
        Below a DX only 1 assessment is possible at a time.

        Decxision about convention to be followed:
          1:1 Use ROW_END (This is always preferred since simpler code)
          1:N Use UUID[ROW_END]

  */

    //Proposed structure
    this.$store.diagnosisEvalAtEachRowEnd = [
      {
        sxsxz: [
          {
            "2039": {
              Dx: "ADHD",
              ROW_START: "15th Jan at 10AM",
              ASSESSMENTS: {
                "2039": {
                  text: "Doing good",
                  ROW_START: "17th Jan at 11AM"
                },
                "15th Jan at 10AM": {
                  text: "Doing bad",
                  ROW_START: "14th Jan at 9AM"
                }
              }
            }
          }
        ]
      },
      {
        sdfsdf: [
          {
            "6th Jan at 10AM": {
              Dx: "Depression",
              ROW_START: "5th Jan at 10AM",
              ASSESSMENTS: {
                "2039": {
                  text: "Doing good",
                  ROW_START: "17th Jan at 11AM"
                },
                "15th Jan at 10AM": {
                  text: "Doing bad",
                  ROW_START: "14th Jan at 9AM"
                }
              }
            }
          }
        ]
      }
    ];

    //Structure that has been implemented with Vuex-ORM model
    let dxListFromApiCall = [
      {
        uuid: "sxsxz",
        rowStart: "15th Jan at 10AM",
        rowEnd: "2039",
        diagnosis: { name: "ADHD" },
        assessment: [
          {
            text: "Doing bad",
            ROW_START: "14th Jan at 9AM",
            ROW_END: "15th Jan at 10AM"
          },
          {
            text: "Doing good",
            ROW_START: "17th Jan at 11AM",
            ROW_END: "2039"
          }
        ]
      },
      {
        uuid: "sdfsdf",
        rowStart: "5th Jan at 10AM",
        rowEnd: "6th Jan at 10AM",
        diagnosis: { name: "Depression" },
        assessment: [
          {
            text: "Doing bad",
            ROW_START: "5th Jan at 10PM",
            ROW_END: "6th Jan at 10AM"
          },
          {
            text: "Doing good",
            ROW_START: "5th Jan at 11AM",
            ROW_END: "5th Jan at 10PM"
          }
        ]
      }
    ];

    console.log("====" + JSON.stringify(dxListFromApiCall, null, 4));
    Diagnosis.insert({
      data: dxListFromApiCall
    });

    /*    console.log(
      "====" + JSON.stringify(this.$store.diagnosisEvalAtEachRowEnd, null, 4)
    );
*/
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify
    };
    this.$store.dispatch("getDiagnoses", params);
  },
  computed: {
    tabData() {
      /*
       */

      //const dxEvalList = this.$store.diagnosisEvalAtEachRowEnd;
      const dxEvalList = Diagnosis.all();

      const dxConditionalData = Diagnosis.query()
        .where("uuid", "sxsxz")
        .where("rowEnd", "2038")
        .get();
      console.log("######", dxEvalList);
      console.log("&&&&&&&", dxConditionalData);
      let key = null;
      for (key in Object.keys(dxEvalList)) {
        let currentObject = dxEvalList[key];
        console.log("****" + Object.keys(currentObject));
      }

      const dxList = this.$store.state.diagnosis.diagnosisList;
      console.log(dxList);
      return {
        label: "Yours",
        tableData: dxList,
        rowActions: ["C", "D"],
        selectedColumn: ["diagnosisName"]
      };
    }
  }
};
</script>

<style lang="css">
</style>