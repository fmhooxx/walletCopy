<template>
  <view class="index">
    <view class="head">
      <view class="head-title">矿山开采时间统计</view>
      <view class="timer">
        <view class="timer-one timer-common">
          <view>{{D}}</view>
          <text>:</text>
          <view>{{H}}</view>
          <text>:</text>
          <view>{{M}}</view>
          <text>:</text>
          <view>{{S}}</view>
        </view>
        <view class="timer-two timer-common">
          <view>天</view>
          <view>时</view>
          <view>分</view>
          <view>秒</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="content-top">
        <view class="common">
          <view>发行总量</view>
          <view>{{obj.totalCirculation}}</view>
        </view>
        <view class="common">
          <view>流通总量</view>
          <view>{{obj.totalCirculate}}</view>
        </view>
      </view>
      <view class="content-bottom">
        <view class="common">
          <view>剩余总量</view>
          <view>{{obj.totalResidue}}</view>
        </view>
        <view class="common">
          <view>销毁总量</view>
          <view>{{obj.totalDestruction}}</view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view v-for="(item, index) in list"
            :key="index"
            @click="other(index)">
        <image :src="item.url"></image>
        <view>{{item.text}}</view>
      </view>
    </view>
    <view class="end">更新维护通知：每日23点更新</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      D: '00',
      H: '00',
      M: '00',
      S: '00',
      // 定时器命名
      timer: '',
      list: [
        {
          id: 0,
          url: '/static/m1.png',
          text: '获取矿机'
        },
        {
          id: 1,
          url: '/static/m2.png',
          text: '获取其他'
        },
        {
          id: 2,
          url: '/static/m4.png',
          text: '我的管理'
        },
        {
          id: 3,
          url: '/static/m3.png',
          text: '进入矿池'
        }
      ],
      index: '',
      obj: {},
      excavationTime: ''
    };
  },
  onLoad (options) {
    this.index = options.id - 1
    this.getBmsHotTokens()
  },
  onShow () {
    this.date()
  },
  onHide () {
    clearInterval(this.timer)
  },
  onUnload () {
    clearInterval(this.timer)
  },
  methods: {
    async getBmsHotTokens () {
      let res = await this.$api.api.getBmsHotToken()
      if (res.data.code == 200) {
        this.obj = res.data.data[this.index]
        this.excavationTime = res.data.data[this.index].excavationTime.replace('T', ' ')
      }
    },
    date () {
      this.timer = setInterval(() => {
        var BirthDay = new Date(this.excavationTime);
        var today = new Date();
        var timeold = (today.getTime() - BirthDay.getTime());
        var sectimeold = timeold / 1000
        var secondsold = Math.floor(sectimeold);
        var msPerDay = 24 * 60 * 60 * 1000
        var e_daysold = timeold / msPerDay
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (e_daysold - daysold) * 24;
        var hrsold = Math.floor(e_hrsold);
        var e_minsold = (e_hrsold - hrsold) * 60;
        var minsold = Math.floor((e_hrsold - hrsold) * 60);
        var seconds = Math.floor((e_minsold - minsold) * 60);
        var span_dt_dt = daysold + " 天 " + hrsold + " 小时 " + minsold + " 分 " + seconds + " 秒了";
        this.D = daysold
        this.H = hrsold
        this.M = minsold
        this.S = seconds
      }, 1000);
    },
    other (index) {
      if (index == 0) {
        return this.goUrl('/pages/mine/machine')
      }
      if (index == 2) {
        return this.goUrl('/pages/mine/admin?index=' + this.index)
      }
      if (index == 3) {
        return this.goUrl('/pages/mine/mining?index=' + this.index)
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    },
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
  padding: 0 30rpx;
  border-top: 1rpx solid transparent;
  .head {
    margin: 20rpx 0;
    .head-title {
      text-align: center;
      margin: 20rpx 0;
      font-size: 30rpx;
      color: #333;
    }
    .timer {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .timer-common {
        display: flex;
        justify-content: center;
        align-items: center;
        > view {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 112rpx;
          height: 70rpx;
          border-radius: 4rpx;
          margin: 0 20rpx;
        }
      }
      .timer-one {
        > view {
          font-size: 30rpx;
          color: #333;
          font-weight: 600;
          background: #eef1fb;
          box-shadow: 0rpx 4rpx 6rpx 0rpx rgba(54, 54, 54, 0.15);
        }
        > text {
          color: #333333;
        }
      }
      .timer-two {
        margin-top: 10rpx;
      }
    }
  }
  .content {
    margin: 20rpx 0;
    padding: 1rpx 30rpx;
    border-radius: 10rpx;
    background-color: #fff;
    color: #666;
    box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(27, 27, 27, 0.13);
    .common {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 40rpx 0;
      > view {
        font-size: 26rpx;
      }
    }
    .common-top {
    }
    .content-bottom {
      border-top: 1rpx solid #d8d8d8;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > view {
      width: 48%;
      height: 224rpx;
      border-radius: 10rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10rpx 0;
      box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(27, 27, 27, 0.13);
      > image {
        width: 84rpx;
        height: 84rpx;
      }
      > view {
        color: #333;
        font-size: 30rpx;
        font-weight: 600;
        margin-top: 28rpx;
      }
    }
  }
  .end {
    margin: 20rpx 0;
    text-align: center;
    color: #999;
  }
}
</style>
