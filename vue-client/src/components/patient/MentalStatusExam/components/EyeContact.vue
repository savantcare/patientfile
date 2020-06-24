<template>
  <Graph :series="series" />
</template>

<script>
import Graph from "./_BaseGraph";
export default {
  components: { Graph },

  computed: {
    series() {
      let series = [];

      const eyeContacts = this.$store.state.mse.eyeContactList;

      let appropriateData = [];
      let downcastData = [];
      let intenseData = [];
      let fleetingData = [];

      for (const eyeContact of eyeContacts) {
        const { createDate } = eyeContact;

        appropriateData.push({
          x: createDate,
          y: eyeContact["appropriate"] == "yes" ? 1 : 0
        });
        downcastData.push({
          x: createDate,
          y: eyeContact["downcast"] == "yes" ? 1 : 0
        });
        intenseData.push({
          x: createDate,
          y: eyeContact["intense"] == "yes" ? 1 : 0
        });
        fleetingData.push({
          x: createDate,
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