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
        {
          key: "linear-logical-and-goal-directed",
          value: "Linear, logical and goal-directed"
        },
        {
          key: "disorganized",
          value: "Disorganized"
        },
        {
          key: "circumstantial",
          value: "Circumstantial"
        },
        {
          key: "tangential",
          value: "Tangential"
        },
        {
          key: "looseness-of-associations",
          value: "Looseness of associations"
        },
        {
          key: "flight-of-ideas",
          value: "Flight of ideas"
        },
        {
          key: "poverty-of-thought",
          value: "Poverty of thought"
        }
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
          checkList.filter(item => item == status.value).length > 0
            ? "yes"
            : "no";
        request[status.key] = value;
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