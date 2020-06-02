<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-card class="box-card">
                <el-form 
                label-position="top" 
                :model="dxForm" 
                ref="dxForm" 
                class="demo-dynamic">

                    <el-card 
                    class="box-card" 
                    v-for="(diagnosis,index) in dxForm.dx" 
                    :key="index" 
                    style="margin-bottom: 20px;">
                        <el-row>
                            <el-col :span="2" :offset="24">
                                <i class="el-icon-close" @click.prevent="removeDomain(diagnosis)"></i>
                            </el-col>
                        </el-row>
                        <el-form-item 
                        style="font-weight:bold" 
                        label="Name" 
                        :prop="'dx.'+index+'.value'" 
                        label-position="top" 
                        :rules="{required: true, message: 'Diagnosis can not be blank', trigger: 'blur'}">
                            <el-select
                            v-model="diagnosis.value" 
                            filterable 
                            placeholder="Select" 
                            style="width: 100%;"> 
                                <el-option
                                v-for="item in diagnosesList"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item 
                        style="font-weight:bold" 
                        label="When diagnosed" 
                        :prop="'dx.'+index+'.when'" 
                        label-position="top" 
                        :rules="{required: true, message: 'Date can not be blank', trigger: 'blur'}">
                            <el-date-picker 
                            type="date" 
                            placeholder="Pick a date" 
                            v-model="diagnosis.when" 
                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-card>


                    <el-form-item>
                        <el-button type="success" @click="submitForm('dxForm')" size="small">Save</el-button>
                        <el-button type="primary" @click="addDomain" size="small">Add one more</el-button>
                    </el-form-item>
                </el-form>
            </el-card> 
        </el-col>
    </el-row>
</template>
<script>


/**
 * Multi Add Diagnosis form.
 * @displayName Add Diagnosis
 */
import uniqid from "uniqid";

export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      dxForm: { dx: [{value: '', when: '' }] },
      diagnosesList: [{
          value: 'Bacterial intestinal infection, unspecified',
          label: 'Bacterial intestinal infection, unspecified'
        }, {
          value: 'Adjustment disorder, With depressed mood',
          label: 'Adjustment disorder, With depressed mood'
        }, {
          value: 'Adjustment disorder, With anxiety',
          label: 'Adjustment disorder, With anxiety'
        }, {
          value: 'Generalized anxiety disorder',
          label: 'Generalized anxiety disorder'
        }, {
          value: 'Other specified bacterial intestinal infections',
          label: 'Other specified bacterial intestinal infections'
        }, {
          value: 'Catatonia associated with another mental disorder (catatonia specifier)',
          label: 'Catatonia associated with another mental disorder (catatonia specifier)'
        }, {
          value: 'Adult antisocial behavior',
          label: 'Adult antisocial behavior'
        }, {
          value: 'Spouse or partner abuse, Psychological, Confirmed, Initial encounter',
          label: 'Spouse or partner abuse, Psychological, Confirmed, Initial encounter'
        }, {
          value: 'Adjustment disorder, Unspecified',
          label: 'Adjustment disorder, Unspecified'
        }, {
          value: 'Child neglect or abandonment, confirmed subsequent encounter',
          label: 'Child neglect or abandonment, confirmed subsequent encounter'
        }],
    };
  },
  methods: {
    addDomain() {
      this.dxForm.dx.push({
        value: '', when: ''
      });
    },
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // Add
            let dxList = [];
            this.dxForm.dx.forEach(item => {
              dxList.push({
                diagnosisName: item.value,
                recordChangedOnDateTime: item.when,
                patientUUId: vm.id,
                diagnosisID: uniqid(),
                recordChangedByUUID: this.userId
              });
            });
            await this.$store.dispatch("addDiagnosis", {
              data: dxList,
              notify: this.$notify,
              patientId: this.id
            });
            await this.$store.dispatch("getDiagnosis", {
              patientId: this.id,
              notify: this.$notify
            });
            this.dxForm = { dx: [{ value: "", when: "" }] };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    type() {
      return this.$store.state.tabDialog.diagnosisTabType;
    },
    updateData() {
      return this.$store.state.tabDialog.diagnosisData;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  mounted() {
    
  },
  watch: {
    updateData() {
      this.dxForm = { dx: [{ value: this.updateData.description, when: this.updateData.when }] };
    }
  }
};
</script>