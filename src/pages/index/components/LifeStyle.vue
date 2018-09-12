<template>
    <div class="life-style" v-if="lifeStyle.length > 0" >
        <div class="item" v-for="(item,index) of lifeStyle" :key="index">
            <div class="title">
                <span class="logo" ><text :class="item.icon" /> </span>
                <span class="name" >{{item.iname}}</span>
            </div>
            <div class="content">{{item.ivalue}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LifeStyle",
  props: {
    lifeStyle: Array
  }
};
</script>

<style lang="less" scoped>
@import "../../../assests/font/weather-icon.css";
@import "../../../assests/less/_mixins.less";

.life-style {
  display: flex;
  flex-wrap: wrap;
  font-size: 28rpx;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);

  .item {
    width: 25%;
    height: 188rpx;
    border-right: 2rpx solid rgba(255, 255, 255, 0.1);
    border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    padding: 50rpx 0 0;

    .title {
      .ellipsis();
      color: #fff;
      opacity: 0.7;
      font-size: 24rpx;
      height: 24rpx;
      line-height: 24rpx;
      & > span:first-child {
        font-size: 24rpx;
        margin-right: 10rpx;
        margin-top: -2rpx;
      }
    }

    .content {
      .ellipsis();
      color: #fff;
      font-size: 36rpx;
      margin-top: 20rpx;
    }
  }
}
</style>


