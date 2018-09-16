<template>
    <scroll-view scroll-x class='hourly'>
        <div class="scrollX">
            <div class="item" v-for="(item,index) of hd" :key="index" >
                <span class="time">{{item.time}}</span>
                <!-- <span class="logo"><img :src="item.icon" /> </span> -->
                <!-- <span class="logo"><icon :type='item.icon' /> </span> -->
                <span class="logo"><text :class="'iconfont icon-' + item.icon" /> </span>
                <span class="temp">{{item.temp}}°</span>
            </div>
        </div>
    </scroll-view>
</template>

<script>
import { getIcon } from "@/utils/weather";
import Icon from "@/components/Icon";

// 未来24小时天气
export default {
  name: "Hourly",
  props: {
    hourlyData: Array
  },
  components: {
    Icon
  },
  methods: {
    formatTime(date) {
      return date.split(" ")[1];
    }
  },
  computed: {
    hd() {
      const nhd = [];
      for (const item of this.hourlyData) {
        nhd.push({
          time: this.formatTime(item.date),
          icon: getIcon(item.cond.code),
          temp: item.tmp
        });
      }
      return nhd;
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../../assests/less/_mixins.less";
@import "../../../assests/less/_variable.less";
.hourly {
  font-size: 28rpx;
  text-align: center;
  .scrollX {
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    position: relative;
    width: 928rpx;
    padding: 40rpx 0;
  }
  .item {
    .flex-column();
    width: 116rpx;

    .logo {
      padding: 16rpx 0;
      img {
        width: @icon-size;
        height: @icon-size;
      }
    }
  }
}
</style>


