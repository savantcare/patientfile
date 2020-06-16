<template>
<div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Cognition</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in cognition" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>


</div>
</template>

<script>
const cognitionOptions = [
  "Grossly intact",
  "no memory impairment",
  "adequate fund of knowledge",
  "no language deficit",
  "normal attention",
  "Impaired",
  "Fluctuating"
];

export default {
  data() {
    return {
      cognition: cognitionOptions,
      checkboxGroup4: ["Shanghai"],
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