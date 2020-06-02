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
              :rules="{
                    required: true, message: 'Description can not be blank', trigger: 'blur'
                  }"
            >
              <!-- <el-row>
                <el-col :span="2" :offset="24">
                  <i class="el-icon-close" @click.prevent="removeDomain(domain)"></i>
                </el-col>
              </el-row> -->
              <p class="lbl-screen">Select screen:</p>
              <el-select v-model="domain.value" filterable placeholder="Select">
                <el-option
                  v-for="item in options"
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
      options: [
        { value: 1, label: 'Bipolar' }, 
        { value: 2, label: 'Schizophrenia' }, 
        { value: 3, label: 'Anxiety (GAD-7)' }, 
        { value: 4, label: 'ADHD' }, 
        { value: 5, label: 'Substance Abuse' },
        { value: 6, label: 'Alcoholism screening' },
        { value: 7, label: 'Depression' },
        { value: 8, label: 'Schizophrenia' },
        { value: 9, label: 'PTSD' },
        { value: 10, label: 'Substance Abuse' },
        { value: 11, label: 'PTSD' },
        { value: 12, label: 'Drug Use' }
      ],
    };
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
  }
};
</script>

<style lang="scss" scoped>
.lbl-screen{
  padding: 0;
  margin: 0;
}
</style>