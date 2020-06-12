import { SCREENING_API_URL } from "@/const/others.js"
let TOKEN = localStorage.getItem("token")
export default {
  state: {                       // Cannot be changed directly. Can only be changed through mutation
    screeningList: []
  },
  mutations: {
    setPatientScreeningList(state, data) {
      state.screeningList = data
    },
    setMasterScreenList(state, data) {
      state.screenMasterList = data
    },
    addNewScreening(state, newList) {
      newList.forEach(item => {
        state.list.push(item)
      })
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
    async dbGetPatientScreeningListInSM({ commit }, json) {
      const { patientId, notify, userId, date } = json
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch(
          `${SCREENING_API_URL}/getPatientScreenList`, {
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
          //console.log(json)
          commit('setPatientScreeningList', json)
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

    async dbGetMasterScreeningList({ commit }, json) {
      const { patientId, notify, userId, date } = json
      console.log(patientId, userId, date);
      if (TOKEN == null) {
        TOKEN = localStorage.getItem("token")
      }
      try {
        const response = await fetch( // e.g. ${SCREENING_API_URL}?patientUUID=${patientUUID}
          `${SCREENING_API_URL}/getScreenMasterList`, {
          headers: {
            "Authorization": "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          let json = await response.json();
          //console.log(json)
          commit('setMasterScreenList', json)
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

    // this api store all new screen in db and fetch all latest screen data from db.
    async addPatientScreen({commit }, json) {
      const { data, notify, patientUUID, date } = json
      //const originList = state.list

      try {
        const response = await fetch(
          `${SCREENING_API_URL}/addPatientScreen`, {
          headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json;charset=utf-8",
          },
          method: "POST",
          body: JSON.stringify({
            patientUUID: patientUUID,
            data: data,
            date: date
          })
        })
        if (response.ok) {

          let json = await response.json();
          commit('setPatientScreeningList', json)
          notify({title: "Success", message: "Saved!"})
        } else {
          notify({title: "Error", message: "Failed to add screening data"})
        }
      } catch (ex) {
        notify({
          title: "Error",
          message: "Server connection error"
        })
      }
    },
  },
  getters: {
    screening(state) {
      return state.list.filter(item => {
        return item.discontinue != true
      })
    },
  }
}