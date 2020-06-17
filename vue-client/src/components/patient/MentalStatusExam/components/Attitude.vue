<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Attitude</span>
        <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
      </div>
      <el-form :model="attitudeForm" ref="attitudeForm" class="demo-dynamic">
        <el-form-item>
          <el-checkbox-group v-model="checkboxAttitude">
            <!--  When opened in multi change format size="small" 
                Ref: https://element.eleme.io/#/en-US/component/checkbox
            -->
            <el-checkbox-button v-for="app in attitude" :label="app" :key="app">{{app}}</el-checkbox-button>
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
          <el-button type="success" @click="submitForm('attitudeForm')" size="small">Save</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const attitudeOptions = [
  "Pleasant and cooperative",
  "Uncooperative",
  "Hostile or defiant",
  "Guarded",
  "Evasive",
  "Apathetic",
  "Disorganized behavior"
];

export default {
  data() {
    return {
      attitudeForm: { recs: [{ description: "" }] },
      // When form loads this will have the currently selected values from the DB
      checkboxAttitude: [""],
      attitude: attitudeOptions,
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