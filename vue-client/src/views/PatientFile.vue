/*

KT: App architecture 4 core principles      Architecture / LOC = 1/10 
======================================      Total references (case insensitive): 605

Core 1/6. Page design
===================

┌────────────────────────────────────────────────────────────────────────┐  
|    MultiStateDisplayAreaHeader = 9      |                              |  
+-----------------------------------------+                              |     
|                                         |                              |    
|   multiStateDisplayArea = 102           | currentStateDisplayArea = 137|  
|                                         |                              |  
|                                         |                              |  typeOfStateDisplayArea = 122  
|                                         |                              |  This var contains 1 of: 
|This has list of compomponents.          |This has list of Components   |  multiStateDisplayArea  
|Data of each component depends on        |                              |            OR
|timeOfStateSelectedInHeader ( = 99 )               |Data is from currentTime      |  currentStateDisplayArea
|timeOfStateSelectedInHeader has 2 possibilities    |                              |
|                                         |On right side I do not care   |
|1. timeOfStateSelectedInHeader=2038-01-19 03:14:07 |about timeOfStateSelectedInHeader       |
|2. timeOfStateSelectedInHeader=value               |                              |       
|                                         |                              |
|If timeOfStateSelectedInHeader=2038-01-19 03:14:07 |                              |
| then data of component is from          |                              |
| current time.                           |                              |
|                                         +------------------------------+
|                                         |SearchBoxForCommandsFromUser=4|
└────────────────────────────────────────────────────────────────────────┘


Core 2/6. Multi state display area header design  
==============================================

┌────────────────────────────────────────────────────────────────────────────────┐
|          |           Time of state selection            |  Type of component   |
| Name Age |         +-------------------------->         |  selection           |
|          | Slider at start is 100  meaning current time |  health/others       |
└────────────────────────────────────────────────────────────────────────────────┘


 Core 3/6 Component design                                                                              
 ========================                                                                              
                                                                                                       
┌────────────────────CardHeader = 86────────────────────┐   ┌─────────────────────────────────────────┐
│ ┌───────────────┐               ┌────────────────────┐│   │         Card header actions             │
│ │  CtName = 35  │               │Card header actions ││   ├──┬─────────────────────────────────┬────┤
│ └───────────────┘               └────────────────────┘│   │A │handleClickOnAInCardHeader()     │ 55 │
┣━━━━━━━━━━━━━━━━━━━DataTable = 28━━━━━━━━━━━━━━━━━━━━━━┫   ├──┼─────────────────────────────────┼────┤
│                                                       │   │M │handleClickOnMInCardHeader()     │ 73 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│  Data row 1                         Data row actions ││   │F │handleClickOnFInCardHeader()     │ 77 │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │D │handleClickOnDInCardHeader()     │ 56 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │   ├──┼─────────────────────────────────┼────┤
│  Column 1              Column 2         C D           │   │X │handleClickOnXInCardHeader       │ 5  │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │R │Review                           │    │
└───────────────────────────────────────────────────────┘   ├──┼─────────────────────────────────┼────┤
                                                            │G │handleUpdateColumns()            │ 17 │
                                                            └──┴─────────────────────────────────┴────┘


 ┌─────────────────────────────────────────┐
 │          Data row actions               │
 ├──┬─────────────────────────────────┬────┤
 │C │    handleClickOnCInDataRow()    │ 26 │
 ├──┼─────────────────────────────────┼────┤
 │D │    handleClickOnDInDataRow()    │ 26 │
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


Core 4/6: How many types of component

1/2: Card                                                      ideal: patient/Recommendations/Layer1Card.vue
  4 categories
     User interface of a card component                        See line 2 
     Functions to manage UI changes from Card Header           See line 60     
     Functions to manage UI changes from data row              See line 116  
     Functions to manage DB changes                            See line 137       

2/2: Form                                                      ideal: patient/Recommendations/Layer2/AddRecommendations.vue
  2 categories
     User interface of a form component                        See Line 2 
     Managing form submission

Core 5/6: How many types of socket events                      ideal: patient/Recommendations/stateDBSocket.js
  1/3 add                                                      See line 62 
  2/3 change      (same as update query for temporal DB)       See line 83 
  3/3 discontinue (same as delete query for temporal DB)       See line 96


Core 6/6: What are 2 categories of DB API calls               ideal: patient/Recommendations/stateDBSocket.js
  1/2 Get data                                                See line 111
  2/2 Change data                                             See line 248

*/

/* KT: 
This file is included by src/router/index.js
src/router/index.js sends control here if the / route is given by the user
*/

<template>
  <div>
    <!-- https://github.com/bajaniyarohit/vue-split-panel -->
    <!-- To understand how page is divided: Read Core 1 at top of this file -->
    <Split style="height: 100vh;" @onDrag="onDrag">
      <!-- Starting with 70% and 100px minimum -->
      <SplitArea :size="70" :minSize="100" id="multiStateDisplayArea">
        <TheMultiStateDisplayAreaHeader></TheMultiStateDisplayAreaHeader>

        <!-- TODO: keep alive is not working. The sql query is still being called when rex command is given twice -->
        <component
          v-for="(component, index) in cfGetMultiStateDisplayAreaCts"
          :key="`multi-state-display-area-component-${index}`"
          :is="component.name"
          v-bind="{typeOfStateDisplayArea: 'multiStateDisplayArea'}"
        ></component>
      </SplitArea>
      <SplitArea :size="30" :minSize="100" id="currentStateDisplayArea">
        <keep-alive>
          <transition-group name="list" tag="div">
            <component
              v-for="(component, index) in cfGetCurrentStateDisplayAreaCts"
              :key="`current-state-display-area-component-${index}`"
              :is="component.name"
            ></component>
          </transition-group>
        </keep-alive>
        <search-box-for-commands-from-user ref="search_box"></search-box-for-commands-from-user>
      </SplitArea>
    </Split>

    <!-- tab-dialog is present in patientFile.vue but in hidden state -->
    <layer-2-multi-tab-dialog></layer-2-multi-tab-dialog>
    <KeyboardHandler />
  </div>
</template>

<script>
// This is needed for this component to be referred in the template
const TheMultiStateDisplayAreaHeader = () =>
  import("@/components/common/multiStateDisplayArea/theHeader.vue");

import ormComponentsAllowedForUserRole from "../components/common/roleBasedAccess/vuex-orm-model/ComponentsAllowedForUserRole";
import ormComponent from "../components/common/roleBasedAccess/vuex-orm-model/component";

//vue-client/src/components/common/roleBasedAccess/vuex-orm-model/userComponent.js

const SearchBoxForCommandsFromUser = () =>
  import("@/components/common/search/SearchBoxForCommandsFromUser.vue");

const Layer2MultiTabDialog = () =>
  import("@/components/common/Layer2MultiTabDialog/");

// TODO: Rename this to Recommendations/Layer1Card
const Recommendation = () =>
  import("@/components/patient/Recommendations/Layer1Card");
const Reminder = () => import("@/components/patient/reminder/Layer1Card");
const Goal = () => import("@/components/patient/goal/Layer1Card");
const Diagnosis = () => import("@/components/patient/diagnosis/Layer1Card");
const FamilyHistory = () =>
  import("@/components/patient/FamilyHistory/FamilyHistoryCard");
const KeyboardHandler = () => import("@/components/common/KeyboardHandler");
const BM = () =>
  import("@/components/patient/BodyMeasurements/CurrentStateCard");
const MSE = () =>
  import("@/components/patient/MentalStatusExam/Layer1Card");  

export default {
  name: "Home",
  components: {
    Layer2MultiTabDialog,

    TheMultiStateDisplayAreaHeader,

    SearchBoxForCommandsFromUser,
    Recommendation,
    Reminder,
    Goal,
    Diagnosis,
    FamilyHistory,
    KeyboardHandler,
    BM,
    MSE
  },
  data() {
    // KT: Why is this a function and not a object? Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
    return {
      searchKeyword: "",
      multiStateDisplayAreaWidth: 70
    };
  },
  computed: {
    cfFocusCt() {
      return this.$store.state.cfFocusCt;
    },
    cfGetCurrentStateDisplayAreaCts() {
      const arAllCtList = ormComponent.all();

      const arCtListAllowedForUserRole = ormComponentsAllowedForUserRole
        .query()
        .where("currentStateDisplayAreaImportance", value => value > 0)
        .orderBy("currentStateDisplayAreaImportance", "desc")
        .get();

      console.log(arCtListAllowedForUserRole);
      let arCurrentStateDisplayAreaComponents = [];

      arCtListAllowedForUserRole.map(function(item) {
        arCurrentStateDisplayAreaComponents.push(item);
      });

      console.log(arCurrentStateDisplayAreaComponents);
      let arCtListOrderedByImportance = [];
      arCurrentStateDisplayAreaComponents.forEach(element => {
        const eachComponent = arAllCtList.filter(
          item => item.uuid == element.componentUUID
        );

        if (eachComponent[0]) {
          eachComponent[0].name = eachComponent[0].name.split(" ").join("-");
          arCtListOrderedByImportance.push(eachComponent[0]);
        }
      });

      /*const arCtListAllowedForUserRole = ormComponentsAllowedForUserRole.all();
      
      arCtListAllowedForUserRole.map(function(item) {
        if (item.currentStateDisplayAreaImportance > 0)
          currentStateDisplayAreaComponents.push(item.componentUUID);
      });

      const componentType = this.$store.state.multiStateDisplayArea
        .componentType; // Possible values are health or other.

      const components = arAllCtList.filter(
         
         // For each component the type of the component is stored in sc_component -> ctMaster -> tag
        //  Tag is used since some components may belong to both health and other type.
        
        item => item.tag == componentType
      );
*/
      console.log(arCtListOrderedByImportance);
      return arCtListOrderedByImportance;
    },

    cfGetMultiStateDisplayAreaCts() {
      const arAllCtList = ormComponent.all();

      const arCtListAllowedForUserRole = ormComponentsAllowedForUserRole
        .query()
        .where("multiStateDisplayAreaImportance", value => value > 0)
        .orderBy("multiStateDisplayAreaImportance", "desc")
        .get();

      console.log(arCtListAllowedForUserRole);
      let arMultiStateDisplayAreaComponents = [];

      arCtListAllowedForUserRole.map(function(item) {
        arMultiStateDisplayAreaComponents.push(item);
      });

      console.log(arMultiStateDisplayAreaComponents);
      let arCtListOrderedByImportance = [];
      arMultiStateDisplayAreaComponents.forEach(element => {
        const eachComponent = arAllCtList.filter(
          item => item.uuid == element.componentUUID
        );
        //eachComponent[0].name = eachComponent[0].name.split(" ").join("-");
        if (eachComponent[0]) {
          eachComponent[0].name = eachComponent[0].name.split(" ").join("-");
          arCtListOrderedByImportance.push(eachComponent[0]);
        }
      });

      return arCtListOrderedByImportance;
    }
  },
  beforeCreate() {},
  mounted() {
    // TODO: this should be patientUUID
    const patientId = this.$route.query.patient_id;
    if (patientId.length < 1) {
      this.$router.push("/login");
    }

    const roleName = this.$store.state.userRole;
    const roleUUID = this.$store.state.userRoleUUID;
    //console.log(roleName);

    this.$socket.emit("CREATE_ROOM", `room-${patientId}-${roleName}`);

    this.$store.commit("setFocusComponent", "");
    this.$store.commit("setCurrentStateDisplayAreaFocusRowIndex", -1);

    // setTimeout(() => {
    //   this.$store.dispatch("updateCurrentStateDisplayAreaRow");
    // }, 1000);

    // KT: Actions are triggered with the store.dispatch method. Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
    // This changes only once in a long time. When this value is changed on the server DB I expect the doctor to clear their cache on the browser.

    // get the user component based on user roleName
    this.$store.dispatch("apiLoadComponentsBasedOnUserRole", {
      roleUUID: roleUUID,
      notify: this.$notify
    });

    this.$store.dispatch("apiLoadComponentsInStateDisplayArea", {
      notify: this.$notify
    });

    /*
    this.$store.cache.dispatch("loadUserRole", {
      notify: this.$notify,
      timeout: 1000000000 // Store's timeout can be overwritten by dispatch timeout option in Dispatch Options or in payload. Ref: https://www.npmjs.com/package/vuex-cache#cacheaction
    });

    this.$store.cache.dispatch("loadComponents", {
      notify: this.$notify,
      timeout: 1000000000 // Store's timeout can be overwritten by dispatch timeout option in Dispatch Options or in payload. Ref: https://www.npmjs.com/package/vuex-cache#cacheaction
    });*/

    // Initialize the timeOfStateSelectedInHeader. 2038-01-19 03:14:07.999999 is default value stored by MariaDB
    let timeOfStateSelectedInHeader = "2038-01-19 03:14:07.999999";
    console.log(timeOfStateSelectedInHeader);
    this.$store.commit(
      "settimeOfStateSelectedInHeader",
      timeOfStateSelectedInHeader
    );
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