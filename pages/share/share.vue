<template>
  <view class="index">
    <image class="share-bgi"
           src="/static/share-bgi.png"></image>
    <view class="box">
      <!-- <image class="share-head"
             src="/static/share-head.png"></image> -->
      <canvas canvas-id="qrcode"
              style="width: 400rpx;height: 400rpx; margin: 80rpx auto 40rpx;" />
      <view class="footer">
        <view class="in">您的邀请码</view>
        <view class="id">{{id}}</view>
        <view class="ex">推广信息</view>
        <view class="info">{{info}}</view>
        <view class="link">链接地址</view>
        <view class="links">{{link}}</view>
        <view class="content">
          <view @click="copy">复制</view>
          <view @click="open">打开</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uQRCode from '../../uqrcode.js'
export default {
  data () {
    return {
      id: '',
      info: '',
      link: '',
      qrcodeSrc: '',
      qrcodeSize: uni.upx2px(400),
    };
  },
  onLoad () {
    this.id = uni.getStorageSync('id');
    this.coupon()
    // this.link = 'https://portal.gup-go.club/#/pages/login/login?referrer=' + this.id
    this.link = this.$config.url.share + '/pages/login/login?referrer=' + this.id,
      this.make()
  },
  methods: {
    make () {
      uni.showLoading({
        title: '二维码生成中',
        mask: true
      })
      uQRCode.make({
        canvasId: 'qrcode',
        text: 'https://portal.gup-go.club/#/pages/login/login?referrer=' + this.id,
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
    async coupon () {
      let res = await this.$api.api.coupons()
      this.info = res.data.data.buseiness
    },
    open () {
      uni.navigateTo({
        url: '/pages/register/register?referrer=' + this.id
      });
    },
    copy () {
      // let result = 'https://portal.gup-go.club/#/pages/login/login?referrer=' + this.id
      let result = this.$config.url.share + '#/pages/login/login?referrer=' + this.id
      // let result = 'http://localhost:8080/#/pages/login/login?referrer=' + this.id
      // let result = 'http://192.168.1.177:8080/#/pages/login/login?referrer=' + this.id
      uni.setClipboardData({
        data: result,
        success: (data) => {
          uni.getClipboardData({
            success: res => {
              this.$api.msg('复制成功')
            }
          })
        }
      })
    }
  },
}
</script>

<style lang="less">
.index {
  .share-bgi {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .share-head {
      // width: 460rpx;
      width: 100%;
      height: 400rpx;
      margin: 30rpx 0;
    }
    .footer {
      padding: 30rpx;
      width: 510rpx;
      height: 640rpx;
      box-shadow: 0rpx 2rpx 7rpx 0rpx #363636;
      background-color: #fff;
      border-radius: 12rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      > view {
        font-weight: 700;
      }
      .in {
        font-size: 26rpx;
      }
      .id {
        font-size: 84rpx;
      }
      .ex {
        font-size: 26rpx;
      }
      .info {
        margin: 20rpx 0;
        font-size: 26rpx;
        font-weight: 400;
      }
      .link {
        font-size: 26rpx;
      }
      .links {
        font-size: 24rpx;
        color: #999999;
        font-weight: 400;
        width: 455rpx;
        height: 56rpx;
        line-height: 56rpx;
        padding: 0 20rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1rpx solid #d8d8d8;
        box-shadow: 0rpx 3rpx 6rpx 0rpx rgba(54, 54, 54, 0.15);
        border-radius: 7rpx;
        margin: 30rpx 0 40rpx 0;
      }
      .content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > view {
          width: 168rpx;
          height: 58rpx;
          line-height: 58rpx;
          text-align: center;
          background-color: #4059ff;
          color: #fff;
          font-size: 30rpx;
          box-shadow: 0rpx 4rpx 5rpx 0rpx rgba(142, 142, 142, 0.57);
          border-radius: 28rpx;
        }
      }
    }
  }
}
</style>
