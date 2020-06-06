<!--
A card header needs to deal with 3 situations:
1. stateDisplayArea == "CurrentStateDisplayArea"
2. stateDisplayArea == "MultiStateDisplayArea"   timeOfState=null
3. stateDisplayArea == "MultiStateDisplayArea"   timeOfState=value

A component needs to know whther it is being used in "MultistateArea"  or "CurrentStateDisplayArea"
If the component is being used in "MultiStateArea" then the component needs to know "timeOfState"

-->

<template>
  <div @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
    <span :style="{'color': isHeaderFocus == true ? '#409EFF' : 'black'}">{{title}}</span>
    <transition name="fade">
      <div style="float: right" v-if="showActions">
        <el-button
          type="text"
          size="mini"
          @click="$emit('multiDiscontinue')"
          v-if="selected.length > 0"
        >D</el-button>
        <div v-else>
          <el-button type="text" size="mini" @click="$emit('showAddDialog')" v-if="showReviewChoice">R</el-button>
          <el-button type="text" size="mini" @click="$emit('showAddDialog')" v-if="showAddChoice">A</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('showMultiChangeDialog')"
            v-if="showMultiChangeButton"
          >M</el-button>
          <el-button type="text" size="mini" @click="$emit('focusPanel')" v-if="showFocusChoice">F</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('showDiscontinueHistoryDialog')"
            v-if="showDiscontinueHistoryChoice"
          >X</el-button>

          <el-popover placement="top-start" trigger="hover" content="Addendum">
            <el-button slot="reference" type="text" size="mini" v-if="showAddendum">E</el-button>
          </el-popover>

          <!--
        TODO: Clicking on settings icon will allow choosing which columns to display and 
        save preferences in local storage
        This will need to know what columns are available in the JSON. 
        Component 1 might have 5 columns whose visibility can be turned on or off
        and component 2 might have 2 columns whose visibility can be turned on or off
          -->
          <!--<el-popover placement="bottom" width="200" trigger="click">
          <i slot="reference" class="el-icon-s-tools settingsIcon"></i>
          </el-popover>-->

          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
            @show="showPopover = true"
            @hide="showPopover = false"
          >
            <el-select
              v-model="selectedColumns"
              size="mini"
              clearable
              multiple
              placeholder="Select"
              collapse-tags
            >
              <el-option
                v-for="item in columns"
                :key="item.field"
                :label="item.label"
                :value="item.field"
              ></el-option>
            </el-select>
            <i slot="reference" class="el-icon-s-tools settingsIcon"></i>
          </el-popover>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["title", "actions", "stateDisplayArea", "columns", "keyId"],
  data() {
    return {
      mouseOver: false,
      selected: [],
      showPopover: false,
      timeOfState: this.$route.query.timeOfState // If this value is NULL it means stateAtCurrentTime is being shown.
    };
  },
  computed: {
    focusRow() {
      return this.$store.getters.StateAtCurrentTimeFocusRow;
    },
    isHeaderFocus() {
      return (
        this.focusRow == `${this.title.toLowerCase()}-0` &&
        this.stateDisplayArea == "CurrentStateDisplayArea"
      );
    },
    // You can data-bind to computed properties in templates just like a normal property.
    // Ref: https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property
    showAddChoice() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState == null
      ) {
        return (
          this.actions.split(",").filter(action => action == "A").length > 0 &&
          this.$parent.$parent.selectedRows.length < 1
        );
      }
      return false;
    },
    showReviewChoice() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState == null
      ) {
        return (
          this.actions.split(",").filter(action => action == "R").length > 0 &&
          this.$parent.$parent.selectedRows.length < 1
        );
      }
      return false;
    },
    showMultiChangeButton() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState == null
      ) {
        return (
          this.actions.split(",").filter(action => action == "M").length > 0 &&
          this.$parent.$parent.selectedRows.length < 1
        );
      }
      return false;
    },
    showFocusChoice() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState == null
      ) {
        return (
          this.actions.split(",").filter(action => action == "F").length > 0 &&
          this.$parent.$parent.selectedRows.length < 1
        );
      }
      return false;
    },
    showDiscontinueHistoryChoice() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState == null
      ) {
        return (
          this.actions.split(",").filter(action => action == "X").length > 0 &&
          this.$parent.$parent.selectedRows.length < 1
        );
      }
      return false;
    },

    showMultiDiscontinueChoice() {
      if (
        this.stateDisplayArea == "CurrentStateDisplayArea" ||
        this.timeOfState != null
      ) {
        return (
          this.actions.split(",").filter(action => action == "D").length > 0 &&
          this.$parent.$parent.selectedRows.length > 0
        );
      }
      return false;
    },
    showActions() {
      // console.log("mouseover: " + this.mouseOver);
      // console.log("isHeaderFocus: " + this.isHeaderFocus);
      // console.log("showPopover: " + this.showPopover);
      return this.mouseOver || this.isHeaderFocus || this.showPopover;
    },
    selectedColumns: {
      get() {
        return this.$store.state.selectedColumns[this.keyId];
      },
      set(value) {
        let selectedColumns = this.$store.state.selectedColumns;
        selectedColumns[this.keyId] = value;
        this.$store.commit("setSelectedColumns", selectedColumns);
      }
    },
    showAddendum() {
      if (
        this.stateDisplayArea == "multiStateArea" &&
        this.timeOfState != null
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.settingsIcon {
  float: right;
  color: #409eff;
  cursor: pointer;
  padding: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
