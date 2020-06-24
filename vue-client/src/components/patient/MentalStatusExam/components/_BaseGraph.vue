<template>
  <apexchart
    type="heatmap"
    height="350"
    :options="chartOptions"
    :series="series"
    v-if="series.length > 0"
  ></apexchart>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        colors: ["#008000"],
        xaxis: {
          type: "category"
        },
        title: {
          text: ""
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>