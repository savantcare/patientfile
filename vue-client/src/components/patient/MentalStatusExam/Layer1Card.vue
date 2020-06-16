 <template>
  <el-card
    class="box-card"
    :id="`recommendation-${typeOfStateDisplayArea}`"
    :style="typeOfStateDisplayAreaSpecificStyleToApply"
  >
    <div slot="header" class="clearfix">
      <CardHeader
        ctName="Mental status exam"
        actions="M,F,R"
        ref="card_header"
        keyId="mental_status_exam"
        :typeOfStateDisplayArea="typeOfStateDisplayArea"
        @handleClickOnMInCardHeader="handleClickOnMInCardHeader"
        @handleClickOnFInCardHeader="handleClickOnFInCardHeader"
        :typeOfStateDisplayAreaSpecificStyleToApply="typeOfStateDisplayAreaSpecificStyleToApply"
      />
    </div>
    <el-tabs tab-position="left">
      <el-tab-pane label="Appearence">
        Good grooming and heigine
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleAppearenceChangeButton">Change</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Thought process">
        Lniear, logical and goal directed
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleThoughtProcessChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Attitude">
        Attitude
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Constitutional">
        Constitutional
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Psychomotor">
        Psychomotor
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Cognition">
        Cognition
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Eye-contact">
        Eye-contact
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Insight">
        Insight
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Speech">
        Speech
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Judgement">
        Judgement
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Mood / affect">
        Mood / affect
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Impulse control">
        Impulse control
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Thought content">
        Thought content
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Neurological">
        Neurological
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Perception">
        Perception
        <div style="text-align: right;">
          <el-button type="text" size="mini" @click="handleClickChangeButton">Change</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import CardHeader from "@/components/common/CardHeader";
import { RECOMMENDATION_API_URL } from "@/const/others.js";
export default {
  components: {
    CardHeader
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
    handleClickOnMInCardHeader() {
      this.$store.commit("showMultiChangeMSETabInLayer2");
    },
    handleClickChangeButton() {
      this.$store.commit("showChangeMSEElementTabInLayer2", {
        label: this.label,
        type: this.type
      });
    },
    handleAppearenceChangeButton() {
      this.$store.commit("showChangeMSEAppearenceTabInLayer2", {
        label: this.label,
        type: this.type
      });
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

    handleSelectionChange(value) {
      this.$refs.card_header.selected = value;
      this.selectedRows = value;
    },

    updateTableList(tableList) {
      this.$store.commit("setRecommendationTableList", tableList);
    },

    //-------------- Category 4/4: Functions to manage DB changes -----------------------

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
        const timeOfStateDate = new Date(this.timeOfState);
        const today = new Date();
        let isToday = false;
        if (
          timeOfStateDate.getFullYear() == today.getFullYear() &&
          timeOfStateDate.getMonth() == today.getMonth() &&
          timeOfStateDate.getDate() == today.getDate()
        ) {
          isToday = true;
        }

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