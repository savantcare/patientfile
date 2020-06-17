<template>
  <div>
    <el-col>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Psychomotor</span>
          <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
        <el-checkbox-group v-model="checkboxGroup4" size="mini">
          <el-checkbox-button v-for="psy in psychomotor" :label="psy" :key="psy">{{psy}}</el-checkbox-button>
        </el-checkbox-group>
        <el-input type="textarea" autosize :rows="2" placeholder="Please input" v-model="textarea"></el-input>
      </el-card>
    </el-col>
  </div>
</template>

<script>
const psychomotorOptions = [
  "Normal",
  "Agitated",
  "Retarded"
];
export default {
  data() {
    return {
      checkboxGroup4: ["Shanghai"],
      psychomotor:psychomotorOptions,
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