import { COMPONENT_API_URL } from "@/const/others.js"

export default {
  state: {
    list: []
  },
  mutations: {
    setComponentList(state, value) {
      state.list = value
    }
  },
  actions: {
    async loadComponents({ commit }, params) {
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
    }
  }
}