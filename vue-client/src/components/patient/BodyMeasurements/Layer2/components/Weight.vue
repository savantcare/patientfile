<template>
  <BaseUpdateComponent
    @submitForm="submitForm"
    ref="base_component"
    :updateObject="currentValue"
    :pageChangeLog="changeLog"
    header="Weight"
    type="weight"
  />
</template>

<script>
import BaseUpdateComponent from "./_BaseChangeBMComponent";
import Weight from "../../models/weight";
export default {
  components: {
    BaseUpdateComponent
  },
  data() {
    return {
      currentValue: {},
      changeLog: []
    };
  },
  mounted() {
    this.getChangeLog();
  },
  methods: {
    async submitForm(element) {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipJson = await ipResponse.json();
      const ipAddress = ipJson.ip;

      const patientId = this.$route.query.patient_id;
      const myId = this.$store.state.userId;

      const timeOfEvaluation = new Date(element.date).toLocaleDateString();
      const data = {
        patientUUID: patientId,
        timeOfEvaluation: timeOfEvaluation,
        Notes: element.notes,
        recordChangedByUUID: myId,
        recordChangedFromIPAddress: ipAddress,
        weightInPounds: element.value
      };

      await this.$store.dispatch("bodyMeasurement/dbUpdateWeightInSM", {
        data: data,
        notify: this.$notify
      });
      this.$refs.base_component.reset();
    },
    getChangeLog() {
      const date = this.$store.state.bodyMeasurement.selectedDate;
      const currentUnixTimeStamp = Math.round(date.getTime() / 1000);
      const currentValue = Weight.query()
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .get();
      if (currentValue.length > 0) {
        this.currentValue = {
          value: currentValue[0].weightInPounds,
          date: currentValue[0].timeOfEvaluation,
          notes: currentValue[0].Notes
        };
      }
      const changeLog = Weight.query()
        .where("ROW_END", value => value < currentUnixTimeStamp)
        .get();
      if (changeLog.length > 0) {
        this.changeLog = [];
        changeLog.forEach(log => {
          this.changeLog.push({
            date: new Date(log.timeOfEvaluation).toDateString(),
            value: log.weightInPounds
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>