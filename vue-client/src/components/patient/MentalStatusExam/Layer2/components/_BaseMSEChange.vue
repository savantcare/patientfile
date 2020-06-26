<template>
  <el-card v-loading="isLoading" :header="title">
    <el-button type="text" @click="setNormalStatus" v-if="showNormalButton">Normal (Short code)</el-button>

    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="(status, index) in statusList"
        :key="`status-${index}`"
        :label="status.value"
        :value="status.key"
      ></el-checkbox>
    </el-checkbox-group>

    <el-input type="textarea" placeholder="Others (optional)" v-model="others"></el-input>

    <div style="margin-top: 6px;">
      <label style="margin-right: 6px">Time of evaluation:</label>
      <el-date-picker v-model="date" type="datetime" placeholder="Pick a day"></el-date-picker>
    </div>

    <el-button
      type="primary"
      style="margin-top: 12px"
      @click="saveChanges"
      :disabled="validateSaveButton"
    >Save</el-button>
  </el-card>
</template>

<script>
export default {
  props: {
    showNormalButton: {
      type: Boolean,
      default: true
    },
    statusList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    normalStatusList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    oldList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkList: [],
      others: "",
      date: new Date(),
      isLoading: false
    };
  },
  computed: {
    validateSaveButton() {
      if (this.checkList.length > 0 || this.others.length > 0) {
        return false;
      }
      return true;
    },
    updateCheckList() {
      return this.$store.state.mse.checkedList;
    }
  },
  watch: {
    updateCheckList() {
      this.renderCheckedValues();
    },
    oldList() {
      this.renderCheckedValues();
    }
  },
  mounted() {
    this.renderCheckedValues();
  },
  methods: {
    saveChanges() {
      this.isLoading = true;
      this.$emit("saveChanges", {
        checkList: this.checkList,
        others: this.others,
        date: this.date
      });
    },
    setNormalStatus() {
      this.checkList = this.normalStatusList;
    },
    resetData() {
      this.isLoading = false;
      this.checkList = [];
      this.others = "";
      this.date = new Date();
    },
    renderCheckedValues() {
      this.checkList = [];
      let existingList = [];
      console.log(this.oldList);
      if (this.oldList.length > 0) {
        existingList = this.oldList;
      } else {
        existingList = this.updateCheckList;
      }
      const checkList = this.statusList.filter(status => {
        const checkedValues = existingList.filter(updateItem => {
          return updateItem == status.key;
        });
        if (checkedValues.length > 0) {
          return true;
        }
      });
      if (checkList.length > 0) {
        checkList.forEach(item => {
          this.checkList.push(item.value);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>