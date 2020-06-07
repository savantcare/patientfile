import { REMINDER_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    remindersList: [],
  },
  mutations: {
    setReminderList(state, data) {
      state.remindersList = data
      //console.log(data);
    },
    addNewReminder(state, newList) {
      newList.forEach(item => {
        state.remindersList.push(item)
      })
    },
    removeNewReminder(state) {
      state.remindersList.pop()
    },
    /**
     * Socket Listeners
     */
    SOCKET_ON_UPDATE_REMINDERS(state, updateList) {   // Message received from socket server
      state.remindersList = updateList
    },
    SOCKET_ADD_REMINDER(state, newDataList) {         // Msg recd from node-server/routes/reminder.route.js
      if (state.remindersList.length > 0) {                      // At the client where this data was added it needs to be skipped
        const lastData = state.remindersList[state.remindersList.length - 1]
        if (lastData.uuid == newDataList[newDataList.length - 1].uuid) {
          return
        }
      }
      // state.remindersList.push(newData)
      newDataList.forEach(item => {
        state.remindersList.push(item)
      })
    },
    SOCKET_UPDATE_REMINDER(state, updateData) {
      let newList = []
      state.remindersList.forEach(item => {
        if (item.uuid != updateData.uuid) {
          newList.push(item)
        } else {
          newList.push(updateData)
        }
      })
      state.remindersList = newList
    },
    SOCKET_DISCONTINUE_REMINDER(state, dispatchId) {
      //console.log("SOCKET_DISCONTINUE_REMINDER")
      const newList = state.remindersList.filter(item => {
        return item.uuid != dispatchId
      })
      state.remindersList = newList
    }
  },
  actions: {
    async addReminder({ state, commit }, json) {
      const { data, notify, patientId } = json
      const originList = state.remindersList

      commit("addNewReminder", data)

      try {
        const response = await fetch(REMINDER_API_URL, {
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
            message: "Failed to add reminder data"
          })

          commit("setReminderList", originList)
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
        commit("setReminderList", originList)
      }
    },
    async changeReminder({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.remindersList
      //console.log(originList);
      let newList = []
      originList.forEach(item => {
        if (item.uuid == data.uuid) {
          newList.push({
            uuid: data.uuid,
            description: data.description,
            createdAt: data.createdAt,
            patientId: data.patientId
          });
        } else {
          newList.push(item);
        }
      });

      commit("setReminderList", newList)
      try {
        const response = await fetch(`${REMINDER_API_URL}/${data.uuid}`, {
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
            message: "Failed to update reminder data"
          })

          commit("setReminderList", originList)
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
        commit("setReminderList", originList)
      }
    },
    async discontinueReminder({ state, commit }, json) {
      const { data, notify } = json
      const originList = state.remindersList
      const newList = originList.filter(item => {
        return item.uuid != data.uuid
      })

      commit("setReminderList", newList)
      try {
        data["discontinue"] = true
        const response = await fetch(`${REMINDER_API_URL}/${data.uuid}`, {
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
            message: "Failed to discontinue reminder data"
          })
          commit("setReminderList", originList)
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

        commit("setReminderList", originList)
      }
    },
    async multiDiscontinueReminders({ state, commit }, json) {
      const { selectedIds, notify, selectedDatas } = json
      const originList = state.remindersList
      const newList = originList.filter(item => {
        return !selectedIds.includes(item.id)
      })

      commit("setReminderList", newList)


      selectedDatas.forEach(async item => {
        try {
          item['discontinue'] = true
          await fetch(`${REMINDER_API_URL}/${item.id}`, {
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
          commit('setReminderList', originList)
        }
      })
    },
    async getReminders({ commit }, json) {
      const { patientId, notify } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${REMINDER_API_URL}?patientId=${patientId}`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          let json = await response.json();
          commit('setReminderList', json)
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
              message: "Failed to get reminder data"
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
    reminders(state) {
      return state.remindersList.filter(item => {
        return item.discontinue != true
      })
    },
    panelReminders(state) {
      return state.remindersList.filter(item => {
        const itemDate = new Date(item.createdAt)
        // state.timeOfState instead of this timeOfState should use the value set in home.vue
        return item.discontinue != true && itemDate <= state.timeOfState
      })
    }
  }
}