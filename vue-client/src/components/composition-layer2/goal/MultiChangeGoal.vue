<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(recList, index) in carouselList" :key="`carouse-${index}`">
        <el-col :span="8" v-for="(rec, index) in recList" :key="`rec-${index}`">
          <el-card class="box-card" shadow="hover">
            <el-form label-position="top" ref="form">

              <el-form-item style="font-weight:bold" label="Description:">
                <el-input :span="8" v-model="rec.description" type="textarea" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Score:">
                <el-slider :span="8" v-model="rec.score" :format-tooltip="formatTooltip"></el-slider>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Date:">
                <el-date-picker :span="8" v-model="rec.start_date" type="date" placeholder="Pick a day" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="success" @click="onClickSave(rec)" size="small">Save</el-button>
                <el-button type="danger" @click="onClickDiscontinue(rec)" size="small">Discontinue</el-button>
              </el-form-item>
            </el-form>
            <GoalHistoryItem :rec="rec" />
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
import GoalHistoryItem from "./GoalHistoryItem";
export default {
  components: {
    GoalHistoryItem
  },
  data() {
    return {
    };
  },
  methods: {
    onClickSave(rec) {
      this.$store.dispatch("updateGoal", {
        data: rec,
        notify: this.$notify
      });
    },
    onClickDiscontinue(rec) {
      this.$store.dispatch("discontinueGoal", {
        data: rec,
        notify: this.$notify
      });
    }
  },
  computed: {
    recList() {
      return this.$store.state.goal.list;
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
label.el-form-item__label {
    line-height: 0;
}
</style>