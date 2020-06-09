<!-- For architrecture read core 3 at Home.vue -->
<template>
  <!-- TODO: This should be typeOfStateDisplayArea -->
  <el-card class="box-card" :id="`recommendation-${typeOfStateDisplayArea}`">
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Recommendation"
        actions="A,M,F,D,X,R"
        ref="card_header"
        keyId="recommendation"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        :columns="columns"
        @showTabToAddInLayer2="showTabToAddInLayer2"
        @showMultiChangeTabInLayer2="showMultiChangeTabInLayer2"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        @showDiscontinueHistoryTabInLayer2="showDiscontinueHistoryTabInLayer2"
      />
    </div>
    <DataTable
      ctName="Recommendation"
      keyId="recommendation"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleChange="handleChange"
      @handleDiscontinue="handleDiscontinue"
      @handleUpdateColumns="handleUpdateColumns"
      @updatePriority="updatePriority"
      @updateTableList="updateTableList"
    />
  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import DataTable from "@/components/common/DataTable";
import { RECOMMENDATION_API_URL } from "@/const/others.js";
export default {
  components: {
    CardHeader,
    DataTable
  },
  props: {
    typeOfStateDisplayArea: {
      type: String,
      default: "CurrentStateDisplayArea" // Other possible value: MultiStateDisplayArea For logic:Top of CardHeader.vue
    }
  },
  data() {
    return {
      selectedRows: [],
      columns: []
    };
  },
  methods: {
    showTabToAddInLayer2() {
      /* 
      Ref: https://vuex.vuejs.org/guide/mutations.html
      The only way to actually change state in a Vuex store is by committing a mutation. 
      Vuex mutations are very similar to events: each mutation has a string type and a handler. 
      The handler function is 
        1. Where we perform actual state modifications, 
        2. Where we will receive the state as the first argument.

      The following line invokes the code in: vue-client/src/store/modules/Layer2MultiTabDialogState.js#L80  

      QUESTION: How is multiTabDialogLayer2 getting this event.

      Due to using a single state tree, all state of our application is contained inside one big object. However, as our application grows in scale, the store can get really bloated.
      To help with that, Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules
      Ref: https://vuex.vuejs.org/guide/modules.html

      showAddRecommendationTabInLayer2 is a mutation inside module -> Layer2MultiTabDialogState.js but it can be called from here.

      */
      this.$store.commit("showAddRecommendationTabInLayer2");
    },
    showMultiChangeTabInLayer2() {
      this.$store.commit("showMultiChangeRecommendationTabInLayer2");
    },
    // TODO: Rename this to handleFocusPanel()
    focusPanel() {
      //multiStateDisplayArea
      var options = {
        container: "",
        easing: "ease-in",
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      };
      let element = "";
      if (this.typeOfStateDisplayArea == "CurrentStateDisplayArea") {
        element = "#recommendation-multiStateDisplayArea";
        options["container"] = "#multiStateDisplayArea";
      } else {
        element = "#recommendation-currentStateDisplayArea";
        options["container"] = "#currentStateDisplayArea";
      }

      this.$scrollTo(element, 500, options);
    },
    // TODO: Rename this to handleMultiDiscontinue()
    multiDiscontinue() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("multiDiscontinueRecommendations", {
        selectedIds: selectedIds,
        notify: this.$notify,
        selectedDatas: this.selectedRows
      });
    },
    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },
    handleChange(data) {
      this.$store.commit("showChangeRecommendationsTabInLayer2", data);
    },
    handleDiscontinue(data) {
      this.$store.dispatch("discontinueRecommendation", {
        data: data,
        toast: this.$notify
      });
    },
    handleUpdateColumns(value) {
      if (value.length > 0) {
        this.columns = value;
      }
    },
    // TODO: Rename this to handleUpdatePriority()
    async updatePriority(changedDatas) {
      const TOKEN = localStorage.getItem("token");

      const response = await fetch(`${RECOMMENDATION_API_URL}/updatePriority`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + TOKEN
        },
        body: JSON.stringify(changedDatas)
      });
      if (!response.ok) {
        this.$notify({
          title: "Error",
          message: "Failed to update recommendation data"
        });
      } else {
        this.$notify({
          title: "Title",
          message: "Updated!"
        });
      }
    },
    updateTableList(tableList) {
      this.$store.commit("setRecommendationTableList", tableList);
    },
    // TODO: Rename this to showDiscontinuedHistoryTabInLayer2()
    showDiscontinueHistoryTabInLayer2() {
      this.$store.commit("showRecommendationDiscontinueHistoryTabInLayer2");
    }
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  },
  computed: {}
};
</script>

<style lang="css">
</style>