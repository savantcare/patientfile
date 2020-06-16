<template>
  <el-row :gutter="12">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Appearence</span>
        </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Thought process</span>
        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Attitude</span>
        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Constitutional</span>
        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Psychomotor</span>
        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Cognition</span>
        </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Eye-contact</span>
        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Insight</span>
        </div>
    </el-card>



        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Judgement</span>
        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Mood / affect</span>
        </div>
    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Impulse control</span>
        </div>
    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Thought content</span>
        </div>
    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Neurological</span>
        </div>
    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Preception</span>
        </div>
    </el-card>
 
  </el-row>
</template>

<script>
// import { MULTIPLE_CHANGE_RECOMMENDATION } from "@/const/others.js";
export default {
  data() {
    return {};
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateRecommendationInSM", {
        data: rec,
        notify: this.$notify
      });
    },
    onClickDiscontinue(rec) {
      this.$store.dispatch("dbDiscontinueRecommendationInSM", {
        data: rec,
        notify: this.$notify
      });
    },
    focusToTheFirstInputBox() {
      setTimeout(() => {
        this.$refs.input_box[0].$el.getElementsByTagName("textarea")[0].focus();
      }, 100);
    }
  },
  computed: {
    recList() {
      return this.$store.state.recommendation.yourRecommendationsList;
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
    },
    tabDialogVisibility() {
      return this.$store.state.multiTabDialogLayer2.visibility;
    }
  },
  mounted() {
    this.focusToTheFirstInputBox();
  },
  watch: {
    tabDialogVisibility() {
      if (this.tabDialogVisibility) {
        this.focusToTheFirstInputBox();
      }
    }
  }
};
</script>

<style>
.box-card {
    width: 700px;
  }
</style>