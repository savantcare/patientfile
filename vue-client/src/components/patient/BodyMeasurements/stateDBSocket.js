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
  temperature: [],
  objectToUpdate: null, // Used on the Change Dialog
  selectedDate: null // Used on the Multi-Change dialog and MultiStateCard
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
  },
  setObjectToUpdate(state, value) {
    state.objectToUpdate = value
  },
  setSelectedDate(state, value) {
    state.selectedDate = value
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
        data["date"] = new Date().toISOString().split("T")[0]
        console.log(data)
        weights.push(data)
        console.log(weights)
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

// Expect result
// const measurements = {
//   weight: {
//     value: 10,
//     unit: " lb",
//     notes: "My notes",
//     date: "2020-06-18"
//   }
// }

const getters = {
  measurementsByDate(state) {
    let result = {}
    const selectedDate = state.selectedDate

    let weights = [...state.weights]
    weights = weights.filter(weight => weight.measurementDate == selectedDate);

    if (weights.length > 0) {
      result['weight'] = {
        value: weights[weights.length - 1].weightInPounds,
        unit: " lb",
        notes: weights[weights.length - 1].Notes,
        date: weights[weights.length - 1].measurementDate
      }
    }

    let bmis = [...state.bmis]
    bmis = bmis.filter(bmi => bmi.measurementDate == selectedDate)

    if (bmis.length > 0) {
      result['bmi'] = {
        value: bmis[bmis.length - 1].bmiValue,
        unit: "",
        notes: bmis[bmis.length - 1].Notes,
        date: bmis[bmis.length - 1].measurementDate
      }
    }

    let waistCircumferences = [...state.waistCircumferences]
    waistCircumferences = waistCircumferences.filter(wc => wc.measurementDate == selectedDate)

    if (waistCircumferences.length > 0) {
      result['waistCircumference'] = {
        value:
          waistCircumferences[waistCircumferences.length - 1]
            .waistCircumferenceInInches,
        unit: " in",
        notes: waistCircumferences[waistCircumferences.length - 1].Notes,
        date:
          waistCircumferences[waistCircumferences.length - 1].measurementDate
      }
    }

    let bloodSugars = [...state.bloodSugars]
    bloodSugars = bloodSugars.filter(bs => bs.measurementDate == selectedDate)

    if (bloodSugars.length > 0) {
      result['bloodSugar'] = {
        value: bloodSugars[bloodSugars.length - 1].bloodSugar,
        unit: " mg/dL",
        notes: bloodSugars[bloodSugars.length - 1].Notes,
        date: bloodSugars[bloodSugars.length - 1].measurementDate
      }
    }

    let heights = [...state.heights]
    heights = heights.filter(height => height.measurementDate == selectedDate)

    if (heights.length > 0) {
      result['height'] = {
        value: heights[heights.length - 1].heightInInch,
        unit: " inches",
        notes: heights[heights.length - 1].Notes,
        date: heights[heights.length - 1].measurementDate
      }
    }

    let bloodPressures = [...state.bloodPressures]
    bloodPressures = bloodPressures.filter(bp => bp.measurementDate == selectedDate)

    if (bloodPressures.length > 0) {
      result['bloodPressure'] = {
        systolicValue:
          bloodPressures[bloodPressures.length - 1].systolicValue,
        diastolicValue:
          bloodPressures[bloodPressures.length - 1].diastolicValue,
        notes: bloodPressures[bloodPressures.length - 1].Notes,
        date: bloodPressures[bloodPressures.length - 1].measurementDate,
        unit: " mmHg"
      }
    }

    let oxygenSaturations = [...state.oxygenSaturations]
    oxygenSaturations = oxygenSaturations.filter(os => os.measurementDate == selectedDate)

    if (oxygenSaturations.length > 0) {
      result['oxygenSaturation'] = {
        value:
          oxygenSaturations[oxygenSaturations.length - 1].oxygenSaturation,
        unit: " mmHg",
        notes: oxygenSaturations[oxygenSaturations.length - 1].Notes,
        date: oxygenSaturations[oxygenSaturations.length - 1].measurementDate
      }
    }

    let pulse = [...state.pulse]
    pulse = pulse.filter(p => p.measurementDate == selectedDate)
    if (pulse.length > 0) {
      result['pulse'] = {
        value: pulse[pulse.length - 1].beatsPerMinuteValue,
        unit: " bpm",
        notes: pulse[pulse.length - 1].Notes,
        date: pulse[pulse.length - 1].measurementDate
      }
    }

    let temperature = [...state.temperature]
    temperature = temperature.filter(t => t.measurementDate == selectedDate)
    if (temperature.length > 0) {
      result['temperature'] = {
        value: temperature[temperature.length - 1].temperatureInFarehnite,
        unit: " F",
        notes: temperature[temperature.length - 1].Notes,
        date: temperature[temperature.length - 1].measurementDate
      }
    }

    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}