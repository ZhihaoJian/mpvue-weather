<template>
  <img class="img" :src="imgSrc" />
</template>

<script>
export default {
  name: "Icon",
  props: ["type"],
  data() {
    return {
      imgSrc: `https://cdn.heweather.com/cond_icon/${this.type}.png`
    };
  }
};
</script>

<style lang="css" scoped>

.img {
  width: 50rpx;
  height: 50rpx;
  vertical-align: middle;
}

</style>


