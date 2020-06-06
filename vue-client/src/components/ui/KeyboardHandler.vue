<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      componentActionsList: {
        recommendation: {
          add: "showAddRecommendationTab",
          multiChange: "showMultiChangeRecommendationTab",
          change: "showChangeRecommendationsModal",
          discontinue: "discontinueRecommendation",
          discontinueHistory: "showRecommendationDiscontinueHistoryDialog"
        },
        reminder: {
          add: "showAddReminderModal",
          multiChange: "showMultiChangeReminderModal",
          change: "showChangeReminderModal",
          discontinue: "discontinueReminder"
        },
        goal: {
          add: "showAddGoalModal",
          multiChange: "showMultiChangeGoalModal",
          change: "showChangeGoalModal",
          discontinue: "discontinueGoal"
        }
      },
      shiftKeyPressed: false
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
  },
  methods: {
    keydownHandler(event) {
      /**
       * Global Key-Handler for Right-Panel components
       */
      let { focusRowIndex } = this.$store.state.StateAtCurrentTime;
      const { rows, searchKeyword } = this.$store.state.StateAtCurrentTime;

      if (event.key == "Shift") {
        this.shiftKeyPressed = true;
      }

      /**
       * Exception where make the Global key-handler not working.
       */
      if (searchKeyword.length > 0) {
        return;
      }
      if (event.key == "`") {
        // Set focus to the <current-state-components-search-box>
        focusRowIndex = rows.length - 1;
        this.$parent.$refs.search_box.setFocus();
        this.$store.commit("setStateAtCurrentTimeFocusRowIndex", focusRowIndex);
      } else if (event.key == "ArrowDown") {
        if (this.shiftKeyPressed) {
          console.log("Shift + down");
        }
        if (focusRowIndex == rows.length - 1) {
          focusRowIndex = 0;
        } else {
          focusRowIndex += 1;
        }
        this.$store.commit("setStateAtCurrentTimeFocusRowIndex", focusRowIndex);
      } else if (event.key == "ArrowUp") {
        if (this.shiftKeyPressed) {
          console.log("Shift + up");
        }
        if (focusRowIndex == 0) {
          focusRowIndex = rows.length - 1;
        } else {
          focusRowIndex -= 1;
        }
        this.$store.commit("setStateAtCurrentTimeFocusRowIndex", focusRowIndex);
      }

      const focusRow = rows[focusRowIndex];
      if (focusRow == null) {
        return;
      }

      /**
       * Card component <Row> actions
       */
      const info = focusRow.split("-");
      const component = info[0];
      const index = info[1];
      const { visibility } = this.$store.state.tabDialog;
      if (visibility == true) {
        return;
      }
      if (index > 0) {
        if (event.key == "c") {
          const list = this.$store.getters[`${component}s`];
          const selectedItem = list[index - 1];
          this.$store.commit(
            this.componentActionsList[component].change,
            selectedItem
          );
        } else if (event.key == "d") {
          const list = this.$store.getters[`${component}s`];
          const selectedItem = list[index - 1];
          this.$store.dispatch(
            this.componentActionsList[component].discontinue,
            {
              data: selectedItem,
              notify: this.$notify
            }
          );
          this.$store.dispatch("updateStateAtCurrentTimeRow");
        }
        return;
      }

      /**
       * Card components <Header> actions
       */
      if (event.key == "a") {
        this.$store.commit(this.componentActionsList[component].add);
      } else if (event.key == "m") {
        this.$store.commit(this.componentActionsList[component].multiChange);
      } else if (event.key == "x") {
        this.$store.commit(
          this.componentActionsList[component].discontinueHistory
        );
      }
    },
    keyupHandler(event) {
      if (event.key == "Shift") {
        this.shiftKeyPressed = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
  }
};
</script>

<style lang="scss" scoped>
</style>