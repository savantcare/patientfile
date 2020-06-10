export default [
  {
    // TODO: This key should be recommendationCard since when reading code it is not clear if its a card or a store.
    key: "recommendation",
    value: require("@/components/patient/RecommendationCard")
      .default,
    abbreviation: "rex"
  },
  {
    key: "reminder",
    value: require("@/components/patient/RemindersCard").default,
    abbreviation: "rem"
  },
  {
    key: "diagnosis",
    value: require("@/components/patient/DiagnosesCard").default,
    abbreviation: "dx"
  },
  {
    key: "goal",
    value: require("@/components/patient/GoalsCard").default,
    abbreviation: "goal"
  },
  {
    key: "socialHistory",
    value: require("@/components/patient/SocialHistoryCard")
      .default,
    abbreviation: ""
  },
  {
    key: "serviceStatements",
    value: require("@/components/patient/ServiceStatementsCard")
      .default,
    abbreviation: ""
  },
  {
    key: "bodyMeasurements",
    value: require("@/components/patient/BodyMeasurements/Card")
      .default,
    abbreviation: ""
  },
  {
    key: "contacts",
    value: require("@/components/patient/ContactsCard").default,
    abbreviation: ""
  },
  {
    key: "documents",
    value: require("@/components/patient/DocumentsCard").default,
    abbreviation: ""
  },
  {
    key: "familyHistory",
    value: require("@/components/patient/FamilyHistoryCard")
      .default,
    abbreviation: "fh"
  },
  {
    key: "AIScribe",
    value: require("@/components/patient/AIScribeCard").default,
    abbreviation: ""
  },
  {
    key: "allergiess",
    value: require("@/components/patient/AllergiesCard").default,
    abbreviation: ""
  },
  {
    key: "policies",
    value: require("@/components/patient/PoliciesCard").default,
    abbreviation: ""
  },
  {
    key: "referral",
    value: require("@/components/patient/ReferralCard").default,
    abbreviation: ""
  },
  {
    key: "screening",
    value: require("@/components/patient/Screening/Card").default,
    abbreviation: "s"
  },
  {
    key: "substancesAbuse",
    value: require("@/components/patient/SubstancesAbuseCard")
      .default,
    abbreviation: ""
  },
  {
    key: "selfHarm",
    value: require("@/components/patient/SelfHarmCard").default,
    abbreviation: ""
  },
  {
    key: "processNote",
    value: require("@/components/patient/ProcessNoteCard")
      .default,
    abbreviation: ""
  },
  {
    key: "profileCard",
    value: require("@/components/patient/ProfileCard").default,
    abbreviation: ""
  },
  {
    key: "pastPsychHistoryCard",
    value: require("@/components/patient/PastPsychHistoryCard")
      .default,
    abbreviation: ""
  }
]