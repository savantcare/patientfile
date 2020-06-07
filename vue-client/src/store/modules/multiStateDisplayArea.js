import { COMPONENT_API_URL, STATE_AT_SELECTED_TIME_COMPONENTS } from '@/const/others.js'
// import $ from "jquery";
import allComponentsList from "@/const/allComponentsList.js"

export default {
  state: {
    list: [],
    timeOfState: "",
    zoomValue: 1,
    originSize: null
  },
  mutations: {
    setMultiStateDisplayAreaCtList(state, value) {
      state.list = value
    },
    setTimeOfState(state, value) {
      state.timeOfState = value
    },
    setMultiStateDisplayAreaZoomValue(state, value) {
      state.zoomValue = value
    }
  },
  actions: {
    async currentStateDisplayAreaCtList({ commit }, json) {
      const { toast, type } = json
      const TOKEN = localStorage.getItem("token")
      try {
        const response = await fetch(COMPONENT_API_URL + "/getByType/" + type, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + TOKEN
          },
        })
        if (response.ok) {
          const components = await response.json()
          let availableComponents = []
          components.forEach(item => {
            const component = STATE_AT_SELECTED_TIME_COMPONENTS.filter(leftComponent => {
              return leftComponent.key == item.name
            })
            if (component != null) {
              availableComponents.push(component[0].key)
            }
          })

          commit("setMultiStateDisplayAreaCtList", availableComponents)
          // dispatch("zoomstateAtSelectedTime")
        }
      } catch (ex) {
        toast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true
        })
      }
    },
    zoomstateAtSelectedTime() {
      // const r = state.zoomValue
      // $("#stateAtSelectedTimeContent").css({
      //   "-webkit-transform": "scale(" + r + ")",
      //   "-moz-transform": "scale(" + r + ")",
      //   "-ms-transform": "scale(" + r + ")",
      //   "-o-transform": "scale(" + r + ")",
      //   transform: "scale(" + r + ")"
      // });

      // var height = document.getElementById("stateAtSelectedTimeContent").offsetHeight;
      // var windowHeight = $(document).outerHeight() - 100;
      // height = Math.ceil(height * r)

      // if (height > windowHeight || r == 1) {
      //   $("#stateAtSelectedTimeContent").css({
      //     position: "initial"
      //   })
      // } else {
      //   $("#stateAtSelectedTimeContent").css({
      //     position: "fixed"
      //   })
      // }
    }
  },
  getters: {
    multiStateDisplayAreaCtList(state) {
      let list = []
      state.list.forEach(item => {
        const result = allComponentsList.filter(card => {
          return card.abbreviation == item.toLowerCase()
        })
        if (result.length > 0) {
          list.push(result[0])
        }
      })
      return list
    }
  }
}