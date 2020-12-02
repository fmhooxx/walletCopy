<template>
  <view class="index">
    <view class="common"
          @click="goUrl('/pages/transaction/order/user')">
      <view>买家ID</view>
      <view class="common-right">
        <image src="/static/avatar.png"></image>
        <view>13899889888</view>
        <text></text>
      </view>
    </view>
    <view class="common">
      <view>订单号</view>
      <text>200430289983</text>
    </view>
    <view class="common">
      <view>时间</view>
      <text>2020-04-13 13:11:33</text>
    </view>
    <view class="common">
      <view>单价(CNY/USDT)</view>
      <text>1.05</text>
    </view>
    <view class="common">
      <view>总金额(CNY)</view>
      <text>100</text>
    </view>
    <view class="common">
      <view>总数量(USDT)</view>
      <text>200</text>
    </view>
    <view class="common">
      <view>收款账户:</view>
      <text>支付宝</text>
    </view>
    <view class="common">
      <view>状态</view>
      <text>已完成</text>
    </view>
    <view class="pay-type">
      <view class="type-info">
        <view>
          <view>支付宝</view>
          <text>中国大陆地区</text>
        </view>
        <image src="/static/zfb.png"></image>
      </view>
      <view class="type-user">
        <view>
          <view>18929384488</view>
          <text>李梅</text>
        </view>
        <image src="/static/pay-type.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      val: ''
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
.index {
  padding: 0 30rpx;
  .common {
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > view {
      color: #223041;
      font-size: 28rpx;
    }
    > text {
      color: #5e5e5e;
      font-size: 28rpx;
    }
    .common-right {
      display: flex;
      align-items: center;
      > image {
        width: 54rpx;
        height: 54rpx;
        border-radius: 50%;
      }
      > view {
        margin: 0 20rpx;
        font-size: 28rpx;
        color: #5e5e5e;
      }
      > text {
        width: 20rpx;
        height: 20rpx;
        border-bottom: 1rpx solid #939393;
        border-right: 1rpx solid #939393;
        transform: rotate(-45deg);
      }
    }
  }
  .pay-type {
    color: #fff;
    margin: 30rpx auto;
    padding: 30rpx;
    width: 690rpx;
    border-radius: 14rpx;
    background-color: #4f87e2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .type-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > view {
        > view {
          font-size: 34rpx;
          font-weight: bold;
        }
        > text {
          font-size: 26rpx;
        }
      }
      > image {
        width: 56rpx;
        height: 56rpx;
      }
    }
    .type-user {
      margin-top: 44rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > view {
        > view {
          margin-bottom: 26rpx;
        }
      }
      > image {
        width: 64rpx;
        height: 64rpx;
      }
    }
  }
}
</style>
