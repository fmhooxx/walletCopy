<template>
  <view>
    <view class="head">
      <view class="head-left">币种</view>
      <view class="head-right"
            @click="openShow">
        <text>{{active}}</text>
        <image src="/static/lower-arrow.png"></image>
      </view>
    </view>
    <!-- 钱包种类选择 -->
    <u-picker v-model="show"
              @confirm="walletConfirm"
              range-key="text"
              mode="selector"
              :range="walletList"></u-picker>
  </view>
</template>

<script>
export default {
  data () {
    return {
      active: '',
      show: false,
      walletList: [
        {
          id: 0,
          text: 'ETH'
        },
        {
          id: 1,
          text: 'BTC'
        }
      ],
    };
  },
  created () {
    this.active = this.walletList[0].text
    this.$emit('handle', this.active)
  },
  methods: {
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    },
    openShow () {
      this.show = true
    },
    walletConfirm (e) {
      const index = e[0]
      this.active = this.walletList[index].text
      this.$emit('handle', this.active)
    }
  }
}
</script>

<style lang="less">
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
</style>
