<template>
  <view class="indexs">
    <view class="head-state">
      <view class="head">
        <view class="head-left">
          <view v-for="(item, index) in title"
                :class="index == current ? 'active' : ''"
                @click="changeTitle(index)"
                :key="index">{{item.text}}</view>
        </view>
      </view>
    </view>
    <view class="head-state-copy"></view>

    <view class="state">
      <u-dropdown ref="uDropdown"
                  height="90">
        <u-dropdown-item :title="slot">
          <view class="slot-content">
            <view class="slot-box">
              <view v-for="(item, index) in list"
                    @click="changeSlot(index)"
                    :class="index == slotCurrent ? 'slot-active':''"
                    :key="index">{{item.text}}</view>
            </view>
          </view>
        </u-dropdown-item>
      </u-dropdown>
    </view>
    <view class="footer">
      <view class="footer-list"
            v-for="(item, index) in 5"
            @click="goOther(index)"
            :key="index">
        <view class="footer-title footer-common">
          <view class="title-left">委托单号：25698122备份</view>
          <view class="title-right appeal">申诉中</view>
        </view>
        <view class="footer-type footer-common">
          <view class="type-left appeal">买入+USDT</view>
          <view class="type-right">查看详情</view>
        </view>
        <view class="footer-info footer-common">
          <view class="info-left">
            <image src="/static/avatar.png"></image>
            <view>用户名称</view>
          </view>
          <view class="info-right">2020-04-21 08:32:22</view>
        </view>
        <view class="footer-end footer-common">
          <view class="end-left end-common">
            <view>数量(USDT)</view>
            <text>3000</text>
          </view>
          <view class="end-middle end-common">
            <view>单价(¥)</view>
            <text>1.05</text>
          </view>
          <view class="end-right end-common">
            <view>总金额(¥)</view>
            <text>3150</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: [
        {
          id: 0,
          text: 'USDT'
        },
        {
          id: 1,
          text: 'FHC'
        }
      ],
      current: 0,
      list: [
        {
          id: 0,
          text: '全部'
        },
        {
          id: 1,
          text: '未支付'
        },
        {
          id: 2,
          text: '已取消'
        },
        {
          id: 3,
          text: '申诉中'
        },
        {
          id: 4,
          text: '已完成'
        },
        {
          id: 5,
          text: '已支付'
        }
      ],
      slotCurrent: 0,
      slot: '全部状态'
    };
  },
  methods: {
    goOther (index) {
      // index = 0 模拟买入
      if (index == 0) {
        return this.goUrl('/pages/transaction/order/one')
      }
      // index = 1 模拟卖出
      if (index == 1) {
        return this.goUrl('/pages/transaction/order/two')
      }
      // 应诉页面
      if (index == 2) {
        return this.goUrl('/pages/transaction/order/lawsuit')
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    },
    closeDropdown () {
      this.$refs.uDropdown.close();
    },
    changeSlot (index) {
      this.slotCurrent = index
      this.slot = this.list[index].text
      this.$refs.uDropdown.close()
    },
    changeTitle (index) {
      this.current = index
      this.$refs.uDropdown.close();
      this.slotCurrent = 0
      this.slot = '全部状态'
    }
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
  /* background-color: skyblue; */
}
</style>
<style lang="less">
.indexs {
  /deep/.u-dropdown {
    background-color: #f5f5f5;
  }
  /deep/.u-dropdown__menu__item {
    justify-content: space-between;
    margin-left: 30rpx;
  }
  .head-state {
    width: 100%;
    position: fixed;
    top: 88rpx;
    z-index: 99;
    .head {
      padding-left: 30rpx;
      height: 75rpx;
      background-color: #fff;
      .head-left {
        height: 100%;
        display: flex;
        align-items: center;
        > view {
          display: flex;
          align-items: center;
          height: 100%;
          font-size: 30rpx;
          color: #223041;
          font-weight: 600;
          margin: 0 20rpx;
          border-bottom: 4rpx solid transparent;
        }
        .active {
          border-bottom: 4rpx solid #415aff;
        }
      }
    }
  }
  .head-state-copy {
    width: 100%;
    height: 75rpx;
  }
  .state {
    .slot-content {
      padding: 40rpx;
      background-color: #fff;
      .slot-box {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
        > view {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 210rpx;
          height: 80rpx;
          background: #f4f4f4;
          border-radius: 10rpx;
          margin-bottom: 20rpx;
          font-size: 28rpx;
          color: #575757;
        }
        .slot-active {
          border: 1rpx solid #4059ff;
          color: #4059ff;
        }
      }
    }
  }
  .footer {
    .footer-list {
      padding: 20rpx 40rpx;
      background-color: #fff;
      margin-bottom: 10rpx;
      .appeal {
        color: #c34554;
      }
      .ordinary {
        color: #848484;
      }
      .footer-common {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .footer-title {
        .title-left {
          font-size: 26rpx;
          color: #343434;
        }
        .title-right {
          font-size: 28rpx;
        }
      }
      .footer-type {
        margin: 20rpx 0 30rpx 0;
        .type-left {
          font-size: 30rpx;
          font-weight: bold;
        }
        .type-right {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 144rpx;
          height: 44rpx;
          background: #ffffff;
          border-radius: 23rpx;
          border: 1rpx solid #979797;
          color: #848484;
        }
      }
      .footer-info {
        margin: 20rpx 0;
        .info-left {
          display: flex;
          align-items: center;
          > image {
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
            margin-right: 30rpx;
          }
          > view {
            color: #223041;
            font-size: 28rpx;
            font-weight: bold;
          }
        }
        .info-right {
          color: #aeaeae;
          font-size: 28rpx;
        }
      }
      .footer-end {
        .end-common {
          display: flex;
          flex-direction: column;
          align-items: center;
          > view {
            color: #848484;
            font-size: 28rpx;
            margin-bottom: 20rpx;
          }
          > text {
            color: #223041;
            font-size: 28rpx;
            font-weight: bold;
          }
        }
        .end-left {
        }
        .end-middle {
        }
        .end-right {
        }
      }
    }
  }
}
</style>
