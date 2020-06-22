<template>
  <div id="mse-multi-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Mental Status Exam"
          actions="M,F"
          typeOfStateDisplayArea="MultiStateDisplayArea"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          ref="card_header"
        />
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="Value">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openChangeDialog(scope.row)"
            >C</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
// import { mapGetters } from "vuex";
export default {
  components: {
    CardHeader
  },
  methods: {
    openChangeDialog(item) {
      console.log(item);
      // this.$store.commit("bodyMeasurement/setObjectToUpdate", item);
      // this.$store.commit("showAddBMElementTabInLayer2", {
      //   label: item.label,
      //   type: item.type
      // });
    },
    handleClickOnMInCardHeader() {
      this.$store.commit(
        "bodyMeasurement/setSelectedDate",
        this.timeOfStateToShow
      );
      this.$store.commit("showUpdateAllBMElementTabInLayer2");
    },
    handleClickOnFInCardHeader() {
      var options = {
        container: "#currentStateDisplayArea",
        easing: "ease-in",
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      };
      const element = "#body-measurement-current-state";
      this.$scrollTo(element, 500, options);
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  computed: {
    tableData() {
      return [
        {
          label: "Appearence",
          value: "-"
        },
        {
          label: "Mood/Affect",
          value: "-"
        },
        {
          label: "Attitude",
          value: "-"
        },
        {
          label: "Cognition",
          value: "-"
        },
        {
          label: "Constitutional",
          value: "-"
        },
        {
          label: "Eye Contact",
          value: "-"
        },
        {
          label: "Impulse Control",
          value: "-"
        },
        {
          label: "Insight",
          value: "-"
        },
        {
          label: "Judgement",
          value: "-"
        },
        {
          label: "Perception",
          value: "-"
        },
        {
          label: "Psychomotor",
          value: "-"
        },
        {
          label: "Speech",
          value: "-"
        },
        {
          label: "Thought Content",
          value: "-"
        },
        {
          label: "Thought Process",
          value: "-"
        },
        {
          label: "Neurological",
          value: "-"
        }
      ];
    },
    timeOfStateToShow() {
      return this.$store.state.multiStateDisplayArea.timeOfStateToShow;
    }
  },
  mounted() {
    this.$store.commit(
      "bodyMeasurement/setSelectedDate",
      this.timeOfStateToShow
    );
  },
  watch: {
    timeOfStateToShow() {
      this.$store.commit(
        "bodyMeasurement/setSelectedDate",
        this.timeOfStateToShow
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>