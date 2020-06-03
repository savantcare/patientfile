import { DIAGNOSIS_API_URL } from "@/const.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    diagnosisList: [],
    currentDate: new Date()
  },
  mutations: {
    setDiagnosisList(state, data) {
      state.diagnosisList = data
    },
    addNewDiagnosis(state, data) {
      data.forEach(item => {
        state.diagnosisList.push(item)
      })
    },
    removeNewDiagnosis(state) {
      state.diagnosisList.pop()
    },
    setDiagnosisCurrentDate(state, value) {
      state.currentDate = value
    },

    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_DIAGNOSES(state, updateList) {   // Message received from socket server
      state.diagnosisList = updateList
    },
    SOCKET_ADD_DIAGNOSIS(state, newData) {         // Msg recd from node-server/routes/diagnosis.route.js
      if (state.diagnosisList.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.diagnosisList[state.diagnosisList.length - 1]
        if (lastData.diagnosisID == newData.diagnosisID) {
          return
        }
      }
      state.diagnosisList.push(newData)
    },
    SOCKET_UPDATE_DIAGNOSIS(state, updateData) {
      let newList = []
      state.diagnosisList.forEach(item => {
        if (item.uuid != updateData.uuid) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.diagnosisList = newList
    },
    SOCKET_DISCONTINUE_DIAGNOSIS(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_DIAGNOSIS")
      const newList = state.diagnosisList.filter(item => {
        return item.uuid != dispatchId
      })
      state.diagnosisList = newList
    }
  },
  actions: {
    async addDiagnosis({ commit }, json) {
      const { data, toast } = json

      commit("addNewDiagnosis", data)

      try {
        const response = await fetch(DIAGNOSIS_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          toast.toast("Failed to add diagnosis data", {
            title: "Error",
            variant: "danger",
            solid: true
          })
          commit("removeNewDiagnosis")
        }
      } catch (ex) {
        toast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true
        })
        commit("removeNewDiagnosis")
      }
    },
    async changeDiagnosis({ state, commit }, json) {
      const { data, toast } = json
      const originList = state.diagnosisList
      let newList = []
      originList.forEach(item => {
        console.log(item,data);
        if (item.uuid == data.uuid) {
          newList.push({
            uuid: data.uuid,
            diagnosisName: data.diagnosisName,
            startDate: data.startDate,
            patientUUId: data.patientUUId
          });
        } else {
          newList.push(item);
        }
      });

      commit("setDiagnosisList", newList)
      try {
        const response = await fetch(`${DIAGNOSIS_API_URL}/${data.uuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          toast.toast("Failed to update diagnosis data", {
            title: "Error",
            variant: "danger",
            solid: true
          })

          commit("setDiagnosisList", originList)
        }
      } catch (ex) {
        toast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true
        })

        commit("setDiagnosisList", originList)
      }
    },
    async discontinueDiagnosis({ state, commit }, json) {
      const { data, toast } = json
      const originList = state.diagnosisList
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setDiagnosisList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${DIAGNOSIS_API_URL}/${data.uuid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          toast.toast("Failed to discontinue diagnosis data", {
            title: "Error",
            variant: "danger",
            solid: true
          })

          commit("setDiagnosisList", originList)
        }
      } catch (ex) {
        toast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true
        })

        commit("setDiagnosisList", originList)
      }
    },
    async multiDiscontinueDiagnosis({ state, commit }, json) {
      const { selectedIds, toast, selectedDatas } = json
      const originList = state.diagnosisList
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.uuid)
      })

      commit("setDiagnosisList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${DIAGNOSIS_API_URL}/${item.uuid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization": "Bearer " + TOKEN
            },
            body: JSON.stringify(item)
          });
        } catch (ex) {
          toast.toast("Server connection error", {
            title: "Error",
            variant: "danger",
            solid: true
          })
          commit('setDiagnosisList', originList)
        }
      })
    },
    async getDiagnoses({ commit }, json) {
      const { patientId, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${DIAGNOSIS_API_URL}?patientId=${patientId}`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        }
        );
        if (response.ok) {
          let json = await response.json();
          commit('setDiagnosisList', json)
        } else {
          if (response.status == '401') {
            notify({
              title: "Error",
              message: "Token is expired"
            })
            localStorage.removeItem("token")
            window.location = "/"
          } else {
            notify({
              title: "Error",
              message: "Failed to get diagnosis data"
            })
          }
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
      }
    }
  },
  getters: {
    diagnoses(state) {
      return state.diagnosisList.filter(item => {
        return item.discontinue != true
      })
    },
    panelDiagnoses(state) {
      return state.diagnosisList.filter(item => {
        const itemDate = new Date(item.createdAt)
        return item.discontinue != true && itemDate <= state.currentDate
      })
    }
  }
}