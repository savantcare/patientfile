import { RECOMMENDATION_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // KT: Cannot be changed directly. Can only be changed through mutation
    yourRecommendationsList: [], // TODO: This should be stored with the key of timeOfState. When timeOfState is null that indicates current state.
    othersList: [],
    tableList: [],              // TODO: Needs better name.
    multiStateYourRecommendationsList: [],
    multiStateOtherRecommendationsList: []
  },
  mutations: {
    setRecommendationList(state, data) {
      state.yourRecommendationsList = data
    },
    addNewRecommendation(state, newList) {
      newList.forEach(item => {
        state.yourRecommendationsList.push(item)
      })
    },
    removeNewRecommendation(state) {
      state.yourRecommendationsList.pop()
    },
    setOthersList(state, value) {
      state.othersList = value
    },
    setRecommendationTableList(state, value) {    // TODO: Not clear from name what this does.
      state.tableList = value
    },
    setMultiStateYourRecommendationList(state, value) {
      state.multiStateYourRecommendationsList = value
    },
    setMultiStateOtherRecommendationList(state, value) {
      state.multiStateOtherRecommendationsList = value
    },

    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_RECOMMENDATIONS(state, updateList) {   // Message received from socket server
      state.yourRecommendationsList = updateList
    },
    SOCKET_ADD_RECOMMENDATION(state, newDataList) {         // Msg recd from node-server/routes/recommendation.route.js
      if (state.yourRecommendationsList.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.yourRecommendationsList[state.yourRecommendationsList.length - 1]
        if (lastData.recommendationID == newDataList[newDataList.length - 1].recommendationID) {
          return
        }
      }
      // state.yourRecommendationsList.push(newData)
      newDataList.forEach(item => {
        state.yourRecommendationsList.push(item)
      })
    },
    SOCKET_UPDATE_RECOMMENDATION(state, updateData) {
      let newList = []
      state.yourRecommendationsList.forEach(item => {
        if (item.uuid != updateData.uuid) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.yourRecommendationsList = newList
    },
    SOCKET_DISCONTINUE_RECOMMENDATION(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_RECOMMENDATION")
      const newList = state.yourRecommendationsList.filter(item => {
        return item.id != dispatchId
      })
      state.yourRecommendationsList = newList
    }
  },
  actions: {
    async dbAddRecommendation({ state, commit }, json) {    
      const { data, notify, patientId } = json
      const originList = state.yourRecommendationsList

      commit("addNewRecommendation", data)

      try {
        const response = await fetch(RECOMMENDATION_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({ data: data, patientId: patientId })
        })
        if (!response.ok) {
          notify({
            title: "Error",
            message: "Failed to add recommendation data"
          })

          commit("setRecommendationList", originList)
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
        commit("setRecommendationList", originList)
      }
    },
    async dbUpdateRecommendation({ state, commit }, json) { 
      const { data, notify } = json
      const originList = state.yourRecommendationsList
      let newList = []
      originList.forEach(item => {
        if (item.uuid == data.uuid) {
          newList.push(data);
        } else {
          newList.push(item);
        }
      });
      console.log(newList)
      commit("setRecommendationList", newList)
      try {
        const response = await fetch(`${RECOMMENDATION_API_URL}`, {
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
            message: "Failed to update recommendation data"
          })

          commit("setRecommendationList", originList)
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
        commit("setRecommendationList", originList)
      }
    },
    async dbDiscontinueRecommendation({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.yourRecommendationsList
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setRecommendationList", newList)
      try {
        const response = await fetch(`${RECOMMENDATION_API_URL}/${data.uuid}`, {
          method: "DELETE",                             // Temporal DB!! The row is still there. Just the end time is set.
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          notify({
            title: "Error",
            message: "Failed to discontinue recommendation data"
          })
          commit("setRecommendationList", originList)
        } else {
          notify({
            title: "Title",
            message: "Deleted"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })

        commit("setRecommendationList", originList)
      }
    },
    async dbMultiDiscontinueRecommendations({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.yourRecommendationsList
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.id)
      })

      commit("setRecommendationList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${RECOMMENDATION_API_URL}/${item.id}`, {
            method: "DELETE",                                       // Temporal DB!! The row is still there. Just the end time is set.
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
          commit('setRecommendationList', originList)
        }
      })
    },
    async dbGetMyRecommendations({ commit }, json) {
      const { patientId, notify, userId, date } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${RECOMMENDATION_API_URL}/getMyRecommendations`, {
          headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json;charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify({
            patientId: patientId,
            userId: userId,
            date: date
          })
        });
        if (response.ok) {
          let json = await response.json();
          console.log(json)
          commit('setRecommendationList', json)
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
              message: "Failed to get my recommendation data"
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
    async dbGetOtherRecommendations({ commit }, json) {
      const { patientId, notify, userId, date } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(`${RECOMMENDATION_API_URL}/getOthersRecommendations`, {
          headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json;charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify({
            patientId: patientId,
            userId: userId,
            date: date
          })
        })
        if (response.ok) {
          let json = await response.json()
          commit("setOthersList", json)
        } else {
          notify({
            title: "Error",
            message: "Failed to get other's recommendation data"
          })
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
      }
    },
    async dbGetMultiStateMyRecommendations({ commit }, params) {
      const { date, patientId, userId } = params
      const response = await fetch(
        `${RECOMMENDATION_API_URL}/getMyRecommendations`, {
        headers: {
          "Authorization": "Bearer " + TOKEN,
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          patientId: patientId,
          userId: userId,
          date: date
        })
      });
      if (response.ok) {
        const json = await response.json()
        commit("setMultiStateYourRecommendationList", json)
      }
    },
    async dbGetMultiStateOtherRecommendations({ commit }, json) {
      const { patientId, notify, userId, date } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(`${RECOMMENDATION_API_URL}/getOthersRecommendations`, {
          headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json;charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify({
            patientId: patientId,
            userId: userId,
            date: date
          })
        })
        if (response.ok) {
          let json = await response.json()
          commit("setMultiStateOtherRecommendationList", json)
        } else {
          notify({
            title: "Error",
            message: "Failed to get other's recommendation data"
          })
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
    recommendations(state) {
      return state.yourRecommendationsList.filter(item => {
        return item.discontinue != true
      })
    },
  }
}