<template>
  <el-row :gutter="12">
      <el-col :span="24">
          <el-card class="box-card">
              <el-form
                label-position="top" 
                :model="dynamicValidateForm" 
                ref="dynamicValidateForm" 
                class="demo-dynamic">

                    <el-card 
                    class="box-card" 
                    v-for="(domain) in dynamicValidateForm.domains" 
                    :key="domain.key" 
                    style="margin-bottom: 20px;">
                        <el-row>
                            <el-col :span="2" :offset="24">
                                <i class="el-icon-close" @click.prevent="removeDomain(domain)"></i>
                            </el-col>
                        </el-row>
                        <!-- <h1>Om Namah Sivay!!</h1> -->
                        <el-form-item
                        style="font-weight:bold" 
                        label="Description" 
                        :prop="'value'" 
                        label-position="top" 
                        :rules="{required: true, message: 'Hospitalization description can not be blank', trigger: 'blur'}">
                            <el-input 
                            placeholder="You may enter single line text" 
                            v-model="domain.value" 
                            style="width: 100%;"></el-input>
                        </el-form-item>

                        <el-form-item
                        style="font-weight:bold" 
                        label="Comment" 
                        :prop="'comment'" 
                        label-position="top" >
                            <el-input 
                            placeholder="You may enter single line text" 
                            v-model="domain.comment" 
                            style="width: 100%;"></el-input>
                        </el-form-item>
                        
                        <el-form-item 
                        style="font-weight:bold" 
                        label="Start date" 
                        :prop="'whenStart'" 
                        label-position="top" 
                        :rules="{required: true, message: 'Start date can not be blank', trigger: 'blur'}">
                            <el-date-picker 
                            type="date" 
                            placeholder="Pick a date" 
                            v-model="domain.whenStart" 
                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item 
                        style="font-weight:bold" 
                        label="Start date" 
                        :prop="'whenEnd'" 
                        label-position="top" >
                            <el-date-picker 
                            type="date" 
                            placeholder="Pick a date" 
                            v-model="domain.whenEnd" 
                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>

                    </el-card>

                <el-form-item>
                    <el-button type="success" @click="submitForm('dynamicValidateForm')" size="small">Save</el-button>
                    <el-button type="primary" @click="addDomain" size="small">Add one more</el-button>
                </el-form-item>
              </el-form>
          </el-card>
      </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            dynamicValidateForm: {
                domains: [{
                    key: 1,
                    value: '',
                    comment: '',
                    whenStart: '',
                    whenEnd: ''
                }]
        },
        }
    },
    methods: {
        
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
                value: '',
                comment: '',
                whenStart: '',
                whenEnd: ''
            });
        }
    }
}
</script>

<style>

</style>