<template>
  <view class="index">
    <view class="header"
          @click="goUrl('/pages/transaction/order/user')">
      <view class="header-left">
        <view class="header-common">
          <view class="common common-left">
            <view class="header-uname">快捷商名称</view>
            <view>0</view>
            <view>0</view>
          </view>
          <view class="common common-right">
            <view>近30日成交<text>23</text></view>
            <view>近30日申诉</view>
            <view>近30日胜诉</view>
          </view>
        </view>
      </view>
      <view class="header-right">
        <view></view>
      </view>
    </view>
    <view class="content">
      <view class="content-common content-head">
        <view>交易金额</view>
        <view>订单号: 1234354546562243</view>
      </view>
      <view class="content-common content-type">
        <view>14545.33<text>USDT</text></view>
        <text>已完成</text>
      </view>
      <view class="content-num">售出数量: <text>14545.33</text>USDT</view>
      <view class="content-num">售出数量: <text>14545.33</text>USDT</view>
    </view>
    <view class="footer">
      <view class="footer-box">
        <view class="footer-content">
          <image src="/static/tr-success.png"></image>
          <view>订单交易完成</view>
          <text>如该订单有疑问可联系现在客服</text>
        </view>
      </view>
    </view>
    <view class="end">
      <view class="end-common">
        <image src="/static/contact.png"></image>
        <view>联系卖家</view>
      </view>
      <view @click="goReturn">返回交易列表</view>
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
    goReturn () {
      uni.navigateBack({
        delta: 1
      })
    }
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="less">
.index {
  /deep/.u-drawer {
    top: 162rpx;
  }
  .header {
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 20rpx;
    .header-left {
      flex: 9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-common {
        width: 100%;
        display: flex;
        flex-direction: column;
        .common {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > view {
            flex: 1;
            text-align: center;
          }
        }
        .common-left {
          .header-uname {
            color: #223041;
            font-size: 36rpx;
            font-weight: bold;
          }
          > view {
            color: #223041;
            font-size: 28rpx;
            font-weight: bold;
          }
        }
        .common-right {
          margin-top: 20rpx;
          > view {
            color: #aeaeae;
            font-size: 28rpx;
            font-weight: bold;
            > text {
              margin-left: 20rpx;
              color: #223041;
              font-size: 28rpx;
              font-weight: bold;
            }
          }
        }
      }
    }
    .header-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > view {
        width: 26rpx;
        height: 26rpx;
        border-bottom: 1rpx solid #000;
        border-right: 1rpx solid #000;
        transform: rotate(-45deg);
      }
    }
  }
  .content {
    padding: 30rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    .content-common {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10rpx;
    }
    .content-head {
      > view {
        color: #aeaeae;
        font-size: 28rpx;
        font-weight: 500;
      }
    }
    .content-type {
      > view {
        color: #c34554;
        font-size: 28rpx;
        font-weight: 500;
        > text {
          margin-left: 10rpx;
          color: #aeaeae;
          font-size: 28rpx;
          font-weight: 500;
        }
      }
      > text {
        color: #52b88a;
        font-size: 28rpx;
      }
    }
    .content-num {
      margin-top: 10rpx;
      color: #aeaeae;
      font-size: 28rpx;
      font-weight: 500;
      > text {
        margin: 0 10rpx;
        color: #223041;
        font-size: 28rpx;
        font-weight: 500;
      }
    }
  }
  .footer {
    width: 100%;
    height: 642rpx;
    position: relative;
    background-color: #fff;
    .footer-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .footer-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > image {
          width: 87rpx;
          height: 87rpx;
        }
        > view {
          color: #223041;
          font-size: 32rpx;
          font-weight: 600;
          margin: 30rpx 0 20rpx 0;
        }
        > text {
          color: #aeaeae;
          font-size: 26rpx;
        }
      }
    }
  }
  .end {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 124rpx;
    > view {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #4059ff;
      color: #fff;
      font-size: 34rpx;
      font-weight: bold;
    }
    .end-common {
      background-color: #e9ecff;
      > image {
        width: 45rpx;
        height: 45rpx;
        margin-right: 20rpx;
      }
      > view {
        color: #223041;
        font-size: 34rpx;
        font-weight: bold;
      }
    }
  }
}
</style>
