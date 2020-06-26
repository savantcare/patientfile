import { COMPONENT_API_URL } from "@/const/others.js";
import Component from "../../components/common/roleBasedAccess/vuex-orm-model/component";
import ComponentsAllowedForUserRole from "../../components/common/roleBasedAccess/vuex-orm-model/ComponentsAllowedForUserRole";
export default {
  data: {
    oneComponentQueryIsRunningGate: false,
    oneUserComponentQueryIsRunningGate: false,
  },
  actions: {
    // Question: Should all actions should begin with An so when I am reading the code and I see loadComponents I know it is an action ?

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

    async apiLoadComponentsInStateDisplayArea({ commit }, params) {
      const { notify } = params;
      try {
        const token = localStorage.getItem("token");

        if (!this.oneComponentQueryIsRunningGate) {
          console.log("Called apiLoadComponentsInStateDisplayArea s ad asd");
          this.oneComponentQueryIsRunningGate = true;
          let countComponent = await Component.query().count();
          console.log("Number of components before query =>", countComponent);
          if (countComponent == 0) {
            await Component.api().get(COMPONENT_API_URL + "/", {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json;charset=utf-8",
              },
            });
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
          message: "Server connection error",
        });
      }
    },

    async apiLoadComponentsBasedOnUserRole({ commit }, params) {
      const TOKEN = localStorage.getItem("token");
      const { roleUUID, notify } = params;
      try {
        if (!this.oneUserComponentQueryIsRunningGate) {
          this.oneUserComponentQueryIsRunningGate = true;
          let countusercomponent = await ComponentsAllowedForUserRole.query().count();
          console.log(
            "Number of ComponentsAllowedForUserRole before query =>",
            countusercomponent
          );
          if (countusercomponent == 0) {
            await ComponentsAllowedForUserRole.api().get(
              `${COMPONENT_API_URL}/getComponentsAllowedForUserRole/?roleUUID=${roleUUID}`,
              {
                headers: {
                  Authorization: "Bearer " + TOKEN,
                  "Content-Type": "application/json;charset=utf-8",
                },
              }
            );
            console.log(
              "Number of ComponentsAllowedForUserRole in model =>",
              ComponentsAllowedForUserRole.query().count()
            );
          }
          this.oneUserComponentQueryIsRunningGate = false;
        }
      } catch (ex) {
        console.log(commit);
        notify({
          title: "Error",
          message: "Server connection error",
        });
      }
    },
  },
};
