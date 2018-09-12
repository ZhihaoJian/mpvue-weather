<template>
  <div class='wrapper'  >
    <div v-if="hasData">
      <div class='container' id='canvas-wrapper' >
        <!-- 实时天气模块 -->
        <now-weather 
          :air='air' 
          :now='now' 
          :address="address"
          :dailyForcast="dailyForcast"
          @changeWeather="handleChangeWeather"
        />
      </div>
      <div class='weather'>
        <div class='container'>
          <!-- 24小时天气 -->
          <Hourly :hourlyData="hourlyData" />
        </div>
        <div class='container'>
            <!-- 七天天气 -->
            <week-weather :dailyForcast="dailyForcast" />
        </div>
        <div class='container'>
            <!-- 生活指数 -->
            <life-style :lifeStyle='lifeStyle'/>
        </div>
      </div>
      <!-- 页脚 -->
      <footer-component :updateTime='now.updatetime' />
    </div>
  </div>  
</template>

<script>
import NowWeather from "./components/NowWeather";
import Hourly from "./components/Hourly";
import LifeStyle from "./components/LifeStyle";
import WeekWeather from "./components/WeekWeather";
import FooterComponent from "./components/Footer";
import { getWeather } from "@/utils/weather";
import { wx_getLocation } from "@/utils/wx";

export default {
  name: "index",
  data() {
    return {
      address: "",
      air: {},
      now: {},
      dailyForcast: [],
      hourlyData: [],
      lifeStyle: [],
      hasData: false,
      dayBgImg:
        "http://imglf1.ph.126.net/EVOVT1if0Jsi0gDDwwmx9A==/1795528876537542778.jpg",
      nightBgImg:
        "http://imglf1.ph.126.net/jTenCRi36IDvCu8hMmtBZw==/6608758674771048763.jpg"
    };
  },
  components: {
    NowWeather,
    Hourly,
    LifeStyle,
    WeekWeather,
    FooterComponent
  },
  methods: {
    // 极速数据 天气API
    // index --> 生活指数
    // aqi  ---> 实时空气质量检测
    // daily --> 未来七天天气
    // hourly --> 未来12H 天气
    // restParam --> 实时天气等剩余参数
    updateWeatherData(data) {
      const { index, aqi, daily, hourly, ...restParam } = data;
      this.now = restParam;
      this.air = aqi;
      this.hourlyData = hourly.slice(1, 10);
      this.dailyForcast = daily;
      this.lifeStyle = index;
      this.hasData = true;
    },
    handleChangeWeather(data) {
      this.updateWeatherData(data);
    },
    getLocation() {
      const self = this;

      //根据微信定位获取经纬度后获取AQI和其余天气指数
      wx_getLocation(function({ data, lat, lng }) {
        self.address = data.formatted_addresses.recommend;
        self.$store.dispatch("setGecoder", { lat, lng });
        getWeather(lat, lng).then(data => {
          self.updateWeatherData(data);
        });
      });
    }
  },
  mounted() {
    this.getLocation();
  },
  onPullDownRefresh() {
    const { lat, lng } = this.$store.state;
    getWeather(lat, lng).then(data => {
      this.updateWeatherData(data);
      wx.stopPullDownRefresh();
    });
  }
};
</script>

<style lang='less' scoped>
@import "../../assests/less/_variable.less";

@bgColor: "#62aadc";
@bgImg: "https://raw.githubusercontent.com/ksky521/fresh-weather/master/client/images/cloud.jpg";

.wrapper {
  background-image: url(@bgImg);
  background-position: center center;
  background-color: @bgColor;
  background-size: cover;
  min-height:100vh;

  .container {
    position: relative;
    margin-bottom: @grid-margin;
    min-width: 750rpx;
    box-sizing: border-box;
    color: #fff;
  }

  .weather {
    background-color: @bgColor;
  }
}
</style>



