<template>
  <div id="search_component" v-bind:style="{width: width}">
    <el-autocomplete
      v-model="searchKeyword"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      placeholder="(Type here - use backstick to highlight)"
      prefix-icon="el-icon-search"
      style="width: 100%"
      ref="search_box"
      @select="handleSelect"
      @focus="handleFocus"
      @input="handleInput"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "search-box",
  data() {
    return {
      searchKeyword: "",
      selectedIndex: 0
    };
  },
  computed: {
    width() {
      return this.$store.state.rightPanel.width;
    },
    keywordComponents() {
      if (this.searchKeyword.length == 0) {
        return [];
      }

      return this.$store.state.searchComponentList.filter(item => {
        return item.search(this.searchKeyword) > -1;
      });
    },
    focusRow() {
      return this.$store.getters.rightPanelFocusRow;
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
    this.$store.commit("setRightPanelWidth", "calc(30% - 4px)");
    this.$refs.search_box.$el
      .getElementsByTagName("input")[0]
      .addEventListener("keydown", event => {
        if (event.keyCode == 13) {
          this.executeSearch();
        }
      });
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
      const { rows } = this.$store.state.rightPanel;
      this.$store.commit("setRightPanelFocusRowIndex", rows.length - 1);
    },
    checkRowFocusStatus(object) {
      const { rowIndex } = object;
      if (rowIndex == this.selectedIndex) {
        return { "background-color": "#ecf5ff" };
      }
    },
    querySearch(queryString, cb) {
      const componentList = this.$store.state.searchComponentList;

      let results = [];
      if (queryString.length == 0) {
        results = [];
      }

      results = componentList.filter(item => {
        return item.search(queryString) > -1;
      });

      results = results.map(result => {
        return { value: result };
      });

      cb(results);
    },

    handleSelect(item) {
      const action = item.value;
      this.$emit("renderRightPanel", action);
      this.searchKeyword = "";
      this.$store.commit("setRightPanelSearchKeyword", "");
    },
    handleInput() {
      this.$store.commit("setRightPanelSearchKeyword", this.searchKeyword);
    },
    executeSearch() {
      const keywords = this.searchKeyword.split(" ");
      const componentActionsList = {
        rex: {
          add: "showAddRecommendationModal",
          multichange: "showMultiChangeRecommendationModal"
        },
        rem: {
          add: "showAddReminderModal",
          multichange: "showMultiChangeReminderModal"
        }
      };
      if (keywords.length == 1) {
        this.$emit("renderRightPanel", keywords[0]);
      } else if (keywords.length == 2) {
        // rex add
        const component = keywords[0];
        const action = keywords[1];
        const mutation = componentActionsList[component][action];
        if (mutation != null) {
          this.$store.commit(componentActionsList[component][action]);
        }
      }

      this.searchKeyword = "";
      this.$store.commit("setRightPanelSearchKeyword", "");
    }
  }
};
</script>

<style lang="css">
#search_component {
  position: absolute;
  bottom: 0;
}
</style>
