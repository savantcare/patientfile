export default [
  {
    // TODO: This key should be recommendationCard since when reading code it is not clear if its a card or a store.
    key: "recommendation",
    value: require("@/components/composition-layer1/RecommendationCard")
      .default,
    abbreviation: "rex"
  },
  {
    key: "reminder",
    value: require("@/components/composition-layer1/RemindersCard").default,
    abbreviation: "rem"
  },
  {
    key: "diagnosis",
    value: require("@/components/composition-layer1/DiagnosesCard").default,
    abbreviation: "dx"
  },
  {
    key: "goal",
    value: require("@/components/composition-layer1/GoalsCard").default,
    abbreviation: "goal"
  },
  {
    key: "socialHistory",
    value: require("@/components/composition-layer1/SocialHistoryCard")
      .default,
    abbreviation: ""
  },
  {
    key: "serviceStatements",
    value: require("@/components/composition-layer1/ServiceStatementsCard")
      .default,
    abbreviation: ""
  },
  {
    key: "bodyMeasurements",
    value: require("@/components/composition-layer1/BodyMeasurements/Card")
      .default,
    abbreviation: ""
  },
  {
    key: "contacts",
    value: require("@/components/composition-layer1/ContactsCard").default,
    abbreviation: ""
  },
  {
    key: "documents",
    value: require("@/components/composition-layer1/DocumentsCard").default,
    abbreviation: ""
  },
  {
    key: "familyHistory",
    value: require("@/components/composition-layer1/FamilyHistoryCard")
      .default,
    abbreviation: "fh"
  },
  {
    key: "AIScribe",
    value: require("@/components/composition-layer1/AIScribeCard").default,
    abbreviation: ""
  },
  {
    key: "allergiess",
    value: require("@/components/composition-layer1/AllergiesCard").default,
    abbreviation: ""
  },
  {
    key: "policies",
    value: require("@/components/composition-layer1/PoliciesCard").default,
    abbreviation: ""
  },
  {
    key: "referral",
    value: require("@/components/composition-layer1/ReferralCard").default,
    abbreviation: ""
  },
  {
    key: "screening",
    value: require("@/components/composition-layer1/Screening/Card").default,
    abbreviation: "s"
  },
  {
    key: "substancesAbuse",
    value: require("@/components/composition-layer1/SubstancesAbuseCard")
      .default,
    abbreviation: ""
  },
  {
    key: "selfHarm",
    value: require("@/components/composition-layer1/SelfHarmCard").default,
    abbreviation: ""
  },
  {
    key: "processNote",
    value: require("@/components/composition-layer1/ProcessNoteCard")
      .default,
    abbreviation: ""
  },
  {
    key: "profileCard",
    value: require("@/components/composition-layer1/ProfileCard").default,
    abbreviation: ""
  },
  {
    key: "pastPsychHistoryCard",
    value: require("@/components/composition-layer1/PastPsychHistoryCard")
      .default,
    abbreviation: ""
  }
]