<template>
  <view class="index">
    <view class="head">
      <view class="head-left">钱包名称</view>
      <view class="head-right"
            @click="openShow">
        <text>{{active}}</text>
        <image src="/static/lower-arrow.png"></image>
      </view>
    </view>
    <u-picker v-model="show"
              @confirm="walletConfirm"
              range-key="walletUname"
              mode="selector"
              :range="walletList"></u-picker>
    <view class="code">
      <canvas canvas-id="qrcode"
              style="width: 500rpx;height: 500rpx;" />
      <view>{{address}}</view>
    </view>
    <view class="copy"
          @click="copy">复制地址</view>
  </view>
</template>

<script>
import uQRCode from '../../uqrcode.js'
export default {
  data () {
    return {
      show: false,
      walletList: [],
      active: '',
      address: '',
      qrcodeSrc: '',
      qrcodeSize: uni.upx2px(500),
      current: ''
    };
  },
  onLoad (options) {
    this.current = options.current
    if (options.current == undefined || options.current == '') {
      this.walletList = uni.getStorageSync('list')
      if (this.walletList.length != 0) {
        this.active = this.walletList[0].walletUname
        this.address = this.walletList[0].address
        this.make()
      }
    } else {
      this.walletList = uni.getStorageSync('list')
      if (this.walletList.length != 0) {
        this.active = this.walletList[this.current - 1].walletUname
        this.address = this.walletList[this.current - 1].address
        this.make()
      }
    }
  },
  methods: {
    make () {
      uni.showLoading({
        title: '二维码生成中',
        mask: true
      })
      uQRCode.make({
        canvasId: 'qrcode',
        text: this.address,
        size: this.qrcodeSize,
        margin: 10,
        success: res => {
          this.qrcodeSrc = res
        },
        complete: () => {
          uni.hideLoading()
        }
      })
    },
    openShow () {
      this.show = true
    },
    walletConfirm (e) {
      const index = e[0]
      this.active = this.walletList[index].walletUname
      this.address = this.walletList[index].address
      this.make()
    },
    copy () {
      uni.setClipboardData({
        data: this.address,
        success: (data) => {
          uni.getClipboardData({
            success: res => {
              this.$api.msg('复制成功')
            }
          })
        }
      })
    }
  }
}
</script>

<style>
page {
  background-color: #415aff;
}
</style>

<style lang="less">
.index {
  padding: 1rpx 30rpx;
  .head {
    width: 690rpx;
    height: 140rpx;
    border-radius: 20rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30rpx 0;
    .head-left {
      font-size: 34rpx;
      font-weight: 600;
    }
    .head-right {
      display: flex;
      align-items: center;
      > text {
        font-size: 34rpx;
        font-weight: 600;
        color: #fb2503;
      }
      > image {
        margin-left: 40rpx;
        width: 30rpx;
        height: 20rpx;
      }
    }
  }
  .code {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 90rpx;
    border-radius: 40rpx;
    > image {
      width: 300rpx;
      height: 300rpx;
    }
    > view {
      word-wrap: break-word;
      word-break: normal;
      width: 400rpx;
    }
  }
  .copy {
    width: 500rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 45rpx;
    text-align: center;
    background-color: #fff;
    margin: 60rpx auto;
    font-weight: 600;
  }
}
</style>
