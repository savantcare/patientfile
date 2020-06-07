import CurrentStateDisplayAreaCards from "@/const/allComponentsList.js"

export default {
  state: {
    width: '29%',
    CardsList: [],
    rows: [],
    focusRowIndex: -1,
    searchKeyword: ""
  },
  mutations: {
    setCurrentStateDisplayAreaSplitAreaWidth(state, value) {
      state.width = value
    },
    setCurrentStateDisplayAreaCardsList(state, newList) {
      state.CardsList = newList
    },
    setCurrentStateDisplayAreaFocusRowIndex(state, index) {
      state.focusRowIndex = index
    },
    setCurrentStateDisplayAreaRows(state, rows) {
      state.rows = rows;
    },
    setCurrentStateDisplayAreaSearchKeyword(state, keyword) {
      state.searchKeyword = keyword
    },
    updateCurrentStateDisplayAreaCards(state, action) {
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
        // const card = CurrentStateDisplayAreaCards.filter(item => {
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
    CurrentStateDisplayAreaFocusRow(state) {
      return state.rows[state.focusRowIndex]
    },
    currentStateDisplayAreaList(state) {
      let list = []
      state.CardsList.forEach(item => {
        const result = CurrentStateDisplayAreaCards.filter(card => {
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
    updateCurrentStateDisplayAreaRow({ rootState, commit, rootGetters }) {
      /**
       * Indicate the right-panel rows with ${keyword}-${index}, e.g recommendation-0
       */
      let CurrentStateDisplayAreaRows = [];
      const CurrentStateDisplayAreaComponents = rootGetters.currentStateDisplayAreaList
      CurrentStateDisplayAreaComponents.forEach(item => {
        if (rootState[item.key] && rootState[item.key]["tableList"]) {
          const componentRows = rootState[item.key]["tableList"].filter(
            data => {
              return data.discontinue != true;
            }
          );
          // Set the header index as 0
          CurrentStateDisplayAreaRows.push(`${item.key}-0`);
          componentRows.forEach((row, index) => {
            CurrentStateDisplayAreaRows.push(`${item.key}-${index + 1}`);
          });
        }
      });
      // Add search-box-for-commands-from-user component at the last
      CurrentStateDisplayAreaRows.push("search-box-for-commands-from-user");
      commit("setCurrentStateDisplayAreaRows", CurrentStateDisplayAreaRows)
    }
  }
}
