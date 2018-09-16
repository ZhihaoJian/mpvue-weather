<template>
    <div class="week-weather-wind" >
        <div class="wind">{{item.dir}}</div>
        <div class="wind wind-sc " v-if="item.deg !== '-1'" >{{item.sc}}级</div>
        <div class="wind" v-else></div>
    </div>
</template>

<script>
import { wind, windLevel } from "@/utils/index";
export default {
  name: "WeekWeatherWind",
  props: {
    item: Object
  }
};
</script>

<style lang="less" scoped>
.week-weather-wind {
  font-size: 24rpx;
  display: flex;
  flex-direction: column;

  .wind-sc {
    margin-top: 5px;
  }
}
</style>


