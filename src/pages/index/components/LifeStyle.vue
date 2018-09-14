<template>
    <div class="life-style" v-if="suggestion.length > 0" >
        <div class="item" v-for="(item,index) of suggestion" :key="index">
            <div class="title">
                <span class="logo"> <text :class="item.icon" /> </span>
                <span class="name" >{{item.title}}</span>
            </div>
            <div class="content">{{item.brf || '暂无'}}</div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "LifeStyle",
  props: {
    lifeStyle: Array
  },
  data() {
    return {
      lifeObj: [
        {
          title: "舒适度",
          key: "comf",
          icon: "shushidu"
        },
        {
          title: "穿衣",
          key: "drsg",
          icon: "yifu"
        },
        {
          icon: "ganmaoyaowu",
          title: "感冒",
          key: "flu"
        },
        {
          icon: "yundong",
          title: "运动",
          key: "sport"
        },
        {
          icon: "chuchalvyouchuxing",
          title: "旅游",
          key: "trav"
        },
        {
          title: "紫外线强度",
          key: "uv",
          icon: "qing"
        },
        {
          icon: "che",
          title: "洗车",
          key: "cw"
        },
        {
          title: "污染指数",
          key: "air",
          icon: "wuranyuanguanli"
        }
      ]
    };
  },
  components: {
    Icon
  },
  computed: {
    suggestion() {
      const sg = [];
      const keys = Object.keys(this.lifeStyle);
      if (keys.length) {
        keys.forEach((v, idx) => {
          const key = keys[idx];
          const obj = this.lifeObj.filter(v => v.key === key)[0];
          sg.push({
            icon: `iconfont icon-${obj.icon}`,
            title: obj.title,
            brf: this.lifeStyle[key].brf
          });
        });
      }
      return sg;
    }
  }
};
</script>

<style lang="less" scoped>
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
      height: 30rpx;
      line-height: 30rpx;
      & > span:first-child {
        font-size: 22rpx;
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


