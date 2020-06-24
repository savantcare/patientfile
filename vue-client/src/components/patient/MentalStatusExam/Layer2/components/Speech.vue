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
        "Regular, rate and rhythm",
        "Fluent",
        "Incoherent",
        "Talkative",
        "Pressured",
        "Mumbling"
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
      this.checkList = ["Regular, rate and rhythm"];
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
        if (status == "Regular, rate and rhythm") {
          request["regular-rate-and-rhythm"] = value;
        } else if (status == "Fluent") {
          request["fluent"] = value;
        } else if (status == "Incoherent") {
          request["incoherent"] = value;
        } else if (status == "Talkative") {
          request["talkative"] = value;
        } else if (status == "Pressured") {
          request["pressured"] = value;
        } else if (status == "Mumbling") {
          request["mumbling"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateSpeechInSM", {
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