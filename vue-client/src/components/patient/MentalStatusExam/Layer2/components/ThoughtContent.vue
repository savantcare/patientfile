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
        "No SI, intent or plan",
        "No passive death wish",
        "No HI, intent or plan",
        "No delusional thinking observed",
        "No obsessive thinking observed",
        "+ruminations",
        "+SI without intent or plan",
        "+SI as detailed below",
        "+HI as detailed below",
        "+delusions",
        "+IOR",
        "+obsessions",
        "Passive death wish"
      ],
      normalStatusList: [
        "No SI, intent or plan",
        "No passive death wish",
        "No HI, intent or plan",
        "No delusional thinking observed",
        "No obsessive thinking observed"
      ]
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
        if (status == "No SI, intent or plan") {
          request["no-si-intent-or-plan"] = value;
        } else if (status == "No passive death wish") {
          request["no-passive-death-wish"] = value;
        } else if (status == "No HI, intent or plan") {
          request["no-hi-intent-or-plan"] = value;
        } else if (status == "No delusional thinking observed") {
          request["no-delusional-thinking-observed"] = value;
        } else if (status == "No obsessive thinking observed") {
          request["no-obsessive-thinking-observed"] = value;
        } else if (status == "+ruminations") {
          request["ruminations"] = value;
        } else if (status == "+SI without intent or plan") {
          request["si-without-intent-or-plan"] = value;
        } else if (status == "+SI as detailed below") {
          request["si-as-detailed-below"] = value;
        } else if (status == "+HI as detailed below") {
          request["hi-as-detailed-below"] = value;
        } else if (status == "+delusions") {
          request["delusions"] = value;
        } else if (status == "+IOR") {
          request["ior"] = value;
        } else if (status == "+obsessions") {
          request["obsessions"] = value;
        } else if (status == "Passive death wish") {
          request["passive-death-wish"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateThoughtContentInSM", {
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