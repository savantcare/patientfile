import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

// modules
import recommendationStateModule from './modules/recommendationState'
import diagnosisStateModule from './modules/diagnosisState'
import reminderStateModule from './modules/reminderState'
import goalStateModule from './modules/goalState'
import settingStateModule from './modules/settingState'
import rightPanelStateModule from './modules/rightPanelState'
import secondLayerTabDialogStateModule from './modules/secondLayerTabDialogState'
import stateOnASelectedTimeModule from './modules/stateOnASelectedTimeSide'
import socialHistoryStateModule from './modules/socialHistoryState'

import { ROLE_API_URL } from "@/const.js"

// READABLE: Take this out of index.js

export default new Vuex.Store({
  state: {
    userRole: '',
    searchComponentList: [
      "recommendation (rex)",
      "recommendation (rex) add",
      "recommendation (rex) multi change",
      "recommendation (rex) focus",
      "recommendation (rex) download pdf",
      "recommendation (rex) send to patient (HDR)",
      "reminder (rem)",
      "reminder (rex) add",
      "reminder (rex) multi change",
      "reminder (rex) focus",
      "reminder (rex) download pdf",
      "reminder (rex) send to patient (HDR)",
      "goal (g)",
      "clear"
    ],
    focusComponent: "",
    connectionStatus: true, // true: online, false: offline
    userId: -1
  },
  mutations: {
    setUserRole(state, data) {
      state.userRole = data
    },
    setFocusComponent(state, value) {
      state.focusComponent = value
    },
    setSearchComponentList(state, list) {
      state.searchComponentList = list
    },
    setConnectionStatus(state, value) {
      state.connectionStatus = value
    },
    setUserId(state, value) {
      state.userId = value
    }
  },
  actions: {
    async getRoleDetails({ commit }, roleId) {
      const token = localStorage.getItem("token")
      const response = await fetch(`${ROLE_API_URL}/${roleId}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setUserRole", json.name)
        if (json.availableComponents) {
          let componentList = json.availableComponents.split(',')
          componentList.push("clear")
          commit("setSearchComponentList", componentList)
        }
      }
    }
  },
  modules: {
    recommendation: recommendationStateModule,
    diagnosis: diagnosisStateModule,
    reminder: reminderStateModule,
    goal: goalStateModule,
    setting: settingStateModule,
    rightPanel: rightPanelStateModule,
    tabDialog: secondLayerTabDialogStateModule,
    stateOnASelectedTime: stateOnASelectedTimeModule,
    socialHistory: socialHistoryStateModule
  },
  plugins: [
    createPersistedState()
  ]
})
