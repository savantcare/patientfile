import StateAtCurrentTimeCards from "@/StateAtCurrentTimeCards.js"

export default {
  state: {
    width: '29%',
    list: [],
    rows: [],
    focusRowIndex: -1,
    searchKeyword: ""
  },
  mutations: {
    setRightPanelWidth(state, value) {
      state.width = value
    },
    setRightPanelList(state, newList) {
      state.list = newList
    },
    setRightPanelFocusRowIndex(state, index) {
      state.focusRowIndex = index
    },
    setRightPanelRows(state, rows) {
      state.rows = rows;
    },
    setRightPanelSearchKeyword(state, keyword) {
      state.searchKeyword = keyword
    },
    updateStateAtCurrentTimeCards(state, action) {
      if (action == "clear") {
        state.focusRowIndex = -1
        state.list = []
      } else {
        const card = StateAtCurrentTimeCards.filter(item => {
          return action.search(item.key) > -1
        })
        let newList = []
        if (card.length > 0) {
          state.list.forEach(item => {
            if (item.key != card[0].key) {
              newList.push(item)
            }
          })
          newList.push(card[0])
        }
        state.list = newList
      }
    }
  },
  getters: {
    rightPanelFocusRow(state) {
      return state.rows[state.focusRowIndex]
    }
  },
  actions: {
    updateRightPanelRow({ rootState, commit }) {
      /**
       * Indicate the right-panel rows with ${keyword}-${index}, e.g recommendation-0
       */
      let rightPanelRows = [];
      const rightPanelComponents = rootState.rightPanel.list
      rightPanelComponents.forEach(item => {
        if (rootState[item.key] && rootState[item.key]["list"]) {
          const componentRows = rootState[item.key]["list"].filter(
            data => {
              return data.discontinue != true;
            }
          );
          // Set the header index as 0
          rightPanelRows.push(`${item.key}-0`);
          componentRows.forEach((row, index) => {
            rightPanelRows.push(`${item.key}-${index + 1}`);
          });
        }
      });
      // Add current-state-components-search-box component at the last
      rightPanelRows.push("current-state-components-search-box");

      commit("setRightPanelRows", rightPanelRows)
    }
  }
}