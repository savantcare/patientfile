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
    >
      <template slot-scope="{ item }">
        <div class="value" v-html="item.value"></div>
      </template>
    </el-autocomplete>

    
    <!-- <v-autocomplete :items="items" item-text="name" filled shaped border-radius="30px" clearable></v-autocomplete> -->
  </div>
</template>

<script>
export default {
  name: "search-box-for-commands-from-user",
  data() {
    return {
      searchKeyword: "",
      selectedIndex: 0
    };
  },
  computed: {
    width() {
      return this.$store.state.CurrentStateDisplayArea.width;
    },
    focusRow() {
      return this.$store.getters.CurrentStateDisplayAreaFocusRow;
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
      "setCurrentStateDisplayAreaSplitAreaWidth",
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
      const { rows } = this.$store.state.CurrentStateDisplayArea;
      this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", rows.length - 1);
    },
    checkRowFocusStatus(object) {
      const { rowIndex } = object;
      if (rowIndex == this.selectedIndex) {
        return { "background-color": "#ecf5ff" };
      }
    },
    querySearch(queryString, cb) {
      const searchCommandsList = this.$store.state.searchCommandsList;
      console.log("list" + searchCommandsList)
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
        var final_str = ""
        if (queryString.length > 0) {
          var reg = new RegExp(queryString, 'gi');
          if(result.label == "clear"){
            final_str = result.label
          }
          else{
            final_str = result.label.replace(reg, function(str) {return '<b>'+str+'</b>'});
          }
          
          
        }
        else{
          final_str = result.label
        }
        return { value: final_str, action: result.action, abbreviation: result.abbreviation };
      });

      cb(results);
    },

    handleSelect(item) {
      const { value, action, abbreviation } = item;
      console.log(item);
      console.log(abbreviation);
      if (action == "") {
        this.$store.commit("updateCurrentStateDisplayAreaCards", value);
        if (value == "clear") {
          this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", -1);
          this.$store.commit("setCurrentStateDisplayAreaCardsList", []);
        } else {
          const stateAtCurrentStateComponents = this.$store.state
            .CurrentStateDisplayArea.CardsList;
          let newList = stateAtCurrentStateComponents.filter(item => {
            return action.search(item.toLowerCase()) > -1;
          });
          newList.push(abbreviation);
          this.$store.commit("setCurrentStateDisplayAreaCardsList", newList);
        }
        this.$store.dispatch("updateCurrentStateDisplayAreaRow");
      } else {
        this.$store.commit(action);
      }

      this.searchKeyword = "";
      this.$store.commit("setCurrentStateDisplayAreaSearchKeyword", "");
    },
    handleInput() {
      this.$store.commit(
        "setCurrentStateDisplayAreaSearchKeyword",
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
