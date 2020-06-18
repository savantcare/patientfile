<template>
  <div>
    <el-col>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Gateway Mood Symptoms</span>
          <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
        <el-form
          :model="gatewayMoodSymptomsForm"
          ref="gatewayMoodSymptomsForm"
          class="demo-dynamic"
        >
          <el-form-item>
            <el-checkbox-group v-model="checkboxGatewayMoodSymptoms">
              <!--  When opened in multi change format size="small" 
                Ref: https://element.eleme.io/#/en-US/component/checkbox
              -->
              <el-checkbox-button v-for="app in gatewayMoodSymptoms" :label="app" :key="app">{{app}}</el-checkbox-button>
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
            <el-button
              type="success"
              @click="submitForm('gatewayMoodSymptomsForm')"
              size="small"
            >Save</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
const gatewayMoodSymptomsOptions = [
  "Q. In the past 10 days, how many days have you felt depressed for most of the day?",
  "Q. In the past 10 days, how many days have you felt low interest or motivation throughout most of the day?",
  "Q. In the past 10 days, how many days have you been abnormally irritable throughout most of the day?",
  "Q. In the past 10 days, how many days have you been abnormally energetic or high energy throughout most of the day?",
  "Q. In the past 10 days, how many days have you felt abnormal mood elevation throughout most of the day?",
  "Q. How difficult to the above symptoms make your day to day life?"
];

export default {
  data() {
    return {
      gatewayMoodSymptomsForm: { recs: [{ description: "" }] },
      // When form loads this will have the currently selected values from the DB
      checkboxGatewayMoodSymptoms: [""],
      gatewayMoodSymptoms: gatewayMoodSymptomsOptions,
      textarea: ""
    };
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateGatewayMoodSymptomsInSM", {
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