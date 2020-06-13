import { DIAGNOSIS_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    diagnosisList: []
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
      const { data, notify } = json

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
          notify({
            title: "Error",
            message: "Failed to add diagnosis data"
          })

          commit("removeNewDiagnosis")
        } else {
          notify({
            title: "Success",
            message: "Successfully added diagnosis!!"
          })
        }
      } catch (ex) {

        notify({
          title: "Error",
          message: "Server connection error!"
        })
        commit("removeNewDiagnosis")
      }
    },
    async changeDiagnosis({ state, commit }, json) {
      const { data, notify } = json
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
          notify({
            title: "Error",
            message: "Failed to change diagnosis data"
          })

          commit("setDiagnosisList", originList)
        } else {
          notify({
            title: "Success",
            message: "Successfully changed diagnosis!"
          })
        }
        
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error!"
        })

        commit("setDiagnosisList", originList)
      }
    },
    async discontinueDiagnosis({ state, commit }, json) {
      const { data, notify } = json
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
          notify({
            title: "Error",
            message: "Failed to discontinue diagnosis data"
          })


          commit("setDiagnosisList", originList)
        } else {
          notify({
            title: "Success",
            message: "Successfully discontinued diagnosis!"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error!"
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
    },
    async changeDiagnosisAssessment({state, commit}, json) {
      const { data, notify } = json
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

        
        const response = await fetch(`${DIAGNOSIS_API_URL}/changeAssessment/${data.uuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          notify({
            title: "Error",
            message: "Failed to change diagnosis data"
          })

          commit("setDiagnosisList", originList)
        } else {
          notify({
            title: "Success",
            message: "Successfully changed diagnosis!"
          })
        }
        
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error!"
        })

        commit("setDiagnosisList", originList)
      } 
    },
    async discontinueDiagnosisAssessment({state,commit}, json) {
      const { data, notify } = json
      const originList = state.diagnosisList
      const assessmentUUID = data.currentAssessmentUUID

      console.log(data);
      var newList = []
      originList.forEach(function(eachDx){
        if(eachDx.uuid!=data.uuid) {
          newList.push(eachDx);
        }else {
          eachDx.currentAssessmentUUID = ``;
          eachDx.currentAssessment = ``;
          newList.push(eachDx);
        }
      })
      /*const newList = originList.filter(item => {
        return item.currentAssessmentUUID != data.currentAssessmentUUID
      })*/

      commit("setDiagnosisList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${DIAGNOSIS_API_URL}/discontinueAssessment/${assessmentUUID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          notify({
            title: "Error",
            message: "Failed to discontinue Assessment data"
          })


          commit("setDiagnosisList", originList)
        } else {
          notify({
            title: "Success",
            message: "Successfully discontinued Assessment!"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error!"
        })

        commit("setDiagnosisList", originList)
      }
    }
  },
  getters: {
    diagnoses(state) {
      return state.diagnosisList.filter(item => {
        return item.discontinue != true
      })
    }
  }
}