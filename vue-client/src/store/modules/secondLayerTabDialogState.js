import { ADD_RECOMMENDATION, MULTIPLE_CHANGE_RECOMMENDATION, CHANGE_RECOMMENDATION, ADD_REMINDER, MULTIPLE_CHANGE_REMINDER, CHANGE_REMINDER, ADD_DIAGNOSIS, MULTIPLE_CHANGE_ASSESSMENT, CHANGE_DIAGNOSIS, ADD_SERVICE_STATEMENTS, MULTIPLE_CHANGE_SERVICE_STATEMENTS, ADD_GOAL, MULTIPLE_RATE_GOAL, RATE_GOAL, ADD_SCREEN, TAKE_A_SCREEN, RECOMMENDATION_DISCONTINUE_HISTORY } from "@/const.js"
export default {
  state: {
    visibility: false,
    tabList: [],
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
    showAddReminderTabInSecondLayer(state) {
      const tab = {
        label: "Add Reminders",
        value: require("@/components/composition-layer2/reminder/AddReminder.vue").default,
        name: "tab-add-reminder"
      }
      state.tabList = [tab]
      state.reminderTabType = ADD_REMINDER
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeReminderTabInSecondLayer(state) {
      const tab = {
        label: "Multi change Reminders",
        value: require("@/components/composition-layer2/reminder/MultiChangeReminder.vue").default,
        name: "tab-multi-change-reminder"
      }
      state.tabList = [tab]
      state.reminderTabType = MULTIPLE_CHANGE_REMINDER
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeReminderTab(state, data) {
      const tab = {
        label: "Change Reminder",
        value: require("@/components/composition-layer2/reminder/AddReminder.vue").default,
        name: "tab-change-reminder"
      }
      state.tabList = [tab]
      state.visibility = true
      state.reminderTabType = CHANGE_REMINDER
      state.reminderData = data
      state.tabValue = tab.name
    },
    showAddRecommendationTab(state) {
      const tab = {
        label: "Add Recommendations",
        value: require("@/components/composition-layer2/recommendation/AddRecommendation.vue").default,
        name: "tab-add-recommendation"
      }
      // Once tablist is updated since it is reactive the src/views/secondLayerTabDialog.vue gets activated.
      state.tabList = [tab]
      state.recommendationTabType = ADD_RECOMMENDATION
      state.visibility = true
      state.tabValue = tab.name
    },


    showMultiChangeRecommendationTab(state) {
      const tab = {
        label: "Multi change Recommendations",
        value: require("@/components/composition-layer2/recommendation/MultiChangeRecommendation.vue").default,
        name: "tab-multi-change-recommendation"
      }
      state.tabList = [tab]
      state.recommendationTabType = MULTIPLE_CHANGE_RECOMMENDATION
      state.visibility = true
      state.tabValue = tab.name
    },

    showRecommendationDiscontinueHistoryTab(state) {
      const tab = {
        label: "Recommendation Discontinue History",
        value: require("@/components/composition-layer2/recommendation/RecommendationDiscontinueHistory.vue").default,
        name: "tab-recommendation-discontinue-history"
      }
      state.tabList = [tab]
      state.recommendationTabType = RECOMMENDATION_DISCONTINUE_HISTORY
      state.visibility = true
      state.tabValue = tab.name
    },

    showChangeRecommendationsTab(state, data) {
      const tab = {
        label: "Change Recommendation",
        value: require("@/components/composition-layer2/recommendation/AddRecommendation.vue").default,
        name: "tab-change-recommendation"
      }
      state.tabList = [tab]
      state.visibility = true
      state.recommendationTabType = CHANGE_RECOMMENDATION
      console.log(CHANGE_RECOMMENDATION)
      state.recommendationData = data
      state.tabValue = tab.name
    },
    showAddDiagnosisTab(state) {
      const tab = {
        label: "Add Diagnosis",
        value: require("@/components/composition-layer2/diagnosis/AddDiagnosis.vue").default,
        name: "tab-add-diagnosis"
      }
      state.tabList = [tab]
      state.diagnosisTabType = ADD_DIAGNOSIS
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeAssessmentTab(state) {
      const tab = {
        label: "Multi change assessment diagnosis",
        value: require("@/components/composition-layer2/diagnosis/MultiChangeAssessment.vue").default,
        name: "tab-multi-change-assessment"
      }
      state.tabList = [tab]
      state.diagnosisTabType = MULTIPLE_CHANGE_ASSESSMENT
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeDiagnosisTab(state, data) {
      const tab = {
        label: "Change Diagnosis",
        value: require("@/components/composition-layer2/diagnosis/AddDiagnosis.vue").default,
        name: "tab-change-diagnosis"
      }
      state.tabList = [tab]
      state.visibility = true
      state.diagnosisTabType = CHANGE_DIAGNOSIS
      state.diagnosisData = data
      state.tabValue = tab.name
    },
    showAddServiceStatementsTab(state) {
      const tab = {
        label: "Add service statements",
        value: require("@/components/composition-layer2/service-statements/AddServiceStatements.vue").default,
        name: "tab-service-statements"
      }
      state.tabList = [tab]
      state.serviceStatementsTabType = ADD_SERVICE_STATEMENTS
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeServiceStatementsTab(state) {
      const tab = {
        label: "Multi change service statements",
        value: require("@/components/composition-layer2/service-statements/MultiChangeServiceStatements.vue").default,
        name: "tab-multi-change-service-statements"
      }
      state.tabList = [tab]
      state.serviceStatementsTabType = MULTIPLE_CHANGE_SERVICE_STATEMENTS
      state.visibility = true
      state.tabValue = tab.name
    },
    showAddGoalTab(state) {
      const tab = {
        label: "Add goal",
        value: require("@/components/composition-layer2/goal/AddGoal.vue").default,
        name: "tab-add-goal"
      }
      state.tabList = [tab]
      state.goalTabType = ADD_GOAL
      state.visibility = true
      state.tabValue = tab.name
    },
    showMultiChangeGoalTab(state) {
      const tab = {
        label: "Multi rate goal",
        value: require("@/components/composition-layer2/goal/MultiChangeGoal.vue").default,
        name: "tab-multi-change-goal"
      }
      state.tabList = [tab]
      state.goalTabType = MULTIPLE_RATE_GOAL
      state.visibility = true
      state.tabValue = tab.name
    },
    showChangeGoalsTab(state, data) {
      const tab = {
        label: "Rate goal",
        value: require("@/components/composition-layer2/goal/RateGoal.vue").default,
        name: "tab-rate-goal"
      }
      state.tabList = [tab]
      state.visibility = true
      state.goalTabType = RATE_GOAL
      state.goalData = data
      state.tabValue = tab.name
    },
    showAddScreenTab(state) {
      const tab = {
        label: "Add screen",
        value: require("@/components/composition-layer2/screening/AddScreen.vue").default,
        name: "tab-add-screen"
      }
      state.tabList = [tab]
      state.screeningTabType = ADD_SCREEN
      state.visibility = true
      state.tabValue = tab.name
    },
    showTakeAScreenTab(state) {
      const tab = {
        label: "Take a screen",
        value: require("@/components/composition-layer2/screening/TakeAScreen.vue").default,
        name: "tab-take-a-s-screen"
      }
      state.tabList = [tab]
      state.screeningTabType = TAKE_A_SCREEN
      state.visibility = true
      state.tabValue = tab.name
    }
  }
}