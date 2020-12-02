<template>
  <view class="index">
    <image class="mining-bgi"
           src="https://im-1302325494.cos.ap-nanjing.myqcloud.com/wallet/webDeveloper/mining.gif"></image>
    <!-- <image v-show="flag"
           class="mining-bgi"
           src="/static/stop-mining.png"></image>
    <image v-show="!flag"
           class="mining-bgi"
           src="/static/mining.gif"></image> -->
    <!-- <image v-show="!flag"
           class="mining-bgi"
           src="https://im-1302325494.cos.ap-nanjing.myqcloud.com/wallet/webDeveloper/mining_background_img.gif"></image> -->
    <view class="head-copy">
      <view class="head">
        <view class="head-box">
          <view class="head-common">
            <image src="/static/diamonds.png"></image>
            <view><text>算力</text>{{hashrateGrade}}</view>
          </view>
          <view class="head-common">
            <image src="/static/gold.png"></image>
            <view><text>币</text>{{alreadyToken}}</view>
          </view>
        </view>
        <image @click="cancel"
               src="/static/cancel.png"></image>
      </view>
    </view>
    <view class="footer"
          @click="start">
      <view>{{text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      text: '提取',
      loading: true,
      index: '',
      hashrateGrade: '',
      alreadyToken: ''
    };
  },
  onLoad (options) {
    this.index = options.index
    this.getInfo()
  },
  methods: {
    async getInfo () {
      let res = await this.$api.api.getInfo()
      if (res.data.code == 200) {
        this.hashrateGrade = res.data.data.hashrateGrade1 + res.data.data.hashrateGrade2 + res.data.data.hashrateGrade3
        if (this.index == 0) {
          this.alreadyToken = res.data.data.alreadyTokenA
        } else if (this.index == 1) {
          this.alreadyToken = res.data.data.alreadyTokenB
        } else if (this.index == 2) {
          this.alreadyToken = res.data.data.alreadyTokenC
        } else if (this.index == 3) {
          this.alreadyToken = res.data.data.alreadyTokenD
        }
      }
    },
    cancel () {
      uni.navigateBack({
        delta: 1
      });
    },
    start () {
      if (this.loading == false) {
        return this.$api.msg('请勿连续多次点击')
      }
      this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 3000)
    }
  },
}
</script>

<style lang="less">
.index {
  .mining-bgi {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .head-copy {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      > image {
        width: 40rpx;
        height: 40rpx;
      }
      .head-box {
        display: flex;
        align-items: center;
        .head-common {
          display: flex;
          align-items: center;
          background-color: #415aff;
          padding: 10rpx 20rpx;
          margin: 0 10rpx;
          border-radius: 40rpx;
          > image {
            width: 30rpx;
            height: 30rpx;
          }
          > view {
            font-size: 24rpx;
            color: #ddd;
            > text {
              display: inline-block;
              margin: 0 10rpx;
            }
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #415aff;
    border-radius: 40rpx;
    > view {
      color: #fff;
      width: 220rpx;
      height: 90rpx;
      font-size: 34rpx;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
