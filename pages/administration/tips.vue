<template>
  <view class="index">
    <view class="head">
      <text>备份提示</text>
      <view>获得助记词等于拥有钱包资产所有权</view>
    </view>
    <view class="content">
      <view class="common">
        <text></text>
        <view>助记词由英文单词组成, 请抄写并妥善保管</view>
      </view>
      <view class="common">
        <text></text>
        <view>助记词丢失, 无法找回, 请务必备份助记词</view>
      </view>
    </view>
    <view class="btn"
          @click="openPopup">下一步</view>
    <u-popup v-model="show"
             mode="bottom"
             closeable
             close-icon-pos="top-left"
             border-radius="30">
      <view class="popup-box">
        <view class="title">请勿截屏</view>
        <view class="content">请勿截屏分享和存储, 这将可能被第三方恶意软件收集, 造成资产损失</view>
        <view class="footer"
              @click="goBackups">知道了</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      index: ''
    }
  },
  onLoad (options) {
    this.index = options.index
  },
  methods: {
    goBackups () {
      if (this.show == true) {
        uni.navigateTo({
          url: '/pages/administration/backups?index=' + this.index
        });
      }
    },
    openPopup () {
      this.show = true
    }
  }
}
</script>

<style lang="less">
.index {
  padding: 0 30rpx;
  position: relative;
  .head {
    padding: 100rpx 0 30rpx;
    border-bottom: 1rpx solid #f6f6f6;
    > text {
      font-size: 34rpx;
      font-weight: 600;
    }
    > view {
      color: #bbb;
      margin-top: 20rpx;
    }
  }
  .content {
    .common {
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      > text {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background-color: #bbb;
        margin-right: 20rpx;
      }
      > view {
        color: #aaa;
      }
    }
  }
  .btn {
    font-size: 34rpx;
    position: fixed;
    bottom: 30rpx;
    margin-top: 100rpx;
    // width: 100%;
    width: 690rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    border-radius: 50rpx;
    color: #fff;
    background-color: #415aff;
  }
  .popup-box {
    padding: 30rpx;
    .title {
      font-size: 34rpx;
      font-weight: 600;
      text-align: center;
    }
    .content {
      text-align: center;
      padding: 40rpx 20rpx;
    }
    .footer {
      font-size: 34rpx;
      margin-top: 30rpx;
      width: 690rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #fff;
      background-color: #415aff;
    }
  }
}
</style>
