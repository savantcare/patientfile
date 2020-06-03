import { RECOMMENDATION_API_URL } from "@/const.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    list: [],
    currentDate: new Date(),
    othersList: []
  },
  mutations: {
    setRecommendationList(state, data) {
      state.list = data
    },
    addNewRecommendation(state, newList) {
      newList.forEach(item => {
        state.list.push(item)
      })
    },
    removeNewRecommendation(state) {
      state.list.pop()
    },
    setRecommendationCurrentDate(state, value) {
      state.currentDate = value
    },
    setOthersList(state, value) {
      state.othersList = value
    },

    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_RECOMMENDATIONS(state, updateList) {   // Message received from socket server
      state.list = updateList
    },
    SOCKET_ADD_RECOMMENDATION(state, newDataList) {         // Msg recd from node-server/routes/recommendation.route.js
      if (state.list.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.list[state.list.length - 1]
        if (lastData.recommendationID == newDataList[newDataList.length - 1].recommendationID) {
          return
        }
      }
      // state.list.push(newData)
      newDataList.forEach(item => {
        state.list.push(item)
      })
    },
    SOCKET_UPDATE_RECOMMENDATION(state, updateData) {
      let newList = []
      state.list.forEach(item => {
        if (item.id != updateData.id) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.list = newList
    },
    SOCKET_DISCONTINUE_RECOMMENDATION(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_RECOMMENDATION")
      const newList = state.list.filter(item => {
        return item.id != dispatchId
      })
      state.list = newList
    }
  },
  actions: {
    async addRecommendation({ state, commit }, json) {
      const { data, notify, patientId } = json
      const originList = state.list

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
    async updateRecommendation({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      let newList = []
      originList.forEach(item => {
        if (item.uuid == data.uuid) {
          newList.push(data);
        } else {
          newList.push(item);
        }
      });

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
    async discontinueRecommendation({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setRecommendationList", newList)
      try {
        const response = await fetch(`${RECOMMENDATION_API_URL}/${data.uuid}`, {
          method: "DELETE",
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
    async multiDiscontinueRecommendations({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.id)
      })

      commit("setRecommendationList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${RECOMMENDATION_API_URL}/${item.id}`, {
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
          commit('setRecommendationList', originList)
        }
      })
    },
    async getMyRecommendations({ commit }, json) {
      const { patientId, notify, userId } = json
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
            userId: userId
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
    async getOtherRecommendations({ commit }, json) {
      const { patientId, notify, userId } = json
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
            userId: userId
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
    }
  },
  getters: {
    recommendations(state) {
      return state.list.filter(item => {
        return item.discontinue != true
      })
    },
    panelRecommendations(state) {
      return state.list.filter(item => {
        const itemDate = new Date(item.createdAt)
        return item.discontinue != true && itemDate <= state.currentDate
      })
    }
  }
}