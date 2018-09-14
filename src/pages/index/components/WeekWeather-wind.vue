<template>
    <div class="week-weather-wind" >
        <div class="wind">{{item.wind.dir}}</div>
        <div class="wind wind-sc " v-if="item.wind.sc" >{{item.wind.sc}}级</div>
        <div class="wind" v-else></div>
    </div>
</template>

<script>
import { wind, windLevel } from "@/utils/index";
export default {
  name: "WeekWeatherWind",
  props: ["item"],
  data() {
    return {
      windStr: "",
      windLevel: ""
    };
  },
  methods: {
    getWind() {
      this.windStr = wind(this.item.wind.dir);
      return this;
    },
    getWindLevel() {
      this.windLevel = windLevel(this.item.wind.sc);
      return this;
    }
  },
  mounted() {
    this.getWind().getWindLevel();
  }
};
</script>

<style lang="less" scoped>
.week-weather-wind {
  font-size: 24rpx;
  display: flex;
  flex-direction: column;

  .wind-sc{
    margin-top: 5px;
  }
}
</style>


