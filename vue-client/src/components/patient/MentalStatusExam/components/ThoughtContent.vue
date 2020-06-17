<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Thought content</span>
        <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
      </div>
      <el-form :model="thoughtContentForm" ref="thoughtContentForm" class="demo-dynamic">
        <el-form-item>
          <el-checkbox-group v-model="checkboxThoughtContent">
            <!--  When opened in multi change format size="small" 
                Ref: https://element.eleme.io/#/en-US/component/checkbox
            -->
            <el-checkbox-button v-for="app in thoughtContent" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
          <!--  When opened in multi change min-rows=1 -->
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- When opened in multi change format the Save button will not be there.
            Since the whole form will be controlled by one Save button
          -->
          <el-button type="success" @click="submitForm('thoughtContentForm')" size="small">Save</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const thoughtContentOptions = [
  "No SI, intent or plan",
  "No passive death wish",
  "No HI, intent or plan",
  "No delusional thinking observed",
  "No obsessive thinking observed",
  "+ruminations",
  "+SI without intent or plan",
  "+SI as detailed below",
  "+HI as detailed below",
  "+delusions",
  "+IOR",
  "+obsessions",
  "Passive death wish"
];

export default {
  data() {
    return {
      thoughtContentForm: { recs: [{ description: "" }] },
      // When form loads this will have the currently selected values from the DB
      checkboxThoughtContent: [""],
      thoughtContent: thoughtContentOptions,
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