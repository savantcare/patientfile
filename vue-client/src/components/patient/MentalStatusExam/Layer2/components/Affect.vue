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
        "Euthymic",
        "Dysphoric",
        "Irritable",
        "Angry",
        "Bright",
        "Euphoric",
        "Labile",
        "Stable",
        "Mood congruent",
        "Mood incongruent",
        "Expansive",
        "Constricted",
        "Blunted",
        "Flat",
        "Anxious",
        "Tearful",
        "Dysthymic",
        "Full-range"
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
        measurementDate: new Date(date).toISOString().split("T")[0]
      };
      for (const status of this.statusList) {
        const value =
          checkList.filter(item => item == status).length > 0 ? "yes" : "no";
        if (status == "Euthymic") {
          request["euthymic"] = value;
        } else if (status == "Dysphoric") {
          request["dysphoric"] = value;
        } else if (status == "Irritable") {
          request["irritable"] = value;
        } else if (status == "Angry") {
          request["angry"] = value;
        } else if (status == "Bright") {
          request["bright"] = value;
        } else if (status == "Euphoric") {
          request["euphoric"] = value;
        } else if (status == "Labile") {
          request["labile"] = value;
        } else if (status == "Stable") {
          request["stable"] = value;
        } else if (status == "Mood congruent") {
          request["mood-congruent"] = value;
        } else if (status == "Mood incongruent") {
          request["mood-incongruent"] = value;
        } else if (status == "Expansive") {
          request["expansive"] = value;
        } else if (status == "Constricted") {
          request["constricted"] = value;
        } else if (status == "Blunted") {
          request["blunted"] = value;
        } else if (status == "Flat") {
          request["flat"] = value;
        } else if (status == "Anxious") {
          request["anxious"] = value;
        } else if (status == "Tearful") {
          request["tearful"] = value;
        } else if (status == "Dysthymic") {
          request["dysthymic"] = value;
        } else if (status == "Full-range") {
          request["full-range"] = value;
        }
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