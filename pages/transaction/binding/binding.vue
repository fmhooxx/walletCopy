<template>
  <view class="index">
    <view class="common"
          @click="goOther(index)"
          v-for="(item, index) in list"
          :key="index">
      <view class="common-left">{{item.text}}</view>
      <view class="common-right">
        <text>未绑定</text>
        <view></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          id: 0,
          text: '银行卡'
        },
        {
          id: 1,
          text: '微信'
        },
        {
          id: 2,
          text: '支付宝'
        }
      ]
    };
  },
  methods: {
    goOther (index) {
      if (index == 0) {
        return this.goUrl('/pages/transaction/binding/bankCard')
      }
      if (index == 1) {
        return this.goUrl('/pages/transaction/binding/weiXin')
      }
      if (index == 2) {
        return this.goUrl('/pages/transaction/binding/zhiFuBao')
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
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
  .common {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    .common-left {
      color: #223041;
      font-size: 28rpx;
      font-weight: bold;
    }
    .common-right {
      display: flex;
      align-items: center;
      justify-content: center;
      > text {
        color: #aeaeae;
        font-size: 28rpx;
      }
      > view {
        margin-left: 10rpx;
        width: 20rpx;
        height: 20rpx;
        border-bottom: 1rpx solid #a4a4a4;
        border-right: 1rpx solid #a4a4a4;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
