<template>
  <base-component
    :statusList="statusList"
    :normalStatusList="normalStatusList"
    @saveChanges="saveChanges"
    ref="base_component"
    :oldList="oldList"
    title="Insight"
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
          key: "good",
          value: "Good"
        },
        {
          key: "fair",
          value: "Fair"
        },
        {
          key: "questionable",
          value: "Questionable"
        },
        {
          key: "poor",
          value: "Poor"
        },
        {
          key: "impaired",
          value: "Impaired"
        },
        {
          key: "limited",
          value: "Limited"
        }
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
        timeOfEvaluation: date
      };
      for (const status of this.statusList) {
        const value =
          checkList.filter(item => item == status.value).length > 0
            ? "yes"
            : "no";
        request[status.key] = value;
      }

      this.$store.dispatch("mse/dbUpdateInsightInSM", {
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