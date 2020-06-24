<template>
  <base-component
    :statusList="statusList"
    :normalStatusList="normalStatusList"
    @saveChanges="saveChanges"
    ref="base_component"
  ></base-component>
</template>

<script>
import BaseComponent from "./_BaseMSEChange";
export default {
  components: { BaseComponent },
  data() {
    return {
      statusList: [
        "Linear, logical and goal-directed",
        "Disorganized",
        "Circumstantial",
        "Tangential",
        "Looseness of associations",
        "Flight of ideas",
        "Poverty of thought"
      ],
      normalStatusList: ["Linear, logical and goal-directed"]
    };
  },
  methods: {
    async saveChanges(params) {
      const { checkList, others, date } = params;
      let ipAddress = "";
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipJson = await ipResponse.json();
        ipAddress = ipJson.ip;
      } catch (ex) {
        console.log(ex);
      }

      let request = {
        patientUUID: this.$route.query.patient_id,
        recordChangedByUUID: this.$store.state.userId,
        recordChangedFromIPAddress: ipAddress,
        other: others,
        timeOfEvaluation: date
      };
      for (const status of this.statusList) {
        const value =
          checkList.filter(item => item == status).length > 0 ? "yes" : "no";
        if (status == "Linear, logical and goal-directed") {
          request["linear-logical-and-goal-directed"] = value;
        } else if (status == "Disorganized") {
          request["disorganized"] = value;
        } else if (status == "Circumstantial") {
          request["circumstantial"] = value;
        } else if (status == "Tangential") {
          request["tangential"] = value;
        } else if (status == "Looseness of associations") {
          request["looseness-of-associations"] = value;
        } else if (status == "Flight of ideas") {
          request["flight-of-ideas"] = value;
        } else if (status == "Poverty of thought") {
          request["poverty-of-thought"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateThoughtProcessInSM", {
        data: request,
        notify: this.$notify
      });

      this.$refs.base_component.resetData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>