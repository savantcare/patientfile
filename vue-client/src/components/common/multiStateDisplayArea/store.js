import {
  COMPONENT_API_URL,
  STATE_AT_SELECTED_TIME_COMPONENTS,
} from "@/const/others.js";
// import $ from "jquery";
import allComponentsList from "@/const/allComponentsList.js";

export default {
  state: {
    ctList: [],
    timeOfStateToShow: "2038-01-19 03:14:07.999999", // All components on render in multiStateDisplayArea use this value. This is value of ROW_END in mariaDB when row is active
    zoomValue: 1,
    originSize: null,
    componentType: "health",
  },
  mutations: {
    setMultiStateDisplayAreaCtList(state, value) {
      state.ctList = value;
    },
    setTimeOfStateToShow(state, value) {
      state.timeOfStateToShow = value;
    },
    setMultiStateDisplayAreaZoomValue(state, value) {
      state.zoomValue = value;
    },
    setComponentType(state, value) {
      state.componentType = value;
    },
  },
  actions: {
    async getMultiStateDisplayAreaCtList({ commit }, json) {
      const { toast, type } = json;
      const TOKEN = localStorage.getItem("token");
      try {
        const response = await fetch(COMPONENT_API_URL + "/getByType/" + type, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + TOKEN,
          },
        });
        if (response.ok) {
          const components = await response.json();
          let availableComponents = [];
          components.forEach((item) => {
            const component = STATE_AT_SELECTED_TIME_COMPONENTS.filter(
              (leftComponent) => {
                return leftComponent.key == item.name;
              }
            );
            if (component != null) {
              availableComponents.push(component[0].key);
            }
          });

          commit("setMultiStateDisplayAreaCtList", availableComponents);
          // dispatch("zoomMultiStateDisplayArea")
        }
      } catch (ex) {
        toast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
    zoomMultiStateDisplayArea() {
      // const r = state.zoomValue
      // $("#multiStateDisplayAreaContent").css({
      //   "-webkit-transform": "scale(" + r + ")",
      //   "-moz-transform": "scale(" + r + ")",
      //   "-ms-transform": "scale(" + r + ")",
      //   "-o-transform": "scale(" + r + ")",
      //   transform: "scale(" + r + ")"
      // });
      // var height = document.getElementById("multiStateDisplayAreaContent").offsetHeight;
      // var windowHeight = $(document).outerHeight() - 100;
      // height = Math.ceil(height * r)
      // if (height > windowHeight || r == 1) {
      //   $("#multiStateDisplayAreaContent").css({
      //     position: "initial"
      //   })
      // } else {
      //   $("#multiStateDisplayAreaContent").css({
      //     position: "fixed"
      //   })
      // }
    },
  },
  getters: {
    multiStateDisplayAreaCtList(state) {
      let list = [];
      state.ctList.forEach((item) => {
        console.log(item);
        if (item == "Bm") {
          list.push({
            key: "bodyMeasurements",
            value: require("@/components/patient/BodyMeasurements/MultiStateCard")
              .default,
            abbreviation: "Bm",
          });
        } else {
          const result = allComponentsList.filter((card) => {
            return card.abbreviation == item.toLowerCase();
          });
          if (result.length > 0) {
            list.push(result[0]);
          }
        }
      });

      console.log(list);

      return list;
    },
  },
};
