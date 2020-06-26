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
          key: "no-avh",
          value: "No AVH"
        },
        {
          key: "ah",
          value: "+AH"
        },
        {
          key: "command-ah",
          value: "+Command AH"
        },
        {
          key: "vh",
          value: "+VH"
        }
      ],
      normalStatusList: ["No AVH"]
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

      this.$store.dispatch("mse/dbUpdatePerceptionInSM", {
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