const state = {
  selectedType: '',
  appearenceList: [],
  attitudeList: [],
  cognitionList: []
}

const mutations = {
  setSelectedType(state, value) {
    state.selectedType = value
  },
  setAppearenceList(state, value) {
    state.appearenceList = value
  },
  setAttitudeList(state, value) {
    state.attitudeList = value
  },
  setCognitionList(state, value) {
    state.cognitionList = value
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
  },
  async dbUpdateAttitudeInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateAttitude`, {
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
          message: "Failed to add attitude"
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
  async getAttitude({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getAttitude`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setAttitudeList", json)
    }
  },
  async dbUpdateCognitionInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateCognition`, {
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
          message: "Failed to add cognition"
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
  async getCognition({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getCognition`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setCognitionList", json)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}