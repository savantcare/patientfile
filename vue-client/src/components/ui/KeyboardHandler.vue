<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      componentActionsList: {
        recommendation: {
          add: "showAddRecommendationTabInLayer2",
          multiChange: "showMultiChangeRecommendationTabInLayer2",
          change: "showChangeRecommendationsTabInLayer2",
          discontinue: "discontinueRecommendation",
          discontinueHistory: "showRecommendationDiscontinueHistoryTabInLayer2"
        },
        reminder: {
          add: "showAddReminderTabInLayer2",
          multiChange: "showMultiChangeReminderTabInLayer2",
          change: "showChangeReminderTabInLayer2",
          discontinue: "discontinueReminder"
        },
        goal: {
          add: "showAddGoalTabInLayer2",
          multiChange: "showMultiChangeGoalTabInLayer2",
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
      let { focusRowIndex } = this.$store.state.CurrentStateDisplayArea;
      const { rows, searchKeyword } = this.$store.state.CurrentStateDisplayArea;

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
        this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", focusRowIndex);
      } else if (event.key == "ArrowDown") {
        if (this.shiftKeyPressed) {
          console.log("Shift + down");
        }
        if (focusRowIndex == rows.length - 1) {
          focusRowIndex = 0;
        } else {
          focusRowIndex += 1;
        }
        this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", focusRowIndex);
      } else if (event.key == "ArrowUp") {
        if (this.shiftKeyPressed) {
          console.log("Shift + up");
        }
        if (focusRowIndex == 0) {
          focusRowIndex = rows.length - 1;
        } else {
          focusRowIndex -= 1;
        }
        this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", focusRowIndex);
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
      const { visibility } = this.$store.state.multiTabDialogLayer2;
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
          this.$store.dispatch("updateCurrentStateDisplayAreaRow");
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