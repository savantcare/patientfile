/*
 KT: This is 2nd file imported by src/index.js
 Having an index.js file in a folder lets you perform an import from the folder implicitly without specifying the index.js in the import statement.
*/

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import VuexORM from "@vuex-orm/core";

// Ref: https://vuex-orm.github.io/plugin-axios/guide/setup.html
import axios from "axios";
import VuexORMAxios from "@vuex-orm/plugin-axios";
VuexORM.use(VuexORMAxios, { axios });

Vue.use(Vuex);

// modules
import recommendationStateModule from "../components/patient/Recommendations/stateDBSocket";
import reminderStateModule from "../components/patient/reminder/stateDBSocket";
import screeningStateModule from "../components/patient/Screening/stateDBSocket";
import diagnosisStateModule from "../components/patient/diagnosis/stateDBSocket";
import goalStateModule from "../components/patient/goal/stateDBSocket";
import socialHistoryStateModule from "../components/patient/social-history/stateDBSocket";
import familyHistoryStateModule from "../components/patient/FamilyHistory/stateDBSocket";
import bodyMeasurementModule from "../components/patient/BodyMeasurements/stateDBSocket";
import mentalStatusExamModule from "../components/patient/MentalStatusExam/stateDBSocket";

import settingStateModule from "./modules/settingState";
import currentStateDisplayAreaModule from "./modules/currentStateDisplayArea";
import componentModule from "./modules/component";

import layer2MultiTabDialogStateModule from "../components/common/Layer2MultiTabDialog/layer2MultiTabDialogState";
import multiStateDisplayAreaModule from "../components/common/multiStateDisplayArea/store";
import userRoleModule from "../components/common/userRole/stateDBSocket";

// vuex-orm models.
import ormComponentsAllowedForUserRole from "../components/common/roleBasedAccess/vuex-orm-model/ComponentsAllowedForUserRole";
import ormComponents from "../components/common/roleBasedAccess/vuex-orm-model/component";
import ormUserRole from "../components/common/userRole/vuex-orm-model/userRole";
import ormDiagnosis from "../components/patient/diagnosis/models/Diagnosis";
import ormAssessment from "../components/patient/diagnosis/models/Assessment";
import ormRecommendation from "../components/patient/Recommendations/vuex-orm-models/recommendation";

import { ROLE_API_URL } from "@/const/others.js";
// import searchCommandsList from "@/const/searchCommandsList.js"; Will come from DB

const database = new VuexORM.Database();
database.register(ormComponentsAllowedForUserRole);
database.register(ormComponents);
database.register(ormUserRole);
database.register(ormDiagnosis);
database.register(ormAssessment);
database.register(ormRecommendation);
require("../components/patient/MentalStatusExam/models/index.js")(database);
require("../components/patient/BodyMeasurements/models/index.js")(database)

export default new Vuex.Store({
  state: {
    userRole: "",
    userRoleUUID: "",
    searchCommandsList: [],
    cfFocusCt: "",
    connectionStatus: true, // true: online, false: offline
    userId: -1,
    selectedColumns: {
      recommendation: ["recommendationDescription"],
      reminder: ["description"],
      goal: ["description"],
      familyHistory: ["value"],
    },
    componentsAllowedToAccess: [],
  },
  mutations: {
    setUserRole(state, data) {
      state.userRole = data;
    },
    setUserRoleUUID(state, data) {
      state.userRoleUUID = data;
    },
    setFocusComponent(state, value) {
      state.cfFocusCt = value;
    },
    setSearchCommandsList(state, list) {
      state.searchCommandsList = list;
    },
    setConnectionStatus(state, value) {
      state.connectionStatus = value;
    },
    setUserId(state, value) {
      // TODO: this should be userUUID
      state.userId = value;
    },
    setSelectedColumns(state, value) {
      state.selectedColumns = value;
    },
    setComponentsAllowedToAccess(state, value) {
      state.componentsAllowedToAccess = value;
    },
  },
  actions: {
    async getRoleDetails({ commit }, roleUUID) {
      const token = localStorage.getItem("token");

      console.log("-------------", roleUUID);
      /* TODO: This hard code needs to be removed
      const response = await fetch(`${ROLE_API_URL}/${roleId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      */
      const response = await fetch(`${ROLE_API_URL}/${roleUUID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const { name } = json;
        commit("setUserRole", name);
        commit("setUserRoleUUID", roleUUID);

        const commandList = []; // Will come from DB

        commandList.push({
          label: "clear",
          action: "",
          abbreviation: "",
        });
        commit("setSearchCommandsList", commandList);
      }
    },
  },
  modules: {
    CurrentStateDisplayArea: currentStateDisplayAreaModule,
    // TODO: The correct name for multiStateDisplayArea is multiStateDisplayArea but when I rename the left side components do not come.
    // When I search for multiStateDisplayArea I do not see it used anywhere.
    multiStateDisplayArea: multiStateDisplayAreaModule,
    multiTabDialogLayer2: layer2MultiTabDialogStateModule,
    recommendation: recommendationStateModule,
    diagnosis: diagnosisStateModule,
    //dx: diagnosisState,
    reminder: reminderStateModule,
    goal: goalStateModule,
    setting: settingStateModule,
    socialHistory: socialHistoryStateModule,
    familyHistory: familyHistoryStateModule,
    component: componentModule,
    screening: screeningStateModule,
    bodyMeasurement: bodyMeasurementModule,
    mse: mentalStatusExamModule,
    userRole: userRoleModule,
  },
  plugins: [createPersistedState(), VuexORM.install(database)],
});
