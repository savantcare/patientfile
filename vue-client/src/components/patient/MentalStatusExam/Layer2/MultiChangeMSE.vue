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
           <Constitutional></Constitutional>
      </el-col>
      <el-col>
           <EyeContact></EyeContact>
      </el-col>
      <el-col>
           <Cognition></Cognition>
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
    
    </el-row>
    
    <el-row>
      <el-col>
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






import Appearance from "@/components/patient/MentalStatusExam/components/Appearance";
import ThoughtProcess from "@/components/patient/MentalStatusExam/components/ThoughtProcess";
import Attitude from "@/components/patient/MentalStatusExam/components/Attitude";
import Cognition from "@/components/patient/MentalStatusExam/components/Cognition";
import Constitutional from "@/components/patient/MentalStatusExam/components/Constitutional";
import EyeContact from "@/components/patient/MentalStatusExam/components/EyeContact";

export default {
  data() {
    return {
      checkboxGroup4: ["Shanghai"],
      textarea: ""
    };
  },
  components: {
    Appearance,
    ThoughtProcess,
    Attitude,
    Cognition,
    Constitutional,
    EyeContact
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