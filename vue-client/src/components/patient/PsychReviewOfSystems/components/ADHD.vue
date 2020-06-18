<template>
  <div>
    <el-col>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>ADHD</span>
          <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
        <el-form :model="adhdForm" ref="adhdForm" class="demo-dynamic">
          <el-form-item>
            <el-checkbox-group v-model="checkboxADHD">
              <!--  When opened in multi change format size="small" 
                Ref: https://element.eleme.io/#/en-US/component/checkbox
              -->
              <el-checkbox-button v-for="app in adhd" :label="app" :key="app">{{app}}</el-checkbox-button>
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
            <el-button type="success" @click="submitForm('adhdForm')" size="small">Save</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
const adhdOptions = [
  "INATTENTION",
  "HYPERACTIVITY",
  "Careless mistakes or poor attention to detail",
  "Problem sustaining attention",
  "Poor listening",
  "Fails to finish tasks",
  "Difficulty organizing tasks",
  "Reluctant to engage in tasks that require sustained mental effort",
  "Loses things often",
  "Distracted by extraneous stimuli",
  "Forgetful daily activities",
  "Fidgets often",
  "Leaves seat often when sitting is expected",
  "Feels restless",
  "Unable to engage in leisurely activities quietly",
  'Seems "on the go" or "driven by motor"',
  "Talks excessively",
  "Blurts out often",
  "Difficulty waiting turn",
  "Interrupts or intrudes on others"
];

export default {
  data() {
    return {
      adhdForm: { recs: [{ description: "" }] },
      // When form loads this will have the currently selected values from the DB
      checkboxADHD: [""],
      adhd: adhdOptions,
      textarea: ""
    };
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateADHDInSM", {
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