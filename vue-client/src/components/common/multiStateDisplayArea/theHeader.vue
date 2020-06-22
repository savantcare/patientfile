/*

Single instance component names
Components that should only ever have a single active instance should begin with the The prefix, to denote that there can be only one.
Ref:  https://vuejs.org/v2/style-guide/#Single-instance-component-names-strongly-recommended

*/


<template>
  <el-row type="flex" align="middle" id="TheMultiStateDisplayAreaHeader">
    <el-col :span="6" class="ml-2" style="display: flex; align-items: center;">
      <!-- TODO: This needs to come from DB -->
      <span style="font-size: 20px;">Alexey D</span>
      <span style="font-size: 14px; margin-left: 6px;">(28Y)</span>
      <div style="margin-left: 6px;">
        <el-tag v-if="connectionStatus" type="success" size="mini">Online</el-tag>
        <el-tag v-else type="danger" size="mini">Offline</el-tag>
      </div>
    </el-col>
    <el-col :span="16">
      <!-- 
      Q1) Why use a different slider instead of slider from elemenet.io?
      =================================================================
          Requirement: The user can only click on marks and not at other locations on slider.

          I (VK in June 20) did not find a way to do it on element.io slider. 

          I tried using element io -> steps component (https://element.eleme.io/#/en-US/component/steps)
          But with stepsComponent I could not make 2 steps far away from each other and other 2 steps close to each other. Since each steps represents 
          an appt date. When a patient has 3 appts. The first 2 may be 100 days apaprt and the 2nd and 3rd may be 10 days apart.

          Hence decided to use: https://nightcatsama.github.io/vue-slider-component/#/

      Q2) What is the core conceptual understanding?
      =============================================
          There are 6 important variables:
          1. timeOfApptStart       | Each gets a point on slider
          2. timeOfApptLock        | When point is clicked timeOfStateToShow is set as timeOfApptLock and NOT timeOfApptStart
          3. timeOfStateToShow     | When 0 then current data is shown. When > 0 then all components REACT and show data "AS OF" "timeOfStateToShow"
          4. timeOfEvaluation      | Defaults to ROW_START but in the form user can provide a different value.
          5. ROW_START             | Maria DB hidden field
          6. ROW_END               | Maria DB hidden field
        
          Ref: https://docs.google.com/spreadsheets/d/1X_WMi5kpADxVWtBnxZ2-yJbNArcnLwqmhJ1JWqr1h9g/edit#gid=0

      Q3) How do different components store data on client side?
      ==========================================================
        (mts => mysql time staamp)

            Four goals: 
            1. When the same component is loaded twice from the search box on the currentStateDisplayArea server side query is not run 2nd time
            2. Once data comes on component being mounted the view changes instantly when the slider in the header is moved.
            3. Query is only run when the component is mounted. So if a component is never mounted the query is never run.
            4. left and right side should not use 2 different data sets.

            When a component is mounted they create a array called
              componentNameEvalAtEachRowEnd
                For e.g.  recommendationsEvalAtEachRowEnd
                          weightsEvalAtEachRowEnd the structure is weightsEvalAtEachRowEnd[row_end] = data,time_of_eval

              From appt table:

              | appt start times | appt lock times  | 
              | 20th Feb 10AM    | 25th Feb 2 PM    |      
              | 16th March 3 pm  | 21st March 1 PM  |

              For data that can only be 1 at a given time
              -------------------------------------------
                From weight table
                | Value           | timeOfEval    | ROW_START          | ROW_END          
                | 185             | 5th Feb 10AM  | 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999 (This is default value stored by MariaDB)
                | 190             | 2th Jan 11AM  | 10th Jan 10:30 AM  | 20th Feb 10:30 AM

                weightsEvalAtEachRowEnd[2038-01-19 03:14:07.999999] = 185,mts(5th Feb 10AM)
                weightsEvalAtEachRowEnd[mts(20th Feb 10:30 AM)] = 190,mts(2nd Jan 11AM)

                To generate the above array the query executed is:
                SELECT *,ROW_END FROM weights FOR SYSTEM_TIME ALL;

                To show data on graph:
                Take all values from weightsEvalAtEachRowEnd as the Y axis and all EvalTime as X axis.
                    So the data set will be
                      mts(5th Feb 10AM)           =  185
                      mts(2nd Jan 10:30 AM)       =  190

                To show data for timeOfStateToShow:
                weightsEvalAtEachRowEnd filter where min(index) > timeOfStateToShow  
                    So the data set will be
                      For appt time 20th Feb 10Am    -> need to show data for 25th Feb 2PM    -> 185
                      For appt time 16th March 3 pm  -> need to show data for 21st March 1 PM -> 185

              For data that can be N at a given time
              --------------------------------------
                From recommendations table
                |  uuid of rec  | Value           | timeOfEval       | ROW_START          | ROW_END          
                |   xdcf        | Loose weight    | 5th Feb 10AM     | 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999
                |   erfg        | sleep more      | 20th Feb 10:10 AM| 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999

                recommendationsEvalAtEachRowEnd[xdcf][2038-01-19 03:14:07.999999] = loose weight,mts(5th Feb 10AM)
                recommendationsEvalAtEachRowEnd[erfg][2038-01-19 03:14:07.999999] = sleep more,mts(20th Feb 10AM)

      Q4) How does component data caching work?
      =========================================
            The above object is retained till the time the browser cache is cleared. 
            When page is refreshed new data is fetched where row_end is > row_end stored in object index.

            How does this work for multiple patients?
              Option1: Each patient gets a state of their own.
                        Ref: https://github.com/vuejs/vuex/issues/414

      Q5) What are some previous data patterns evaluated and rejected?
      ===============================================================
            
            When a component is mounted they create a array called
              componentNameAtDiffApptLockTimes
                For e.g.  recommendationsAtDiffApptLockTimes
                          weightsAtDiffLockTimes

              Say the appt lock times are:
                25th Feb 2 PM 
                21st March 1 PM

              weightsAtDiffApptLockTimes[0] = current weight
              weightsAtDiffApptLockTimes[mts(25th Feb 2 PM)] = weight
              weightsAtDiffApptLockTimes[mts(21st March 1 PM)] = weight

              To generate the above array the query executed is:
              SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(25th Feb 2 PM);
              SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(21st March 1 PM);
              SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(CURRENT_TIME);

              Problems:
                When drawing a graph if there were 5 evaluations done between last appt and this appt then those 4 evaluations will not be on the graph.
      -->
      <vue-slider
        v-model="sliderInitialValue"
        @change="handleSliderChangeEvent"
        :marks="timeOfStatesToMarkOnSlider"
        :included="true"
      ></vue-slider>
    </el-col>
    <el-col :span="2">
      <!-- Why not use element.io inbuilt switch
        In element.io switch the label cannot be shown on top of the switch in June 20. 
        If a way is found to show H or O on top of the switch then this library should be removed and elemenet.io built in switch component should be used
      -->
      <toggle-button
        style="float: right;"
        v-model="componentType"
        :labels="{checked: 'H', unchecked: 'O'}"
        @change="handleChangeToggleButtonEvent"
      />
    </el-col>
  </el-row>
</template>

<script>
import { USER_API_URL, APPOINTMENT_API_URL } from "@/const/others.js";

export default {
  components: {},
  data() {
    // KT: Why is this a function and not a object? Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
    return {
      tabMode: true,
      patientInfo: null,
      sliderInitialValue: 100,
      componentType: true,
      timeOfStates: [],
      patientId: this.$route.query.patient_id
    };
  },
  computed: {
    activityStatus() {
      return this.$store.state.connectionStatus;
    },
    timeOfStateToShow() {
      return this.$store.state.multiStateDisplayArea.timeOfStateToShow;
    },
    zoomValue() {
      return this.$store.state.multiStateDisplayArea.zoomValue;
    },
    connectionStatus() {
      return this.$store.state.connectionStatus;
    },
    timeOfStatesToMarkOnSlider() {
      /*
      The first date is at 0 and todays date is at 100. 
      
      The middle points get proprotionate space based on the distance between appts.
      
      The data returned looks like
      timeOfStatesToMarkOnSlider: {
         0: "1/15/20", // Here I want to show -> this.timeOfStateTime.date1
         20: "2/15/20",
         40: "4/25/20",
         100: {
           style: {
             color: "#1989FA"
           },
           label: this.$createElement("strong", "Current")
         }
      },
*/

      let result = {};
      if (this.timeOfStates.length > 0) {
        const percent = Math.floor(100 / (this.timeOfStates.length + 1));
        this.timeOfStates.forEach((data, index) => {
          const { dateTimeOfAppt } = data;

          result[index * percent] = dateTimeOfAppt.split("T")[0];
        });
      }
      result["100"] = {
        style: { color: "#1989FA" },
        label: this.$createElement("strong", "Current")
      };

      return result;
    }
  },
  watch: {
    tabMode() {
      // this.updateMultiStateDisplayArea();
    }
  },
  mounted() {
    // this.apiGetPatientInfo();
    // this.updateMultiStateDisplayArea();
    // this.zoomValue = this.$store.state.MultiStateDisplayArea.zoomValue;
    // this.zoomMultiStateDisplayArea();
    this.apiGetAppointments();
  },
  methods: {
    // TODO: This should take data from timeOfStatesToMarkOnSlider
    formatTooltip(val) {
      if (val == 0) {
        return "First appointment on 5th Jan 2020";
      }
      if (val == 20) {
        return "Second appointment on 15th Feb 2020";
      }
      if (val == 40) {
        return "Third appointment on 25th April 2020";
      }
    },
    async updateMultiStateDisplayArea() {
      await this.$store.dispatch("getMultiStateDisplayAreaCtList", {
        type: this.tabMode == true ? 1 : 2,
        toast: this.$bvToast
      });

      // setTimeout(() => {
      //   var width = document.getElementById("multiStateDisplayAreaContent").offsetWidth;
      //   var height = document.getElementById("multiStateDisplayAreaContent").offsetHeight;
      //   var windowWidth = $(document).outerWidth();
      //   var windowHeight = $(document).outerHeight();
      //   windowWidth = windowWidth * (70 / 100);
      //   windowHeight = windowHeight - 100;

      //   console.log(height + " : " + windowHeight);

      //   let r = 1;
      //   if (height > windowHeight) {
      //     r = Math.min(windowWidth / width, windowHeight / height);
      //   }

      //   this.$store.commit("setMultiStateDisplayAreaZoomValue", r);
      //   this.$store.dispatch("zoomMultiStateDisplayArea");
      // }, 100);
    },
    async apiGetPatientInfo() {
      let TOKEN = localStorage.getItem("token");
      const searchQuery = {
        roleId: 3
      };
      try {
        const response = await fetch(USER_API_URL + "/getDetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + TOKEN
          },
          body: JSON.stringify(searchQuery)
        });
        if (response.ok) {
          const json = await response.json();
          this.patientInfo = json[0];
        } else {
          this.$bvToast.toast("Failed to get patientInfo", {
            title: "Error",
            variant: "danger",
            solid: true
          });
        }
      } catch (ex) {
        this.$bvToast.toast("Server connection error", {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    },
    zoomOut() {
      let value = this.zoomValue;
      value -= 0.1;
      this.$store.commit("setMultiStateDisplayAreaZoomValue", value);
      this.$store.dispatch("zoomMultiStateDisplayArea");
    },
    zoomIn() {
      let value = this.zoomValue;
      value += 0.1;
      this.$store.commit("setMultiStateDisplayAreaZoomValue", value);
      this.$store.dispatch("zoomMultiStateDisplayArea");
    },
    handleChangeToggleButtonEvent() {
      const type = this.componentType == true ? "health" : "other";
      this.$store.commit("setComponentType", type);
    },
    async apiGetAppointments() {
      try {
        let TOKEN = localStorage.getItem("token");
        const response = await fetch(`${APPOINTMENT_API_URL}`, {
          headers: {
            Authorization: "Bearer " + TOKEN
          }
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          this.timeOfStates = json;
        } else {
          this.$notify({
            title: "Error",
            message: "Failed to get appointments"
          });
        }
      } catch (ex) {
        this.$notify({
          title: "Error",
          message: "Server connection error"
        });
      }
    },
    handleSliderChangeEvent() {
      // TODO: This needs to set a global variable timeOfStateToShow and all components need to react on that
      const percent = Math.floor(100 / (this.timeOfStates.length + 1));
      let index = this.sliderInitialValue / percent;
      let timeOfStateToShow = new Date().toISOString().split("T")[0];
      // let timeOfStateToShow = new Date()
      //   .toISOString()
      //   .slice(0, 19)
      //   .replace("T", " "); // DB expect date to be in TIMESTAMP format Ref: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime

      // let timeOfStateToShow = new Date().toLocaleDateString();
      if (index < this.timeOfStates.length + 1) {
        timeOfStateToShow = this.timeOfStates[index].dateTimeOfAppt
          .slice(0, 19)
          .replace("T", " ");
      }
      this.$store.commit("setTimeOfStateToShow", timeOfStateToShow);
    },
    handleSliderEndEvent() {
      // console.log(this.sliderInitialValue);
    }
  }
};
</script>

<style scoped>
#TheMultiStateDisplayAreaHeader {
  height: 30px;
  margin-bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>