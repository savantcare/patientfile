export default [
  {
    // TODO: This key should be recommendationCard since when reading code it is not clear if its a card or a store.
    key: "recommendation",
    value: require("@/components/composition-layer1/RecommendationCard")
      .default
  },
  {
    key: "reminder",
    value: require("@/components/composition-layer1/RemindersCard").default
  },
  {
    key: "diagnosis",
    value: require("@/components/composition-layer1/DiagnosesCard").default
  },
  {
    key: "goal",
    value: require("@/components/composition-layer1/GoalsCard").default
  },
  {
    key: "socialHistory",
    value: require("@/components/composition-layer1/SocialHistoryCard")
      .default
  },
  {
    key: "serviceStatements",
    value: require("@/components/composition-layer1/ServiceStatementsCard")
      .default
  },
  {
    key: "bodyMeasurements",
    value: require("@/components/composition-layer1/BodyMeasurementsCard")
      .default
  },
  {
    key: "contacts",
    value: require("@/components/composition-layer1/ContactsCard").default
  },
  {
    key: "documents",
    value: require("@/components/composition-layer1/DocumentsCard").default
  },
  {
    key: "familyHistory",
    value: require("@/components/composition-layer1/FamilyHistoryCard")
      .default
  },
  {
    key: "hospitalizations",
    value: require("@/components/composition-layer1/HospitalizationsCard")
      .default
  },
  {
    key: "AIScribe",
    value: require("@/components/composition-layer1/AIScribeCard").default
  },
  {
    key: "allergiess",
    value: require("@/components/composition-layer1/AllergiesCard").default
  },
  {
    key: "policies",
    value: require("@/components/composition-layer1/PoliciesCard").default
  },
  {
    key: "referral",
    value: require("@/components/composition-layer1/ReferralCard").default
  },
  {
    key: "screening",
    value: require("@/components/composition-layer1/ScreeningCard").default
  },
  {
    key: "substancesAbuse",
    value: require("@/components/composition-layer1/SubstancesAbuseCard")
      .default
  },
  {
    key: "selfHarm",
    value: require("@/components/composition-layer1/SelfHarmCard").default
  },
  {
    key: "processNote",
    value: require("@/components/composition-layer1/ProcessNoteCard")
      .default
  },
  {
    key: "profileCard",
    value: require("@/components/composition-layer1/ProfileCard").default
  },
  {
    key: "pastPsychHistoryCard",
    value: require("@/components/composition-layer1/PastPsychHistoryCard")
      .default
  }
]