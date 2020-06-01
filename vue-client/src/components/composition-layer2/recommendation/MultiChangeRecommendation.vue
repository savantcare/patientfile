<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(recList, index) in carouselList" :key="`carouse-${index}`">
        <el-col :span="8" v-for="(rec, index) in recList" :key="`rec-${index}`">
          <el-card class="box-card" shadow="hover">
            <el-form label-position="top" ref="form">
              <el-form-item style="font-weight: bold" label="Description">
                <el-input
                  :span="8"
                  type="textarea"
                  v-model="rec.description"
                  :autosize="{minRows:4}"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="onClickSave(rec)" size="small">Save</el-button>
                <el-button type="danger" @click="onClickDiscontinue(rec)" size="small">Discontinue</el-button>
              </el-form-item>
            </el-form>
            <RecommendationHistoryItem :rec="rec" />
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
import RecommendationHistoryItem from "./RecommendationHistoryItem";
export default {
  components: {
    RecommendationHistoryItem
  },
  data() {
    return {
    };
  },
  methods: {
    onClickSave(rec) {
      this.$store.dispatch("updateRecommendation", {
        data: rec,
        notify: this.$notify
      });
    },
    onClickDiscontinue(rec) {
      this.$store.dispatch("discontinueRecommendation", {
        data: rec,
        notify: this.$notify
      });
    }
  },
  computed: {
    recList() {
      return this.$store.state.recommendation.list;
    },
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
  }
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