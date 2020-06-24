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
      this.checkList = ["Euthymic", "Stable", "Full-range", "Mood congruent"];
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

      this.checkList = [];
      this.others = "";
      this.date = new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>