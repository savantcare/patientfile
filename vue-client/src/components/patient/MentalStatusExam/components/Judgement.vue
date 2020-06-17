<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Judgement</span>
        <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
      </div>
      <el-checkbox-group v-model="checkboxGroup4" size="mini">
        <el-checkbox-button v-for="jud in judgement" :label="jud" :key="jud">{{jud}}</el-checkbox-button>
      </el-checkbox-group>
      <el-input type="textarea" autosize :rows="2" placeholder="Please input" v-model="textarea"></el-input>
    </el-card>
  </div>
</template>

<script>
const judgementOptions = [
  "Good",
  "Fair",
  "Questionable",
  "Poor",
  "Impaired",
  "Limited"
];
export default {
  data() {
    return {
      checkboxGroup4: ["Shanghai"],
      judgement:judgementOptions,
      textarea: ""
    };
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateRecommendationInSM", {
        data: rec,
        notify: this.$notify
      });
    }
  },
  computed: {},
  mounted() {},
  watch: {
    tabDialogVisibility() {}
  }
};
</script>

<style>
.box-card {
  width: 700px;
}
</style>