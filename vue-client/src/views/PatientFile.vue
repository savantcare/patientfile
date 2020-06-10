/*
App architecture 3 core principles      Architecture / LOC = 1/10 
==================================      Total references (case insensitive): 605

Core 1. Page design
===================

┌────────────────────────────────────────────────────────────────────────┐  
|    MultiStateDisplayAreaHeader = 7      |                              |  
+-----------------------------------------+                              |     
|                                         |                              |    
|   multiStateDisplayArea = 74            | currentStateDisplayArea = 93 |  
|                                         |                              |  
|                                         |                              |  typeOfStateDisplayArea =  72  
|                                         |                              |  This var contains 1 of: 
|This has list of compomponents.          |This has list of Components   |  multiStateDisplayArea  
|Data of each component depends on        |                              |            OR
|timeOfState ( = 41 )                     |Data is from currentTime      |  currentStateDisplayArea
|timeOfState has 2 possibilities          |                              |
|                                         |                              |
|1. timeOfState=null                      |                              |
|2. timeOfState=value                     |                              |       
|                                         |                              |
| If timeOfState==null then data of       |                              |
| component is from currentTime           |                              |
|                                         |                              |
|                                         +------------------------------+
|                                         |SearchBoxForCommandsFromUser=4|
└────────────────────────────────────────────────────────────────────────┘


Core 2. Multi state display area header design  
==============================================

┌────────────────────────────────────────────────────────────────────────────────┐
|          |           Time of state selection            |  Type of component   |
| Name Age |         +-------------------------->         |  selection           |
|          | Slider at start is 100  meaning current time |  health/others       |
└────────────────────────────────────────────────────────────────────────────────┘


 Core 3: Component design                                                                              
 ========================                                                                              
                                                                                                       
┌────────────────────CardHeader = 86────────────────────┐   ┌─────────────────────────────────────────┐
│ ┌───────────────┐               ┌────────────────────┐│   │         Card header actions             │
│ │  CtName = 35  │               │Card header actions ││   ├──┬─────────────────────────────────┬────┤
│ └───────────────┘               └────────────────────┘│   │A │handleClickOnAInCardHeader()           │ 60 │
┣━━━━━━━━━━━━━━━━━━━DataTable = 28━━━━━━━━━━━━━━━━━━━━━━┫   ├──┼─────────────────────────────────┼────┤
│                                                       │   │M │handleClickOnMInCardHeader()     │ 59 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│  Data row 1                         Data row actions ││   │F │handleClickOnFInCardHeader()                     │ 61 │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │D │multiDiscontinue()               │ 74 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │   ├──┼─────────────────────────────────┼────┤
│  Column 1              Column 2         C D           │   │X │handleClickOnXInCardHeader│ 4  │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │R │Review                           │    │
└───────────────────────────────────────────────────────┘   ├──┼─────────────────────────────────┼────┤
                                                            │G │handleUpdateColumns()            │ 17 │
                                                            └──┴─────────────────────────────────┴────┘


 ┌─────────────────────────────────────────┐
 │          Data row actions               │
 ├──┬─────────────────────────────────┬────┤
 │C │    handleChange()               │ 26 │
 ├──┼─────────────────────────────────┼────┤
 │D │    handleDiscontinue()          │ 26 │
 └──┴─────────────────────────────────┴────┘


vk-tech@vk-mini-layer2-3 ~/g/s/p/v/src> cloc --counted=/tmp/files-counted.txt .
      90 text files.
      90 unique files.                              
       2 files ignored.

github.com/AlDanial/cloc v 1.86  T=0.11 s (808.1 files/s, 96325.8 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Vuejs Component                 67            298            475           7088
JavaScript                      19            130            105           2626
Markdown                         3              1              0              4
SVG                              1              0              0              1
-------------------------------------------------------------------------------
SUM:                            90            429            580           9719
-------------------------------------------------------------------------------
*/

<template>
  <div>
    <!-- https://github.com/bajaniyarohit/vue-split-panel -->
    <!-- To understand how page is divided: Read Core 1 at top of this file -->
    <Split style="height: 100vh;" @onDrag="onDrag">
      <!-- Starting with 70% and 100px minimum -->
      <SplitArea :size="70" :minSize="100" id="multiStateDisplayArea">
        <MultiStateDisplayAreaHeader></MultiStateDisplayAreaHeader>
        <component
          v-for="(component, index) in multiStateDisplayAreaComponents"
          :key="`multi-state-display-area-component-${index}`"
          :is="component.value"
          v-bind="{typeOfStateDisplayArea: 'multiStateDisplayArea'}"
        ></component>
      </SplitArea>
      <SplitArea :size="30" :minSize="100" id="currentStateDisplayArea">
        <transition-group name="list" tag="div">
          <component
            v-for="(component, index) in CurrentStateDisplayAreaComponents"
            :key="`current-state-display-area-component-${index}`"
            :is="component.value"
          ></component>
        </transition-group>
        <search-box-for-commands-from-user ref="search_box"></search-box-for-commands-from-user>
      </SplitArea>
    </Split>

    <!-- tab-dialog is present in home.vue but in hidden state -->
    <layer-2-multi-tab-dialog></layer-2-multi-tab-dialog>
    <KeyboardHandler />
  </div>
</template>
<script>
const MultiStateDisplayAreaHeader = () =>
  import("@/components/ui/MultiStateDisplayAreaHeader.vue");

// Right panel components
const SearchBoxForCommandsFromUser = () =>
  import("@/components/ui/SearchBoxForCommandsFromUser.vue");

const Layer2MultiTabDialog = () => import("./Layer2MultiTabDialog.vue");

// TODO: Rename this to RecommendationCard
const Recommendation = () =>
  import("@/components/composition-layer1/RecommendationCard");
const Reminder = () => import("@/components/composition-layer1/RemindersCard");
const Goal = () => import("@/components/composition-layer1/GoalsCard");
const Diagnosis = () => import("@/components/composition-layer1/DiagnosesCard");
const FamilyHistory = () =>
  import("@/components/composition-layer1/FamilyHistoryCard");
const KeyboardHandler = () => import("@/components/ui/KeyboardHandler");

export default {
  name: "Home",
  components: {
    Layer2MultiTabDialog,

    MultiStateDisplayAreaHeader,

    SearchBoxForCommandsFromUser,
    Recommendation,
    Reminder,
    Goal,
    Diagnosis,
    FamilyHistory,
    KeyboardHandler
  },
  data() {
    return {
      searchKeyword: "",
      multiStateDisplayAreaWidth: 70
    };
  },
  computed: {
    focusComponent() {
      return this.$store.state.focusComponent;
    },
    CurrentStateDisplayAreaComponents() {
      return this.$store.getters.currentStateDisplayAreaList;
    },
    multiStateDisplayAreaComponents() {
      const componentType = this.$store.state.stateAtSelectedTime.componentType;
      const components = this.$store.state.component.list.filter(
        item => item.tag == componentType
      );

      const list = this.$store.getters.multiStateDisplayAreaCtList.filter(
        item => {
          const verifyComponent =
            components.filter(
              component =>
                component.name.toLowerCase() == item.abbreviation.toLowerCase()
            ).length > 0;
          return verifyComponent;
        }
      );
      return list;
    }
  },
  beforeCreate() {},
  mounted() {
    // TODO: this should be patientUUID
    const patientId = this.$route.query.patient_id;
    if (patientId.length < 1) {
      this.$router.push("/login");
    }

    const role = this.$store.state.userRole;

    this.$socket.emit("CREATE_ROOM", `room-${patientId}-${role}`);

    this.$store.commit("setFocusComponent", "");
    this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", -1);

    // setTimeout(() => {
    //   this.$store.dispatch("updateCurrentStateDisplayAreaRow");
    // }, 1000);
    this.$store.dispatch("loadComponents", {
      notify: this.$notify
    });
  },
  methods: {
    onDrag(size) {
      const rightSize = size[1];
      this.$store.commit(
        "setCurrentStateDisplayAreaSplitAreaWidth",
        `calc(${rightSize}% - 4px) `
      );
      this.multiStateDisplayAreaWidth = size[0];
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
};
</script>

<style>
html {
  margin: 0 auto;
}

div#app {
  position: relative;
  max-width: 1440px; /* Doctors use the app on a laptop sitting infront of a patient. The laptop is 13.3" and has a resolution of 1440x900 */
  max-height: 900px;
}
.split.split-horizontal,
.gutter.gutter-horizontal {
  max-height: 900px;
}

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