import { COMPONENT_API_URL } from "@/const/others.js"
import Component from "../../components/common/roleBasedAccess/vuex-orm-model/component"
export default {
  state: {
    list: []
  },
  mutations: {
    setComponentList(state, value) {
      state.list = value
    }
  },
  data: {
    oneComponentQueryIsRunningGate: false,
  },
  actions: {        // Question: Should all actions should begin with An so when I am reading the code and I see loadComponents I know it is an action ?

    // This function is only called once when / route is used for patientFile.vue to get loaded.

    // Question: How to put this into cache? Ref: https://www.npmjs.com/package/vuex-cache#cacheaction

    /*async loadComponents({ commit }, params) {
      const { notify } = params
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${COMPONENT_API_URL}`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        })
        if (response.ok) {
          const json = await response.json()
          console.log(json)
          commit("setComponentList", json)
        } else {
          notify({
            title: "Error",
            message: "Failed to load components"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
      }
    },*/

    async loadComponentsInStateDisplayArea({ commit }, params) {
      const { notify } = params
      try {
        const token = localStorage.getItem("token")

        if (!this.oneComponentQueryIsRunningGate) {
          console.log("Called loadComponentsInStateDisplayArea s ad asd");
          this.oneComponentQueryIsRunningGate = true;
          let countComponent = await Component.query().count();
          console.log("Number of components before query =>", countComponent);
          if (countComponent == 0) {
            await Component.api().get(
              COMPONENT_API_URL + "/",
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json;charset=utf-8",
                }
              }
            );
            console.log(
              "Number of components in model =>",
              Component.query().count()
            );
          }
          this.oneComponentQueryIsRunningGate = false;
        }
      } catch (ex) {
        console.log(commit);
        notify({
          title: "Error",
          message: "Server connection error"
        })
      }





    }
  }
}