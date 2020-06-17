<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card header="Weight" shadow="hover">
          <el-row>
            <el-col :span="12">
              <div>Weight in Pounds:</div>
              <el-input-number v-model="weight.weightInPounds"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker v-model="weight.measurementDate" type="date" placeholder="Pick a day"></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="weight.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="BMI" shadow="hover">
          <el-row>
            <el-col :span="12">
              <div>BMI value:</div>
              <el-input-number v-model="bmi.bmiValue"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker v-model="bmi.measurementDate" type="date" placeholder="Pick a day"></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="bmi.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Waist Circumference">
          <el-row>
            <el-col :span="12">
              <div>Waist circumference in inchies:</div>
              <el-input-number v-model="waistCircumference.waistCircumferenceInInches"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker
                v-model="waistCircumference.measurementDate"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="waistCircumference.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Blood Sugar">
          <el-row>
            <el-col :span="12">
              <div>Blood sugar:</div>
              <el-input-number v-model="bloodSugar.bloodSugar"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker
                v-model="bloodSugar.measurementDate"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="bloodSugar.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Height">
          <el-row>
            <el-col :span="12">
              <div>Height in inchie:</div>
              <el-input-number v-model="height.heightInInch"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker v-model="height.measurementDate" type="date" placeholder="Pick a day"></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="height.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Blood Pressure">
          <el-row :gutter="20">
            <el-col :span="8">
              <div>Systolic value:</div>
              <el-input-number v-model="bloodPressure.systolicValue"></el-input-number>
            </el-col>
            <el-col :span="8">
              <div>Diastolic value:</div>
              <el-input-number v-model="bloodPressure.diastolicValue"></el-input-number>
            </el-col>
            <el-col :span="8">
              <div>Date:</div>
              <el-date-picker
                v-model="bloodPressure.measurementDate"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="bloodPressure.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Oxygen saturation">
          <el-row>
            <el-col :span="12">
              <div>Oxygen saturation:</div>
              <el-input-number v-model="oxygenSaturation.oxygenSaturation"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker
                v-model="oxygenSaturation.measurementDate"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="oxygenSaturation.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Pulse">
          <el-row>
            <el-col :span="12">
              <div>Beats per minute value:</div>
              <el-input-number v-model="pulse.beatsPerMinuteValue"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker v-model="pulse.measurementDate" type="date" placeholder="Pick a day"></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="pulse.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="Temperature">
          <el-row>
            <el-col :span="12">
              <div>Temperature in farehnite:</div>
              <el-input-number v-model="temperature.temperatureInFarehnite"></el-input-number>
            </el-col>
            <el-col :span="12">
              <div>Date:</div>
              <el-date-picker
                v-model="temperature.measurementDate"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-col>
            <el-col style="margin-top: 6px;">
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="temperature.Notes"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-button type="primary" style="margin-top: 12px;" @click="onClickSave">Save</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weight: {
        weightInPounds: 0,
        Notes: "",
        measurementDate: new Date()
      },
      bmi: {
        bmiValue: 0,
        Notes: "",
        measurementDate: new Date()
      },
      waistCircumference: {
        waistCircumferenceInInches: 0,
        Notes: "",
        measurementDate: new Date()
      },
      bloodSugar: {
        bloodSugar: 0,
        Notes: "",
        measurementDate: new Date()
      },
      height: {
        heightInInch: 0,
        Notes: "",
        measurementDate: new Date()
      },
      bloodPressure: {
        systolicValue: 0,
        diastolicValue: 0,
        Notes: "",
        measurementDate: new Date()
      },
      oxygenSaturation: {
        oxygenSaturation: 0,
        Notes: "",
        measurementDate: new Date()
      },
      pulse: {
        beatsPerMinuteValue: 0,
        Notes: "",
        measurementDate: new Date()
      },
      temperature: {
        temperatureInFarehnite: 0,
        Notes: "",
        measurementDate: new Date()
      }
    };
  },
  methods: {
    async onClickSave() {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipJson = await ipResponse.json();
      const ipAddress = ipJson.ip;
      const patientId = this.$route.query.patient_id;
      const myId = this.$store.state.userId;

      let data = {
        patientUUID: patientId,
        recordChangedByUUID: myId,
        recordChangedFromIPAddress: ipAddress
      };
      if (this.weight.weightInPounds > 0) {
        const weight = { ...data, ...this.weight };
        this.$store.dispatch("bodyMeasurement/dbUpdateWeightInSM", {
          data: weight,
          notify: this.$notify
        });
        this.weight = {
          weightInPounds: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.bmi.bmiValue > 0) {
        const bmi = { ...data, ...this.bmi };
        this.$store.dispatch("bodyMeasurement/dbUpdateBmiInSM", {
          data: bmi,
          notify: this.$notify
        });
        this.bmi = {
          bmiValue: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.waistCircumference.waistCircumferenceInInches > 0) {
        const waistCircumference = { ...data, ...this.waistCircumference };
        this.$store.dispatch("bodyMeasurement/dbUpdateWaistCircumferenceInSM", {
          data: waistCircumference,
          notify: this.$notify
        });
        this.waistCircumference = {
          waistCircumferenceInInches: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.bloodSugar.bloodSugar > 0) {
        const bloodSugar = { ...data, ...this.bloodSugar };
        this.$store.dispatch("bodyMeasurement/dbUpdateBloodSugarInSM", {
          data: bloodSugar,
          notify: this.$notify
        });
        this.bloodSugar = {
          bloodSugar: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.height.heightInInch > 0) {
        const height = { ...data, ...this.height };
        this.$store.dispatch("bodyMeasurement/dbUpdateHeightInSM", {
          data: height,
          notify: this.$notify
        });
        this.height = {
          heightInInch: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (
        this.bloodPressure.systolicValue > 0 &&
        this.bloodPressure.diastolicValue > 0
      ) {
        const bloodPressure = { ...data, ...this.bloodPressure };
        this.$store.dispatch("bodyMeasurement/dbUpdateBloodPressureInSM", {
          data: bloodPressure,
          notify: this.$notify
        });
        this.bloodPressure = {
          systolicValue: 0,
          diastolicValue: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.oxygenSaturation.oxygenSaturation > 0) {
        const oxygenSaturation = { ...data, ...this.oxygenSaturation };
        this.$store.dispatch("bodyMeasurement/dbUpdateOxygenSaturationInSM", {
          data: oxygenSaturation,
          notify: this.$notify
        });
        this.oxygenSaturation = {
          oxygenSaturation: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.pulse.beatsPerMinuteValue > 0) {
        const pulse = { ...data, ...this.pulse };
        this.$store.dispatch("bodyMeasurement/dbUpdatePulseInSM", {
          data: pulse,
          notify: this.$notify
        });
        this.pulse = {
          beatsPerMinuteValue: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
      if (this.temperature.temperatureInFarehnite > 0) {
        const temperature = { ...data, ...this.temperature };
        this.$store.dispatch("bodyMeasurement/dbUpdateTemperatureInSM", {
          data: temperature,
          notify: this.$notify
        });
        this.temperature = {
          temperatureInFarehnite: 0,
          measurementDate: new Date(),
          Notes: ""
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-2 {
  margin-top: 12px;
}
</style>