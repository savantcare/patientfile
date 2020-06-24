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
        "Pleasant and cooperative",
        "Uncooperative",
        "Hostile or defiant",
        "Guarded",
        "Evasive",
        "Apathetic",
        "Disorganized behavior"
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
        measurementDate: new Date(date).toISOString().split("T")[0]
      };
      for (const status of this.statusList) {
        const value =
          checkList.filter(item => item == status).length > 0 ? "yes" : "no";
        if (status == "Pleasant and cooperative") {
          request["pleasant-and-cooperative"] = value;
        } else if (status == "Uncooperative") {
          request["uncooperative"] = value;
        } else if (status == "Hostile or defiant") {
          request["hostile-or-defiant"] = value;
        } else if (status == "Guarded") {
          request["guarded"] = value;
        } else if (status == "Evasive") {
          request["evasive"] = value;
        } else if (status == "Apathetic") {
          request["apathetic"] = value;
        } else if (status == "Disorganized behavior") {
          request["disorganized-behavior"] = value;
        }
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