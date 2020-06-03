<template>
  <div>
    <!-- https://github.com/bajaniyarohit/vue-split-panel -->
    <Split style="height: 100vh;" @onDrag="onDrag">
      <!-- Starting with 70% and 100px minimum -->
      <!-- Rename this to stateAtSelectedTime -->
      <SplitArea :size="70" :minsize="100" id="stateAtSelectedTime">
        <stateAtSelectedTimeHeader></stateAtSelectedTimeHeader>
        <!-- The type can be stateAtSelectedTime or currentState -->
        <Recommendation type="stateAtSelectedTime" />
        <Reminder type="stateAtSelectedTime" />
      </SplitArea>
      <!-- TODO: Better name StateAtCurrentTime Since it better mirrors stateAtSelectedTime -->
      <SplitArea :size="30" :minsize="100" id="StateAtCurrentTime">
        <transition-group name="list" tag="div">
          <component
            v-for="(component, index) in StateAtCurrentTimeComponents"
            :key="`right-component-${index}`"
            :is="component.value"
          ></component>
        </transition-group>
        <search-box-for-commands-from-user ref="search_box"></search-box-for-commands-from-user>
      </SplitArea>
    </Split>

    <!-- tab-dialog is present in home.vue but in hidden state -->
    <second-layer-tab-dialog></second-layer-tab-dialog>
    <KeyboardHandler />
  </div>
</template>
<script>
// const TabDialog = () => import("@/components/ui/secondLayerTabDialog.vue");

// Left panel components
// const RecommendationsPanel = () =>
// const RemindersPanel = () =>
// const DiagnosisPanel = () =>
const stateAtSelectedTimeHeader = () =>
  import("@/components/ui/stateAtSelectedTimeHeader.vue");
// const DateSlider = () => import("@/components/ui/DateSlider.vue");
// const TestPanel = () => import("@/components/stateAtSelectedTimeTestComponent.vue");

// Right panel components
const SearchBoxForCommandsFromUser = () =>
  import("@/components/ui/SearchBoxForCommandsFromUser.vue");
// const RecommendationsCard = () =>
// import("@/components/domain/RecommendationsCard/Implementation.vue");
// const RemindersCard = () =>
// import("@/components/domain/RemindersCard/Implementation.vue");
// const CombinationCard = () => import("@/components/CombinationCard.vue");
const SecondLayerTabDialog = () => import("./secondLayerTabDialog");


// TODO: Rename this to RecommendationCard
const Recommendation = () =>
  import("@/components/composition-layer1/RecommendationCard");
const Reminder = () => import("@/components/composition-layer1/RemindersCard");
const KeyboardHandler = () => import("@/components/ui/KeyboardHandler");

import StateAtCurrentTimeCards from "@/currentStateCards.js";

export default {
  name: "Home",
  components: {
    SecondLayerTabDialog,
    // Left panel components -> On this side state of the patient on a day is shown
    // RecommendationsPanel,
    // RemindersPanel,
    // DiagnosisPanel,
    stateAtSelectedTimeHeader,
    // DateSlider,
    // TestPanel,

    // Right panel components  -> On this side current state of the patient is shown.
    SearchBoxForCommandsFromUser,
    // RecommendationsCard,
    // RemindersCard,
    // CombinationCard,
    Recommendation,
    Reminder,
    KeyboardHandler
  },
  data() {
    return {
      searchKeyword: "",
      stateAtSelectedTimeWidth: 70
    };
  },
  computed: {
    focusComponent() {
      return this.$store.state.focusComponent;
    },
    StateAtCurrentTimeComponents() {
      return this.$store.state.rightPanel.list;
    },
    stateAtSelectedTimeComponents() {
      return this.$store.getters.stateAtSelectedTimeList;
    }
  },
  beforeCreate() {
    this.$store.commit("setRightPanelList", StateAtCurrentTimeCards);
  },
  mounted() {
    // this.$store.dispatch("loadSetting");
    // Join room
    const patientId = this.$route.query.patient_id;
    const role = this.$store.state.userRole;

    this.$socket.emit("CREATE_ROOM", `room-${patientId}-${role}`);

    this.$store.commit("setFocusComponent", "");
    this.$store.commit("setRightPanelFocusRowIndex", -1);

    // TODO: This should be called updateStateAtCurrentTimeArea
    this.updateRightPanelRows();
  },
  methods: {
    onDrag(size) {
      const rightSize = size[1];
      this.$store.commit("setRightPanelWidth", `calc(${rightSize}% - 4px) `);
      this.stateAtSelectedTimeWidth = size[0];
    },
    updateRightPanelRows() {
      this.$store.dispatch("updateRightPanelRow");
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
};
</script>

<style>
.card .card-header {
  background-color: #343a40 !important;
  color: white;
}
body {
  margin: 0px;
}
.ml-2 {
  margin-left: 12px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>