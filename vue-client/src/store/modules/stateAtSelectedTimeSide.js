import { COMPONENT_API_URL, STATE_AT_SELECTED_TIME_COMPONENTS } from '@/const.js'
// import $ from "jquery";

export default {
  state: {
    list: [],
    currentDate: "",
    zoomValue: 1,
    originSize: null
  },
  mutations: {
    setstateAtSelectedTimeList(state, value) {
      state.list = value
    },
    setstateAtSelectedTimeCurrentDate(state, value) {
      state.currentDate = value
    },
    setstateAtSelectedTimeZoomValue(state, value) {
      state.zoomValue = value
    }
  },
  actions: {
    async getstateAtSelectedTimeComponents({ commit }, json) {
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

          commit("setstateAtSelectedTimeList", availableComponents)
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
    stateAtSelectedTimeList(state) {
      let list = []
      state.list.forEach(item => {
        const leftComponent = STATE_AT_SELECTED_TIME_COMPONENTS.filter(component => {
          return component.key == item
        })
        list.push(leftComponent[0].value)
      })
      return list
    }
  }
}