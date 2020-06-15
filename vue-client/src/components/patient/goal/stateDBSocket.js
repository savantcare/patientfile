import { GOAL_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    goalList: []
  },
  mutations: {
    setGoalList(state, data) {
      state.goalList = data
    },
    addNewGoal(state, newList) {
      newList.forEach(item => {
        state.goalList.push(item)
      })
    },
    removeNewGoal(state) {
      state.goalList.pop()
    },
    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_GOALS(state, updateList) {   // Message received from socket server
      state.goalList = updateList
    },
    SOCKET_ADD_GOAL(state, newDataList) {         // Msg recd from node-server/routes/goal.route.js
      if (state.goalList.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.goalList[state.goalList.length - 1]
        if (lastData.uuid == newDataList[newDataList.length - 1].uuid) {
          return
        }
      }
      // state.goalList.push(newData)
      newDataList.forEach(item => {
        state.goalList.push(item)
      })
    },
    SOCKET_UPDATE_GOAL(state, updateData) {
      let newList = []
      state.goalList.forEach(item => {
        if (item.uuid != updateData.uuid) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.goalList = newList
    },
    SOCKET_DISCONTINUE_GOAL(state, dispatchId) {
      console.log("SOCKET_DISCONTINUE_GOAL")
      const newList = state.goalList.filter(item => {
        return item.uuid != dispatchId
      })
      state.goalList = newList
    }
  },
  actions: {
    async addGoal({ state, commit }, json) {
      const { data, notify, patientUUID } = json
      const originList = state.goalList

      commit("addNewGoal", data)

      try {
        const response = await fetch(GOAL_API_URL, {
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
      const originList = state.goalList
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

      commit("setGoalList", newList)
      try {
        const response = await fetch(`${GOAL_API_URL}/${data.uuid}`, {
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
      const originList = state.goalList
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setGoalList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${GOAL_API_URL}/${data.uuid}`, {
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
            message: "Discontinued"
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
      const originList = state.goalList
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.uuid)
      })

      commit("setGoalList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${GOAL_API_URL}/${item.uuid}`, {
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
      const { patientUUID, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${GOAL_API_URL}?patientUUID=${patientUUID}`, {
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
      return state.goalList.filter(item => {
        return item.discontinue != true
      })
    }
  }
}