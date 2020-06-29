<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="box-card" v-loading="isLoading" :header="header">
        <el-form :model="bmElementForm" ref="bmElementForm" class="demo-dynamic">
          <el-form-item>
            <el-card class="box-card" shadow="hover">
              <div v-if="type == 'bloodPressure'">
                <div>Systolic Value</div>
                <el-input-number v-model="bmElementForm.systolicValue" :min="1"></el-input-number>
                <div>Diastolic Value</div>
                <el-input-number v-model="bmElementForm.diastolicValue" :min="1"></el-input-number>
              </div>
              <div v-else>
                <div>Value</div>
                <el-input-number v-model="bmElementForm.value" :min="1"></el-input-number>
              </div>
              <div>Date</div>
              <el-date-picker v-model="bmElementForm.date" type="date" placeholder="Pick a day"></el-date-picker>
              <div>Notes</div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Please input notes"
                v-model="bmElementForm.notes"
              />
            </el-card>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('bmElementForm')" size="small">Save</el-button>
          </el-form-item>
        </el-form>

        <el-timeline>
          <el-timeline-item
            v-for="(log, index) in pageChangeLog"
            :key="`log-${index}`"
            type="primary"
            size="large"
            :timestamp="log.date"
          >{{log.value}}</el-timeline-item>
        </el-timeline>
        <el-pagination
          small
          layout="prev, pager, next"
          :page-size="5"
          :total="changeLog.length"
          :current-page.sync="currentPage"
          hide-on-single-page
        ></el-pagination>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["updateObject", "pageChangeLog", "header", "type"],
  data() {
    return {
      bmElementForm: {},
      changeLog: [],
      currentPage: 0,
      isLoading: false
    };
  },
  mounted() {
    if (this.updateObject) {
      this.bmElementForm = this.updateObject;
    }
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      this.$emit("submitForm", this.bmElementForm);
    },
    reset() {
      this.bmElementForm = {};
      this.isLoading = false;
    }
  },
  watch: {
    updateObject() {
      if (this.updateObject) {
        this.bmElementForm = this.updateObject;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>