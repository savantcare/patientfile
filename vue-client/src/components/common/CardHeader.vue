<template>
  <div @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
    <span>{{title}}</span>
    <div style="float: right" v-if="showActions">
      <el-button
        type="text"
        size="mini"
        @click="$emit('multiDiscontinue')"
        v-if="selected.length > 0"
      >D</el-button>
      <div v-else>
        <el-button type="text" size="mini" @click="$emit('showAddDialog')">A</el-button>
        <el-button type="text" size="mini" @click="$emit('showMultiChangeDialog')">M</el-button>
        <el-button type="text" size="mini" @click="$emit('focusPanel')">F</el-button>
        
        <!--
        Clicking on settings icon will allow choosing which columns to display and 
        save preferences in local storage
        This will need to know what columns are available in the JSON. 
        Component 1 might have 5 columns whose visibility can be turned on or off
        and component 2 might have 2 columns whose visibility can be turned on or off
        -->        
        <el-popover placement="bottom" width="200" trigger="click">
          <i slot="reference" class="el-icon-s-tools settingsIcon"></i>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "actions", "type"],
  data() {
    return {
      mouseOver: false,
      selected: []
    };
  },
  computed: {
    focusRow() {
      return this.$store.getters.rightPanelFocusRow;
    },
    isHeaderFocus() {
      return (
        this.focusRow == `${this.title.toLowerCase()}-0` && this.type == "card"
      );
    },
    showAddButton() {
      return this.actions.indexOf("A") > -1 && this.$parent.selected.length < 1;
    },
    showMultiChangeButton() {
      return this.actions.indexOf("M") > -1 && this.$parent.selected.length < 1;
    },
    showFocusButton() {
      return this.actions.indexOf("F") > -1 && this.$parent.selected.length < 1;
    },
    showDiscontinueButton() {
      return this.actions.indexOf("D") > -1 && this.$parent.selected.length > 0;
    },
    showActions() {
      return this.mouseOver || this.isHeaderFocus;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.settingsIcon{
  float:right; color:#409EFF; cursor:pointer; padding: 5px;
}
</style>