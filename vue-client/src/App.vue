/* 
 KT: This is first file imported by src/main.js hence this is the 2nd file in the app.
*/

<template>
  <div id="app">
    <router-view />
    <Offline @detected-condition="handleConnectivityChange"></Offline>
  </div>
</template>

<script>
// https://github.com/vinayakkulkarni/v-offline this detects if the vue app is online or offline
const Offline = () => import("v-offline");
export default {
  components: {
    Offline
  },
  methods: {
    handleConnectivityChange(status) {
      this.$store.commit("setConnectionStatus", status);
    }
  }
};
</script>

<style lang="scss">
</style>
