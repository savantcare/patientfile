<template>

  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(remList, index) in carouselList" :key="`carouse-${index}`">
        <el-col :span="8" v-for="(rem, index) in remList" :key="`rem-${index}`">
          <el-card class="box-card" shadow="hover">
            <el-form label-position="top" ref="form">
              <el-form-item style="font-weight: bold" label="Description">
                <el-input
                  :span="8"
                  type="textarea"
                  v-model="rem.description"
                  :autosize="{minRows:4}"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="onClickSave(rem)" size="small">Save</el-button>
                <el-button type="danger" @click="onClickDiscontinue(rem)" size="small">Discontinue</el-button>
              </el-form-item>
            </el-form>
            <ReminderHistoryItem :rem="rem" />
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
import ReminderHistoryItem from "./ReminderHistoryItem";
export default {
  components: {
    ReminderHistoryItem
  },
  data() {
    return {
    };
  },
  methods: {
    onClickSave(rem) {
      this.$store.dispatch("changeReminder", {
        data: rem,
        notify: this.$notify
      });
    },
    onClickDiscontinue(rem) {
      this.$store.dispatch("discontinueReminder", {
        data: rem,
        notify: this.$notify
      });
    }
  },
  computed: {
    remList() {
      return this.$store.state.reminder.list;
    },
    carouselList() {
      let result = [];
      let temp = [];
      let idx = 0;
      this.remList.forEach(item => {
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