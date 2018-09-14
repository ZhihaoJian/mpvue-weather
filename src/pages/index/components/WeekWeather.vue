<template>
    <div class="week" >
        <div class="week-weather">
            <div class="item" v-for="(item,index) of weeklyData" :key="index" >
                <div class="day">{{item.week}}</div>
                <div class="date">{{item.date}}</div>
                <!-- <div>{{item.txt_d}}</div> -->
                <div class="date-time">
                    <div class="wt">{{item.txt_d}}</div>
                    <!-- <span class="logo"><img :src="item.dayIcon" /></span> -->
                    <span class="logo"><icon :type='item.dayIcon' /></span>
                </div>
                <div class="night">
                    <!-- <span class="logo"><img :src="item.nightIcon" /></span> -->
                    <span class="logo"><icon :type='item.nightIcon' /></span>
                    <div class="wt" >{{item.txt_n}}</div>
                </div>
                <week-weather-wind :item="item" />
            </div>
            <div class="custom-chart" ><chart :weekData="dailyForcast" /></div> 
        </div>
    </div>    
</template>

<script>
// 一周天气数据
import { wind, windLevel, formatDate, formatWeeklyDate } from "@/utils/index";
import Chart from "./Chart";
import { getIcon } from "@/utils/weather";
import WeekWeatherWind from "./WeekWeather-wind";
import Icon from '@/components/Icon';
export default {
  name: "WeekWeather",
  props: {
    dailyForcast: Array
  },
  components: {
    WeekWeatherWind,
    Chart,
    Icon
  },
  computed: {
    weeklyData() {
      const weekData = [];
      for (let i = 0; i < this.dailyForcast.length; i++) {
        const item = this.dailyForcast[i];
        const { tmp, date, cond, wind } = item;
        weekData.push({
          date: formatDate(date),
          week: formatWeeklyDate(i, date),
          txt_d: cond.txt_d,
          txt_n: cond.txt_n,
          tmp,
          dayIcon: getIcon(cond.code_d),
          nightIcon: getIcon(cond.code_n),
          wind
        });
      }
      return weekData;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assests/less/_variable.less";

.week {
  font-size: 28rpx;
  text-align: center;
  padding: 40rpx 0;
  min-height: 710rpx;
  background-color: @card-bg-color;

  .week-weather {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    overflow: hidden;

    .custom-chart {
      position: absolute;
      z-index: 0;
      top: 50%;
      transform: translateY(-40%);
      width: 750rpx;
      height: 440rpx;
    }
  }
  .item {
    width: 107rpx;
    padding: 0 6rpx;
    .date {
      margin: 16rpx 0;
      font-size: 22rpx;
    }
    .date-time {
      margin-bottom: 200rpx;
      .wt {
        margin: 18rpx 0;
      }
    }

    .logo {
      img {
        width: @icon-size;
        height: @icon-size;
      }
    }

    .night {
      margin-top: 32rpx;
      .wt,
      .logo {
        margin: 18rpx 0;
      }
    }
  }
}
</style>


