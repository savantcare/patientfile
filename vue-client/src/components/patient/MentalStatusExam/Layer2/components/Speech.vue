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
        "Regular, rate and rhythm",
        "Fluent",
        "Incoherent",
        "Talkative",
        "Pressured",
        "Mumbling"
      ],
      normalStatusList: ["Regular, rate and rhythm"]
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
        if (status == "Regular, rate and rhythm") {
          request["regular-rate-and-rhythm"] = value;
        } else if (status == "Fluent") {
          request["fluent"] = value;
        } else if (status == "Incoherent") {
          request["incoherent"] = value;
        } else if (status == "Talkative") {
          request["talkative"] = value;
        } else if (status == "Pressured") {
          request["pressured"] = value;
        } else if (status == "Mumbling") {
          request["mumbling"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateSpeechInSM", {
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