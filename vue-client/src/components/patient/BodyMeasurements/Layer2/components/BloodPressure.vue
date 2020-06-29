<template>
  <BaseUpdateComponent
    @submitForm="submitForm"
    ref="base_component"
    :updateObject="currentValue"
    :pageChangeLog="changeLog"
  />
</template>

<script>
import BaseUpdateComponent from "./_BaseChangeBMComponent";
import BloodPressure from "../../models/bloodPressure";
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
        systolicValue: element.systolicValue,
        diastolicValue: element.diastolicValue
      };

      await this.$store.dispatch("bodyMeasurement/dbUpdateBloodPressureInSM", {
        data: data,
        notify: this.$notify
      });
      this.$refs.base_component.reset();
    },
    getChangeLog() {
      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const currentValue = BloodPressure.query()
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .get();
      if (currentValue.length > 0) {
        this.currentValue = {
          systolicValue: currentValue[0].systolicValue,
          diastolicValue: currentValue[0].diastolicValue,
          date: currentValue[0].timeOfEvaluation,
          notes: currentValue[0].Notes
        };
      }
      const changeLog = BloodPressure.query()
        .where("ROW_END", value => value < currentUnixTimeStamp)
        .get();
      if (changeLog.length > 0) {
        this.changeLog = [];
        changeLog.forEach(log => {
          this.changeLog.push({
            date: new Date(log.timeOfEvaluation).toDateString(),
            value: log.systolicValue + " / " + log.diastolicValue
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>