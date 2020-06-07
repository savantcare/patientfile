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
import currentStateDisplayAreaModule from './modules/currentStateDisplayArea'
import layer2MultiTabDialogStateModule from './modules/layer2MultiTabDialogState'
import multiStateDisplayAreaModule from './modules/multiStateDisplayArea'
import socialHistoryStateModule from './modules/socialHistoryState'
import familyHistoryStateModule from './modules/familyHistoryState'

import { ROLE_API_URL } from "@/const/others.js"
import searchCommandsList from '@/const/searchCommandsList.js'

export default new Vuex.Store({
  state: {
    userRole: '',
    searchCommandsList: [],
    focusComponent: "",
    connectionStatus: true, // true: online, false: offline
    userId: -1,
    selectedColumns: {
      recommendation: ["recommendationDescription"],
      reminder: ["description"],
      goal: ["description"],
      familyHistory: ["value"]
    },
    componentsAllowedToAccess: []
  },
  mutations: {
    setUserRole(state, data) {
      state.userRole = data
    },
    setFocusComponent(state, value) {
      state.focusComponent = value
    },
    setSearchCommandsList(state, list) {
      state.searchCommandsList = list
    },
    setConnectionStatus(state, value) {
      state.connectionStatus = value
    },
    setUserId(state, value) {
      // TODO: this should be userUUID
      state.userId = value
    },
    setSelectedColumns(state, value) {
      state.selectedColumns = value
    },
    setComponentsAllowedToAccess(state, value) {
      state.componentsAllowedToAccess = value
    }
  },
  actions: {
    async getRoleDetails({ commit, }, roleId) {
      const token = localStorage.getItem("token")
      const response = await fetch(`${ROLE_API_URL}/${roleId}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if (response.ok) {
        const json = await response.json()
        console.log(json)
        const { name, componentsAllowedToAccess, multiStateDisplayAreaComponentLoadSequence, currentStateDisplayAreaComponentLoadSequence } = json
        commit("setUserRole", name)

        // Get AllowAccesedComponents
        const components = componentsAllowedToAccess.split(",")
        commit("setComponentsAllowedToAccess", components)
        const commandList = searchCommandsList.filter(item => {
          return components.filter(component => {
            return component.trim().toLowerCase() == item.abbreviation
          }).length > 0
        })
        commandList.push({
          label: "clear", action: "", abbreviation: ""
        })
        commit("setSearchCommandsList", commandList)

        // Get multiStateDisplayArea Side components
        const leftComponents = multiStateDisplayAreaComponentLoadSequence.split(",")
        commit("setMultiStateDisplayAreaCtList", leftComponents, { root: true })

        // Get StateAtCurrentTimeSide components
        const rightComponents = currentStateDisplayAreaComponentLoadSequence.split(",")
        commit("setStateAtCurrentTimeCardsList", rightComponents, { root: true })

      }
    }
  },
  modules: {
    StateAtCurrentTime: currentStateDisplayAreaModule,
    stateAtSelectedTime: multiStateDisplayAreaModule,
    multiTabDialogLayer2: layer2MultiTabDialogStateModule,
    recommendation: recommendationStateModule,
    diagnosis: diagnosisStateModule,
    reminder: reminderStateModule,
    goal: goalStateModule,
    setting: settingStateModule,
    socialHistory: socialHistoryStateModule,
    familyHistory: familyHistoryStateModule
  },
  plugins: [
    createPersistedState()
  ]
})
