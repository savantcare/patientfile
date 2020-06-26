<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
import EyeContact from "../models/eyeContact";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const currentUnixTimeStamp = Math.round(new Date().getTime() / 1000);
      const eyeContacts = EyeContact.query()
        .where("ROW_START", value => value < currentUnixTimeStamp)
        .where("ROW_END", value => value > currentUnixTimeStamp)
        .orderBy("ROW_START", "desc")
        .get();

      let appropriateData = [];
      let downcastData = [];
      let intenseData = [];
      let fleetingData = [];

      for (const eyeContact of eyeContacts) {
        const { timeOfEvaluation } = eyeContact;

        appropriateData.push({
          x: timeOfEvaluation,
          y: eyeContact["appropriate"] == "yes" ? 1 : 0
        });
        downcastData.push({
          x: timeOfEvaluation,
          y: eyeContact["downcast"] == "yes" ? 1 : 0
        });
        intenseData.push({
          x: timeOfEvaluation,
          y: eyeContact["intense"] == "yes" ? 1 : 0
        });
        fleetingData.push({
          x: timeOfEvaluation,
          y: eyeContact["fleeting"] == "yes" ? 1 : 0
        });
      }

      series.push(
        {
          name: "Appropriate",
          data: appropriateData
        },
        {
          name: "Downcast",
          data: downcastData
        },
        {
          name: "Intense",
          data: intenseData
        },
        {
          name: "Fleeting",
          data: fleetingData
        }
      );

      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    this.$store.dispatch("mse/getEyeContact", params);
  }
};
</script>

<style>
</style>