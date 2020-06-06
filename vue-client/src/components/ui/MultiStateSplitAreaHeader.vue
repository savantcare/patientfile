<template>
  <el-row type="flex" align="middle" id="MultiStateSplitAreaHeader">
    <el-col :span="6" class="ml-2" style="display: flex; align-items: center;">
      <!-- TODO: This needs to come from DB -->
      <span style="font-size: 20px;">Alexey D</span>
      <span style="font-size: 14px; margin-left: 6px;">(28 years old)</span>
      <div style="margin-left: 6px;">
        <el-tag v-if="connectionStatus" type="success" size="mini">Online</el-tag>
        <el-tag v-else type="danger" size="mini">Offline</el-tag>
      </div>
    </el-col>
    <el-col :span="12">
      <el-slider v-model="slider" :step="10" show-stops></el-slider>
    </el-col>
    <el-col :span="6">
      <el-switch
        v-model="tabMode"
        active-text="Health components"
        style="float: right; margin-right: 12px;"
      ></el-switch>
    </el-col>
  </el-row>
</template>

<script>
import { USER_API_URL } from "@/const.js";

export default {
  components: {},
  data() {
    return {
      tabMode: true,
      patientInfo: null,
      slider: 0
    };
  },
  computed: {
    activityStatus() {
      return this.$store.state.connectionStatus;
    },
    currentDate() {
      return this.$store.state.stateAtSelectedTime.currentDate;
    },
    zoomValue() {
      return this.$store.state.stateAtSelectedTime.zoomValue;
    },
    connectionStatus() {
      return this.$store.state.connectionStatus;
    }
  },
  watch: {
    tabMode() {
      // this.updatestateAtSelectedTime();
    }
  },
  mounted() {
    // this.getPatientInfo();
    // this.updatestateAtSelectedTime();
    // this.zoomValue = this.$store.state.stateAtSelectedTime.zoomValue;
    // this.zoomstateAtSelectedTime();
  },
  methods: {
    async updatestateAtSelectedTime() {
      await this.$store.dispatch("getstateAtSelectedTimeComponents", {
        type: this.tabMode == true ? 1 : 2,
        toast: this.$bvToast
      });

      // setTimeout(() => {
      //   var width = document.getElementById("stateAtSelectedTimeContent").offsetWidth;
      //   var height = document.getElementById("stateAtSelectedTimeContent").offsetHeight;
      //   var windowWidth = $(document).outerWidth();
      //   var windowHeight = $(document).outerHeight();
      //   windowWidth = windowWidth * (70 / 100);
      //   windowHeight = windowHeight - 100;

      //   console.log(height + " : " + windowHeight);

      //   let r = 1;
      //   if (height > windowHeight) {
      //     r = Math.min(windowWidth / width, windowHeight / height);
      //   }

      //   this.$store.commit("setstateAtSelectedTimeZoomValue", r);
      //   this.$store.dispatch("zoomstateAtSelectedTime");
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
      this.$store.commit("setstateAtSelectedTimeZoomValue", value);
      this.$store.dispatch("zoomstateAtSelectedTime");
    },
    zoomIn() {
      let value = this.zoomValue;
      value += 0.1;
      this.$store.commit("setstateAtSelectedTimeZoomValue", value);
      this.$store.dispatch("zoomstateAtSelectedTime");
    }
  }
};
</script>

<style scoped>
#MultiStateSplitAreaHeader {
  height: 30px;
  margin-bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>