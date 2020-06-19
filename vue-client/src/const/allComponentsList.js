export default [
  {
    // TODO: This key should be Recommendations/Layer1Card since when reading code it is not clear if its a card or a store.
    key: "recommendation",
    value: require("@/components/patient/Recommendations/Layer1Card").default,
    abbreviation: "rex",
  },
  {
    key: "reminder",
    value: require("@/components/patient/reminder/Layer1Card").default,
    abbreviation: "rem",
  },
  {
    key: "diagnosis",
    value: require("@/components/patient/diagnosis/Layer1Card").default,
    abbreviation: "dx",
  },
  {
    key: "goal",
    value: require("@/components/patient/goal/Layer1Card").default,
    abbreviation: "goal",
  },
  {
    key: "socialHistory",
    value: require("@/components/patient/social-history/Layer1Card").default,
    abbreviation: "shx",
  },
  {
    key: "serviceStatements",
    value: require("@/components/patient/service-statements/ServiceStatementsCard")
      .default,
    abbreviation: "ss",
  },
  {
    key: "bodyMeasurements",
    value: require("@/components/patient/BodyMeasurements/CurrentStateCard")
      .default,
    abbreviation: "bm",
  },
  {
    key: "contacts",
    value: require("@/components/patient/Contacts/ContactsCard").default,
    abbreviation: "",
  },
  {
    key: "documents",
    value: require("@/components/patient/Documents/DocumentsCard").default,
    abbreviation: "",
  },
  {
    key: "familyHistory",
    value: require("@/components/patient/FamilyHistory/FamilyHistoryCard")
      .default,
    abbreviation: "fh",
  },
  {
    key: "AIScribe",
    value: require("@/components/patient/AIScribe/AIScribeCard").default,
    abbreviation: "",
  },
  {
    key: "allergiess",
    value: require("@/components/patient/Allergies/AllergiesCard").default,
    abbreviation: "",
  },
  {
    key: "policies",
    value: require("@/components/patient/Policies/PoliciesCard").default,
    abbreviation: "",
  },
  {
    key: "referral",
    value: require("@/components/patient/Referral/ReferralCard").default,
    abbreviation: "",
  },
  {
    key: "screening",
    value: require("@/components/patient/Screening/Layer1Card").default,
    abbreviation: "s",
  },
  {
    key: "substancesAbuse",
    value: require("@/components/patient/SubstancesAbuse/SubstancesAbuseCard")
      .default,
    abbreviation: "",
  },
  {
    key: "selfHarm",
    value: require("@/components/patient/SelfHarm/SelfHarmCard").default,
    abbreviation: "",
  },
  {
    key: "processNote",
    value: require("@/components/patient/ProcessNote/ProcessNoteCard").default,
    abbreviation: "",
  },
  {
    key: "profileCard",
    value: require("@/components/patient/Profile/ProfileCard").default,
    abbreviation: "",
  },
  {
    key: "pastPsychHistoryCard",
    value: require("@/components/patient/PastPsychHistory/Layer1Card").default,
    abbreviation: "pphx",
  },
  {
    key: "mentalStatusExamCard",
    value: require("@/components/patient/MentalStatusExam/CurrentStateCard").default,
    abbreviation: "mse",
  },
  {
    key: "psychReviewOfSystemsCard",
    value: require("@/components/patient/PsychReviewOfSystems/Layer1Card")
      .default,
    abbreviation: "pros",
  },
];
