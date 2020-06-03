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
import currentStateAreaModule from './modules/currentStateArea'
import secondLayerTabDialogStateModule from './modules/secondLayerTabDialogState'
import stateOnASelectedTimeModule from './modules/stateOnASelectedTimeSide'
import socialHistoryStateModule from './modules/socialHistoryState'

import { ROLE_API_URL } from "@/const.js"
import searchCommandList from '@/searchCommandList.js'

export default new Vuex.Store({
  state: {
    userRole: '',
    searchCommandList: searchCommandList,
    focusComponent: "",
    connectionStatus: true, // true: online, false: offline
    userId: -1,
    selectedColumns: {
      recommendation: ["recommendationDescription"],
      reminder: ["description"]
    }
  },
  mutations: {
    setUserRole(state, data) {
      state.userRole = data
    },
    setFocusComponent(state, value) {
      state.focusComponent = value
    },
    setSearchCommandList(state, list) {
      state.searchCommandList = list
    },
    setConnectionStatus(state, value) {
      state.connectionStatus = value
    },
    setUserId(state, value) {
      state.userId = value
    },
    setSelectedColumns(state, value) {
      state.selectedColumns = value
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
          commit("setSearchCommandList", componentList)
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
    rightPanel: currentStateAreaModule,
    tabDialog: secondLayerTabDialogStateModule,
    stateOnASelectedTime: stateOnASelectedTimeModule,
    socialHistory: socialHistoryStateModule
  },
  plugins: [
    createPersistedState()
  ]
})
