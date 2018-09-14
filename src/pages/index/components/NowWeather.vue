<template>
    <div class="now" :style="{paddingTop: statusBarHeight + 'px'}" >
        <location 
          @changeLocation="handleChangeLocation" 
          :address="address" 
        />
        <air-quality :air="air"/>
        <div class="now-weather">
            <div class="temp"  >
                <span class="num" >{{now.tmp}}</span>
                <span class="degree">°</span>
            </div>
        </div>
        <div class="cur-weather">
            <div class="line">
                <!-- <span class="logo"  ><img :src="nowIcon" /></span>  -->
                <span class="logo"><icon :type="nowIcon" /></span>
                <span>{{now.cond.txt}}</span>
            </div>
        </div>
        <div class="inline today">
            <p class="item">{{ humidity }}</p>
            <p class="item">{{now.wind.dir}} {{now.wind.sc}}级</p>
        </div>
        <div class="tips">
            <p>天气太热了，吃个西瓜~</p>
        </div>
        <div v-if="dailyForcast.length > 0" >
          <two-days :df="dailyForcast" />
        </div>
    </div>
</template>

<script>
import { wind, humidity } from "@/utils/index.js";
import Location from "./Location";
import TwoDays from "./TwoDays";
import AirQuality from "./AirQuality";
import Icon from "@/components/Icon";
import { getIcon } from "@/utils/weather";

export default {
  name: "NowWeather",
  props: {
    dailyForcast: Array,
    address: String,
    air: Object,
    now: Object
  },
  data() {
    return {
      statusBarHeight: 0,
      nowIcon: "",
      humidity: "",
      wind: ""
    };
  },
  components: {
    Location,
    Icon,
    TwoDays,
    AirQuality
  },
  methods: {
    handleChangeLocation(newWeather) {
      this.$emit("changeWeather", newWeather);
    },
    getNowWeatherIcon() {
      if (this.now.cond.code) {
        this.nowIcon = getIcon(this.now.cond.code);
      }
      return this;
    },
    getHumidity() {
      this.humidity = humidity(this.now.hum);
      return this;
    },
    //  修正顶部定位的自适应
    getStatusHeaderBar() {
      const self = this;
      wx.getSystemInfo({
        success: info => {
          const { statusBarHeight } = info;
          self.statusBarHeight = statusBarHeight + 12;
        }
      });
      return this;
    }
  },
  mounted() {
    this.getStatusHeaderBar()
      .getNowWeatherIcon()
      .getHumidity();
  }
};
</script>

<style lang="less" scoped>
@import "../../../assests/font/weather-icon.css";
@import "../../../assests/less/_variable.less";

.now {
  position: relative;
  color: #fff;
  font-weight: 500;

  //  当前天气
  .now-weather {
    padding-top: 64rpx;
    text-align: center;
    position: relative;

    .num {
      font-size: 100px;
    }

    .degree {
      position: absolute;
      top: 74rpx;
      font-size: 48px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }

  .today {
    display: flex;
    padding-top: 16rpx;

    .item {
      width: 100%;
      height: 100%;
      font-size: 28rpx;
      border-right: 2rpx solid rgba(255, 255, 255, 0.4);
      &:first-child {
        text-align: right;
        padding-right: 24rpx;
      }
      &:last-child {
        text-align: left;
        padding-left: 24rpx;
        border-right: none;
      }
    }
  }

  .cur-weather,
  .tips {
    text-align: center;
    font-size: 28rpx;
  }

  .cur-weather {
    .logo {
      img {
        width: @icon-size;
        height: @icon-size;
        vertical-align: bottom;
      }
    }
    span {
      vertical-align: middle;
      &:first-child {
        margin-right: 8rpx;
      }
      &:last-child{
        vertical-align: bottom;
        height: 100%;
      }
    }
  }

  .tips {
    padding-top: 16rpx;
  }
}
</style>


