<template>
  <view class="index">
    <view class="head">
      <view class="head-one">
        <view>订单号: 200430289983</view>
        <text>已完成</text>
      </view>
      <view class="head-two"><text></text></view>
    </view>
    <view class="box">
      <view class="pay-box">
        <view class="pay-info">
          <view>支付宝</view>
          <image src="/static/pay3.png"></image>
        </view>
        <view class="pay-money">
          <view>RMB</view>
          <text>100</text>
        </view>
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
      <view class="tips">该交易已完成，您依然可以通过下方按钮联系该用户</view>
      <view class="footer">
        <image src="/static/phone.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  methods: {
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    }
  },
}
</script>

<style lang="less">
.index {
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 0 30rpx 30rpx;
    .head-one {
      flex: 8;
      display: flex;
      flex-direction: column;
      > view {
        color: #223041;
        font-size: 28rpx;
      }
      > text {
        color: #c34554;
        font-size: 28rpx;
        font-weight: bold;
        margin-top: 18rpx;
      }
    }
    .head-two {
      flex: 1;
      display: flex;
      align-items: center;
      > text {
        width: 20rpx;
        height: 20rpx;
        // border-bottom: 1rpx solid #939393;
        // border-right: 1rpx solid #939393;
        // transform: rotate(-45deg);
      }
    }
  }
  .box {
    padding: 0 30rpx;
    .pay-box {
      margin: auto;
      width: 690rpx;
      background: #223041;
      border-radius: 14rpx;
      padding: 33rpx;
      .pay-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > view {
          color: #fff;
          font-size: 28rpx;
          font-weight: 500;
        }
        > image {
          width: 50rpx;
          height: 50rpx;
        }
      }
      .pay-money {
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        > view {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80rpx;
          height: 37rpx;
          border-radius: 10rpx;
          border: 1rpx solid #979797;
          font-size: 24rpx;
        }
        > text {
          font-size: 40rpx;
          font-weight: 500;
          margin-left: 16rpx;
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
    .tips {
      width: 690rpx;
      // height: 48rpx;
      color: #a0a0a0;
      font-size: 24rpx;
      padding: 10rpx 0;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f6f6f6;
    }
    .footer {
      margin: 200rpx auto;
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      > image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
