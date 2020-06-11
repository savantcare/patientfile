<template>
  <el-input
    :class="{'changed': isChanged}"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="Please input"
    v-model="inputValue"
    @input="updateValue"
    ref="textarea"
  />
</template>

<script>
export default {
  props: ["value", "field"],
  data() {
    return {
      inputValue: "",
      originValue: ""
    };
  },
  mounted() {
    this.inputValue = this.value;
    this.originValue = this.value;
  },
  computed: {
    isChanged() {
      if (this.inputValue != this.originValue) {
        this.$emit("updateValidateChanges", {
          field: this.field,
          value: false
        });
        return true;
      }
      this.$emit("updateValidateChanges", { field: this.field, value: true });
      return false;
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    resetChanges() {
      this.originValue = this.value;
    }
  },
  watch: {
    value() {
      if (this.originValue == "") {
        this.originValue = this.value;
      }
      if (
        this.inputValue != this.value &&
        this.originValue != this.inputValue
      ) {
        this.originValue = this.value;
      }
      this.inputValue = this.value;
      this.$refs.textarea.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>