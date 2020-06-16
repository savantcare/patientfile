<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :model="bmElementForm" ref="bmElementForm" class="demo-dynamic">
            <el-form-item
              v-for="(element, index) in bmElementForm.elements"
              :key="index"
              :rules="{
                  required: true, message: 'Value can not be blank', trigger: 'blur'
              }"
              :prop="'elements.' + index + '.value'"
            >
              <el-card class="box-card" shadow="hover">
                <div>Value</div>
                <el-input-number v-model="element.value" :min="1"></el-input-number>
                <div>Date</div>
                <el-date-picker v-model="element.date" type="date" placeholder="Pick a day"></el-date-picker>
                <div>Notes</div>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="Please input notes"
                  v-model="element.notes"
                />
              </el-card>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('bmElementForm')" size="small">Save</el-button>
              <el-button type="primary" @click="addElement" size="small">Add one more</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bmElementForm: { elements: [{ value: 1, date: new Date(), notes: "" }] }
    };
  },
  methods: {
    addElement() {
      this.bmElementForm.elements.push({
        value: 1,
        date: new Date(),
        notes: ""
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipJson = await ipResponse.json();
          const ipAddress = ipJson.ip;

          let elementList = [];
          const patientId = this.$route.query.patient_id;
          const myId = this.$store.state.userId;
          this.bmElementForm.elements.forEach(element => {
            const measurementDate = new Date(element.date).toDateString();
            let data = {
              patientUUID: patientId,
              measurementDate: measurementDate,
              Notes: element.notes,
              recordChangedByUUID: myId,
              recordChangedFromIPAddress: ipAddress
            };
            if (this.type == "weight") {
              data["weightInPounds"] = element.value;
            } else if (this.type == "bmi") {
              data["bmiValue"] = element.value;
            } else if (this.type == "waistCircumference") {
              data["waistCircumferenceInInches"] = element.value;
            } else if (this.type == "bloodSugar") {
              data["bloodSugar"] = element.value;
            }
            elementList.push(data);
          });

          let dispatchName = "";
          if (this.type == "weight") {
            dispatchName = "bodyMeasurement/dbAddWeightInSM";
          } else if (this.type == "bmi") {
            dispatchName = "bodyMeasurement/dbAddBmiInSM";
          } else if (this.type == "waistCircumference") {
            dispatchName = "bodyMeasurement/dbAddWaistCircumferenceInSM";
          } else if (this.type == "bloodSugar") {
            dispatchName = "bodyMeasurement/dbAddBloodSugarInSM";
          }

          await this.$store.dispatch(dispatchName, {
            data: elementList,
            notify: this.$notify
          });
          this.bmElementForm = {
            elements: [{ value: 1, date: new Date(), notes: "" }]
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    type() {
      return this.$store.state.multiTabDialogLayer2.bmElementType;
    }
  },
  mounted() {},
  watch: {},
  components: {}
};
</script>

<style lang="scss">
.changed .el-input__inner,
.changed .el-textarea__inner {
  border-color: #e6a23c;
}
</style>
