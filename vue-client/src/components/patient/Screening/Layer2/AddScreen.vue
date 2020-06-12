<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" :body-style="{ padding: '3px' }">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
            <el-form-item
              v-for="(domain) in dynamicValidateForm.domains"
              :key="domain.key"
              :prop="'desc'"
              label-position="top"
              :rules="{required: true, message: 'Description can not be blank', trigger: 'blur'}"
            >
              <p class="lbl-screen">Select screen:</p>
              <el-select v-model="domain.value" filterable placeholder="Select">
                <el-option
                  
                  v-for="item in getMasterScreenList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('dynamicValidateForm')" size="small">Save</el-button>
              <el-button type="primary" @click="addDomain" size="small">Add one more</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- </el-tab-pane> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            key: 1,
            value: ""
          }
        ]
      },
      masterScreenList: [],
    };
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify,
      userId: this.$store.state.userId,
    };
    this.$store.dispatch("dbGetMasterScreeningList", params);

    // 'Bipolar' 'Schizophrenia' 'Anxiety (GAD-7)' 'ADHD' 'Substance Abuse' 'Alcoholism screening' 
    // 'Depression' 'Schizophrenia' 'PTSD' 'Substance Abuse' 'PTSD' 'Drug Use'
    
  },
  methods: {

    
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
  },
  computed: {
    getMasterScreenList() {
      let masterScreenList = [];
      const dbScreenList = this.$store.state.screening.screenMasterList;
      console.log(dbScreenList);
      dbScreenList.forEach(list => {
        masterScreenList.push({
           value: list.uuid, 
           label: list.scientificName
        })
      });
      return masterScreenList;
    }
  },
  /*created: function() {
      // imagine getDataFor calls some API via AJAX
      this.masterScreenList = this.getMasterScreenList
  },*/
};
</script>

<style lang="scss" scoped>
.lbl-screen{
  padding: 0;
  margin: 0;
}
</style>