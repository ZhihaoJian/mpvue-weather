<template>
  <div class='wrapper' :style="{'background-image': 'url(' + bgImg + ')' }" >
    <div v-if="hasData" >
      <div class='container' id='canvas-wrapper' >
        <!-- 实时天气模块 -->
        <!-- <canvas canvas-id='effect' id='effect' ></canvas> -->
        <now-weather 
          :air='weatherData.air' 
          :now='weatherData.now' 
          :address="address"
          :dailyForcast="weatherData.dailyForcast"
          @changeWeather="handleChangeWeather"
        />
      </div>
      <div class='weather'>
        <div class='container'>
          <!-- 24小时天气 -->
          <Hourly :hourlyData="weatherData.hourlyData" />
        </div>
        <div class='container'>
            <!-- 七天天气 -->
            <week-weather :dailyForcast="weatherData.dailyForcast" />
        </div>
        <div class='container'>
            <!-- 生活指数 -->
            <life-style :lifeStyle='weatherData.lifeStyle'/>
        </div>
      </div>
      <!-- 页脚 -->
      <footer-component :updateTime='weatherData.basic.update.loc' />
    </div>
  </div>  
</template>

<script>
import NowWeather from "./components/NowWeather";
import Hourly from "./components/Hourly";
import LifeStyle from "./components/LifeStyle";
import WeekWeather from "./components/WeekWeather";
import FooterComponent from "./components/Footer";
import {
  getWeather,
  RainEffect,
  wx_setStorage,
  wx_getStorage
} from "@/utils/weather";
import {
  wx_getLocation,
  onShareAppMessage,
  wx_showLoading,
  wx_hideLoading
} from "@/utils/wx";

export default {
  name: "index",
  data() {
    return {
      address: "",
      hasData: false,
      bgImg: "",
      weatherData: {
        basic: {},
        air: {},
        now: {},
        dailyForcast: [],
        hourlyData: [],
        lifeStyle: []
      }
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
    // 京东万象 天气API
    // suggestion --> 生活指数
    // aqi  ---> 实时空气质量检测
    // daily_forecast --> 未来七天天气
    // hourly_forecast --> 未来12H 天气
    // now --> 实时天气
    updateWeatherData(data) {
      const {
        aqi,
        basic,
        daily_forecast,
        hourly_forecast,
        now,
        suggestion
      } = data;
      const newData = {
        air: aqi,
        basic,
        dailyForcast: daily_forecast,
        hourlyData: hourly_forecast,
        now,
        lifeStyle: suggestion
      };
      this.weatherData = newData;
      this.changeBackgroundByTime(daily_forecast[0].astro);
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
          wx_showLoading("正在准备数据中...");
          self.updateWeatherData(data);
          setTimeout(() => {
            wx_hideLoading();
          }, 1000);
        });
      });

      return this;
    },
    //根据日出日落时间更换背景
    changeBackgroundByTime(astro) {
      if (!astro || typeof astro !== "object") {
        console.warn("astro should be a object");
        return;
      }
      const date = new Date();
      const { sr, ss } = astro;
      const currentHour = date.getHours(),
        bg = {
          morning:
            "https://lg-1vfjv3uu-1257634410.cos.ap-shanghai.myqcloud.com/morning.jpeg",
          night:
            "https://lg-1vfjv3uu-1257634410.cos.ap-shanghai.myqcloud.com/night.jpg"
        };
      const srHour = parseInt(sr.split(":")[0]),
        ssHour = parseInt(ss.split(":")[0]),
        ref = this.$refs.wrapper;
      if (currentHour >= srHour && currentHour < ssHour) {
        this.bgImg = bg.morning;
      } else {
        this.bgImg = bg.night;
      }
    },
    //绘制雨天效果
    openEffect() {
      const canvasid = "effect";
      const ctx = wx.createCanvasContext(canvasid);
      const width = 350;
      let height = 768 / 2 * 0.3;
      let rain = new RainEffect(ctx, width, height, {
        amount: 100,
        speedFactor: 0.03
      });
      rain.run();
    }
  },
  mounted() {
    this.getLocation();
    // this.openEffect
  },
  onPullDownRefresh() {
    const { lat, lng } = this.$store.state;
    getWeather(lat, lng).then(data => {
      this.updateWeatherData(data);
      wx.stopPullDownRefresh();
    });
  },
  //分享事件触发
  onShareAppMessage({ from, target, webViewUrl }) {
    if (this.hasData) {
      const address = this.address;
      const { lat, lng } = this.$store.state;
      return {
        title: `「${address}」现在天气情况，快打开看看吧！`,
        path: `/page/index?lat=${lat}&lng=${lng}`
      };
    } else {
      return {
        title: "我发现一个好玩的天气小程序，分享给你看看！",
        path: "/page/index"
      };
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assests/less/_variable.less";

@bgColor: "#62aadc";
// @bgImg: "https://lg-1vfjv3uu-1257634410.cos.ap-shanghai.myqcloud.com/night.jpg";

.wrapper {
  // background-image: url(@bgImg);
  background-position: center center;
  background-color: @bgColor;
  background-size: cover;
  min-height: 100vh;

  .container {
    position: relative;
    margin-bottom: @grid-margin;
    min-width: 750rpx;
    box-sizing: border-box;
    color: #fff;

    #effect {
      width: 750rpx;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }

  .weather {
    background-color: @bgColor;
  }
}
</style>



