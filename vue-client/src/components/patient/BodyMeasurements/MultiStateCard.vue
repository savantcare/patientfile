<template>
  <div id="body-measurement-multi-state">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <CardHeader
          ctName="Body measurement"
          actions="G,M,F"
          typeOfStateDisplayArea="MultiStateDisplayArea"
          @handleClickOnGInCardHeader="handleClickOnGInCardHeader"
          @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
          @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
          ref="card_header"
        />
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="Current Value">
          <template slot-scope="scope">{{formatBodyMeasurementValue(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openChangeDialog(scope.row)"
            >C</el-button>
            <el-button
              size="mini"
              type="text"
              style="padding: 0px;"
              @click="openGraphDialog(scope.row, scope.$index)"
            >G</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import { mapGetters } from "vuex";
export default {
  components: {
    CardHeader
  },
  methods: {
    handleClickOnGInCardHeader() {
      this.$store.commit("showGraphAllBMTabInLayer2");
    },
    openChangeDialog(item) {
      this.$store.commit("bodyMeasurement/setObjectToUpdate", item);
      this.$store.commit("showAddBMElementTabInLayer2", {
        label: item.label,
        type: item.type
      });
    },
    openGraphDialog(item, index) {
      this.$store.commit("showGraphBMElementTabInLayer2", {
        label: item.label,
        type: item.type,
        index: index
      });
    },
    formatBodyMeasurementValue(bm) {
      if (!bm.value && bm.type != "bloodPressure") {
        return "-";
      }

      if (bm.type == "bloodPressure") {
        if (!bm.systolicValue) {
          return "-";
        }
        return bm.systolicValue + "/" + bm.diastolicValue + bm.unit;
      }
      return bm.value + bm.unit;
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
    ...mapGetters("bodyMeasurement", ["measurementsByDate"]),
    tableData() {
      const {
        weight,
        bmi,
        waistCircumference,
        bloodSugar,
        height,
        bloodPressure,
        oxygenSaturation,
        pulse,
        temperature
      } = this.measurementsByDate;
      return [
        {
          label: "Weight",
          type: "weight",
          ...weight
        },
        {
          label: "BMI",
          type: "bmi",
          ...bmi
        },
        {
          label: "Waist circumference",
          type: "waistCircumference",
          ...waistCircumference
        },
        {
          label: "Blood sugar",
          type: "bloodSugar",
          ...bloodSugar
        },
        {
          label: "Height",
          type: "height",
          ...height
        },
        {
          label: "Blood pressure",
          type: "bloodPressure",
          ...bloodPressure
        },
        {
          label: "Oxygen saturation",
          type: "oxygenSaturation",
          ...oxygenSaturation
        },
        {
          label: "Pulse",
          type: "pulse",
          ...pulse
        },
        {
          label: "Temperature",
          type: "temperature",
          ...temperature
        }
      ];
    },
    timeOfStateToShow() {
      return this.$store.state.stateAtSelectedTime.timeOfStateToShow;
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