const state = {
  selectedType: '',
  appearenceList: [],
  attitudeList: [],
  cognitionList: [],
  constitutionalList: [],
  eyeContactList: [],
  impulseControlList: [],
  thoughtProcessList: [],
  psychomotorList: [],
  insightList: [],
  speechList: [],
  judgementList: [],
  affectList: [],
  thoughtContentList: []
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
  },
  setConstitutionalList(state, value) {
    state.constitutionalList = value
  },
  setEyeContactList(state, value) {
    state.eyeContactList = value
  },
  setImpulseControlList(state, value) {
    state.impulseControlList = value
  },
  setThoughtProcessList(state, value) {
    state.thoughtProcessList = value
  },
  setPsychomotorList(state, value) {
    state.psychomotorList = value
  },
  setInsightList(state, value) {
    state.insightList = value
  },
  setSpeechList(state, value) {
    state.speechList = value
  },
  setJudgementList(state, value) {
    state.judgementList = value
  },
  setAffectList(state, value) {
    state.affectList = value
  },
  setThoughtContentList(state, value) {
    state.thoughtContentList = value
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
  },
  async dbUpdateConstitutionalInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateConstitutional`, {
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
          message: "Failed to add constitutional"
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
  async getConstitutional({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getConstitutional`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setConstitutionalList", json)
    }
  },
  async dbUpdateEyeContactInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateEyeContact`, {
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
          message: "Failed to add eye-contact"
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
  async getEyeContact({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getEyeContact`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setEyeContactList", json)
    }
  },
  async dbUpdateImpulseControlInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateImpulseControl`, {
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
          message: "Failed to add impulse-control"
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
  async getImpulseControl({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getImpulseControl`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setImpulseControlList", json)
    }
  },
  async dbUpdateThoughtProcessInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateThoughtProcess`, {
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
          message: "Failed to add thought-process"
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
  async getThoughtProcess({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getThoughtProcess`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setThoughtProcessList", json)
    }
  },
  async dbUpdatePsychomotorInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updatePsychomotor`, {
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
          message: "Failed to add psychomotor"
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
  async getPsychomotor({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getPsychomotor`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setPsychomotorList", json)
    }
  },
  async dbUpdateInsightInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateInsight`, {
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
          message: "Failed to add insight"
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
  async getInsight({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getInsight`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setInsightList", json)
    }
  },
  async dbUpdateSpeechInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateSpeech`, {
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
          message: "Failed to add speech"
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
  async getSpeech({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getSpeech`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setSpeechList", json)
    }
  },
  async dbUpdateJudgementInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateJudgement`, {
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
          message: "Failed to add judgement"
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
  async getJudgement({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getJudgement`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setJudgementList", json)
    }
  },
  async dbUpdateAffectInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateAffect`, {
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
          message: "Failed to add affect"
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
  async getAffect({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getAffect`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setAffectList", json)
    }
  },
  async dbUpdateThoughtContentInSM(_, params) {
    const { data, notify } = params
    try {
      const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/updateThoughtContent`, {
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
          message: "Failed to add thought-content"
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
  async getThoughtContent({ commit }, params) {
    const response = await fetch(`${MENTAL_STATUS_EXAM_API_URL}/getThoughtContent`, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(params)
    })
    if (response.ok) {
      const json = await response.json()
      commit("setThoughtContentList", json)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}