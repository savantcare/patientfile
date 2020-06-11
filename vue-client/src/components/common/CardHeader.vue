<!--
For architrecture read core 3 at Home.vue 

A card header needs to deal with 3 situations:
1. typeOfStateDisplayArea == "CurrentStateDisplayArea"
2. typeOfStateDisplayArea == "MultiStateDisplayArea"   timeOfState=null
3. typeOfStateDisplayArea == "MultiStateDisplayArea"   timeOfState=value

A component needs to know whther it is being used in "MultiStateDisplayArea"  or "CurrentStateDisplayArea"
If the component is being used in "MultiStateDisplayArea" then the component needs to know "timeOfState"
-->

<template>
  <div @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
    <span :style="{'color': isHeaderFocus == true ? '#409EFF' : 'black'}">{{ctName}}</span>
    <transition name="fade">
      <div style="float: right" v-if="showActions">
        <el-button
          type="text"
          size="mini"
          @click="$emit('handleClickOnDInCardHeader')"
          v-if="selected.length > 0"
        >D</el-button>
        <div v-else>
          <el-button
            type="text"
            size="mini"
            @click="$emit('showTabToRevewInLayer2')"
            v-if="showReviewChoice"
          >R</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('handleClickOnAInCardHeader')"
            v-if="showAddChoice"
          >A</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('handleClickOnMInCardHeader')"
            v-if="showMultiChangeButton"
          >M</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('handleClickOnFInCardHeader')"
            v-if="showFocusChoice"
          >F</el-button>
          <el-button
            type="text"
            size="mini"
            @click="$emit('handleClickOnXInCardHeader')"
            v-if="showDiscontinueHistoryChoice"
          >X</el-button>

          <el-popover placement="top-start" trigger="hover" content="Addendum">
            <el-button slot="reference" type="text" size="mini" v-if="showAddendumChoice">E</el-button>
          </el-popover>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["ctName", "actions", "typeOfStateDisplayArea", "keyId"],
  data() {
    return {
      mouseOver: false,
      selected: [],
      timeOfState: this.$route.query.timeOfState // If this value is NULL it means currentStateDisplayArea is being shown.
    };
  },
  computed: {
    focusRow() {
      return this.$store.getters.CurrentStateDisplayAreaFocusRow;
    },
    isHeaderFocus() {
      return (
        this.focusRow == `${this.ctName.toLowerCase()}-0` &&
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea"
      );
    },
    // You can data-bind to computed properties in templates just like a normal property.
    // Ref: https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property
    showAddChoice() {
      if (
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
        this.typeOfStateDisplayArea == "CurrentStateDisplayArea" ||
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
      return this.mouseOver || this.isHeaderFocus;
    },
    showAddendumChoice() {
      if (
        this.typeOfStateDisplayArea == "multiStateDisplayArea" &&
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
