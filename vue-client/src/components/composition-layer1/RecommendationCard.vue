// Component type: Card
// -------------- Category 1/4: User interface of a card component ---------------------

<!-- For architrecture read core 3 at Home.vue -->
<template>
  <el-card class="box-card" :id="`recommendation-${typeOfStateDisplayArea}`">   <!-- currentStateDisplayArea or multiStateDisplayArea Ref: patientFile.vue header -->
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Recommendation"
        actions="A,M,F,D,X,R"
        ref="card_header"
        keyId="recommendation"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"               
        :columns="columns"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        @handleClickOnXInCardHeader="handleClickOnXInCardHeader"
      />
    </div>
    <DataTable
      ctName="Recommendation"
      keyId="recommendation"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleClickOnCInDataRow="handleClickOnCInDataRow"
      @handleClickOnDInDataRow="handleClickOnDInDataRow"
      @handleUpdateColumns="handleUpdateColumns"
      @updatePriority="updatePriority"
      @updateTableList="updateTableList"
    />
    <!-- TODO: Not clear what updateTableList does -->
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

    // -------------- Category 2/4: Functions to manage UI changes from Card Header ---------------------

    handleClickOnAInCardHeader() {
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

    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeRecommendationTabInLayer2");
    },
    
    handleClickOnXInCardHeader() {
      this.$store.commit("showRecommendationDiscontinueHistoryTabInLayer2");
    },

    handleClickOnFInCardHeader() {
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

    // -------------- Category 3/4: Functions to manage UI changes from data row ---------------------

    handleClickOnCInDataRow(data) {
      this.$store.commit("showChangeRecommendationsTabInLayer2", data);
    },

    handleUpdateColumns(value) {
      if (value.length > 0) {
        this.columns = value;
      }
    },

    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },
   
    updateTableList(tableList) {
      this.$store.commit("setRecommendationTableList", tableList);
    },
 
    //-------------- Category 4/4: Functions to manage DB changes -----------------------

    handleClickOnDInCardHeader() {
      let selectedIds = [];
      this.selectedRows.forEach(item => {
        selectedIds.push(item.id);
      });
      this.$store.dispatch("dbMultiDiscontinueRecommendations", {
        selectedIds: selectedIds,
        notify: this.$notify,
        selectedDatas: this.selectedRows
      });
    },
  
    handleClickOnDInDataRow(data) {
      this.$store.dispatch("dbDiscontinueRecommendation", {
        data: data,
        notify: this.$notify
      });
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