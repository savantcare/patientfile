const state = {
  selectedType: '',
  appearenceList: []
}

const mutations = {
  setSelectedType(state, value) {
    state.selectedType = value
  },
  setAppearenceList(state, value) {
    state.appearenceList = value
  }
}

const TOKEN = localStorage.getItem("token")
import { MENTAL_STATUS_EXAM_API_URL } from "@/const/others"
const actions = {
  async dbUpdateAppearenceInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateAppearence`, {
        headers: {
          "Authorization": "Bearer " + TOKEN,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({ data: data })
      })
      console.log(response)
      if (response.ok) {
        notify({
          title: "Success",
          message: "Saved!"
        })

      } else {
        notify({
          title: "Error",
          message: "Failed to add appearence"
        })
      }
    } catch (ex) {
      console.log(ex)
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getAppearence({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getAppearence`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setAppearenceList", json)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}