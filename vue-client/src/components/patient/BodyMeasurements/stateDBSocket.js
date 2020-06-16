const TOKEN = localStorage.getItem("token")
import { BODY_MEASUREMENT_API_URL } from "@/const/others.js"

const state = {
  weights: [],
  bmis: [],
  waistCircumferences: [],
  bloodSugars: []
}
const mutations = {
  setWeights(state, value) {
    state.weights = value
  },
  setBmis(state, value) {
    state.bmis = value
  },
  setWaistCircumferences(state, value) {
    state.waistCircumferences = value
  },
  setBloodSugars(state, value) {
    state.bloodSugars = value
  }
}
const actions = {
  async dbAddWeightInSM({ state, commit }, params) {
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
        let weights = [...state.weights, ...data]
        commit("setWeights", weights)
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
  },
  async getWeight({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getWeight`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setWeights", json)
      } else {
        console.log("Failed to fetch weight")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbAddBmiInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/addBmi`, {
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
        let bmis = [...state.bmis, ...data]
        commit("setBmis", bmis)
      } else {
        notify({
          title: "Error",
          message: "Failed to add BMI"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getBmi({ commit }) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getBmi`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setBmis", json)
      } else {
        console.log("Failed to fetch weight")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbAddWaistCircumferenceInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/addWaistCircumference`, {
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
        let waistCircumferences = [...state.waistCircumferences, ...data]
        commit("setWaistCircumferences", waistCircumferences)
      } else {
        notify({
          title: "Error",
          message: "Failed to add waist circumferences"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getWaistCircumferences({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getWaistCircumferences`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setWaistCircumferences", json)
      } else {
        console.log("Failed to fetch waist circumferences")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbAddBloodSugarInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/addBloodSugar`, {
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
        let bloodSugars = [...state.bloodSugars, ...data]
        commit("setBloodSugars", bloodSugars)
      } else {
        notify({
          title: "Error",
          message: "Failed to add waist circumferences"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getBloodSugar({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getBloodSugar`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setBloodSugars", json)
      } else {
        console.log("Failed to fetch waist circumferences")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}