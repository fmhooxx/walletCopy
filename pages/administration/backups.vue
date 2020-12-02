<template>
  <view class="index">
    <view class="header">
      <view>备份助记词</view>
      <text>请按顺序抄写助记词, 确保备份正确</text>
    </view>
    <view class="list">
      <view class="item"
            v-for="(item, index) in list"
            :key="index">{{item}}</view>
    </view>
    <view class="footer">
      <view class="common">
        <text></text>
        <view>妥善保管助记词至隔离网络的安全地方</view>
      </view>
      <view class="common">
        <text></text>
        <view>请勿将助记词在联网的环境下分享和存储, 比如邮件、相册、社交应用等.</view>
      </view>
    </view>
    <view class="btn"
          @click="goConfirm">已确认备份</view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
  data () {
    return {
      index: '',
      list: []
    };
  },
  onLoad (options) {
    this.index = options.index
    const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
    const decrypt = CryptoJS.AES.decrypt(uni.getStorageSync('list')[this.index - 1].mnemonic, encryption).toString(CryptoJS.enc.Utf8)
    this.list = decrypt.split(' ')
  },
  onBackPress (options) {
    if (options.from === 'navigateBack') {
      return false;
    }
    this.back();
    return true;
  },
  methods: {
    goConfirm () {
      uni.navigateTo({
        url: '/pages/administration/confirm?index=' + this.index
      });
    },
    back () {
      uni.navigateBack({
        delta: 2
      });
    }
  },
}
</script>

<style>
page {
  background-color: #fafafa;
}
</style>

<style lang="less">
.index {
  position: relative;
  padding: 0 30rpx;
  .header {
    > view {
      font-weight: 600;
      font-size: 34rpx;
    }
    > text {
      color: #aaa;
      display: inline-block;
      margin: 20rpx 0;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      padding: 6rpx;
      box-sizing: content-box;
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 12rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      font-size: 26rpx;
    }
  }
  .footer {
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
    position: fixed;
    bottom: 30rpx;
    margin: 100rpx auto 0;
    width: 690rpx;
    height: 100rpx;
    color: #fff;
    font-weight: 600;
    font-size: 32rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50rpx;
    background-color: #415aff;
  }
}
</style>
