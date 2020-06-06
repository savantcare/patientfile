import { FAMILY_HISTORY_API_URL } from "@/const.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    familyHistoryList: [],
    timeOfState: new Date()
  },
  mutations: {
    setFamilyHistoryList(state, data) {
      state.familyHistoryList = data
    },
    addNewFamilyHistory(state, newList) {
      newList.forEach(item => {
        state.familyHistoryList.push(item)
      })
    },
    removeNewFamilyHistory(state) {
      state.familyHistoryList.pop()
    },
    setFamilyHistoryCurrentDate(state, value) {
      state.timeOfState = value
    },

    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_GOALS(state, updateList) {   // Message received from socket server
      state.familyHistoryList = updateList
    },
    SOCKET_ADD_GOAL(state, newDataList) {         // Msg recd from node-server/routes/familyHistory.route.js
      if (state.familyHistoryList.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.familyHistoryList[state.familyHistoryList.length - 1]
        if (lastData.uuid == newDataList[newDataList.length - 1].uuid) {
          return
        }
      }
      // state.familyHistoryList.push(newData)
      newDataList.forEach(item => {
        state.familyHistoryList.push(item)
      })
    },
    SOCKET_UPDATE_GOAL(state, updateData) {
      let newList = []
      state.familyHistoryList.forEach(item => {
        if (item.uuid != updateData.uuid) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.familyHistoryList = newList
    },
    SOCKET_DISCONTINUE_GOAL(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_GOAL")
      const newList = state.familyHistoryList.filter(item => {
        return item.uuid != dispatchId
      })
      state.familyHistoryList = newList
    }
  },
  actions: {
    async addFamilyHistory({ state, commit }, json) {
      const { data, notify, patientUUID } = json
      const originList = state.familyHistoryList

      commit("addNewFamilyHistory", data)

      try {
        const response = await fetch(FAMILY_HISTORY_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({ data: data, patientUUID: patientUUID })
        })
        if (!response.ok) {
          notify({
            title: "Error",
            message: "Failed to add familyHistory data"
          })

          commit("setFamilyHistoryList", originList)
        } else {
          notify({
            title: "Success",
            message: "Saved!"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
        commit("setFamilyHistoryList", originList)
      }
    },
    async updateFamilyHistory({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.familyHistoryList
      let newList = []
      originList.forEach(item => {
        if (item.uuid == data.uuid) {
          newList.push({
            uuid: data.uuid,
            description: data.description,
            score: data.score,
            //startDate: data.startDate,
            startDate: new Date(data.startDate).toDateString(),
            createdAt: data.createdAt,
            patientUUID: data.patientUUID
          });
        } else {
          newList.push(item);
        }
      });

      commit("setFamilyHistoryList", newList)
      try {
        const response = await fetch(`${FAMILY_HISTORY_API_URL}/${data.uuid}`, {
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
            message: "Failed to update familyHistory data"
          })

          commit("setFamilyHistoryList", originList)
        } else {
          notify({
            title: "Title",
            message: "Updated!"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
        commit("setFamilyHistoryList", originList)
      }
    },
    async discontinueFamilyHistory({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.familyHistoryList
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setFamilyHistoryList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${FAMILY_HISTORY_API_URL}/${data.uuid}`, {
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
            message: "Failed to discontinue familyHistory data"
          })
          commit("setFamilyHistoryList", originList)
        } else {
          notify({
            title: "Title",
            message: "Discontinued"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })

        commit("setFamilyHistoryList", originList)
      }
    },
    async multiDiscontinueFamilyHistories({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.familyHistoryList
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.uuid)
      })

      commit("setFamilyHistoryList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${FAMILY_HISTORY_API_URL}/${item.uuid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization": "Bearer " + TOKEN
            },
            body: JSON.stringify(item)
          });
        } catch (ex) {
          notify({
            title: "Error",
            message: "Server connection error"
          })
          commit('setFamilyHistoryList', originList)
        }
      })
    },
    async getFamilyHistories({ commit }, json) {
      const { patientUUID, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${FAMILY_HISTORY_API_URL}?patientUUID=${patientUUID}`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          let json = await response.json();
          commit('setFamilyHistoryList', json)
        } else {
          if (response.status == '401') {
            notify({
              title: "Error",
              message: "Token is expired."
            })
            localStorage.removeItem("token")
            window.location = "/"
          } else {
            notify({
              title: "Error",
              message: "Failed to get familyHistory data"
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
    familyHistories(state) {
      return state.familyHistoryList.filter(item => {
        return item.discontinue != true
      })
    },
    panelFamilyHistories(state) {
      return state.familyHistoryList.filter(item => {
        const itemDate = new Date(item.createdAt)
        return item.discontinue != true && itemDate <= state.timeOfState
      })
    }
  }
}