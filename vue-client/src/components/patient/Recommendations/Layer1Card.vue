// Component type 1/2: Card
// -------------- Category 1/4: User interface of card component ---------------------

<!-- For architrecture read core 3 at Home.vue -->
<template>
  <!-- typeOfStateDisplayArea is currentStateDisplayArea or multiStateDisplayArea Ref: patientFile.vue header -->

  <!-- 
       https://stackoverflow.com/questions/54366269/how-to-properly-apply-ternary-operator-in-v-model-in-vue-js  
       https://stackoverflow.com/questions/49493882/escaping-double-quotes-in-vue-js
  -->
  <el-card
    class="box-card"
    :id="`recommendation-${typeOfStateDisplayArea}`"
    :style="typeOfStateDisplayAreaSpecificStyleToApply"
  >
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Recommendation"
        actions="A,M,F,D,X,R"
        ref="card_header"
        keyId="recommendation"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        @handleClickOnAInCardHeader="handleClickOnAInCardHeader"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        @handleClickOnDInCardHeader="handleClickOnDInCardHeader"
        @handleClickOnXInCardHeader="handleClickOnXInCardHeader"
        :typeOfStateDisplayAreaSpecificStyleToApply="typeOfStateDisplayAreaSpecificStyleToApply"
      />
    </div>
    <DataTable
      ctName="Recommendation"
      keyId="recommendation"
      :typeOfStateDisplayArea="typeOfStateDisplayArea"
      @handleSelectionChange="handleSelectionChange"
      @handleClickOnCInDataRow="handleClickOnCInDataRow"
      @handleClickOnDInDataRow="handleClickOnDInDataRow"
      @updatePriority="updatePriority"
      @updateTableList="updateTableList"
      :columns="columns"
      :typeOfStateDisplayAreaSpecificStyleToApply="typeOfStateDisplayAreaSpecificStyleToApply"
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
      columns: [
        {
          label: "Descrition",
          field: "recommendationDescription",
          sortable: true
        }
      ],
      patientId: this.$route.query.patient_id,
      userId: this.$store.state.userId
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
      -this.$store.commit("showRecommendationDiscontinueHistoryTabInLayer2");
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
      this.$store.dispatch("dbMultiDiscontinueRecommendationsInSM", {
        selectedIds: selectedIds,
        notify: this.$notify,
        selectedDatas: this.selectedRows
      });
    },

    handleClickOnDInDataRow(data) {
      this.$store.dispatch("dbDiscontinueRecommendationInSM", {
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
    this.$store.dispatch("dbGetMultiStateMyRecommendationsInSM", {
      date: this.timeOfState,
      patientId: this.patientId,
      userId: this.userId
    });
  },
  computed: {
    typeOfStateDisplayAreaSpecificStyleToApply: {
      get() {
        const today = new Date().toISOString().split("T")[0];
        const isToday = today == this.timeOfState;
        // let isToday = false;
        // if (
        //   today == this.timeOfState
        // ) {
        //   isToday = true;
        // }
        // if (
        //   timeOfStateDate.getFullYear() == today.getFullYear() &&
        //   timeOfStateDate.getMonth() == today.getMonth() &&
        //   timeOfStateDate.getDate() == today.getDate()
        // ) {
        //   isToday = true;
        // }

        let val = "";
        if (
          this.typeOfStateDisplayArea == "multiStateDisplayArea" &&
          !isToday
        ) {
          val =
            "background-image : url(http://api.thumbr.it/whitenoise-361x370.png?background=ffffffff&noise=5c5c5c&density=13&opacity=62);";
        }

        return val;
      },
      set(newValue) {
        this.doSomethingWith(newValue);
      }
    },
    timeOfState() {
      return this.$store.state.stateAtSelectedTime.timeOfState;
    }
  },
  watch: {
    timeOfState() {
      const timeOfState = this.timeOfState.split(" ")[0];
      console.log(timeOfState);
      if (
        this.$store.state.recommendation.multiStateYourRecommendationsList[
          timeOfState
        ] == null
      ) {
        const params = {
          date: this.timeOfState,
          patientId: this.patientId,
          userId: this.userId
        };

        this.$store.dispatch("dbGetMultiStateMyRecommendationsInSM", params);
        this.$store.dispatch("dbGetMultiStateOtherRecommendationsInSM", params);
      }
    }
  }
};
</script>

<style lang="css">
</style>