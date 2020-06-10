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
      Socket Listeners: Uses library: https://github.com/MetinSeylan/Vue-Socket.io
      main.js has:
      Vue.use(new VueSocketIO({
        debug: true,
        connection: SocketIO(SOCKET_API_URL, {}),
        vuex: {
          store,
          actionPrefix: "SOCKET_",
          mutationPrefix: "SOCKET_"
        }
      })
      );     
     */

    SOCKET_ON_UPDATE_RECOMMENDATIONS(state, updateList) {   // Message received from socket server
      state.yourRecommendationsList = updateList
    },
    SOCKET_ADD_RECOMMENDATION(state, newDataList) {         // Msg recd from node-server/routes/recommendation.route.js:26  io.to(`room-${patientId}-Doctor`).emit("ADD_RECOMMENDATION", newRecommendation)
      // The message emitted on the server is ADD_RECOMMENDATION. The library vue-socket.io adds the word SOCKET_ to the event name and sends the event here  

      // Say 10 clients are connection. Client 9 when it added the data its data-table showed the data added immediately. Now when the socket message comes back from the server. we need to find out client 9 and not insert the same row in the list maintained by client 9 
      if (state.yourRecommendationsList.length > 0) {       
        const lastData = state.yourRecommendationsList[state.yourRecommendationsList.length - 1]
        // TODO: How will this work if there are multiple recommendations being added?
        // Is it a better idea to emit seperate messages for each add being done?  
        if (lastData.recommendationID == newDataList[newDataList.length - 1].recommendationID) {
          return                                            // This return statement skips client 9, where this data was added by the user.
        }
      }

      // If only one data could be inserted then call -> state.yourRecommendationsList.push(newData)
      // The add form can be used to insert multiple data points.
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
    async dbAddRecommendationInSM({ state, commit }, json) {    
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
    async dbUpdateRecommendationInSM({ state, commit }, json) { 
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
    async dbDiscontinueRecommendationInSM({ state, commit }, json) {
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
    async dbMultiDiscontinueRecommendationsInSM({ state, commit }, json) {
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
    async dbGetMyRecommendationsInSM({ commit }, json) {
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
    async dbGetOtherRecommendationsInSM({ commit }, json) {
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
    async dbGetMultiStateMyRecommendationsInSM({ commit }, params) {
      const { date, patientId, userId } = params
      const response = await fetch(
        `${RECOMMENDATION_API_URL}/getByDate`, {
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
    async dbGetMultiStateOtherRecommendationsInSM({ commit }, json) {
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