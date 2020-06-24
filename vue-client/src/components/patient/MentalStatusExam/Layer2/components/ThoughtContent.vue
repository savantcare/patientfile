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
        "No SI, intent or plan",
        "No passive death wish",
        "No HI, intent or plan",
        "No delusional thinking observed",
        "No obsessive thinking observed",
        "+ruminations",
        "+SI without intent or plan",
        "+SI as detailed below",
        "+HI as detailed below",
        "+delusions",
        "+IOR",
        "+obsessions",
        "Passive death wish"
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
        "No SI, intent or plan",
        "No passive death wish",
        "No HI, intent or plan",
        "No delusional thinking observed",
        "No obsessive thinking observed"
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
        if (status == "No SI, intent or plan") {
          request["no-si-intent-or-plan"] = value;
        } else if (status == "No passive death wish") {
          request["no-passive-death-wish"] = value;
        } else if (status == "No HI, intent or plan") {
          request["no-hi-intent-or-plan"] = value;
        } else if (status == "No delusional thinking observed") {
          request["no-delusional-thinking-observed"] = value;
        } else if (status == "No obsessive thinking observed") {
          request["no-obsessive-thinking-observed"] = value;
        } else if (status == "+ruminations") {
          request["ruminations"] = value;
        } else if (status == "+SI without intent or plan") {
          request["si-without-intent-or-plan"] = value;
        } else if (status == "+SI as detailed below") {
          request["si-as-detailed-below"] = value;
        } else if (status == "+HI as detailed below") {
          request["hi-as-detailed-below"] = value;
        } else if (status == "+delusions") {
          request["delusions"] = value;
        } else if (status == "+IOR") {
          request["ior"] = value;
        } else if (status == "+obsessions") {
          request["obsessions"] = value;
        } else if (status == "Passive death wish") {
          request["passive-death-wish"] = value;
        }
      }

      this.$store.dispatch("mse/dbUpdateThoughtContentInSM", {
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