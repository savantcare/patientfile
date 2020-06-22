<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      checkList: [],
      others: "",
      date: new Date()
    };
  },
  computed: {
    ...mapState({
      type: state => state.mse.selectedType
    }),
    statusList() {
      if (this.type == "appearence") {
        return [
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
        ];
      } else if (this.type == "attitude") {
        return [
          "Pleasant and cooperative",
          "Uncooperative",
          "Hostile or defiant",
          "Guarded",
          "Evasive",
          "Apathetic",
          "Disorganized behavior"
        ];
      } else if (this.type == "cognition") {
        return [
          "Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention",
          "Impaired",
          "Fluctuating"
        ];
      } else if (this.type == "constitutional") {
        return ["Vitals signs stable"];
      } else if (this.type == "eyeContact") {
        return ["Appropriate", "Downcast", "Intense", "Fleeting"];
      } else if (this.type == "impulseControl") {
        return ["Good", "Fair", "Questionable", "Poor", "Impaired", "Limited"];
      } else if (this.type == "thoughtProcess") {
        return [
          "Linear, logical and goal-directed",
          "Disorganized",
          "Circumstantial",
          "Tangential",
          "Looseness of associations",
          "Flight of ideas",
          "Poverty of thought"
        ];
      } else if (this.type == "psychomotor") {
        return ["Normal", "Agitated", "Retarded"];
      } else if (this.type == "insight") {
        return ["Good", "Fair", "Questionable", "Poor", "Impaired", "Limited"];
      } else if (this.type == "speech") {
        return [
          "Regular, rate and rhythm",
          "Fluent",
          "Incoherent",
          "Talkative",
          "Pressured",
          "Mumbling"
        ];
      } else if (this.type == "judgement") {
        return ["Good", "Fair", "Questionable", "Poor", "Impaired", "Limited"];
      } else if (this.type == "affect") {
        return [
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
        ];
      } else if (this.type == "thoughtContent") {
        return [
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
        ];
      } else if (this.type == "neurological") {
        return ["Gait and station normal", "Gait and station abnormal"];
      } else if (this.type == "perception") {
        return ["No AVH", "+AH", "+Command AH", "+VH"];
      }
      return [];
    },
    validateSaveButton() {
      if (this.checkList.length > 0 || this.others.length > 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    setNormalStatus() {
      if (this.type == "appearence") {
        this.checkList = [
          "Good grooming and hygiene",
          "No apparent distress",
          "Well-developed, well-nourished",
          "Appears stated age"
        ];
      } else if (this.type == "attitude") {
        this.checkList = ["Pleasant and cooperative"];
      } else if (this.type == "eyeContact") {
        this.checkList = ["Appropriate"];
      } else if (this.type == "impulseControl") {
        this.checkList = ["Good"];
      } else if (this.type == "thoughtProcess") {
        this.checkList = ["Linear, logical and goal-directed"];
      } else if (this.type == "psychomotor") {
        this.checkList = ["Normal"];
      } else if (this.type == "insight") {
        this.checkList = ["Good"];
      } else if (this.type == "speech") {
        this.checkList = ["Regular, rate and rhythm"];
      } else if (this.type == "judgement") {
        this.checkList = ["Good"];
      } else if (this.type == "affect") {
        this.checkList = ["Euthymic", "Stable", "Full-range", "Mood congruent"];
      } else if (this.type == "thoughtContent") {
        this.checkList = [
          "No SI, intent or plan",
          "No passive death wish",
          "No HI, intent or plan",
          "No delusional thinking observed",
          "No obsessive thinking observed"
        ];
      } else if (this.type == "perception") {
        this.checkList = ["No AVH"];
      }
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
      if (this.type == "appearence") {
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
      } else if (this.type == "attitude") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Pleasant and cooperative") {
            request["pleasant-and-cooperative"] = value;
          } else if (status == "Uncooperative") {
            request["uncooperative"] = value;
          } else if (status == "Hostile or defiant") {
            request["hostile-or-defiant"] = value;
          } else if (status == "Guarded") {
            request["guarded"] = value;
          } else if (status == "Evasive") {
            request["evasive"] = value;
          } else if (status == "Apathetic") {
            request["apathetic"] = value;
          } else if (status == "Disorganized behavior") {
            request["disorganized-behavior"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateAttitudeInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "cognition") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (
            status ==
            "Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention"
          ) {
            request[
              "grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n"
            ] = value;
          } else if (status == "Impaired") {
            request["impaired"] = value;
          } else if (status == "Fluctuating") {
            request["fluctuating"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateCognitionInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "constitutional") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Vitals signs stable") {
            request["vitals-signs-stable"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateConstitutionalInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "eyeContact") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Appropriate") {
            request["appropriate"] = value;
          } else if (status == "Downcast") {
            request["downcast"] = value;
          } else if (status == "Intense") {
            request["intense"] = value;
          } else if (status == "Fleeting") {
            request["fleeting"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateEyeContactInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "impulseControl") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Good") {
            request["good"] = value;
          } else if (status == "Fair") {
            request["fair"] = value;
          } else if (status == "Questionable") {
            request["questionable"] = value;
          } else if (status == "Poor") {
            request["poor"] = value;
          } else if (status == "Impaired") {
            request["impaired"] = value;
          } else if (status == "Limited") {
            request["limited"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateImpulseControlInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "thoughtProcess") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Linear, logical and goal-directed") {
            request["linear-logical-and-goal-directed"] = value;
          } else if (status == "Disorganized") {
            request["disorganized"] = value;
          } else if (status == "Circumstantial") {
            request["circumstantial"] = value;
          } else if (status == "Tangential") {
            request["tangential"] = value;
          } else if (status == "Looseness of associations") {
            request["looseness-of-associations"] = value;
          } else if (status == "Flight of ideas") {
            request["flight-of-ideas"] = value;
          } else if (status == "Poverty of thought") {
            request["poverty-of-thought"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateThoughtProcessInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "psychomotor") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Normal") {
            request["normal"] = value;
          } else if (status == "Agitated") {
            request["agitated"] = value;
          } else if (status == "Retarded") {
            request["retarded"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdatePsychomotorInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "insight") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Good") {
            request["good"] = value;
          } else if (status == "Fair") {
            request["fair"] = value;
          } else if (status == "Questionable") {
            request["questionable"] = value;
          } else if (status == "Poor") {
            request["poor"] = value;
          } else if (status == "Impaired") {
            request["impaired"] = value;
          } else if (status == "Limited") {
            request["limited"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateInsightInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "speech") {
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
      } else if (this.type == "judgement") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Good") {
            request["good"] = value;
          } else if (status == "Fair") {
            request["fair"] = value;
          } else if (status == "Questionable") {
            request["questionable"] = value;
          } else if (status == "Poor") {
            request["poor"] = value;
          } else if (status == "Impaired") {
            request["impaired"] = value;
          } else if (status == "Limited") {
            request["limited"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateJudgementInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "affect") {
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
      } else if (this.type == "thoughtContent") {
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
      } else if (this.type == "neurological") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "Gait and station normal") {
            request["gait-and-station-normal"] = value;
          } else if (status == "Gait and station abnormal") {
            request["gait-and-station-abnormal"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdateNeurologicalInSM", {
          data: request,
          notify: this.$notify
        });
      } else if (this.type == "perception") {
        for (const status of this.statusList) {
          const value =
            this.checkList.filter(item => item == status).length > 0
              ? "yes"
              : "no";
          if (status == "No AVH") {
            request["no-avh"] = value;
          } else if (status == "+AH") {
            request["ah"] = value;
          } else if (status == "+Command AH") {
            request["command-ah"] = value;
          } else if (status == "+VH") {
            request["vh"] = value;
          }
        }

        this.$store.dispatch("mse/dbUpdatePerceptionInSM", {
          data: request,
          notify: this.$notify
        });
      }

      this.checkList = [];
      this.others = "";
      this.date = new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>