import { SCREENING_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    list: []
  },
  mutations: {
    setScreeningList(state, data) {
      state.screeningList = data
    },
    addNewScreening(state, newList) {
      newList.forEach(item => {
        state.list.push(item)
      })
    },
    removeNewScreening(state) {
      state.list.pop()
    },
    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_SCREENINGS(state, updateList) {   // Message received from socket server
      state.list = updateList
    },
    SOCKET_ADD_SCREENING(state, newDataList) {         // Msg recd from node-server/routes/screening.route.js
      if (state.list.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.list[state.list.length - 1]
        if (lastData.screeningID == newDataList[newDataList.length - 1].screeningID) {
          return
        }
      }
      // state.list.push(newData)
      newDataList.forEach(item => {
        state.list.push(item)
      })
    },
    SOCKET_UPDATE_SCREENING(state, updateData) {
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
    SOCKET_DISCONTINUE_SCREENING(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_SCREENING")
      const newList = state.list.filter(item => {
        return item.id != dispatchId
      })
      state.list = newList
    }
  },
  actions: {

    // Category 1/2: Functions to get data
    async dbGetScreeningsInSM({ commit }, json) {
      const { patientId, notify, userId, date } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${SCREENING_API_URL}/getScreenList`, {
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
          commit('setScreeningList', json)
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
              message: "Failed to get my screening data"
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

    async addScreening({ state, commit }, json) {
      const { data, notify, patientId } = json
      const originList = state.list

      commit("addNewScreening", data)

      try {
        const response = await fetch(SCREENING_API_URL, {
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
            message: "Failed to add screening data"
          })

          commit("setScreeningList", originList)
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
        commit("setScreeningList", originList)
      }
    },
    async updateScreening({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      let newList = []
      originList.forEach(item => {
        if (item.id == data.id) {
          newList.push({
            id: data.id,
            description: data.description,
            patientId: data.patientId
          });
        } else {
          newList.push(item);
        }
      });

      commit("setScreeningList", newList)
      try {
        const response = await fetch(`${SCREENING_API_URL}/${data.id}`, {
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
            message: "Failed to update screening data"
          })

          commit("setScreeningList", originList)
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
        commit("setScreeningList", originList)
      }
    },
    async discontinueScreening({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return item.id != data.id
      })

      commit("setScreeningList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${SCREENING_API_URL}/${data.id}`, {
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
            message: "Failed to discontinue screening data"
          })
          commit("setScreeningList", originList)
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

        commit("setScreeningList", originList)
      }
    },
    async multiDiscontinueScreenings({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.id)
      })

      commit("setScreeningList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${SCREENING_API_URL}/${item.id}`, {
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
          commit('setScreeningList', originList)
        }
      })
    },
    async getScreenings({ commit }, json) {
      const { patientId, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${SCREENING_API_URL}?patientId=${patientId}`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          let json = await response.json();
          commit('setScreeningList', json)
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
              message: "Failed to get screening data"
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
    screenings(state) {
      return state.list.filter(item => {
        return item.discontinue != true
      })
    },
  }
}