<template>
    <scroll-view scroll-x class='hourly'>
        <div class="scrollX">
            <div class="item" v-for="(item,index) of hd" :key="index" >
                <span class="time">{{item.time}}</span>
                <span class="logo"><img :src="item.icon" /> </span>
                <span class="temp">{{item.temp}}°</span>
            </div>
        </div>
    </scroll-view>
</template>

<script>
import { getIcon } from "@/utils/weather";
// 未来24小时天气
export default {
  name: "Hourly",
  props: {
    hourlyData: Array
  },
  computed: {
    hd() {
      const nhd = [];
      for (const item of this.hourlyData) {
        nhd.push({
          time: item.time,
          icon: getIcon(item.img),
          temp: item.temp
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


