<template>
  <el-row :gutter="12">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Appearence</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in appearence" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Thought process</span>
        </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in thoughtProcess" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Attitude</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in thoughtProcess" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Constitutional</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Psychomotor</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Cognition</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Eye-contact</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Insight</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>



        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Judgement</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Mood / affect</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>

        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Impulse control</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>

    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Thought content</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
    </el-card>


        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Neurological</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
    </el-card>

        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Preception</span>
          <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
        </div>
    </el-card>
 
  </el-row>
</template>

<script>
  const appearenceOptions = ["Good grooming and hyegine","No apparent distree","Well developed, well nourished","appears stated age","Appears younger than stated age","Appears older than stated age","obese","Thin or cachetic","Disheveled, unkempt","Malodorous"];
  const thoughtProcessOptions = ["Linear Logical and gaol oriented","Poverty of thought"];
  const attitudeOptions = ["Pleasant and cooperative","Uncooperative","Hostile or defiant","Guarded","Evasive","Apathetic","Disorganized behavior"] 

export default {
  data() {
    return {
      checkboxGroup4: ['Shanghai'],
      appearence: appearenceOptions,
      thoughtProcess: thoughtProcessOptions,
      attitude: attitudeOptions

    };
  },
  methods: {
    onClickSave(rec) {
      // Actions are triggered with the store.dispatch method Ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
      this.$store.dispatch("dbUpdateRecommendationInSM", {
        data: rec,
        notify: this.$notify
      });
    },
  },
  computed: {
  },
  mounted() {
  },
  watch: {
    tabDialogVisibility() {
    }
  }
};
</script>

<style>
.box-card {
    width: 700px;
  }
</style>