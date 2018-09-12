<template>
    <div class="location" @click.prevent="handleChooseLocation" >
        <text class="icon icon-dingwei" ></text>
        <text>{{location}}</text>
    </div>
</template>

<script>
// 顶部定位组件
import Icon from "@/components/Icon";
import { getWeather } from "@/utils/weather";
import {
  getRealLocation,
  wx_showLoading,
  wx_hideLoading,
  wx_showToast,
  wx_chooseLocation,
  wx_getLocation
} from "@/utils/wx";

export default {
  name: "Location",
  props: ["address"],
  data() {
    return {
      location: this.address
    };
  },
  components: {
    Icon
  },
  methods: {
    //用户手动更新定位
    updateLocation(lat, lng) {
      wx_showLoading();
      //同步全局经纬度
      this.$store.dispatch("setGecoder", { lat, lng });

      //定位更新后，更新天气和aqi指数
      getRealLocation(lat, lng)
        .then(data => {
          const { formatted_addresses } = data;
          this.location = formatted_addresses.recommend;
          wx_hideLoading();
        })
        .then(() => {
          return getWeather(lat, lng);
        })
        .then(res => {
          this.$emit("changeLocation", res);
        })
        
    },
    //用户手动更新定位
    handleChooseLocation() {
      wx_chooseLocation.call(this, ({ name, address, latitude, longitude }) => {
        const preLat = this.$store.state.lat;
        const preLng = this.$store.state.lng;
        if (preLat === latitude && preLng === longitude) {
          return;
        } else {
          this.updateLocation(latitude, longitude);
          //同步全局经纬度，如果更新了地理位置则重新发其天气请求
          this.$store.dispatch("setGecoder", { lat: latitude, lng: longitude });
        }
      });
    },
    //自动定位
    getLocation() {
      wx_showLoading();
      wx_getLocation.call(this, ({ data, lat, lng }) => {
        const { formatted_addresses } = data;
        //同步全局经纬度
        this.$store.dispatch("setGecoder", { lat, lng });
        this.location = formatted_addresses.recommend;
      });
    }
  },
  mounted() {
    // this.getLocation();
  }
};
</script>

<style lang="less" scoped>
@import "../../../assests/font/icon.css";
@import "../../../assests/font/weather-icon.css";

.location {
  text-align: center;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 200rpx;
}
</style>


