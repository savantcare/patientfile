<template>
  <el-row :gutter="12">
    <el-tag  v-for="tag in tags"  :key="tag.name"  closable  :type="tag.type">
        {{tag.name}}
    </el-tag>
    <br />
    <br />

<el-form label-position="top" ref="form" :model="screenForm">

   <el-form-item>

    <el-table :data="questionData" style="width: 100%">
      <el-table-column prop="question" label="Patient health questionnaire" width="580"></el-table-column>
        <el-table-column prop="option1" label="Not at all" width="180"> 
          <template slot-scope="scope">
            <el-radio label="1"  @click="handleEdit(scope.$index, scope.row)" >0</el-radio>
        </template>
      
      </el-table-column>
      <el-table-column prop="option2" label="Several days">
        <template slot-scope="scope">
          <el-radio label="1"  @click="handleEdit(scope.$index, scope.row)" >2</el-radio>
        </template>

      </el-table-column>
      <el-table-column prop="option3" label="More than half the days">
        <template slot-scope="scope">
            <el-radio label="1" v-model="scope.row.option3"  @click="handleEdit(scope.$index, scope.row)" >3</el-radio>
        </template>
       </el-table-column>
      <el-table-column prop="option4" label="Nearly every day">
        <template slot-scope="scope">
            <el-radio label="1"  @click="handleEdit(scope.$index, scope.row)" >4</el-radio>
        </template>
      </el-table-column>
    </el-table>

    </el-form-item>
    <br />
    <br />

    <el-form-item  class="qstn-submit" body-style="{ padding: '30px' }">
              <el-button type="success" @click="submitForm('screenForm')" size="small">Submit</el-button>
    </el-form-item>

</el-form>

  <!-- <el-radio v-model="radio" label="2">Option B</el-radio> -->




  </el-row>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Take a screen",
          name: "screening",
          content: "screening"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
        tags: [
          { name: 'PHQ9', type: 'light' }
        ],
        radio: '0',
        questionData: [
          { question: '1. Little interest or pleasure in doing things', option1: '0', option2: '1', option3: '2', option4: '3' },
          { question: '2. Feeling down, depressed or hopeless.', option1: '0', option2: '1', option3: '2', option4: '3' },
          { question: '3. Trouble falling or staying asleep, or sleeping too much', option1: '0', option2: '1', option3: '2', option4: '3' },
          { question: '4. Feeling tired or having little energy ', option1: '0', option2: '1', option3: '2', option4: '3' },
          { question: '5. Poor appetite or overeating ', option1: '0', option2: '1', option3: '2', option4: '3' }
        ],
       answerList: [
          { value: 1, label: 'Not at all',  },
          { value: 2, label: 'A little bit' },
          { value: 3, label: 'Somewhat' },
          { value: 4, label: 'Very much' },
          { value: 5, label: 'Extremely' }
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
      },
      activities: [
        {
          content: "screening1",
          timestamp: "25th May, 2020",
          size: "large",
          type: "primary"
        },
        {
          content: "Rex1",
          timestamp: "25th May, 2020",
          color: "#0bbd87"
        }
      ]
    };
  },
  methods: {

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      done();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ""
      });
    }
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