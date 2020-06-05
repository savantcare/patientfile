<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(recList, index) in carouselList" :key="`carouse-${index}`">
        <el-col :span="8" v-for="(rec, index) in recList" :key="`rec-${index}`">
          <el-card class="box-card" shadow="hover">
            <el-form label-position="top" ref="form">
              <el-form-item style="font-weight: bold" :label="rec.detail">
                <el-input
                  :span="8"
                  type="textarea"
                  v-model="rec.content"
                  :autosize="{minRows:4}"
                  autofocus
                  ref="input_box"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
            <div v-if="rec.history.length > 0">
              <el-row>
                <span style="font-size: 14px">History:</span>
              </el-row>
              <br />
              <el-row :gutter="12">
                <div class="block">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(history, index) in rec.history"
                      :key="`history-${index}`"
                      type="primary"
                      size="large"
                      :timestamp="history.detail"
                    >{{history.content}}</el-timeline-item>
                  </el-timeline>
                </div>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
import { RECOMMENDATION_API_URL } from "@/const.js";
export default {
  components: {},
  data() {
    return {
      recList: []
    };
  },
  methods: {
    async getDiscontinueHistory() {
      const TOKEN = localStorage.getItem("token");
      const response = await fetch(
        `${RECOMMENDATION_API_URL}/discontinueHistory`,
        {
          headers: {
            Authorization: "Bearer " + TOKEN
          }
        }
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        this.recList = json;
      }
    }
  },
  computed: {
    carouselList() {
      let result = [];
      let temp = [];
      let idx = 0;
      this.recList.forEach(item => {
        temp.push(item);
        idx += 1;
        if (idx == 3) {
          result.push(temp);
          idx = 0;
          temp = [];
        }
      });
      if (idx > 0) {
        result.push(temp);
      }
      return result;
    }
  },
  mounted() {
    this.getDiscontinueHistory();
  },
  watch: {}
};
</script>

<style>
.el-carousel__container {
  height: 500px !important;
}
.el-carousel__item {
  overflow-y: scroll !important;
}
</style>