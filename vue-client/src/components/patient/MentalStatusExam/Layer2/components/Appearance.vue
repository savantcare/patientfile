<template>
  <el-card>
    <el-button type="text" @click="setNormalStatus">Normal (Short code)</el-button>

    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(status, index) in statusList" :key="`status-${index}`" :label="status"></el-checkbox>
    </el-checkbox-group>

    <el-input type="textarea" placeholder="Others (optional)" v-model="others"></el-input>

    <div style="margin-top: 6px;">
      <label style="margin-right: 6px">Measurement date:</label>
      <el-date-picker v-model="date" type="date" placeholder="Pick a day"></el-date-picker>
    </div>

    <el-button
      type="primary"
      style="margin-top: 12px"
      @click="saveChanges"
      :disabled="validateSaveButton"
    >Save</el-button>
  </el-card>
</template>

<script>
export default {
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
      checkList: [],
      others: "",
      date: new Date()
    };
  },
  computed: {
    validateSaveButton() {
      if (this.checkList.length > 0 || this.others.length > 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    setNormalStatus() {
      this.checkList = [
        "Good grooming and hygiene",
        "No apparent distress",
        "Well-developed, well-nourished",
        "Appears stated age"
      ];
    },
    async saveChanges() {
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
        other: this.others,
        measurementDate: new Date(this.date).toISOString().split("T")[0]
      };
      for (const status of this.statusList) {
        const value =
          this.checkList.filter(item => item == status).length > 0
            ? "yes"
            : "no";
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

      this.$store.dispatch("mse/dbUpdateAppearenceInSM", {
        data: request,
        notify: this.$notify
      });

      this.checkList = [];
      this.others = "";
      this.date = new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>