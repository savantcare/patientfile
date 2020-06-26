import { ROLE_API_URL } from "@/const/others.js";
import ormUserRole from "../../common/userRole/vuex-orm-model/userRole";
let TOKEN = localStorage.getItem("token");
export default {
  /*state: {
        userRolelist: []
    },
    mutations: {
        setUserRoleList(state, value) {
            state.userRolelist = value
        }
    },*/
  data: {
    oneUserRoleQueryIsRunningGate: false,
  },
  actions: {
    // Question: Should all actions should begin with An so when I am reading the code and I see loadComponents I know it is an action ?

    // This function is only called once when / route is used for patientFile.vue to get loaded.

    // Question: How to put this into cache? Ref: https://www.npmjs.com/package/vuex-cache#cacheaction

    async loadUserRole({ commit }, params) {
      const { notify } = params;
      try {
        if (!this.oneUserRoleQueryIsRunningGate) {
          this.oneUserRoleQueryIsRunningGate = true;
          let countUserRole = await ormUserRole.query().count();
          console.log("Number of user role before query =>", countUserRole);
          if (countUserRole == 0) {
            await ormUserRole.api().get(ROLE_API_URL + "/", {
              headers: {
                Authorization: "Bearer " + TOKEN,
                "Content-Type": "application/json;charset=utf-8",
              },
            });
            console.log(
              "Number of user role in model =>",
              ormUserRole.query().count()
            );
          }
          this.oneUserRoleQueryIsRunningGate = false;
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
