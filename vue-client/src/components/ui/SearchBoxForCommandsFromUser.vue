<template>
  <div id="search_component" v-bind:style="{width: width}">
    <el-autocomplete
      v-model="searchKeyword"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      highlight-first-item
      placeholder="(Type here - use backstick to highlight)"
      prefix-icon="el-icon-search"
      style="width: 100%"
      ref="search_box"
      @select="handleSelect"
      @focus="handleFocus"
      @input="handleInput"
    ></el-autocomplete>
    <!-- <v-autocomplete :items="items" item-text="name" filled shaped border-radius="30px" clearable></v-autocomplete> -->
  </div>
</template>

<script>
export default {
  name: "current-state-components-search-box",
  data() {
    return {
      searchKeyword: "",
      selectedIndex: 0
    };
  },
  computed: {
    width() {
      return this.$store.state.StateAtCurrentTime.width;
    },
    focusRow() {
      return this.$store.getters.StateAtCurrentTimeFocusRow;
    }
  },
  watch: {
    focusRow() {
      if (this.focusRow == this.$options.name) {
        this.setFocus();
      } else if (this.focusRow != null) {
        this.removeFocus();
      }
    }
  },
  mounted() {
    this.$store.commit(
      "setStateAtCurrentTimeSplitAreaWidth",
      "calc(30% - 4px)"
    );
  },
  methods: {
    setFocus() {
      setTimeout(() => {
        this.$refs.search_box.$el.getElementsByTagName("input")[0].focus();
      }, 50);
    },
    removeFocus() {
      setTimeout(() => {
        this.$refs.search_box.$el.getElementsByTagName("input")[0].blur();
      }, 50);
    },
    handleFocus() {
      const { rows } = this.$store.state.StateAtCurrentTime;
      this.$store.commit("setStateAtCurrentTimeFocusRowIndex", rows.length - 1);
    },
    checkRowFocusStatus(object) {
      const { rowIndex } = object;
      if (rowIndex == this.selectedIndex) {
        return { "background-color": "#ecf5ff" };
      }
    },
    querySearch(queryString, cb) {
      const searchCommandsList = this.$store.state.searchCommandsList;

      let results = [];
      if (queryString.length == 0) {
        results = [];
      }

      results = searchCommandsList.filter(item => {
        const strings = queryString.split(" ");
        let isMatchKeyword = true;
        strings.forEach(string => {
          if (item.label.search(string) < 0) {
            isMatchKeyword = false;
          }
        });
        return isMatchKeyword;
        // return item.label.search(queryString) > -1;
      });

      results = results.map(result => {
        return { value: result.label, action: result.action };
      });

      cb(results);
    },

    handleSelect(item) {
      const { value, action } = item;
      if (action == "") {
        this.$store.commit("updateStateAtCurrentTimeCards", value);
        if (value == "clear") {
          this.$store.commit("setStateAtCurrentTimeFocusRowIndex", -1);
          this.$store.commit("setStateAtCurrentTimeCardsList", []);
        } else {
          const componentsAllowedToAccess = this.$store.state
            .componentsAllowedToAccess;
          const searchComponent = componentsAllowedToAccess.filter(item => {
            return value.search(item.toLowerCase()) > -1;
          })[0];
          const stateAtCurrentStateComponents = this.$store.state
            .StateAtCurrentTime.CardsList;
          let newList = stateAtCurrentStateComponents.filter(item => {
            return action.search(item.toLowerCase()) > -1;
          });
          newList.push(searchComponent);
          this.$store.commit("setStateAtCurrentTimeCardsList", newList);
        }
        this.$store.dispatch("updateStateAtCurrentTimeRow");
      } else {
        this.$store.commit(action);
      }

      this.searchKeyword = "";
      this.$store.commit("setStateAtCurrentTimeSearchKeyword", "");
    },
    handleInput() {
      this.$store.commit(
        "setStateAtCurrentTimeSearchKeyword",
        this.searchKeyword
      );
    }
  }
};
</script>

<style lang="css">
#search_component {
  position: absolute;
  bottom: 0px;
  z-index: 100;
}
</style>
