<template>
  <div>
    <div style="text-align: right;">
      <el-button type="text" size="mini" @click="handleClickChangeButton">C</el-button>
      <apexchart
        type="heatmap"
        height="350"
        :options="chartOptions"
        :series="series"
        v-if="series.length > 0"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "tab", "label"],
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        colors: ["#008000"],
        xaxis: {
          type: "category"
        },
        title: {
          text: ""
        }
      }
    };
  },
  computed: {
    series() {
      let series = [];
      if (this.type == "appearence") {
        const appearences = this.$store.state.mse.appearenceList;
        let goodGrommingAndHygieneData = [];
        let noApparentDistressData = [];
        let wellDevelopedData = [];
        let statedAgeData = [];
        let yougnerAgeData = [];
        let olderAgeData = [];
        let obeseData = [];
        let thinData = [];
        let disheveledData = [];
        let malodorousData = [];
        for (const appearence of appearences) {
          const { createDate } = appearence;
          goodGrommingAndHygieneData.push({
            x: createDate,
            y: appearence["good-grooming-and-hygiene"] == "yes" ? 1 : 0
          });
          noApparentDistressData.push({
            x: createDate,
            y: appearence["no-apparent-distress"] == "yes" ? 1 : 0
          });
          wellDevelopedData.push({
            x: createDate,
            y: appearence["well-developed-well-nourished"] == "yes" ? 1 : 0
          });
          statedAgeData.push({
            x: createDate,
            y: appearence["appears-stated-age"] == "yes" ? 1 : 0
          });
          yougnerAgeData.push({
            x: createDate,
            y: appearence["appears-younger-then-stated-age"] == "yes" ? 1 : 0
          });
          olderAgeData.push({
            x: createDate,
            y: appearence["appears-older-then-stated-age"] == "yes" ? 1 : 0
          });
          obeseData.push({
            x: createDate,
            y: appearence["obese"] == "yes" ? 1 : 0
          });
          thinData.push({
            x: createDate,
            y: appearence["thin-or-cachetic"] == "yes" ? 1 : 0
          });
          disheveledData.push({
            x: createDate,
            y: appearence["disheveled-unkempt"] == "yes" ? 1 : 0
          });
          malodorousData.push({
            x: createDate,
            y: appearence["malodorus"] == "yes" ? 1 : 0
          });
        }
        series.push(
          {
            name: "Good grooming and hygiene",
            data: goodGrommingAndHygieneData
          },
          {
            name: "No apparent distress",
            data: noApparentDistressData
          },
          {
            name: "Well-developed, well-nourished",
            data: wellDevelopedData
          },
          {
            name: "Appears stated age",
            data: statedAgeData
          },
          {
            name: "Appears younger than stated age",
            data: yougnerAgeData
          },
          {
            name: "Appears older than stated age",
            data: olderAgeData
          },
          {
            name: "Obese",
            data: obeseData
          },
          {
            name: "Thin or cachectic",
            data: thinData
          },
          {
            name: "Disheveled, unkempt",
            data: disheveledData
          },
          {
            name: "Malodorous",
            data: malodorousData
          }
        );
      } else if (this.type == "attitude") {
        const attitudes = this.$store.state.mse.attitudeList;
        let pleasantData = [];
        let uncooperativeData = [];
        let hostileData = [];
        let guardedData = [];
        let evasiveData = [];
        let apatheticData = [];
        let disorganizedData = [];
        for (const attitude of attitudes) {
          const { createDate } = attitude;
          pleasantData.push({
            x: createDate,
            y: attitude["pleasant-and-cooperative"] == "yes" ? 1 : 0
          });
          uncooperativeData.push({
            x: createDate,
            y: attitude["uncooperative"] == "yes" ? 1 : 0
          });
          hostileData.push({
            x: createDate,
            y: attitude["hostile-or-defiant"] == "yes" ? 1 : 0
          });
          guardedData.push({
            x: createDate,
            y: attitude["guarded"] == "yes" ? 1 : 0
          });
          evasiveData.push({
            x: createDate,
            y: attitude["evasive"] == "yes" ? 1 : 0
          });
          apatheticData.push({
            x: createDate,
            y: attitude["apathetic"] == "yes" ? 1 : 0
          });
          disorganizedData.push({
            x: createDate,
            y: attitude["disorganized-behavior"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Pleasant and cooperative",
            data: pleasantData
          },
          {
            name: "Uncooperative",
            data: uncooperativeData
          },
          {
            name: "Hostile or defiant",
            data: hostileData
          },
          {
            name: "Guarded",
            data: guardedData
          },
          {
            name: "Evasive",
            data: evasiveData
          },
          {
            name: "Apathetic",
            data: apatheticData
          },
          {
            name: "Disorganized behavior",
            data: disorganizedData
          }
        );
      } else if (this.type == "cognition") {
        const cognitions = this.$store.state.mse.cognitionList;
        let grosslyIntactData = [];
        let impairedData = [];
        let fluctuatingData = [];

        for (const cognition of cognitions) {
          const { createDate } = cognition;
          grosslyIntactData.push({
            x: createDate,
            y:
              cognition[
                "grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n"
              ] == "yes"
                ? 1
                : 0
          });
          impairedData.push({
            x: createDate,
            y: cognition["impaired"] == "yes" ? 1 : 0
          });
          fluctuatingData.push({
            x: createDate,
            y: cognition["fluctuating"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name:
              "Grossly intact, no memory impairment, adequate fund of knowledge, no language deficit, normal attention",
            data: grosslyIntactData
          },
          {
            name: "Impaired",
            data: impairedData
          },
          {
            name: "Fluctuating",
            data: fluctuatingData
          }
        );
      } else if (this.type == "constitutional") {
        const constitutionals = this.$store.state.mse.constitutionalList;
        let vitalData = [];

        for (const constitutional of constitutionals) {
          const { createDate } = constitutional;
          vitalData.push({
            x: createDate,
            y: constitutional["vitals-signs-stable"] == "yes" ? 1 : 0
          });
        }

        series.push({
          name: "Vitals signs stable",
          data: vitalData
        });
      } else if (this.type == "eyeContact") {
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
      } else if (this.type == "impulseControl") {
        const impulseControls = this.$store.state.mse.impulseControlList;

        let goodData = [];
        let questionData = [];
        let poorData = [];
        let impairedData = [];
        let limitedData = [];
        let fairData = [];

        for (const impulseControl of impulseControls) {
          const { createDate } = impulseControl;

          goodData.push({
            x: createDate,
            y: impulseControl["good"] == "yes" ? 1 : 0
          });
          fairData.push({
            x: createDate,
            y: impulseControl["fair"] == "yes" ? 1 : 0
          });
          questionData.push({
            x: createDate,
            y: impulseControl["questionable"] == "yes" ? 1 : 0
          });
          poorData.push({
            x: createDate,
            y: impulseControl["poor"] == "yes" ? 1 : 0
          });
          limitedData.push({
            x: createDate,
            y: impulseControl["limited"] == "yes" ? 1 : 0
          });
          impairedData.push({
            x: createDate,
            y: impulseControl["impaired"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Good",
            data: goodData
          },
          {
            name: "Fair",
            data: fairData
          },
          {
            name: "Questionable",
            data: questionData
          },
          {
            name: "Poor",
            data: poorData
          },
          {
            name: "Impaired",
            data: impairedData
          },
          {
            name: "Limited",
            data: limitedData
          }
        );
      } else if (this.type == "thoughtProcess") {
        const thoughtProceses = this.$store.state.mse.thoughtProcessList;

        let linearData = [];
        let disorganizedData = [];
        let circumstantialData = [];
        let tangentialData = [];
        let looseData = [];
        let flightData = [];
        let povertyData = [];

        for (const thoughtProcess of thoughtProceses) {
          const { createDate } = thoughtProcess;

          linearData.push({
            x: createDate,
            y:
              thoughtProcess["linear-logical-and-goal-directed"] == "yes"
                ? 1
                : 0
          });
          disorganizedData.push({
            x: createDate,
            y: thoughtProcess["disorganized"] == "yes" ? 1 : 0
          });
          circumstantialData.push({
            x: createDate,
            y: thoughtProcess["circumstantial"] == "yes" ? 1 : 0
          });
          tangentialData.push({
            x: createDate,
            y: thoughtProcess["tangential"] == "yes" ? 1 : 0
          });
          looseData.push({
            x: createDate,
            y: thoughtProcess["looseness-of-associations"] == "yes" ? 1 : 0
          });
          flightData.push({
            x: createDate,
            y: thoughtProcess["flight-of-ideas"] == "yes" ? 1 : 0
          });
          povertyData.push({
            x: createDate,
            y: thoughtProcess["poverty-of-thought"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Linear, logical and goal-directed",
            data: linearData
          },
          {
            name: "Disorganized",
            data: disorganizedData
          },
          {
            name: "Circumstantial",
            data: circumstantialData
          },
          {
            name: "Tangential",
            data: tangentialData
          },
          {
            name: "Looseness of associations",
            data: looseData
          },
          {
            name: "Flight of ideas",
            data: flightData
          },
          {
            name: "Poverty of thought",
            data: povertyData
          }
        );
      } else if (this.type == "psychomotor") {
        const psychomotors = this.$store.state.mse.psychomotorList;

        let normalData = [];
        let agitatedData = [];
        let retardedData = [];

        for (const psychomotor of psychomotors) {
          const { createDate } = psychomotor;

          normalData.push({
            x: createDate,
            y: psychomotor["normal"] == "yes" ? 1 : 0
          });
          agitatedData.push({
            x: createDate,
            y: psychomotor["agitated"] == "yes" ? 1 : 0
          });
          retardedData.push({
            x: createDate,
            y: psychomotor["retarded"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Normal",
            data: normalData
          },
          {
            name: "Agitated",
            data: agitatedData
          },
          {
            name: "Retarded",
            data: retardedData
          }
        );
      } else if (this.type == "insight") {
        const insights = this.$store.state.mse.insightList;

        let goodData = [];
        let fairData = [];
        let questionData = [];
        let poorData = [];
        let impairedData = [];
        let limitedData = [];

        for (const insight of insights) {
          const { createDate } = insight;

          goodData.push({
            x: createDate,
            y: insight["good"] == "yes" ? 1 : 0
          });
          fairData.push({
            x: createDate,
            y: insight["fair"] == "yes" ? 1 : 0
          });
          questionData.push({
            x: createDate,
            y: insight["questionable"] == "yes" ? 1 : 0
          });
          poorData.push({
            x: createDate,
            y: insight["poor"] == "yes" ? 1 : 0
          });
          impairedData.push({
            x: createDate,
            y: insight["impaired"] == "yes" ? 1 : 0
          });
          limitedData.push({
            x: createDate,
            y: insight["limited"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Good",
            data: goodData
          },
          {
            name: "Fair",
            data: fairData
          },
          {
            name: "Questionable",
            data: questionData
          },
          {
            name: "Poor",
            data: poorData
          },
          {
            name: "Impaired",
            data: impairedData
          },
          {
            name: "Limited",
            data: limitedData
          }
        );
      } else if (this.type == "speech") {
        const speeches = this.$store.state.mse.speechList;

        let regularData = [];
        let fluentData = [];
        let incoherentData = [];
        let talkNativeData = [];
        let pressuredData = [];
        let mumblingData = [];

        for (const speech of speeches) {
          const { createDate } = speech;

          regularData.push({
            x: createDate,
            y: speech["regular-rate-and-rhythm"] == "yes" ? 1 : 0
          });
          fluentData.push({
            x: createDate,
            y: speech["fluent"] == "yes" ? 1 : 0
          });
          incoherentData.push({
            x: createDate,
            y: speech["incoherent"] == "yes" ? 1 : 0
          });
          talkNativeData.push({
            x: createDate,
            y: speech["talkative"] == "yes" ? 1 : 0
          });
          pressuredData.push({
            x: createDate,
            y: speech["pressured"] == "yes" ? 1 : 0
          });
          mumblingData.push({
            x: createDate,
            y: speech["mumbling"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Regular, rate and rhythm",
            data: regularData
          },
          {
            name: "Fluent",
            data: fluentData
          },
          {
            name: "Incoherent",
            data: incoherentData
          },
          {
            name: "Talkative",
            data: talkNativeData
          },
          {
            name: "Pressured",
            data: pressuredData
          },
          {
            name: "Mumbling",
            data: mumblingData
          }
        );
      } else if (this.type == "judgement") {
        const judgements = this.$store.state.mse.judgementList;

        let goodData = [];
        let fairData = [];
        let questionData = [];
        let poorData = [];
        let impairedData = [];
        let limitedData = [];

        for (const judgement of judgements) {
          const { createDate } = judgement;

          goodData.push({
            x: createDate,
            y: judgement["good"] == "yes" ? 1 : 0
          });
          fairData.push({
            x: createDate,
            y: judgement["fair"] == "yes" ? 1 : 0
          });
          questionData.push({
            x: createDate,
            y: judgement["questionable"] == "yes" ? 1 : 0
          });
          poorData.push({
            x: createDate,
            y: judgement["poor"] == "yes" ? 1 : 0
          });
          impairedData.push({
            x: createDate,
            y: judgement["impaired"] == "yes" ? 1 : 0
          });
          limitedData.push({
            x: createDate,
            y: judgement["limited"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Good",
            data: goodData
          },
          {
            name: "Fair",
            data: fairData
          },
          {
            name: "Questionable",
            data: questionData
          },
          {
            name: "Poor",
            data: poorData
          },
          {
            name: "Impaired",
            data: impairedData
          },
          {
            name: "Limited",
            data: limitedData
          }
        );
      } else if (this.type == "affect") {
        const affects = this.$store.state.mse.affectList;

        let euthymicData = [];
        let dysphoricData = [];
        let irritableData = [];
        let angryData = [];
        let brightData = [];
        let euphoricData = [];
        let labileData = [];
        let stableData = [];
        let moodCongruentData = [];
        let moodIncogruentData = [];
        let expansiveData = [];
        let fullRangeData = [];
        let constrictedData = [];
        let bluntedData = [];
        let flatData = [];
        let anxiousData = [];
        let tearfulData = [];
        let dysthymicData = [];

        for (const affect of affects) {
          const { createDate } = affect;

          euthymicData.push({
            x: createDate,
            y: affect["euthymic"] == "yes" ? 1 : 0
          });
          dysphoricData.push({
            x: createDate,
            y: affect["dysphoric"] == "yes" ? 1 : 0
          });
          irritableData.push({
            x: createDate,
            y: affect["irritable"] == "yes" ? 1 : 0
          });
          angryData.push({
            x: createDate,
            y: affect["angry"] == "yes" ? 1 : 0
          });
          brightData.push({
            x: createDate,
            y: affect["bright"] == "yes" ? 1 : 0
          });
          euphoricData.push({
            x: createDate,
            y: affect["euphoric"] == "yes" ? 1 : 0
          });
          labileData.push({
            x: createDate,
            y: affect["labile"] == "yes" ? 1 : 0
          });
          stableData.push({
            x: createDate,
            y: affect["stable"] == "yes" ? 1 : 0
          });
          moodCongruentData.push({
            x: createDate,
            y: affect["mood-congruent"] == "yes" ? 1 : 0
          });
          moodIncogruentData.push({
            x: createDate,
            y: affect["mood-incongruent"] == "yes" ? 1 : 0
          });
          expansiveData.push({
            x: createDate,
            y: affect["expansive"] == "yes" ? 1 : 0
          });
          fullRangeData.push({
            x: createDate,
            y: affect["full-range"] == "yes" ? 1 : 0
          });
          constrictedData.push({
            x: createDate,
            y: affect["constricted"] == "yes" ? 1 : 0
          });
          bluntedData.push({
            x: createDate,
            y: affect["blunted"] == "yes" ? 1 : 0
          });
          flatData.push({
            x: createDate,
            y: affect["flat"] == "yes" ? 1 : 0
          });
          anxiousData.push({
            x: createDate,
            y: affect["anxious"] == "yes" ? 1 : 0
          });
          tearfulData.push({
            x: createDate,
            y: affect["tearful"] == "yes" ? 1 : 0
          });
          dysthymicData.push({
            x: createDate,
            y: affect["dysthymic"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "Euthymic",
            data: euthymicData
          },
          {
            name: "Dysphoric",
            data: dysphoricData
          },
          {
            name: "Irritable",
            data: irritableData
          },
          {
            name: "Angry",
            data: angryData
          },
          {
            name: "Bright",
            data: brightData
          },
          {
            name: "Euphoric",
            data: euphoricData
          },
          {
            name: "Labile",
            data: labileData
          },
          {
            name: "Stable",
            data: stableData
          },
          {
            name: "Mood congruent",
            data: moodCongruentData
          },
          {
            name: "Mood incongruent",
            data: moodIncogruentData
          },
          {
            name: "Expansive",
            data: expansiveData
          },
          {
            name: "Constricted",
            data: constrictedData
          },
          {
            name: "Blunted",
            data: bluntedData
          },
          {
            name: "Flat",
            data: flatData
          },
          {
            name: "Anxious",
            data: anxiousData
          },
          {
            name: "Tearful",
            data: tearfulData
          },
          {
            name: "Dysthymic",
            data: dysthymicData
          },
          {
            name: "Full-range",
            data: fullRangeData
          }
        );
      } else if (this.type == "thoughtContent") {
        const thoughtContents = this.$store.state.mse.thoughtContentList;

        let noSiIntentData = [];
        let noPassiveDeathData = [];
        let noHiIntentData = [];
        let noDelusionalData = [];
        let noObessiveData = [];
        let ruminationData = [];
        let siWithoutData = [];
        let siAsData = [];
        let hiAsData = [];
        let delusionData = [];
        let iorData = [];
        let obessionData = [];
        let passiveData = [];

        for (const thoughtContent of thoughtContents) {
          const { createDate } = thoughtContent;

          noSiIntentData.push({
            x: createDate,
            y: thoughtContent["no-si-intent-or-plan"] == "yes" ? 1 : 0
          });
          noPassiveDeathData.push({
            x: createDate,
            y: thoughtContent["no-passive-death-wish"] == "yes" ? 1 : 0
          });
          noHiIntentData.push({
            x: createDate,
            y: thoughtContent["no-hi-intent-or-plan"] == "yes" ? 1 : 0
          });
          noDelusionalData.push({
            x: createDate,
            y:
              thoughtContent["no-delusional-thinking-observed"] == "yes" ? 1 : 0
          });
          noObessiveData.push({
            x: createDate,
            y: thoughtContent["no-obsessive-thinking-observed"] == "yes" ? 1 : 0
          });
          ruminationData.push({
            x: createDate,
            y: thoughtContent["ruminations"] == "yes" ? 1 : 0
          });
          siWithoutData.push({
            x: createDate,
            y: thoughtContent["si-without-intent-or-plan"] == "yes" ? 1 : 0
          });
          siAsData.push({
            x: createDate,
            y: thoughtContent["si-as-detailed-below"] == "yes" ? 1 : 0
          });
          hiAsData.push({
            x: createDate,
            y: thoughtContent["hi-as-detailed-below"] == "yes" ? 1 : 0
          });
          delusionData.push({
            x: createDate,
            y: thoughtContent["delusions"] == "yes" ? 1 : 0
          });
          iorData.push({
            x: createDate,
            y: thoughtContent["ior"] == "yes" ? 1 : 0
          });
          obessionData.push({
            x: createDate,
            y: thoughtContent["obsessions"] == "yes" ? 1 : 0
          });
          passiveData.push({
            x: createDate,
            y: thoughtContent["passive-death-wish"] == "yes" ? 1 : 0
          });
        }

        series.push(
          {
            name: "No SI, intent or plan",
            data: noSiIntentData
          },
          {
            name: "No passive death wish",
            data: noPassiveDeathData
          },
          {
            name: "No HI, intent or plan",
            data: noHiIntentData
          },
          {
            name: "No delusional thinking observed",
            data: noDelusionalData
          },
          {
            name: "No obsessive thinking observed",
            data: noObessiveData
          },
          {
            name: "+ruminations",
            data: ruminationData
          },
          {
            name: "+SI without intent or plan",
            data: siWithoutData
          },
          {
            name: "+SI as detailed below",
            data: siAsData
          },
          {
            name: "+HI as detailed below",
            data: hiAsData
          },
          {
            name: "+delusions",
            data: delusionData
          },
          {
            name: "+IOR",
            data: iorData
          },
          {
            name: "+obsessions",
            data: obessionData
          },
          {
            name: "Passive death wish",
            data: passiveData
          }
        );
      }
      return series;
    }
  },
  mounted() {
    const params = { patientId: this.$route.query.patient_id };
    if (this.type == "appearence") {
      this.$store.dispatch("mse/getAppearence", params);
    } else if (this.type == "attitude") {
      this.$store.dispatch("mse/getAttitude", params);
    } else if (this.type == "cognition") {
      this.$store.dispatch("mse/getCognition", params);
    } else if (this.type == "constitutional") {
      this.$store.dispatch("mse/getConstitutional", params);
    } else if (this.type == "eyeContact") {
      this.$store.dispatch("mse/getEyeContact", params);
    } else if (this.type == "impulseControl") {
      this.$store.dispatch("mse/getImpulseControl", params);
    } else if (this.type == "thoughtProcess") {
      this.$store.dispatch("mse/getThoughtProcess", params);
    } else if (this.type == "psychomotor") {
      this.$store.dispatch("mse/getPsychomotor", params);
    } else if (this.type == "insight") {
      this.$store.dispatch("mse/getInsight", params);
    } else if (this.type == "speech") {
      this.$store.dispatch("mse/getSpeech", params);
    } else if (this.type == "judgement") {
      this.$store.dispatch("mse/getJudgement", params);
    } else if (this.type == "affect") {
      this.$store.dispatch("mse/getAffect", params);
    } else if (this.type == "thoughtContent") {
      this.$store.dispatch("mse/getThoughtContent", params);
    }
  },
  methods: {
    handleClickChangeButton() {
      this.$store.commit("mse/setSelectedType", this.type);
      this.$store.commit("showChangeMSETabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>