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
        {
          key: "pleasant-and-cooperative",
          value: "Pleasant and cooperative"
        },
        {
          key: "uncooperative",
          value: "Uncooperative"
        },
        {
          key: "hostile-or-defiant",
          value: "Hostile or defiant"
        },
        {
          key: "guarded",
          value: "Guarded"
        },
        {
          key: "evasive",
          value: "Evasive"
        },
        {
          key: "apathetic",
          value: "Apathetic"
        },
        {
          key: "disorganized-behavior",
          value: "Disorganized behavior"
        }
      ],
      normalStatusList: ["Pleasant and cooperative"]
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

      this.$store.dispatch("mse/dbUpdateAttitudeInSM", {
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