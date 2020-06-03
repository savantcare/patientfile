import StateAtCurrentTimeCards from "@/StateAtCurrentTimeCards.js"

export default {
  state: {
    width: '29%',
    CardsList: [],
    rows: [],
    focusRowIndex: -1,
    searchKeyword: ""
  },
  mutations: {
    setStateAtCurrentTimeSplitAreaWidth(state, value) {
      state.width = value
    },
    setStateAtCurrentTimeCardsList(state, newList) {
      state.CardsList = newList
    },
    setStateAtCurrentTimeFocusRowIndex(state, index) {
      state.focusRowIndex = index
    },
    setStateAtCurrentTimeRows(state, rows) {
      state.rows = rows;
    },
    setStateAtCurrentTimeSearchKeyword(state, keyword) {
      state.searchKeyword = keyword
    },
    updateStateAtCurrentTimeCards(state, action) {
      if (action == "clear") {
        state.focusRowIndex = -1
        state.CardsList = []
      } else {
        const card = StateAtCurrentTimeCards.filter(item => {
          return action.search(item.key) > -1
        })
        let newList = []
        if (card.length > 0) {
          state.CardsList.forEach(item => {
            if (item.key != card[0].key) {
              newList.push(item)
            }
          })
          newList.push(card[0])
        }
        state.CardsList = newList
      }
    }
  },
  getters: {
    StateAtCurrentTimeFocusRow(state) {
      return state.rows[state.focusRowIndex]
    }
  },
  actions: {
    updateStateAtCurrentTimeRow({ rootState, commit }) {
      /**
       * Indicate the right-panel rows with ${keyword}-${index}, e.g recommendation-0
       */
      let StateAtCurrentTimeRows = [];
      const StateAtCurrentTimeComponents = rootState.StateAtCurrentTime.CardsList
      StateAtCurrentTimeComponents.forEach(item => {
        if (rootState[item.key] && rootState[item.key]["list"]) {
          const componentRows = rootState[item.key]["list"].filter(
            data => {
              return data.discontinue != true;
            }
          );
          // Set the header index as 0
          StateAtCurrentTimeRows.push(`${item.key}-0`);
          componentRows.forEach((row, index) => {
            StateAtCurrentTimeRows.push(`${item.key}-${index + 1}`);
          });
        }
      });
      // Add current-state-components-search-box component at the last
      StateAtCurrentTimeRows.push("current-state-components-search-box");

      commit("setStateAtCurrentTimeRows", StateAtCurrentTimeRows)
    }
  }
}