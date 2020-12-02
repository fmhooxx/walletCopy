<template>
  <view class="index">
    <view class="head">
      <view class="head-one"
            @click="goUrl('/pages/transaction/order/three')">
        <view>订单号: 200430289983</view>
        <text>等待您付款</text>
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
      <view class="tips-box">
        <view class="tips-title">
          <view>按上述信息付款后，点击下面已付款按钮</view>
          <view>剩余时间</view>
        </view>
        <view class="tips-time">29:40:33</view>
      </view>
      <view class="footer">
        <image src="/static/phone.png"></image>
        <view class="footer-text">
          <view class="footer-cancel">取消</view>
          <view class="footer-paid"
                @click="paid">已付款</view>
        </view>
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
    },
    paid () {
      uni.showModal({
        title: '温馨提示',
        content: '确定您已向当前订单显示的收款账号付款?',
        confirmColor: '#C34554',
        success: (res) => {
          if (res.confirm) {
            this.goUrl('/pages/transaction/order/buySu')
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
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
        color: #223041;
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
        border-bottom: 1rpx solid #939393;
        border-right: 1rpx solid #939393;
        transform: rotate(-45deg);
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
    .tips-box {
      padding: 50rpx 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .tips-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        > view {
          color: #737373;
          font-size: 24rpx;
          margin: 10rpx 0;
        }
      }
      .tips-time {
        color: #2d2d2d;
        font-size: 44rpx;
        font-weight: bold;
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > image {
        width: 84rpx;
        height: 84rpx;
      }
      .footer-text {
        display: flex;
        align-items: center;
        justify-content: center;
        > view {
          padding: 15rpx 50rpx;
          border-radius: 36rpx;
        }
        .footer-cancel {
          color: #2d2d2d;
          font-size: 30rpx;
          background-color: #fff;
          border: 1rpx solid #3f3f3f;
        }
        .footer-paid {
          margin-left: 46rpx;
          color: #fff;
          font-size: 30rpx;
          background-color: #c34554;
        }
      }
    }
  }
}
</style>
