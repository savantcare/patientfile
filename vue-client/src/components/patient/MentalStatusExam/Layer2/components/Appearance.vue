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
        "Good grooming and hygiene",
        "No apparent distress",
        "Well-developed, well-nourished",
        "Appears stated age",
        "Appears younger than stated age",
        "Appears older than stated age",
        "Obese",
        "Thin or cachectic",
        "Disheveled, unkempt",
        "Malodorous"
      ],
      normalStatusList: [
        "Good grooming and hygiene",
        "No apparent distress",
        "Well-developed, well-nourished",
        "Appears stated age"
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
      console.log(date);
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
        if (status == "Good grooming and hygiene") {
          request["good-grooming-and-hygiene"] = value;
        } else if (status == "No apparent distress") {
          request["no-apparent-distress"] = value;
        } else if (status == "Well-developed, well-nourished") {
          request["well-developed-well-nourished"] = value;
        } else if (status == "Appears stated age") {
          request["appears-stated-age"] = value;
        } else if (status == "Appears younger than stated age") {
          request["appears-younger-then-stated-age"] = value;
        } else if (status == "Appears older than stated age") {
          request["appears-older-then-stated-age"] = value;
        } else if (status == "Obese") {
          request["obese"] = value;
        } else if (status == "Thin or cachectic") {
          request["thin-or-cachetic"] = value;
        } else if (status == "Disheveled, unkempt") {
          request["disheveled-unkempt"] = value;
        } else if (status == "Malodorous") {
          request["malodorus"] = value;
        }
      }

      await this.$store.dispatch("mse/dbUpdateAppearenceInSM", {
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