import StateAtCurrentTimeCards from "@/const/allComponentsList.js"

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
        console.log(action)
        let newList = []
        newList = state.CardsList.filter(item => {
          return action.search(item.toLowerCase()) > -1
        })
        newList.push()
        // const card = StateAtCurrentTimeCards.filter(item => {
        //   return action.search(item.key) > -1
        // })
        // let newList = []
        // if (card.length > 0) {
        //   state.CardsList.forEach(item => {
        //     if (item.key != card[0].key) {
        //       newList.push(item)
        //     }
        //   })
        //   newList.push(card[0])
        // }
        // state.CardsList = newList
      }
    }
  },
  getters: {
    StateAtCurrentTimeFocusRow(state) {
      return state.rows[state.focusRowIndex]
    },
    currentStateDisplayAreaList(state) {
      let list = []
      state.CardsList.forEach(item => {
        const result = StateAtCurrentTimeCards.filter(card => {
          return card.abbreviation == item.toLowerCase()
        })
        if (result.length > 0) {
          list.push(result[0])
        }
      })
      return list
    }
  },
  actions: {
    updateStateAtCurrentTimeRow({ rootState, commit, rootGetters }) {
      /**
       * Indicate the right-panel rows with ${keyword}-${index}, e.g recommendation-0
       */
      let StateAtCurrentTimeRows = [];
      const StateAtCurrentTimeComponents = rootGetters.currentStateDisplayAreaList
      StateAtCurrentTimeComponents.forEach(item => {
        if (rootState[item.key] && rootState[item.key]["tableList"]) {
          const componentRows = rootState[item.key]["tableList"].filter(
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
