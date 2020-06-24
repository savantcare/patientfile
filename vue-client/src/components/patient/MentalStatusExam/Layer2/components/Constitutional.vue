<template>
  <base-component
    :statusList="statusList"
    :showNormalButton="false"
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
      statusList: ["Vitals signs stable"]
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
        if (status == "Vitals signs stable") {
          request["vitals-signs-stable"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateConstitutionalInSM", {
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