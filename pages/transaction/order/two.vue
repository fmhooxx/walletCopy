<template>
  <view class="index">
    <view class="head">
      <view class="head-one"
            @click="goUrl('/pages/transaction/order/three')">
        <view>订单号: 200430289983</view>
        <text>等待对方付款</text>
      </view>
      <view class="head-two"><text></text></view>
    </view>
    <view class="box">
      <view class="pay-box">
        <view class="pay-info">
          <view>收款金额</view>
          <image src="/static/money.png"></image>
        </view>
        <view class="pay-money">
          <view>RMB</view>
          <text>100</text>
        </view>
      </view>
      <view class="pay-type">
        04:52:45
      </view>
      <view class="tips-box">
        此次交易需要手动确认，确认后对方将收到您的收款账户信息；超时未确定订单将取消
      </view>
      <view class="footer">
        <image src="/static/phone.png"></image>
        <view class="footer-text">
          <view class="footer-paid"
                @click="paid">确认收款</view>
          <view class="footer-cancel"
                @click="appeal">申诉</view>
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
    appeal () {
      uni.showModal({
        title: '温馨提示',
        content: '确定申诉?每个订单只有一次的申诉机会',
        confirmColor: '#C34554',
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/transaction/order/appeal'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    paid () {
      uni.showModal({
        title: '温馨提示',
        content: '是否确认收款?',
        confirmColor: '#C34554',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
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
      height: 300rpx;
      width: 690rpx;
      border-radius: 14rpx;
      background-color: #223041;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40rpx;
      font-weight: bold;
    }
    .tips-box {
      margin-bottom: 160rpx;
      color: #737373;
      font-size: 24rpx;
      text-align: center;
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
          color: #fff;
          font-size: 30rpx;
          background-color: #c34554;
        }
        .footer-cancel {
          margin-left: 46rpx;
        }
      }
    }
  }
}
</style>
