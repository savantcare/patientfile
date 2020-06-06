<!-- TODO: Instead of Type it should be timeToShowStateOn -->
<template>
  <el-card class="box-card" :id="`recommendation-${stateDisplayArea}`">
    <div slot="header" class="clearfix">
      <CardHeader
        title="Recommendation"
        actions="A,M,F,D,X,R"
        ref="card_header"
        keyId="recommendation"
        :stateDisplayArea="stateDisplayArea"
        :columns="columns"
        @showTabToAddInLayer2="showTabToAddInLayer2"
        @showMultiChangeTabInLayer2="showMultiChangeTabInLayer2"
        @focusPanel="focusPanel"
        @multiDiscontinue="multiDiscontinue"
        @showDiscontinueHistoryTabInLayer2="showDiscontinueHistoryTabInLayer2"
      />
    </div>
    <DataTable
      title="Recommendation"
      keyId="recommendation"
      :tabData="tabData"
      :stateDisplayArea="stateDisplayArea"
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
import { RECOMMENDATION_API_URL } from "@/const.js";
export default {
  components: {
    CardHeader,
    DataTable
  },
  props: {
    stateDisplayArea: {
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

      QUESTION: How is tabDialog getting this event.

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
    focusPanel() {
      //stateAtSelectedTime
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
      if (this.stateDisplayArea == "CurrentStateDisplayArea") {
        element = "#recommendation-multiStateDisplayArea";
        options["container"] = "#multiStateDisplayArea";
      } else {
        element = "#recommendation-currentStateDisplayArea";
        options["container"] = "#currentStateDisplayArea";
      }

      this.$scrollTo(element, 500, options);
    },
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
    showDiscontinueHistoryTabInLayer2() {
      this.$store.commit("showRecommendationDiscontinueHistoryTabInLayer2");
    }
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
    const params = {
      patientId: this.$route.query.patient_id,
      notify: this.$notify,
      userId: this.$store.state.userId
    };
    this.$store.dispatch("getMyRecommendations", params);
    this.$store.dispatch("getOtherRecommendations", params);
  },
  computed: {
    tabData() {
      const myList = this.$store.state.recommendation.yourRecommendationsList;
      const othersList = this.$store.state.recommendation.othersList;
      return [
        {
          label: "Yours",
          tableData: myList,
          rowActions: ["C", "D"]
        },
        {
          label: "Other's",
          tableData: othersList,
          rowActions: ["C", "D"],
          selectedColumn: ["description"]
        }
      ];
    }
  }
};
</script>

<style lang="css">
</style>