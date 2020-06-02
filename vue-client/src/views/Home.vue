<template>
  <div>
    <!-- https://github.com/bajaniyarohit/vue-split-panel -->
    <Split style="height: 100vh;" @onDrag="onDrag">
      <!-- Starting with 70% and 100px minimum -->
      <SplitArea :size="70" :minsize="100" id="stateOnASelectedTime">
        <stateOnASelectedTimeHeader></stateOnASelectedTimeHeader>
        <!-- The type can be stateOnASelectedTime or currentState -->
        <Recommendation type="stateOnASelectedTime" />
        <!-- <div id="stateOnASelectedTimeContainer">
          <div id="stateOnASelectedTimeContent">
            <div v-if="stateOnASelectedTimeComponents.length > 0">
              <component
                :is="component"
                v-for="(component, index) in stateOnASelectedTimeComponents"
                :key="`left-component-${index}`"
              ></component>
            </div>
          </div>
        </div>-->
      </SplitArea>
      <SplitArea :size="30" :minsize="100" id="CurrentState">
        <transition-group name="list" tag="div">
          <component
            v-for="(component, index) in CurrentStateComponents"
            :key="`right-component-${index}`"
            :is="component.value"
          ></component>
        </transition-group>

        <current-state-components-search-box ref="search_box" @renderCurrentStateCards="renderCurrentStateCards"></current-state-components-search-box>
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
const stateOnASelectedTimeHeader = () => import("@/components/ui/stateOnASelectedTimeHeader.vue");
// const DateSlider = () => import("@/components/ui/DateSlider.vue");
// const TestPanel = () => import("@/components/stateOnASelectedTimeTestComponent.vue");

// Right panel components
const CurrentStateComponentsSearchBox = () => import("@/components/ui/CurrentStateComponentsSearchBox.vue");
// const RecommendationsCard = () =>
// import("@/components/domain/RecommendationsCard/Implementation.vue");
// const RemindersCard = () =>
// import("@/components/domain/RemindersCard/Implementation.vue");
// const CombinationCard = () => import("@/components/CombinationCard.vue");
const SecondLayerTabDialog = () => import("./secondLayerTabDialog");

const Recommendation = () =>
  import("@/components/composition-layer1/RecommendationCard");
const KeyboardHandler = () => import("@/components/ui/KeyboardHandler");

export default {
  name: "Home",
  components: {
    SecondLayerTabDialog,
    // Left panel components -> On this side state of the patient on a day is shown
    // RecommendationsPanel,
    // RemindersPanel,
    // DiagnosisPanel,
    stateOnASelectedTimeHeader,
    // DateSlider,
    // TestPanel,

    // Right panel components  -> On this side current state of the patient is shown. 
    CurrentStateComponentsSearchBox,
    // RecommendationsCard,
    // RemindersCard,
    // CombinationCard,
    Recommendation,
    KeyboardHandler
  },
  data() {
    return {
      searchKeyword: "",
      stateOnASelectedTimeWidth: 70
    };
  },
  computed: {
    focusComponent() {
      return this.$store.state.focusComponent;
    },
    CurrentStateComponents() {
      return this.$store.state.rightPanel.list;
    },
    stateOnASelectedTimeComponents() {
      return this.$store.getters.stateOnASelectedTimeList;
    }
  },
  beforeCreate() { // this is a lifecycle event https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
    // Initialize rightPanel components
    const rightPanelCards = [
      {
        key: "recommendation",
        value: require("../components/composition-layer1/RecommendationCard")
          .default
      },
      {
        key: "reminder",
        value: require("../components/composition-layer1/RemindersCard").default
      },
      {
        key: "diagnosis",
        value: require("../components/composition-layer1/DiagnosesCard").default
      },
      {
        key: "goal",
        value: require("../components/composition-layer1/GoalsCard").default
      },
      {
        key: "socialHistory",
        value: require("../components/composition-layer1/SocialHistoryCard")
          .default
      },
      {
        key: "serviceStatements",
        value: require("../components/composition-layer1/ServiceStatementsCard")
          .default
      },
      {
        key: "bodyMeasurements",
        value: require("../components/composition-layer1/BodyMeasurementsCard")
          .default
      },
      {
        key: "contacts",
        value: require("../components/composition-layer1/ContactsCard").default
      },
      {
        key: "documents",
        value: require("../components/composition-layer1/DocumentsCard").default
      },
      {
        key: "familyHistory",
        value: require("../components/composition-layer1/FamilyHistoryCard")
          .default
      },
      {
        key: "hospitalizations",
        value: require("../components/composition-layer1/HospitalizationsCard")
          .default
      },
      {
        key: "AIScribe",
        value: require("../components/composition-layer1/AIScribeCard").default
      },
      {
        key: "allergiess",
        value: require("../components/composition-layer1/AllergiesCard").default
      },
      {
        key: "policies",
        value: require("../components/composition-layer1/PoliciesCard").default
      },
      {
        key: "referral",
        value: require("../components/composition-layer1/ReferralCard").default
      },
      {
        key: "screening",
        value: require("../components/composition-layer1/ScreeningCard").default
      },
      {
        key: "substancesAbuse",
        value: require("../components/composition-layer1/SubstancesAbuseCard")
          .default
      },
      {
        key: "selfHarm",
        value: require("../components/composition-layer1/SelfHarmCard").default
      },
      {
        key: "processNote",
        value: require("../components/composition-layer1/ProcessNoteCard")
          .default
      },
      {
        key: "profileCard",
        value: require("../components/composition-layer1/ProfileCard").default
      },
      {
        key: "pastPsychHistoryCard",
        value: require("../components/composition-layer1/PastPsychHistoryCard")
          .default
      }
    ];

    this.$store.commit("setRightPanelList", rightPanelCards);
    // Initialize stateOnASelectedTime components
    // const stateOnASelectedTimeList = [RecommendationsPanel, RemindersPanel];
    // this.$store.commit("setstateOnASelectedTimeList", stateOnASelectedTimeList);
  },
  mounted() {
    // this.$store.dispatch("loadSetting");
    // Join room
    const patientId = this.$route.query.patient_id;
    const role = this.$store.state.userRole;

    this.$socket.emit("CREATE_ROOM", `room-${patientId}-${role}`);

    this.$store.commit("setFocusComponent", "");
    this.$store.commit("setRightPanelFocusRowIndex", -1);
    this.updateRightPanelRows();
  },
  methods: {
    onDrag(size) {
      const rightSize = size[1];
      this.$store.commit("setRightPanelWidth", `calc(${rightSize}% - 4px) `);
      this.stateOnASelectedTimeWidth = size[0];
    },
    renderCurrentStateCards(action) {
      if (action == "clear") {
        this.$store.commit("setRightPanelFocusRowIndex", -1);
        this.$store.commit("setRightPanelList", []);
      } else if (action.search("recommendation") > -1) {
        const newList = [];
        this.CurrentStateComponents.forEach(item => {
          if (item.key != "recommendation") {
            newList.push(item);
          }
        });
        newList.push({
          key: "recommendation",
          value: require("../components/composition-layer1/RecommendationCard")
            .default
        });

        this.$store.commit("setRightPanelList", newList);
      } else if (action.search("reminder") > -1) {
        const newList = [];
        this.CurrentStateComponents.forEach(item => {
          if (item.key != "reminder") {
            newList.push(item);
          }
        });
        newList.push({
          key: "reminder",
          value: require("../components/composition-layer1/RemindersCard")
            .default
        });

        this.$store.commit("setRightPanelList", newList);
      }
      this.updateRightPanelRows();
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