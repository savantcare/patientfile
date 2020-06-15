const TOKEN = localStorage.getItem("token")
import { BODY_MEASUREMENT_API_URL } from "@/const/others.js"

const state = {}
const mutations = {}
const actions = {
  async dbAddWeight(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/addWeight`, {
        headers: {
          "Authorization": "Bearer " + TOKEN,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({ data: data })
      })
      if (response.ok) {
        notify({
          title: "Success",
          message: "Saved!"
        })
      } else {
        notify({
          title: "Error",
          message: "Failed to add weight"
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
}