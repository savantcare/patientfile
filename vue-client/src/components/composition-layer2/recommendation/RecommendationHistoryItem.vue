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
            type="primary"
            size="large"
            :timestamp="history.info"
          >{{history.content}}</el-timeline-item>
        </el-timeline>
        <el-pagination
          small
          layout="prev, pager, next"
          :page-size="5"
          :total="totalCount"
          v-if="totalCount > 5"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import { RECOMMENDATION_API_URL } from "@/const.js";
export default {
  props: ["rec"],
  data() {
    return {
      histories: []
    };
  },
  mounted() {
    this.getHistory();
  },
  methods: {
    async getHistory() {
      const TOKEN = localStorage.getItem("token");

      const response = await fetch(
        `${RECOMMENDATION_API_URL}/getHistory/${this.rec.uuid}`,
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + TOKEN
          }
        }
      );
      if (response.ok) {
        const json = await response.json();

        this.histories = json;
      }
    }
  },
  watch: {
    rec() {
      if (this.rec.uuid != null) {
        this.getHistory();
      }
    }
  },
  computed: {
    totalCount() {
      return this.histories.length;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>