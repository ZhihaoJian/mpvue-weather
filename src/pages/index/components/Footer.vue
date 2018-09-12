<template>
    <div class="footer">
        <text class="content" >更新时间 : {{updateTime}}</text>
    </div>
</template>

<script>
export default {
  name: "FooterComponent",
  props: {
    updateTime: String
  }
};
</script>

<style lang="less" scoped>
.footer {
  font-size: 22rpx;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  height: 100rpx;
  .content {
    display: block;
    height: 100rpx;
    line-height: 100rpx;
  }
}
</style>
