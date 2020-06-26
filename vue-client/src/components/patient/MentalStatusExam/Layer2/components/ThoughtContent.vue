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
          key: "no-si-intent-or-plan",
          value: "No SI, intent or plan"
        },
        {
          key: "no-passive-death-wish",
          value: "No passive death wish"
        },
        {
          key: "no-hi-intent-or-plan",
          value: "No HI, intent or plan"
        },
        {
          key: "no-delusional-thinking-observed",
          value: "No delusional thinking observed"
        },
        {
          key: "no-obsessive-thinking-observed",
          value: "No obsessive thinking observed"
        },
        {
          key: "ruminations",
          value: "+ruminations"
        },
        {
          key: "si-without-intent-or-plan",
          value: "+SI without intent or plan"
        },
        {
          key: "si-as-detailed-below",
          value: "+SI as detailed below"
        },
        {
          key: "hi-as-detailed-below",
          value: "+HI as detailed below"
        },
        {
          key: "delusions",
          value: "+delusions"
        },
        {
          key: "ior",
          value: "+IOR"
        },
        {
          key: "obsessions",
          value: "+obsessions"
        },
        {
          key: "passive-death-wish",
          value: "Passive death wish"
        }
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
          checkList.filter(item => item == status.value).length > 0
            ? "yes"
            : "no";
        request[status.key] = value;
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