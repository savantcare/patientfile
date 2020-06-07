<template>
  <div v-if="histories.length > 0">
    <el-row>
      <span style="font-size: 14px">History:</span>
    </el-row>
    <br />
    <el-row :gutter="12">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(history, index) in histories"
            :key="`history-${index}`"
            :type="history.type"
            size="large"
            :timestamp="history.info"
          >{{history.content}}</el-timeline-item>
        </el-timeline>
      </div>
    </el-row>
  </div>
</template>

<script>
import { DIAGNOSIS_API_URL } from "@/const/others.js";
export default {
  props: ["dx"],
  data() {
    return {
      histories: []
    };
  },
  mounted() {
    this.getAssessmentHistory();
  },
  methods: {
    async getAssessmentHistory() {
      const TOKEN = localStorage.getItem("token");
      if(this.dx.currentAssessmentUUID!=null && this.dx.currentAssessmentUUID!=``) {
        const response = await fetch(
          `${DIAGNOSIS_API_URL}/getAssessmentHistory/${this.dx.currentAssessmentUUID}`,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer " + TOKEN
            }
          }
        );
        if (response.ok) {
          const json = await response.json();
          //console.log(json);
          this.histories = json;
        }
      }
      else {
        this.histories = []
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>