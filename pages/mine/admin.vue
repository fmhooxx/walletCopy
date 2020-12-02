<template>
  <view class="index">
    <view class="head">
      <view class="head-title">
        <view style="flex: 1">币种</view>
        <text></text>
        <view style="flex: 2">活跃数量</view>
        <text></text>
        <view style="flex: 2">锁仓数量</view>
      </view>
      <view class="head-content">
        <view class="common">
          <view style="flex: 1">{{token.current}}</view>
          <view style="flex: 2">{{token.token}}</view>
          <view style="flex: 2">{{token.freezeToken}}</view>
        </view>
      </view>
    </view>
    <view class="head">
      <view class="head-title">
        <view style="flex: 1">币种</view>
        <text></text>
        <view style="flex: 2">昨日产矿</view>
        <text></text>
        <view style="flex: 2">累计矿产</view>
      </view>
      <view class="head-content">
        <view class="common"
              v-for="(item, index) in list"
              :key="index">
          <view style="flex: 1">{{item.currency}}</view>
          <view style="flex: 2">{{item.yesterday | yesterdays}}</view>
          <view style="flex: 2">{{item.cumulative}}</view>
        </view>
      </view>
    </view>
    <view class="footer-copy"></view>
    <view class="footer">
      <view class="footer-box">
        <view @click="goMine">矿池首页</view>
        <view>OTC矿物市场</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      head: [
        {
          id: 0,
          currency: 'FHC',
          active: '2000000.1234567',
          lock: '2000000.1234567'
        },
        {
          id: 1,
          currency: 'LZC',
          active: '2000000.1234567',
          lock: '2000000.1234567'
        },
        {
          id: 2,
          currency: 'BQC',
          active: '2000000.1234567',
          lock: '2000000.1234567'
        },
        {
          id: 3,
          currency: 'HUP',
          active: '2000000.1234567',
          lock: '2000000.1234567'
        },
        {
          id: 4,
          currency: 'HUSDT',
          active: '2000000.1234567',
          lock: '2000000.1234567'
        }
      ],
      list: [
        {
          id: 0,
          currency: 'FHC',
          yesterday: '200',
          cumulative: '2000000.1234567'
        },
        {
          id: 1,
          currency: 'LZC',
          yesterday: '100',
          cumulative: '2000000.1234567'
        },
        {
          id: 2,
          currency: 'BQC',
          yesterday: '500',
          cumulative: '2000000.1234567'
        },
        {
          id: 3,
          currency: 'HUP',
          yesterday: '200',
          cumulative: '2000000.1234567'
        },
        {
          id: 4,
          currency: 'HUSDT',
          yesterday: '0',
          cumulative: '2000000.1234567'
        }
      ],
      token: {},
      index: ''
    };
  },
  onLoad (options) {
    this.index = options.index
    this.getInfo()
  },
  methods: {
    async getInfo () {
      let res = await this.$api.api.getInfo()
      // console.log(res.data.data)
      if (res.data.code == 200) {
        if (this.index == 0) {
          this.token = {
            token: res.data.data.tokenA,
            freezeToken: res.data.data.freezeTokenA,
            current: 'FHC'
          }
        } else if (this.index == 1) {
          this.token = {
            token: res.data.data.tokenB,
            freezeToken: res.data.data.freezeTokenB,
            current: 'LZC'
          }
        } else if (this.index == 2) {
          this.token = {
            token: res.data.data.tokenC,
            freezeToken: res.data.data.freezeTokenC,
            current: 'BQC'
          }
        } else if (this.index == 3) {
          this.token = {
            token: res.data.data.tokenD,
            freezeToken: res.data.data.freezeTokenD,
            current: 'HUP'
          }
        }
      }
    },
    goMine () {
      uni.navigateBack({
        delta: 1
      });
    },
  },
  filters: {
    yesterdays (val) {
      if (val == 0) {
        return val = '--';
      }
      return val
    }
  },
}
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style lang="less">
.index {
  border-top: 1rpx solid transparent;
  .head {
    width: 690rpx;
    margin: 20rpx auto;
    padding: 14rpx;
    border: 1rpx solid #d8d8d8;
    box-shadow: 0rpx 5rpx 8px 0rpx rgba(27, 27, 27, 0.13);
    border-radius: 12rpx;
    background-color: #fff;
    .head-title {
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      text {
        border-left: 1rpx solid #d8d8d8;
        height: 60%;
      }
      > view {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    }
    .head-content {
      .common {
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-top: 1rpx solid #d8d8d8;
        > view {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
  .footer-copy {
    height: 130rpx;
    width: 100%;
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 40rpx;
    padding: 0 30rpx;
    .footer-box {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > view {
        // padding: 25rpx 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240rpx;
        height: 80rpx;
        background-color: #4059ff;
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #fff;
      }
    }
  }
}
</style>
