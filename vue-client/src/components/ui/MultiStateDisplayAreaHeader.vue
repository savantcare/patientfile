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
        :marks="apptDatesToMarkOnSlider"  
        :included="true"
        >

      </vue-slider>

    </el-col>
    <el-col :span="2">
      <!-- Why not use element.io inbuilt switch
        In element.io switch the label cannot be shown on top of the switch in June 20. 
        If a way is found to show H or O on top of the switch then this library should be removed and elemenet.io built in switch component should be used
      -->
      <toggle-button style="float: right;" :value="true"
               :labels="{checked: 'H', unchecked: 'O'}"/> 
    </el-col>
  </el-row>
</template>

<script>
import { USER_API_URL } from "@/const/others.js";

export default {
  components: {},
  data() {
    return {
      tabMode: true,
      patientInfo: null,
      sliderInitialValue: 100,
      /* TODO: 
      1. apptDatesToMarkOnSlider should come from DB
      2. The first date is at 0 and todays date is at 100. The middle points need to get proprotionate space based on the distance between appts.
      */
      apptDatesToMarkOnSlider: {
          0: '1/5/20',
          20: '2/15/20',
          40: '4/25/20',
          100: {
            style: {
              color: '#1989FA'
            },
            label: this.$createElement('strong', 'Current')
          }
      }
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
    }
  },
  watch: {
    tabMode() {
      // this.updateMultiStateDisplayArea();
    }
  },
  mounted() {
    // this.getPatientInfo();
    // this.updateMultiStateDisplayArea();
    // this.zoomValue = this.$store.state.MultiStateDisplayArea.zoomValue;
    // this.zoomMultiStateDisplayArea();
  },
  methods: {
    // TODO: This should take data from apptDatesToMarkOnSlider
    formatTooltip(val) {
        if (val == 0){
          return "First appointment on 5th Jan 2020" 
        }
        if (val == 20){
          return "Second appointment on 15th Feb 2020" 
        }
        if (val == 40){
          return "Third appointment on 25th April 2020" 
        }
},
    async updatestateAtSelectedTime() {
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
    async getPatientInfo() {
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