<template>
    <div class="week-weather-wind" >
        <div class="wind">{{windStr}}</div>
        <div class="wind" v-if="item.windpower" >{{windLevel}}</div>
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
      this.windStr = wind(this.item.winddirect);
      return this;
    },
    getWindLevel() {
      this.windLevel = windLevel(this.item.windpower);
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
  display: flex;
  flex-direction: column;
}
</style>


