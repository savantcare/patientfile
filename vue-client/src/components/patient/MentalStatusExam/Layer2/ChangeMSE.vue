<template>
  <div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      componentList: {
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
        affect: require("./components/Affect").default,
        thoughtContent: require("./components/ThoughtContent").default,
        neurological: require("./components/Neurological").default,
        perception: require("./components/Perception").default
      }
    };
  },
  computed: {
    ...mapState({
      type: state => state.mse.selectedType
    }),
    currentComponent() {
      return this.componentList[this.type];
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>