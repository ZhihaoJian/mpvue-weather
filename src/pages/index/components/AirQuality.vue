<template>
    <div class="air-quality" v-if="air.aqi" >
        <span class="circle" :style="{backgroundColor:aqiColor}" ></span>
        <span class="value">{{air.quality}} {{air.aqi}}</span>
    </div>
</template>

<script>
// 空气质量组件
export default {
  name: "AirQuality",
  props: {
    air: Object,
    aqiColor: ""
  },
  computed: {
    airColor() {
      const aqi = this.air.aqi;
      if (aqi >= 0 && aqi <= 50) {
        this.aqiColor = "#02cb9a";
      } else if (aqi > 50 && aqi <= 100) {
        this.aqiColor = "#90EE90";
      } else {
        this.aqiColor = "#FF4500";
      }
    }
  }
};
</script>

<style lang="less" scoped>
//  空气质量检测
.air-quality {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
  left: 20rpx;
  top: auto;
  height: 28rpx;
  line-height: 28rpx;
  padding: 16rpx 20rpx;
  color: #fff;
  font-size: 28rpx;

  .circle {
    content: " ";
    background-color: green;
    display: inline-block;
    width: 8rpx;
    height: 28rpx;
    border-radius: 4rpx;
    vertical-align: middle;
  }

  .value {
    padding-left: 8rpx;
    vertical-align: middle;
  }
}
</style>


