<template>
  <div>
    <el-button type="text" size="mini" @click="handleClickChangeButton">C</el-button>
    <component :is="activeComponent" />
  </div>
</template>

<script>
export default {
  props: ["type", "tab", "label"],
  data() {
    return {
      chartElementComponents: {
        appearence: require("./components/Appearance").default,
        attitude: require("./components/Attitude").default,
        cognition: require("./components/Cognition").default,
        constitutional: require("./components/Constitutional").default,
        eyeContact: require("./components/EyeContact").default,
        impulseControl: require("./components/ImpulseControl").default,
        thoughtProcess: require("./components/ThoughtProcess").default,
        psychomotor: require("./components/Psychomotor").default,
        insight: require("./components/Insight").default,
        speech: require("./components/Speech").default,
        judgement: require("./components/Judgement").default,
        affect: require("./components/MoodAffect").default,
        thoughtContent: require("./components/ThoughtContent").default,
        neurological: require("./components/Neurological").default,
        perception: require("./components/Perception").default
      }
    };
  },
  computed: {
    activeComponent() {
      return this.chartElementComponents[this.type];
    }
  },
  mounted() {},
  methods: {
    handleClickChangeButton() {
      this.$store.commit("mse/setSelectedType", this.type);
      this.$store.commit("showChangeMSETabInLayer2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>