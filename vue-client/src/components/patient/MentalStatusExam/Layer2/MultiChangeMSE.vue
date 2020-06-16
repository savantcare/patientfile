<template>
<div>
    <el-row :gutter="12">
      
      <el-col>
          <Appearance></Appearance>
      </el-col>

      <el-col>
          <ThoughtProcess></ThoughtProcess>
      </el-col>

      <el-col>
           <Attitude></Attitude>
      </el-col>
    
    </el-row>

    <el-row>
          <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Constitutional</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in consitutional" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>
    
    </el-row>
    
    <el-row>
    
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Psychomotor</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>
    
      <el-col>
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
      </el-col>
    </el-row>
    
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Eye-contact</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-checkbox-group v-model="checkboxGroup4" size="mini">
            <el-checkbox-button v-for="app in eyeContact" :label="app" :key="app">{{app}}</el-checkbox-button>
          </el-checkbox-group>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>
    
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Insight</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>
    
    </el-row>

    <el-row>

      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Judgement</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Mood / affect</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>

    </el-row>

    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Impulse control</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Thought content</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Neurological</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>

    </el-row>

    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Preception</span>
            <el-button style="float: right; padding: 3px 0" type="text">All normal</el-button>
          </div>
          <el-input
            type="textarea"
            autosize
            :rows="2"
            placeholder="Please input"
            v-model="textarea"
          ></el-input>
        </el-card>
      </el-col>
      <el-col></el-col>
    </el-row>
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

const constitutionalOptions = ["Vitals signs stable"];

const eyeContactOptions = ["Appropriate", "Downcast", "Intense", "Fleeting"];

import Appearance from "@/components/patient/MentalStatusExam/components/Appearance";
import ThoughtProcess from "@/components/patient/MentalStatusExam/components/ThoughtProcess";
import Attitude from "@/components/patient/MentalStatusExam/components/Attitude";
export default {
  data() {
    return {
      checkboxGroup4: ["Shanghai"],
      cognition: cognitionOptions,
      consitutional: constitutionalOptions,
      eyeContact: eyeContactOptions,
      textarea: ""
    };
  },
  components: {
    Appearance,
    ThoughtProcess,
    Attitude
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