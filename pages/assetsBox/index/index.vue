<template>
  <view>
    <view class="head">
      <view>首页资产管理</view>
      <view class="right"></view>
    </view>
    <view class="head">
      <view>我的所有资产</view>
      <view class="right"></view>
    </view>
    <view class="footer">
      <view class="hot">热门资产</view>
      <view class="common">
        <view>比特币</view>
        <image src="/static/plus-asset.png"></image>
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
  onLoad (options) {
    console.log(options)
  },
  methods: {

  },
}
</script>

<style>
page {
  background-color: #f6f6f6;
}
</style>
<style lang="less">
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20rpx 30rpx;
  .right {
    width: 20rpx;
    height: 20rpx;
    border-right: 1rpx solid #a4a6aa;
    border-bottom: 1rpx solid #a4a6aa;
    transform: rotate(-45deg);
  }
  border-bottom: 1rpx solid #f6f6f6;
}
.footer {
  margin-top: 30rpx;
  background-color: #fff;
  padding: 20rpx 0 0 30rpx;
  .hot {
    font-size: 28rpx;
  }
  .common {
    padding-right: 30rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #f6f6f6;
    border-bottom: 1rpx solid red;
    > image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
