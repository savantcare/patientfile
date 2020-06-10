/*

Single instance component names
Components that should only ever have a single active instance should begin with the The prefix, to denote that there can be only one.
Ref:  https://vuejs.org/v2/style-guide/#Single-instance-component-names-strongly-recommended

*/


<template>
  <el-row type="flex" align="middle" id="MultiStateDisplayAreaHeader">
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
      Q) Why use a different slider instead of slider from elemenet.io?
      Requirement: The user can only click on marks and not at other locations on slider.

      I (VK in June 20) did not find a way to do it on element.io slider. 

      I tried using element io -> steps component (https://element.eleme.io/#/en-US/component/steps)
      But with stepsComponent I could not make 2 steps far away from each other and other 2 steps close to each other. Since each steps represents 
      an appt date. When a patient has 3 appts. The first 2 may be 100 days apaprt and the 2nd and 3rd may be 10 days apart.

      Hence decided to use: https://nightcatsama.github.io/vue-slider-component/#/

      TODO:
      1. Once the user clicks on a point on slider timeOfState needs to set and all Components should update themselves.
      The only change in query is: Ref: https://mariadb.com/kb/en/temporal-data-tables/#querying-historical-data
      timeOfState = '2016-10-09 08:07:06'
      SELECT * FROM recommendations FOR SYSTEM_TIME AS OF TIMESTAMP timeOfState;
      -->
      <vue-slider
        v-model="sliderInitialValue"
        @change="handleSliderChangeEvent"
        :marks="apptDatesToMarkOnSlider"
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
    return {
      tabMode: true,
      patientInfo: null,
      sliderInitialValue: 100,
      componentType: true,
      apptDates: [],
      patientId: this.$route.query.patient_id
    };
  },
  computed: {
    activityStatus() {
      return this.$store.state.connectionStatus;
    },
    timeOfState() {
      return this.$store.state.multiStateDisplayArea.timeOfState;
    },
    zoomValue() {
      return this.$store.state.multiStateDisplayArea.zoomValue;
    },
    connectionStatus() {
      return this.$store.state.connectionStatus;
    },
    apptDatesToMarkOnSlider() {

/*
      The first date is at 0 and todays date is at 100. 
      
      The middle points get proprotionate space based on the distance between appts.
      
      The data returned looks like
      apptDatesToMarkOnSlider: {
         0: "1/15/20", // Here I want to show -> this.apptDateTime.date1
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
      if (this.apptDates.length > 0) {
        const percent = Math.floor(100 / (this.apptDates.length + 1));
        this.apptDates.forEach((data, index) => {
          const { dateTimeOfAppt } = data;

          result[index * percent] = dateTimeOfAppt.split("T")[0];
        });
      }
      result["100"] = {
        style: { color: "#1989FA" },
        label: this.$createElement("strong", "Currernt")
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
    // TODO: This should take data from apptDatesToMarkOnSlider
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
          this.apptDates = json;
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
    handleSliderChangeEvent() {              // TODO: This needs to set a global variable timeOfState and all components need to react on that
      const percent = Math.floor(100 / (this.apptDates.length + 1));
      let index = this.sliderInitialValue / percent;
      // let apptDate = new Date().toISOString().split("T")[0];
      let apptDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // DB expect date to be in TIMESTAMP format Ref: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
      if (index < this.apptDates.length + 1) {
        apptDate = this.apptDates[index].dateTimeOfAppt.slice(0, 19).replace('T', ' ');
      }
      this.$store.dispatch("dbGetMultiStateMyRecommendationsInSM", {
        date: apptDate,
        patientId: this.patientId,
        userId: this.$store.state.userId
      });
    },
    handleSliderEndEvent() {
      // console.log(this.sliderInitialValue);
    }
  }
};
</script>

<style scoped>
#MultiStateDisplayAreaHeader {
  height: 30px;
  margin-bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>