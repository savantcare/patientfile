<template>
  <div>
    <el-col>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Mania / Hypo Mania</span>
          <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
        <el-form :model="maniaHypoManiaForm" ref="maniaHypoManiaForm" class="demo-dynamic">
          <el-form-item>
            <el-checkbox-group v-model="checkboxManiaHypoMania">
              <!--  When opened in multi change format size="small" 
                Ref: https://element.eleme.io/#/en-US/component/checkbox
              -->
              <el-checkbox-button v-for="app in maniaHypoMania" :label="app" :key="app">{{app}}</el-checkbox-button>
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
            <el-button type="success" @click="submitForm('maniaHypoManiaForm')" size="small">Save</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
const maniaHypoManiaOptions = [
  "Mood elevation",
  "Irritable",
  "Energy/GDA/PMA",
  "Sleep need",
  "Talking",
  "Racing Thoughts/FOI",
  "Distractibility",
  "High Risk Behaviour"
];

export default {
  data() {
    return {
      maniaHypoManiaForm: { recs: [{ description: "" }] },
      // When form loads this will have the currently selected values from the DB
      checkboxManiaHypoMania: [""],
      maniaHypoMania: maniaHypoManiaOptions,
      textarea: ""
    };
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateManiaHypoManiaInSM", {
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