import { GOAL_API_URL } from "@/const.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    list: [],
    currentDate: new Date()
  },
  mutations: {
    setGoalList(state, data) {
      state.list = data
    },
    addNewGoal(state, newList) {
      newList.forEach(item => {
        state.list.push(item)
      })
    },
    removeNewGoal(state) {
      state.list.pop()
    },
    setGoalCurrentDate(state, value) {
      state.currentDate = value
    },

    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_GOALS(state, updateList) {   // Message received from socket server
      state.list = updateList
    },
    SOCKET_ADD_GOAL(state, newDataList) {         // Msg recd from node-server/routes/goal.route.js
      if (state.list.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.list[state.list.length - 1]
        if (lastData.goalID == newDataList[newDataList.length - 1].goalID) {
          return
        }
      }
      // state.list.push(newData)
      newDataList.forEach(item => {
        state.list.push(item)
      })
    },
    SOCKET_UPDATE_GOAL(state, updateData) {
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
    SOCKET_DISCONTINUE_GOAL(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_GOAL")
      const newList = state.list.filter(item => {
        return item.id != dispatchId
      })
      state.list = newList
    }
  },
  actions: {
    async addGoal({ state, commit }, json) {
      const { data, notify, patientId } = json
      const originList = state.list

      commit("addNewGoal", data)

      try {
        const response = await fetch(GOAL_API_URL, {
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
            message: "Failed to add goal data"
          })

          commit("setGoalList", originList)
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
        commit("setGoalList", originList)
      }
    },
    async updateGoal({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      let newList = []
      originList.forEach(item => {
        if (item.id == data.id) {
          newList.push({
            id: data.id,
            description: data.description,
            createdAt: data.createdAt,
            patientId: data.patientId
          });
        } else {
          newList.push(item);
        }
      });

      commit("setGoalList", newList)
      try {
        const response = await fetch(`${GOAL_API_URL}/${data.id}`, {
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
            message: "Failed to update goal data"
          })

          commit("setGoalList", originList)
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
        commit("setGoalList", originList)
      }
    },
    async discontinueGoal({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return item.id != data.id
      })

      commit("setGoalList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${GOAL_API_URL}/${data.id}`, {
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
            message: "Failed to discontinue goal data"
          })
          commit("setGoalList", originList)
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

        commit("setGoalList", originList)
      }
    },
    async multiDiscontinueGoals({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.list
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.id)
      })

      commit("setGoalList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${GOAL_API_URL}/${item.id}`, {
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
          commit('setGoalList', originList)
        }
      })
    },
    async getGoals({ commit }, json) {
      const { patientId, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${GOAL_API_URL}?patientId=${patientId}`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          let json = await response.json();
          commit('setGoalList', json)
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
              message: "Failed to get goal data"
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
    goals(state) {
      return state.list.filter(item => {
        return item.discontinue != true
      })
    },
    panelGoals(state) {
      return state.list.filter(item => {
        const itemDate = new Date(item.createdAt)
        return item.discontinue != true && itemDate <= state.currentDate
      })
    }
  }
}