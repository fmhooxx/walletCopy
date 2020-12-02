<template>
  <view>
    <view class="head">
      <view class="head-title">
        <image src="/static/e.png"></image>
        <view class="head-text">
          <view>FHC</view>
          <view>LZC</view>
          <view>BQC</view>
          <view>HUP</view>
        </view>
      </view>
      <view class="head-content">
        <view class="head-one"> HuP.Swap在DEX的无需许可上币和自动化做市的基础上，引入限价单的支持，并通过自带的HuPWallet改善用户交互方式，提供一站式交易体验。作为通用分布式智能聚合交易服务平台，HuP可以部署在任意支持智能合约的区块链平台。</view>
        <view class="head-two">--BY 6TOKEN</view>
      </view>
    </view>
    <view style="height: 600rpx">
      <image src="/static/3.png"></image>
    </view>
    <view style="height: 600rpx">
      <image src="/static/4.png"></image>
    </view>
    <view style="height: 1600rpx;">
      <image src="/static/5.png"></image>
    </view>
    <view class="ecology">
      <view class="ecology-title">主要生态</view>
      <view class="ecology-box"
            v-for="(item, index) in ecologyList"
            :key="index">
        <image :src="item.img"></image>
        <view>{{item.text}}</view>
      </view>
    </view>
    <view class="text-box">
      <view>白皮书</view>
      <view>关于FLC</view>
      <view @click="goUrl('/pages/find/privatePlacement/admission')">入场券</view>
    </view>
    <view style="height: 1000rpx;">
      <image src="/static/8.png"></image>
    </view>
    <view>
      <image src="/static/9.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      ecologyList: [
        {
          id: 0,
          img: '/static/e1.png',
          text: '匿名聊天，内容加密为主要功能的聊天软件'
        },
        {
          id: 1,
          img: '/static/e2.png',
          text: '去中心化的交易市场，更加注重私人资产'
        },
        {
          id: 2,
          img: '/static/e3.png',
          text: '资产镜像保护，多一层双盾加密机制'
        },
        {
          id: 3,
          img: '/static/e4.png',
          text: '全球跨境支付清算功能'
        },
        {
          id: 4,
          img: '/static/e5.png',
          text: '移动冷钱包功能，让移动设备随变冷钱包'
        },
        {
          id: 5,
          img: '/static/e6.png',
          text: '共治社区，公平、公正、公开'
        }
      ]
    };
  },
  methods: {
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    },
  },
}
</script>

<style lang="less">
image {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
  height: 100%;
}
.text-box {
  width: 100%;
  height: 240rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #191e23;
  > view {
    padding: 10rpx 40rpx;
    border: 1rpx solid #009dff;
    color: #009dff;
    border-radius: 10rpx;
  }
}
.head {
  .head-title {
    display: flex;
    align-items: center;
    padding: 10rpx 28rpx;
    background-color: #191e23;
    > image {
      width: 80rpx;
      height: 44rpx;
    }
    .head-text {
      display: flex;
      align-items: center;
      > view {
        color: #fff;
        font-size: 34rpx;
        font-weight: 600;
        margin: 0 35rpx;
      }
    }
  }
  .head-content {
    padding: 42rpx;
    background-color: #2e3033;
    color: #fff;
    > view {
      font-size: 30rpx;
    }
    .head-one {
      text-indent: 2em;
      line-height: 1.8;
    }
    .head-two {
      margin-top: 30rpx;
      text-align: center;
    }
  }
}
.ecology {
  padding: 0 50rpx;
  .ecology-title {
    margin: 50rpx 0;
    font-size: 36rpx;
    color: #009eff;
    font-weight: 600;
    text-align: center;
  }
  .ecology-box {
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    > image {
      width: 92rpx;
      height: 92rpx;
      margin-right: 50rpx;
    }
    > view {
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>
