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
          key: "euthymic",
          value: "Euthymic"
        },
        {
          key: "dysphoric",
          value: "Dysphoric"
        },
        {
          key: "irritable",
          value: "Irritable"
        },
        {
          key: "angry",
          value: "Angry"
        },
        {
          key: "bright",
          value: "Bright"
        },
        {
          key: "euphoric",
          value: "Euphoric"
        },
        {
          key: "labile",
          value: "Labile"
        },
        {
          key: "stable",
          value: "Stable"
        },
        {
          key: "mood-congruent",
          value: "Mood congruent"
        },
        {
          key: "mood-incongruent",
          value: "Mood incongruent"
        },
        {
          key: "expansive",
          value: "Expansive"
        },
        {
          key: "full-range",
          value: "Full-range"
        },
        {
          key: "blunted",
          value: "Blunted"
        },
        {
          key: "flat",
          value: "Flat"
        },
        {
          key: "anxious",
          value: "Anxious"
        },
        {
          key: "tearful",
          value: "Tearful"
        },
        {
          key: "dysthymic",
          value: "Dysthymic"
        },
        {
          key: "constricted",
          value: "Constricted"
        }
      ],
      normalStatusList: ["Euthymic", "Stable", "Full-range", "Mood congruent"]
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

      this.$store.dispatch("mse/dbUpdateAffectInSM", {
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