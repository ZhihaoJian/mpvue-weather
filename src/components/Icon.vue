<template>
  <text :class="imgSrc"  />
</template>

<script>
export default {
  name: "Icon",
  props: ["type"],
  data() {
    return {
      imgSrc: `iconfont img icon-${this.type}`
    };
  },
  watch:{
    type(newval){
      this.imgSrc = `iconfont img icon-${newval}`
    }
  }
};
</script>

<style lang="css" scoped>
@import "~@/assests/font/iconfont.css";

.img {
  font-size: 40rpx;
  vertical-align: middle;
}
</style>


