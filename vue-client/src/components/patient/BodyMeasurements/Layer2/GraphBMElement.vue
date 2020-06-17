<template>
  <div>
    <BMElementBody :type="element.type" :label="element.label" :tab="element.index" />
  </div>
</template>

<script>
import BMElementBody from "../BMElementBody";
export default {
  components: {
    BMElementBody
  },
  computed: {
    element() {
      return this.$store.state.multiTabDialogLayer2.bmElement;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>