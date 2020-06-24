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
  components: {
    BaseComponent
  },
  data() {
    return {
      statusList: [
        "Good",
        "Fair",
        "Questionable",
        "Poor",
        "Impaired",
        "Limited"
      ],
      normalStatusList: ["Good"]
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
        measurementDate: new Date(date).toISOString().split("T")[0]
      };
      for (const status of this.statusList) {
        const value =
          checkList.filter(item => item == status).length > 0 ? "yes" : "no";
        if (status == "Good") {
          request["good"] = value;
        } else if (status == "Fair") {
          request["fair"] = value;
        } else if (status == "Questionable") {
          request["questionable"] = value;
        } else if (status == "Poor") {
          request["poor"] = value;
        } else if (status == "Impaired") {
          request["impaired"] = value;
        } else if (status == "Limited") {
          request["limited"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateImpulseControlInSM", {
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