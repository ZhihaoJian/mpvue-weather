<template>
    <div class="two-days" >
        <div class="item">
            <div class="top">
                <span class="date">今天</span>
                <span class="temp">{{ today.tmp.min }}/{{ today.tmp.max }}°</span>
            </div>
            <div class="bottom">
                <span>{{ today.cond.txt_d }}</span>
                <!-- <span class="logo"  ><img :src="todayIcon" /> </span> -->
                <!-- <span class="logo"> <icon :type='todayIcon' /> </span> -->
                <span class="logo"> <text :class="'iconfont icon-'+todayIcon" /> </span>
            </div>
        </div>
        <div class="item">
            <div class="top">
                <span class="date">明天</span>
                <span class="temp">{{ tomorrow.tmp.min }}/{{ tomorrow.tmp.max }}°</span>
            </div>
            <div class="bottom">
                <span>{{ tomorrow.cond.txt_d }}</span>
                <!-- <span class="logo" ><img :src="tomorrowIcon" /> </span> -->
                <!-- <span class="logo"><icon :type='tomorrowIcon' /></span> -->
                <span class="logo"><text :class="'iconfont icon-' + tomorrowIcon" /> </span>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon";
import { getIcon } from "@/utils/weather";

export default {
  name: "TwoDays",
  props: {
    df: Array
  },
  data() {
    return {
      today: this.df[0],
      tomorrow: this.df[1],
      todayIcon: "",
      tomorrowIcon: ""
    };
  },
  methods: {
    getWeatherIcon() {
      if (this.df.length > 0) {
        this.todayIcon = getIcon(this.today.cond.code_d);
        this.tomorrowIcon = getIcon(this.tomorrow.cond.code_d);
      }
    }
  },
  watch: {
    df(newDf) {
      this.today = newDf[0];
      this.tomorrow = newDf[1];
      this.getWeatherIcon();
    }
  },
  components: {
    Icon
  }
};
</script>

<style lang="less" scoped>
@import "../../../assests/less/_variable.less";

// 今明两天天气
.two-days {
  display: flex;
  justify-content: center;
  padding: 16rpx 20rpx 0 16rpx;
  font-size: 28rpx;
  .item {
    width: 100%;
    padding: 0 24rpx;
    border-right: 2rpx solid rgba(255, 255, 255, 0.4);
    &:last-child {
      border-right: none;
    }
    & > div {
      padding-top: 8rpx;
    }
    .top,
    .bottom {
      display: flex;
      .temp,
      .logo {
        margin-left: auto;
      }
      .logo {
        img {
          width: @icon-size;
          height: @icon-size;
        }
      }
    }
  }
}
</style>

