import { ADD_RECOMMENDATION, MULTIPLE_CHANGE_RECOMMENDATION, CHANGE_RECOMMENDATION, ADD_REMINDER, MULTIPLE_CHANGE_REMINDER, CHANGE_REMINDER, ADD_DIAGNOSIS, MULTIPLE_CHANGE_ASSESSMENT, CHANGE_DIAGNOSIS, ADD_SERVICE_STATEMENTS, MULTIPLE_CHANGE_SERVICE_STATEMENTS, ADD_GOAL, MULTIPLE_RATE_GOAL, RATE_GOAL, ADD_SCREEN, TAKE_A_SCREEN, RECOMMENDATION_DISCONTINUE_HISTORY } from "@/const/others.js"
export default {
  state: {
    visibility: false,
    tabList: [],                // Template has a for loop running on this.
    recommendationTabType: '',
    recommendationData: null,
    reminderTabType: '',
    reminderData: null,
    goalTabType: '',
    goalData: null,
    tabValue: ""
  },
  mutations: {
    setTabDialogVisibility(state, value) {
      state.visibility = value
    },
    setRecommendationTabType(state, value) {
      state.recommendationTabType = value
    },
    setRecommendationData(state, value) {
      state.recommendationData = value
    },
    addNewTab(state, newTab) {
      const { name } = newTab
      const checkArray = state.tabList.filter(tab => {
        return tab.name == name
      })
      if (checkArray.length == 0) {
        state.tabList.push(newTab)
      }
      state.tabValue = name
    },
    setTabValue(state, value) {
      state.tabValue = value
    },
    setTabList(state, value) {
      state.tabList = value
    },
    setReminderTabType(state, value) {
      state.reminderTabType = value
    },
    setReminderData(state, value) {
      state.reminderData = value
    },
    showAddReminderTabInLayer2(state) {
      const tab = {
        label: "Add Reminders",
        value: require("@/components/patient/reminder/layer2/AddReminder.vue").default,
        name: "tab-add-reminder"
      }
      state.tabList = [tab]
      state.reminderTabType = ADD_REMINDER
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeReminderTabInLayer2(state) {
      const tab = {
        label: "Multi change Reminders",
        value: require("@/components/patient/reminder/layer2/MultiChangeReminder.vue").default,
        name: "tab-multi-change-reminder"
      }
      state.tabList = [tab]
      state.reminderTabType = MULTIPLE_CHANGE_REMINDER
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeReminderTabInLayer2(state, data) {
      const tab = {
        label: "Change Reminder",
        value: require("@/components/patient/reminder/layer2/AddReminder.vue").default,
        name: "tab-change-reminder"
      }
      state.tabList = [tab]
      state.visibility = true
      state.reminderTabType = CHANGE_REMINDER
      state.reminderData = data
      state.tabValue = tab.name
    },
    showAddRecommendationTabInLayer2(state) {
      const tab = {
        label: "Add Recommendations",
        value: require("@/components/patient/Recommendations/Layer2/AddRecommendation.vue").default,
        name: "tab-add-recommendation"
      }
      // Once tablist is updated since it is reactive the src/views/Layer2MultiTabDialog.vue gets activated.
      state.tabList = [tab]
      state.recommendationTabType = ADD_RECOMMENDATION
      state.visibility = true
      state.tabValue = tab.name
    },

    showMultiChangeSocialHistoryTabInLayer2(state) {
      const tab = {
        label: "Change social history",
        value: require("@/components/patient/social-history/show-change-form-in-layer2-tab").default,
        name: "tab-change-shx"
      }
      // Once tablist is updated since it is reactive the src/views/Layer2MultiTabDialog.vue gets activated.
      state.tabList = [tab]
      state.recommendationTabType = ADD_RECOMMENDATION
      state.visibility = true
      state.tabValue = tab.name
    },

    showMultiChangeRecommendationTabInLayer2(state) {
      const tab = {
        label: "Multi change Recommendations",
        value: require("@/components/patient/Recommendations/Layer2/MultiChangeRecommendation.vue").default,
        name: "tab-multi-change-recommendation"
      }
      state.tabList = [tab]
      state.recommendationTabType = MULTIPLE_CHANGE_RECOMMENDATION
      state.visibility = true
      state.tabValue = tab.name
    },

    showRecommendationDiscontinueHistoryTabInLayer2(state) {
      const tab = {
        label: "Recommendation Discontinue History",
        value: require("@/components/patient/Recommendations/Layer2/RecommendationDiscontinueHistory.vue").default,
        name: "tab-recommendation-discontinue-history"
      }
      state.tabList = [tab]
      state.recommendationTabType = RECOMMENDATION_DISCONTINUE_HISTORY
      state.visibility = true
      state.tabValue = tab.name
    },

    showChangeRecommendationsTabInLayer2(state, data) {
      const tab = {
        label: "Change Recommendation",
        value: require("@/components/patient/Recommendations/Layer2/AddRecommendation.vue").default,
        name: "tab-change-recommendation"
      }
      state.tabList = [tab]
      state.visibility = true
      state.recommendationTabType = CHANGE_RECOMMENDATION
      console.log(CHANGE_RECOMMENDATION)
      state.recommendationData = data
      state.tabValue = tab.name
    },
    showAddDiagnosisTabInLayer2(state) {
      const tab = {
        label: "Add Diagnosis",
        value: require("@/components/patient/diagnosis/layer2/AddDiagnosis.vue").default,
        name: "tab-add-diagnosis"
      }
      state.tabList = [tab]
      state.diagnosisTabType = ADD_DIAGNOSIS
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeAssessmentTabInLayer2(state) {
      const tab = {
        label: "Multi change assessment diagnosis",
        value: require("@/components/patient/diagnosis/layer2/MultiChangeAssessment.vue").default,
        name: "tab-multi-change-assessment"
      }
      state.tabList = [tab]
      state.diagnosisTabType = MULTIPLE_CHANGE_ASSESSMENT
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeDiagnosisTabInLayer2(state, data) {
      const tab = {
        label: "Change Diagnosis",
        value: require("@/components/patient/diagnosis/layer2/AddDiagnosis.vue").default,
        name: "tab-change-diagnosis"
      }
      state.tabList = [tab]
      state.visibility = true
      state.diagnosisTabType = CHANGE_DIAGNOSIS
      state.diagnosisData = data
      state.tabValue = tab.name
    },
    showAddServiceStatementsTabInLayer2(state) {
      const tab = {
        label: "Add service statements",
        value: require("@/components/patient/service-statements/AddServiceStatements.vue").default,
        name: "tab-service-statements"
      }
      state.tabList = [tab]
      state.serviceStatementsTabType = ADD_SERVICE_STATEMENTS
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeServiceStatementsTabInLayer2(state) {
      const tab = {
        label: "Multi change service statements",
        value: require("@/components/patient/service-statements/MultiChangeServiceStatements.vue").default,
        name: "tab-multi-change-service-statements"
      }
      state.tabList = [tab]
      state.serviceStatementsTabType = MULTIPLE_CHANGE_SERVICE_STATEMENTS
      state.visibility = true
      state.tabValue = tab.name
    },
    showAddGoalTabInLayer2(state) {
      const tab = {
        label: "Add goal",
        value: require("@/components/patient/goal/layer2/AddGoal.vue").default,
        name: "tab-add-goal"
      }
      state.tabList = [tab]
      state.goalTabType = ADD_GOAL
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeGoalTabInLayer2(state) {
      const tab = {
        label: "Multi rate goal",
        value: require("@/components/patient/goal/layer2/MultiChangeGoal.vue").default,
        name: "tab-multi-change-goal"
      }
      state.tabList = [tab]
      state.goalTabType = MULTIPLE_RATE_GOAL
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeGoalsTabInLayer2(state, data) {
      const tab = {
        label: "Rate goal",
        value: require("@/components/patient/goal/layer2/RateGoal.vue").default,
        name: "tab-rate-goal"
      }
      state.tabList = [tab]
      state.visibility = true
      state.goalTabType = RATE_GOAL
      state.goalData = data
      state.tabValue = tab.name
    },
    showAddScreenTabInLayer2(state) {
      const tab = {
        label: "Add screen",
        value: require("@/components/patient/Screening/Layer2/AddScreen.vue").default,

        name: "tab-add-screen"
      }
      state.tabList = [tab]
      state.screeningTabType = ADD_SCREEN
      state.visibility = true
      state.tabValue = tab.name
    },
    showTakeAScreenTabInLayer2(state, data) {
      let screenName = data.scientificName.toUpperCase();
      let componentName = "Take" + screenName + 'Screen';
      const tab = {
        label: "Take " + screenName + " screen",
        value: require("@/components/patient/Screening/components/" + componentName + ".vue").default,
        name: "tab-take-a-s-screen"
      }
      state.tabList = [tab]
      state.screeningTabType = TAKE_A_SCREEN
      state.visibility = true
      state.tabValue = tab.name
    },
    showAddBMElementTabInLayer2(state) {
      const tab = {
        label: "Add Weight",
        value: require("@/components/patient/BodyMeasurements/Layer2/AddBMElement.vue").default,
        name: "tab-add-bm-element"
      }
      state.tabList = [tab]
      state.visibility = true
      state.tabValue = tab.name
    }
  }
}