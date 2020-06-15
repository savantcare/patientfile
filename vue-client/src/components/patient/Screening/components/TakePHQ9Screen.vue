<template>
  <el-row :gutter="12">

<el-form label-position="top" ref="form">

   <el-form-item>
 
    <el-table :data="questionData" style="width: 100%">

      <el-table-column prop="question" label="Patient health questionnaire" :min-width="550">

      </el-table-column>

      <el-table-column prop="option1" label="Not at all" width="180"> 
        <template slot-scope="scope">
            <el-radio :label="0" v-model="scope.row.selectedIndex"  @change="updateAnswer(scope.$index, scope.row)" ></el-radio>
        </template>
      </el-table-column>

      <el-table-column prop="option2" label="Several days">
        <template slot-scope="scope">
          <el-radio :label="1" v-model="scope.row.selectedIndex" @change="updateAnswer(scope.$index, scope.row)" ></el-radio>
        </template>
      </el-table-column>

      <el-table-column prop="option3" label="More than half the days">
        <template slot-scope="scope">
            <el-radio :label="2"  v-model="scope.row.selectedIndex"  @change="updateAnswer(scope.$index, scope.row)" ></el-radio>
        </template>
       </el-table-column>

      <el-table-column prop="option4" label="Nearly every day">
        <template slot-scope="scope">
            <el-radio :label="3" v-model="scope.row.selectedIndex"  @change="updateAnswer(scope.$index, scope.row)" ></el-radio>
        </template>
      </el-table-column>



    </el-table>



    </el-form-item>
    <br />
    <br />

    <el-form-item  class="qstn-submit" body-style="{ padding: '30px' }">
        <el-button type="success" @click="submitForm()" size="small">Submit</el-button>
    </el-form-item>

</el-form>

</el-row>
</template>

<script>
export default {
  data() {
    return {
        screenForm: '',
        radio: 3,
        questionData: [
          { id: 1, selectedIndex: null,  question: '1. Over the last 2 weeks how often have you been bothered by any of the following problems... Feeling down, depressed, or hopeless?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 2, selectedIndex: null,  question: '2. Over the last 2 weeks how often have you been bothered by any of the following problems... Trouble falling or staying asleep, or sleeping too much?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 3, selectedIndex: null,  question: '3. Over the last 2 weeks how often have you been bothered by any of the following problems... Feeling tired or having little energy?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 4, selectedIndex: null,  question: '4. Over the last 2 weeks how often have you been bothered by any of the following problems... Poor appetite or overeating?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 5, selectedIndex: null,  question: '5. Over the last 2 weeks how often have you been bothered by any of the following problems... Feeling bad about yourself -- or that you are a failure or have let yourself or your family down?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 6, selectedIndex: null,  question: '6. Over the last 2 weeks how often have you been bothered by any of the following problems... Trouble concentrating on things, such as reading newspapers or watching television?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 7, selectedIndex: null,  question: '7. Over the last 2 weeks how often have you been bothered by any of the following problems... Moving or speaking slowly that other could have noticed. Or the opposite -- being so figety or restless that you have been moving around a lot more than usual?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 8, selectedIndex: null,  question: '8. Over the last 2 weeks how often have you been bothered by any of the following problems... Thoughts that you would be better off dead, or of hurting yourself?', option1: '0', option2: '1', option3: '2', option4: '3' },
          { id: 9, selectedIndex: null,  question: '9. Others ... If you have checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?', option1: '0', option2: '1', option3: '2', option4: '3' },
        ],
        value: '',
      tabIndex: 2, 
      form: {
        desc: "screening1",
        when: ""
      },
      dialogVisible: true,
      dynamicValidateForm: {
        domains: [
          {
            key: 1,
            value: ""
          }
        ]
      }
    };
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

    const params = {
      patientUUID: this.$route.query.patient_id,
      screentype : 'PHQ9',
      notify: this.$notify
    };
    this.$store.dispatch("getScreeningDetail", params);

    // 'Bipolar' 'Schizophrenia' 'Anxiety (GAD-7)' 'ADHD' 'Substance Abuse' 'Alcoholism screening' 
    // 'Depression' 'Schizophrenia' 'PTSD' 'Substance Abuse' 'PTSD' 'Drug Use'
    
  },
  methods: {
    updateAnswer(index, row) {
      console.log(index, row.selectedIndex);
    },
    onSubmit() {
      console.log("submit!");
    },
    async submitForm() {
      // submit screeniggn answer screen
      let apptDate = new Date().toISOString().slice(0, 19).replace('T', ' ') 
      let screenDetailData = {};

      // create screen data rowSet
      // responseUUID: uniqid(),
      screenDetailData.patientUUID = this.$route.query.patient_id;
      screenDetailData.recordChangedByUUID = this.getUserId;
      screenDetailData.recordChangedFromIPAddress = '';
        
      this.questionData.forEach(row => { 
        let key = 'question'+row.id;
        screenDetailData[key] = row.selectedIndex
      });

      console.log(screenDetailData);

      //let aaa = JSON.parse(JSON.stringify(screenDetailData));

      //console.log(aaa);
      await this.$store.dispatch("addScreeningDetail", {
        data: [screenDetailData],
        notify: this.$notify,
        screentype: 'PHQ9',
        date: apptDate
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    getUserId() {
      return this.$store.state.userId;
    },
  }
};
</script>

<style lang="scss" scoped>

.el-col-8 {
    padding-top: 6px;
    padding-bottom: 6px;
}

.qstn-submit{
  float: right;
  margin: 0 20px;
}

.el-form-item {
  margin-bottom : 3px;
}
</style>