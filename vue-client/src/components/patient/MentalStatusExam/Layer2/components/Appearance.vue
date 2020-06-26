<template>
  <base-component
    :statusList="statusList"
    :normalStatusList="normalStatusList"
    @saveChanges="saveChanges"
    ref="base_component"
    :oldList="oldList"
    title="Appearence"
  ></base-component>
</template>

<script>
import BaseComponent from "./_BaseMSEChange";
export default {
  props: {
    oldList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: { BaseComponent },
  data() {
    return {
      statusList: [
        {
          key: "good-grooming-and-hygiene",
          value: "Good grooming and hygiene"
        },
        {
          key: "no-apparent-distress",
          value: "No apparent distress"
        },
        {
          key: "well-developed-well-nourished",
          value: "Well-developed, well-nourished"
        },
        {
          key: "appears-stated-age",
          value: "Appears stated age"
        },
        {
          key: "appears-younger-then-stated-age",
          value: "Appears younger than stated age"
        },
        {
          key: "appears-older-then-stated-age",
          value: "Appears older than stated age"
        },
        {
          key: "obese",
          value: "Obese"
        },
        {
          key: "thin-or-cachetic",
          value: "Thin or cachectic"
        },
        {
          key: "disheveled-unkempt",
          value: "Disheveled, unkempt"
        },
        {
          key: "malodorus",
          value: "Malodorous"
        }
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