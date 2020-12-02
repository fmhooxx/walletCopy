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
        <u-dropdown-item title="全部状态">
          <view class="slot-content">
            <view class="slot-box">
              <view class="classification">
                <view class="classification-title">列表分类</view>
                <view class="classification-list">
                  <view v-for="(item, index) in buyList"
                        @click="changeBuyList(index)"
                        :class="index == buyCurrent ? 'slot-active':''"
                        :key="index">{{item.text}}</view>
                </view>
              </view>
              <view class="classification">
                <view class="classification-title">交易状态</view>
                <view class="classification-list">
                  <view v-for="(item, index) in sellList"
                        @click="changeSellList(index)"
                        :class="index == sellCurrent ? 'slot-active':''"
                        :key="index">{{item.text}}</view>
                </view>
              </view>
              <view class="choice">
                <view class="choice-one"
                      @click="reset">重置</view>
                <view class="choice-two"
                      @click="screen">筛选</view>
              </view>
            </view>
          </view>
        </u-dropdown-item>
      </u-dropdown>
    </view>
    <view class="footer">
      <view class="footer-list"
            v-for="(item, index) in 3"
            :key="index">
        <view class="footer-title footer-common">
          <view class="title-left">委托单号：25698122备份</view>
          <view class="title-right">申诉中</view>
        </view>
        <view class="footer-type footer-common">
          <view class="type-left appeal">买入+USDT</view>
          <view class="type-right"
                @click="cancel">取消订单</view>
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
      buyList: [
        {
          id: 0,
          text: '全部'
        },
        {
          id: 1,
          text: '委买列表'
        },
        {
          id: 2,
          text: '委卖列表'
        }
      ],
      sellList: [
        {
          id: 0,
          text: '全部'
        },
        {
          id: 1,
          text: '未完成'
        },
        {
          id: 2,
          text: '已完成'
        }
      ],
      buyCurrent: 0,
      sellCurrent: 0,
      slot: '全部状态'
    };
  },
  methods: {
    reset () {
      this.buyCurrent = 0
      this.$refs.uDropdown.close()
    },
    screen () {
      this.sellCurrent = 0
      this.$refs.uDropdown.close()
    },
    cancel () {
      uni.showModal({
        title: '提示',
        content: '确定取消该订单?',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },
    changeBuyList (index) {
      this.buyCurrent = index
      this.slot = this.buyList[index].text
      // this.$refs.uDropdown.close()
    },
    changeSellList (index) {
      this.sellCurrent = index
      this.slot = this.sellList[index].text
      // this.$refs.uDropdown.close()
    },
    changeTitle (index) {
      this.current = index
      this.slot = '全部状态'
      this.buyCurrent = 0
      this.sellCurrent = 0
      this.$refs.uDropdown.close();
    }
  },
}
</script>

<style lang="less">
.indexs {
  /deep/.u-dropdown__menu__item {
    justify-content: space-between;
    padding-left: 30rpx;
    background-color: #f5f5f5;
  }
  .head-state {
    width: 100%;
    position: fixed;
    z-index: 99;
    top: 208rpx;
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
        .classification {
          .classification-title {
            color: #575757;
            font-size: 28rpx;
            font-weight: bold;
            margin-bottom: 20rpx;
          }
          .classification-list {
            display: flex;
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
        .choice {
          margin: 20rpx 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > view {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 300rpx;
            height: 80rpx;
            border-radius: 5rpx;
            font-size: 30rpx;
            font-weight: 600;
          }
          .choice-one {
            color: #4059ff;
            background: #f4f4f4;
          }
          .choice-two {
            color: #fff;
            background-color: #4059ff;
          }
        }
      }
    }
  }
  .footer {
    background-color: #f5f5f5;
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
