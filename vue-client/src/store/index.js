/*
 KT: This is 2nd file imported by src/index.js
 Having an index.js file in a folder lets you perform an import from the folder implicitly without specifying the index.js in the import statement.
*/

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import createCache from 'vuex-cache';


Vue.use(Vuex)

// modules
import recommendationStateModule from '../components/patient/Recommendations/stateDBSocket'
import screeningStateModule from '../components/patient/Screening/stateDBSocket'
import diagnosisStateModule from '../components/patient/diagnosis/stateDBSocket'
import reminderStateModule from './modules/reminderState'
import goalStateModule from './modules/goalState'
import settingStateModule from './modules/settingState'
import currentStateDisplayAreaModule from './modules/currentStateDisplayArea'
import layer2MultiTabDialogStateModule from './modules/layer2MultiTabDialogState'
import multiStateDisplayAreaModule from './modules/multiStateDisplayArea'
import socialHistoryStateModule from './modules/socialHistoryState'
import familyHistoryStateModule from './modules/familyHistoryState'
import componentModule from './modules/component'

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

        // Get CurrentStateDisplayAreaSide components
        const rightComponents = currentStateDisplayAreaComponentLoadSequence.split(",")
        commit("setCurrentStateDisplayAreaCardsList", rightComponents, { root: true })

      }
    }
  },
  modules: {
    CurrentStateDisplayArea: currentStateDisplayAreaModule,
    // TODO: The correct name for stateAtSelectedTime is multiStateDisplayArea but when I rename the left side components do not come.
    // When I search for stateAtSelectedTime I do not see it used anywhere.
    stateAtSelectedTime: multiStateDisplayAreaModule,
    multiTabDialogLayer2: layer2MultiTabDialogStateModule,
    recommendation: recommendationStateModule,
    diagnosis: diagnosisStateModule,
    reminder: reminderStateModule,
    goal: goalStateModule,
    setting: settingStateModule,
    socialHistory: socialHistoryStateModule,
    familyHistory: familyHistoryStateModule,
    component: componentModule,
    screening: screeningStateModule
  },
  plugins: [
    createPersistedState(),
    createCache({ timeout: 1000000 })
  ]
})
