<template>
    <div class="week-chart" >
        <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId='chart' />
    </div>
</template>

<script>
import * as echarts from "echarts/dist/echarts.simple.min";
import mpvueEcharts from "mpvue-echarts";

export default {
  name: "chart",
  props: {
    weekData: Array
  },
  data() {
    return {
      echarts,
      onInit: this.initChart
    };
  },
  components: { mpvueEcharts },
  methods: {
    formatWeekData() {
      let maxData = [];
      let minData = [];
      let dates = [];

      if (this.weekData.length) {
        for (let item of this.weekData) {
          const { date, tmp } = item;
          dates.push(date);
          maxData.push(tmp.max);
          minData.push(tmp.min);
        }
      }
      return {
        dates,
        maxData,
        minData
      };
    },
    initChart(canvas, width, height = 150) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      const data = this.formatWeekData(this.weekData);
      canvas.setChart(chart);
      const option = {
        title: {
          show: false
        },
        legend: {
          show: false
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          show: false
        },
        yAxis: {
          type: "value",
          show: false
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            smooth: true,
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
              formatter: function({ value }) {
                return `${value}°`;
              }
            },
            itemStyle: {
              color: "#f7a94b"
            },
            lineStyle: {
              color: "#f7a94b",
              width: 3
            },
            data: data.maxData
          },
          {
            name: "最低气温",
            type: "line",
            label: {
              show: true,
              position: "bottom",
              fontSize: 14,
              color: "#fff",
              formatter: function({ value }) {
                return `${value}°`;
              }
            },
            itemStyle: {
              color: "#6dacd9"
            },
            smooth: true,
            lineStyle: {
              color: "#6dacd9",
              width: 3
            },
            data: data.minData
          }
        ]
      };
      chart.setOption(option);

      return chart; // 返回 chart 后可以自动绑定触摸操作
    }
  }
};
</script>

<style lang="less" scoped>
.week-chart {
  width: 100%;
  height: 100%;
}
</style>