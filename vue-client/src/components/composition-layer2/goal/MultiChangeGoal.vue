<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(goalList, index) in carouselList" :key="`carouse-${index}`">
        <el-col :span="8" v-for="(goal, index) in goalList" :key="`goal-${index}`">
          <el-card class="box-card" shadow="hover">
            <el-form label-position="top" ref="form">

              <el-form-item style="font-weight:bold" label="Description:">
                <el-input :span="8" v-model="goal.description" type="textarea" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Score:">
                <el-slider :span="8" v-model="goal.score" :format-tooltip="formatTooltip"></el-slider>
              </el-form-item>
              <el-form-item style="font-weight:bold" label="Date:">
                <el-date-picker :span="8" v-model="goal.startDate" type="date" placeholder="Pick a day" :picker-options="pickerOptions1" style="width: 100%;"></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="success" @click="onClickSave(goal)" size="small">Save</el-button>
                <el-button type="danger" @click="onClickDiscontinue(goal)" size="small">Discontinue</el-button>
              </el-form-item>
            </el-form>
            <GoalHistoryItem :goal="goal" />
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
    onClickSave(goal) {
      this.$store.dispatch("updateGoal", {
        data: goal,
        notify: this.$notify
      });
    },
    onClickDiscontinue(goal) {
      this.$store.dispatch("discontinueGoal", {
        data: goal,
        notify: this.$notify
      });
    }
  },
  computed: {
    goalList() {
      return this.$store.state.goal.goalList;
    },
    carouselList() {
      let result = [];
      let temp = [];
      let idx = 0;
      this.goalList.forEach(item => {
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