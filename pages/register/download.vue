<template>
  <view class="index">
    <view class="box">
      <view class="head">
        <image src="/static/login.png"></image>
        <view>FHC</view>
      </view>
      <view class="btn"
            @click="download">点击下载</view>
    </view>
    <!-- 遮罩层 -->
    <u-mask :show="show"
            @click="show = false">
      <view class="mask">
        <image src="/static/tips.png"></image>
      </view>
    </u-mask>
  </view>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
      show: false,
      browser: ''
    };
  },
  onLoad () {
    this.flag = uni.getStorageSync('isWeixin')
    this.browser = uni.getStorageSync('browser')
  },
  methods: {
    download () {
      if (this.flag) {
        if (this.browser == 'IOS') {
          window.location.href = "https://testflight.apple.com/join/y2kma5Fn"
        } else if (this.browser == 'Android') {
          this.show = true
        }
      } else {
        if (this.browser == 'IOS') {
          window.location.href = "https://testflight.apple.com/join/y2kma5Fn"
        } else if (this.browser == 'Android') {
          window.location.href = "https://im-1302325494.cos.ap-nanjing.myqcloud.com/wallet/FHC.apk"
        }
      }
      // if (this.flag) {
      //   this.show = true
      // } else {
      //   if (this.browser == 'IOS') {
      //     window.location.href = "https://testflight.apple.com/join/EnQ4WvVx"
      //   } else if (this.browser == 'Android') {
      //     window.location.href = "https://im-1302325494.cos.ap-nanjing.myqcloud.com/wallet/GFC.apk"
      //   }
      // }
    }
  },
}
</script>

<style lang="less">
.index {
  .box {
    padding: 0 30rpx;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    .head {
      margin: 30rpx 0;
      text-align: center;
      > image {
        width: 120rpx;
        height: 120rpx;
      }
    }
    .btn {
      text-decoration: none;
      display: inline-block;
      font-size: 34rpx;
      margin-top: 60rpx;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #fff;
      background-color: #415aff;
    }
  }
  .mask {
    // width: 100%;
    // height: 100%;
    position: fixed;
    top: 0;
    left: 55%;
    transform: translateX(-50%);
    // background-color: #fff;
    // padding: 30rpx;
    border-radius: 10rpx;
    > image {
      border-radius: 10rpx;
    }
  }
}
</style>
