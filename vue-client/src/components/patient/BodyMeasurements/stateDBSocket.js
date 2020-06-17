const TOKEN = localStorage.getItem("token")
import { BODY_MEASUREMENT_API_URL } from "@/const/others.js"

const state = {
  weights: [],
  bmis: [],
  waistCircumferences: [],
  bloodSugars: [],
  heights: [],
  bloodPressures: [],
  oxygenSaturations: [],
  pulse: [],
  temperature: []
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
  },
  setHeights(state, value) {
    state.heights = value
  },
  setBloodPressures(state, value) {
    state.bloodPressures = value
  },
  setOxygenSaturations(state, value) {
    state.oxygenSaturations = value
  },
  setPulse(state, value) {
    state.pulse = value
  },
  setTemperature(state, value) {
    state.temperature = value
  }
}
const actions = {
  async dbUpdateWeightInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateWeight`, {
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
        let weights = state.weights
        weights.push(data)
        commit("setWeights", weights)
      } else {
        notify({
          title: "Error",
          message: "Failed to add weight"
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
  async dbUpdateBmiInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateBmi`, {
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
        let bmis = state.bmis
        bmis.push(data)
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
  async dbUpdateWaistCircumferenceInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateWaistCircumference`, {
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
        let waistCircumferences = state.waistCircumferences
        waistCircumferences.push(data)
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
  async dbUpdateBloodSugarInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateBloodSugar`, {
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
        let bloodSugars = state.bloodSugars
        bloodSugars.push(data)
        commit("setBloodSugars", bloodSugars)
      } else {
        notify({
          title: "Error",
          message: "Failed to add blood sugar"
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
        console.log("Failed to fetch blood sugar")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbUpdateHeightInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateHeight`, {
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
        let heights = state.heights
        heights.push(data)
        commit("setHeights", heights)
      } else {
        notify({
          title: "Error",
          message: "Failed to add height"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getHeight({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getHeight`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setHeights", json)
      } else {
        console.log("Failed to fetch heights")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbUpdateBloodPressureInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateBloodPressure`, {
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

        let bloodPressures = state.bloodPressures
        bloodPressures.push(data)
        commit("setBloodPressures", bloodPressures)
      } else {
        notify({
          title: "Error",
          message: "Failed to add blood pressure"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getBloodPressure({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getBloodPressure`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setBloodPressures", json)
      } else {
        console.log("Failed to fetch blood pressure")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbUpdateOxygenSaturationInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateOxygenSaturation`, {
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
        let oxygenSaturations = state.oxygenSaturations
        oxygenSaturations.push(data)
        commit("setOxygenSaturations", oxygenSaturations)
      } else {
        notify({
          title: "Error",
          message: "Failed to update oxygen saturations"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getOxygenSaturation({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getOxygenSaturation`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setOxygenSaturations", json)
      } else {
        console.log("Failed to fetch oxygen saturation")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbUpdatePulseInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updatePulse`, {
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
        let pulse = state.pulse
        pulse.push(data)

        commit("setPulse", pulse)
      } else {
        notify({
          title: "Error",
          message: "Failed to update pulse"
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
  async getPulse({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getPulse`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setPulse", json)
      } else {
        console.log("Failed to fetch pulse")
      }
    } catch (ex) {
      console.log("Server connection error")
    }
  },
  async dbUpdateTemperatureInSM({ state, commit }, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/updateTemperature`, {
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
        let temperature = state.temperature
        temperature.push(data)
        commit("setTemperature", temperature)
      } else {
        notify({
          title: "Error",
          message: "Failed to add temperature"
        })
      }
    } catch (ex) {
      notify({
        title: "Error",
        message: "Server connection error"
      })
    }
  },
  async getTemperature({ commit },) {
    try {
      const response = await fetch(`${BODY_MEASUREMENT_API_URL}/getTemperature`, {
        headers: { "Authorization": "Bearer " + TOKEN, }
      })
      if (response.ok) {
        const json = await response.json()
        commit("setTemperature", json)
      } else {
        console.log("Failed to fetch temperature")
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