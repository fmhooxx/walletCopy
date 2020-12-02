<template>
  <view class="indexs">
    <view class="head-box">
      <view class="head">
        <view class="head-left">
          <view v-for="(item, index) in title"
                :class="index == current ? 'active' : ''"
                @click="changeTitle(index)"
                :key="index">{{item.text}}</view>
        </view>
        <view class="head-right"
              @click="openScreen">
          <view>筛选</view>
          <image src="/static/screen.png"></image>
        </view>
      </view>
    </view>
    <view class="head-box-copy"></view>
    <view class="footer">
      <view class="box"
            v-for="(item,index) in list"
            :key="index">
        <view class="box-left">
          <view class="left-info">
            <view class="info-head">
              <image src="/static/avatar.png"></image>
            </view>
            <view class="info-box">
              <view class="info-top">
                <text>{{item.uname}}</text>
                <!-- <view class="info-au"
                      v-if="item.isAu">认证</view> -->
              </view>
              <view class="info-pay">
                <image v-for="(k, i) in item.payList"
                       :key="i"
                       :src="k.url"></image>
              </view>
            </view>
          </view>
          <view class="left-num">剩余数量: {{item.num}}</view>
        </view>
        <view class="box-right">
          <view class="right-one"
                @click.stop="openTr(item.type, index)"
                :class="item.type == 0 ? '':'right-four'"><text v-if="item.type == 0">买入</text><text v-else>卖出</text></view>
          <view class="right-two">单价(¥)</view>
          <view class="right-three">{{item.price}}</view>
        </view>
      </view>
    </view>
    <!-- 筛选弹出层 -->
    <view class="screen-box">
      <u-popup v-model="show"
               mode="top">
        <view class="screen">
          <view class="screen-mode">
            <view class="screen-title">交易方式</view>
            <view class="mode-list">
              <view class="mode-item"
                    v-for="(item, index) in modeList"
                    @click="changeMode(index)"
                    :class="index == modeCurrent ? 'mode-active':''"
                    :key="index">
                <view>{{item.text}}</view>
                <image v-show="index == modeCurrent"
                       src="/static/tr-active.png"></image>
              </view>
            </view>
          </view>
          <view class="screen-mode">
            <view class="screen-title">支付方式</view>
            <view class="mode-list">
              <view class="mode-item"
                    v-for="(item, index) in paymentList"
                    @click="changePayment(index)"
                    :class="index == paymentCurrent ? 'mode-active':''"
                    :key="index">
                <view>{{item.text}}</view>
                <image v-show="index == paymentCurrent"
                       src="/static/tr-active.png"></image>
              </view>
            </view>
          </view>
          <view class="screen-mode">
            <view class="screen-title">支付方式</view>
            <view class="mode-list">
              <view class="mode-item"
                    v-for="(item, index) in numList"
                    @click="changeNum(index)"
                    :class="index == numCurrent ? 'mode-active':''"
                    :key="index">
                <view><text v-if="index != 0">></text>{{item.text}}</view>
                <image v-show="index == numCurrent"
                       src="/static/tr-active.png"></image>
              </view>
            </view>
          </view>
          <view class="screen-footer">
            <view class="screen-one"
                  @click="reset">重置</view>
            <view class="screen-two"
                  @click="screen">筛选</view>
          </view>
        </view>
      </u-popup>
    </view>
    <!-- 买入卖出弹出层 -->
    <u-popup v-model="isTr"
             :closeable="true"
             mode="bottom">
      <view class="tr-box">
        <view class="tr-title">{{type}}{{titleActive}}</view>
        <view class="tr-img">
          <image src="/static/avatar.png"></image>
        </view>
        <view class="tr-common tr-head">
          <view class="tr-left">支付方式</view>
          <view class="tr-right"
                @click="openTrItem()">
            <view>{{payListText}}</view>
            <image src="/static/lower-arrow.png"></image>
          </view>
        </view>
        <view class="tr-common">
          <view v-if="type == '买入'">购买数量</view>
          <view v-else>卖出数量</view>
          <input align="right"
                 type="number"
                 v-model="number"
                 placeholder="请输入购买数量"
                 placeholder-style="text-align: right" />
        </view>
        <view class="tr-content">
          <view class="content-left">最少/最多({{titleActive}})</view>
          <view class="content-right">
            <text>【全部】</text>
            <view>1000/5000</view>
          </view>
        </view>
        <view class="tr-footer">
          <view class="tr-footer-common">
            <view>单价{{titleActive}}</view>
            <view>0.08</view>
          </view>
          <view class="tr-footer-common">
            <view>总花费{{titleActive}}</view>
            <view>100</view>
          </view>
        </view>
        <view class="tr-end"
              :class="type == '买入' ? 'buy':'sell'"
              @click="transaction">确定{{type}}</view>
      </view>
    </u-popup>
    <u-select v-model="isTrItem"
              :list="payLists"
              value-name="text"
              label-name="text"
              @confirm="confirmTr"></u-select>
    <passkeyborad :show="pwdShow"
                  @close="close"
                  @getpassword="getpassword"
                  ref="clear"
                  :fc="flag"></passkeyborad>
  </view>
</template>

<script>
import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
export default {
  components: {
    passkeyborad
  },
  data () {
    return {
      list: [
        {
          id: 0,
          head: '/static/avatar.png',
          payList: [
            {
              pId: 0,
              url: '/static/pay2.png',
              text: '微信'
            },
            {
              pId: 0,
              url: '/static/pay3.png',
              text: '支付宝'
            },
            {
              pId: 0,
              url: '/static/pay2.png',
              text: '未知'
            },
            {
              pId: 0,
              url: '/static/pay2.png',
              text: '银行卡'
            }
          ],
          type: 0,
          num: 1000,
          price: 0.99,
          uname: '商户名称'
        },
        {
          id: 0,
          head: '/static/avatar.png',
          payList: [
            {
              pId: 0,
              url: '/static/pay2.png',
              text: '微信'
            },
            {
              pId: 1,
              url: '/static/pay3.png',
              text: '支付宝'
            }
          ],
          type: 1,
          num: 1000,
          price: 0.99,
          uname: '商户名称'
        },
        {
          id: 0,
          head: '/static/avatar.png',
          payList: [
            {
              pId: 0,
              url: '/static/pay2.png',
              text: '微信'
            },
            {
              pId: 1,
              url: '/static/pay3.png',
              text: '支付宝'
            }
          ],
          type: 1,
          num: 1000,
          price: 0.99,
          uname: '商户名称'
        }
      ],
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
      show: false,
      // 交易方式
      modeList: [
        {
          id: 0,
          text: '全部'
        },
        {
          id: 1,
          text: '买入'
        },
        {
          id: 2,
          text: '卖出'
        }
      ],
      // 交易方式选中项
      modeCurrent: 0,
      // 支付方式
      paymentList: [
        {
          id: 0,
          text: '银行卡'
        },
        {
          id: 1,
          text: '支付宝'
        },
        {
          id: 2,
          text: '微信'
        }
      ],
      // 支付方式选中项
      paymentCurrent: 0,
      // 数量
      numList: [
        {
          id: 0,
          text: '全部'
        },
        {
          id: 1,
          text: '1000'
        },
        {
          id: 2,
          text: '10000'
        },
        {
          id: 3,
          text: '100000'
        }
      ],
      // 支付方式选中项
      numCurrent: 0,
      isTr: false,
      titleActive: '',
      type: '',
      payLists: [],
      payListText: '',
      isTrItem: false,
      // 输入的数量
      number: '',
      pwdShow: false,
      flag: false
    };
  },
  created () {
    this.titleActive = this.title[0].text
  },
  methods: {
    getpassword (val) {
      console.log(val)
      uni.navigateTo({
        url: '/pages/transaction/trComplete',
        success: res => {
          this.isTr = false
          this.pwdShow = false
          this.$refs.clear.password = ''
        }
      });
    },
    close () {
      this.pwdShow = false
    },
    transaction () {
      console.log(this.type)
      this.isTr = false
      this.pwdShow = true
    },
    openTr (type, index) {
      this.payLists = this.list[index].payList
      this.payListText = this.list[index].payList[0].text
      this.isTr = true
      if (type == 0) {
        this.type = '买入'
      } else {
        this.type = '卖出'
      }
    },
    openTrItem () {
      this.isTrItem = true
    },
    confirmTr (e) {
      this.payListText = e[0].value
    },
    openScreen () {
      this.show = !this.show
    },
    changeMode (index) {
      this.modeCurrent = index
    },
    changePayment (index) {
      this.paymentCurrent = index
    },
    changeNum (index) {
      this.numCurrent = index
    },
    reset () {
      this.modeCurrent = 0
      this.paymentCurrent = 0
      this.numCurrent = 0
      this.show = false
    },
    screen () {
      this.show = false
    },
    changeTitle (index) {
      this.current = index
      this.titleActive = this.title[index].text
      this.modeCurrent = 0
      this.paymentCurrent = 0
      this.numCurrent = 0
      this.show = false
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
  .head-box {
    width: 100%;
    position: fixed;
    top: 88rpx;
    background-color: #fff;
    z-index: 9;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      .head-right {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > view {
          font-size: 28rpx;
          color: #7e7e7e;
          margin-right: 10rpx;
        }
        > image {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
  .head-box-copy {
    height: 75rpx;
    width: 100%;
  }
  .screen {
    padding: 0 30rpx;
    .screen-title {
      color: #223041;
      font-size: 30rpx;
      font-weight: 600;
      margin: 30rpx 0;
    }
    .screen-mode {
      .mode-list {
        display: flex;
        align-items: center;
        .mode-item {
          position: relative;
          // width: 110rpx;
          padding: 0 20rpx;
          height: 65rpx;
          background: #ffffff;
          border-radius: 10rpx;
          border: 3rpx solid transparent;
          font-size: 24rpx;
          color: #b0b0b0;
          margin-right: 30rpx;
          background-color: #f4f4f4;
          > view {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          > image {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 45rpx;
            height: 35rpx;
          }
        }
        .mode-active {
          color: #4059ff;
          border: 3rpx solid #4059ff;
          background-color: #fff;
        }
      }
    }
    .screen-footer {
      padding: 80rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 320rpx;
        height: 80rpx;
        border-radius: 5rpx;
        font-size: 30rpx;
        font-weight: 600;
      }
      .screen-one {
        color: #4059ff;
        background-color: #f4f4f4;
      }
      .screen-two {
        color: #fff;
        background-color: #4059ff;
      }
    }
  }
  .footer {
    margin-top: 10rpx;
    .box {
      margin: 2rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx;
      background-color: #fff;
      .box-left {
        .left-info {
          display: flex;
          .info-head {
            align-self: center;
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
            margin-right: 30rpx;
            > image {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .info-box {
            .info-top {
              display: flex;
              align-items: center;
              > text {
                font-size: 28rpx;
                color: #223041;
                font-weight: bold;
              }
              .info-au {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 68rpx;
                height: 33rpx;
                background: #eda257;
                border-radius: 6rpx;
                font-size: 24rpx;
                color: #fff;
                margin-left: 10rpx;
              }
            }
            .info-pay {
              display: flex;
              > image {
                margin-right: 10rpx;
                width: 40rpx;
                height: 40rpx;
                margin-top: 20rpx;
              }
            }
          }
        }
        .left-num {
          color: #848484;
          font-size: 24rpx;
          margin-top: 30rpx;
        }
      }
      .box-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .right-one {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 116rpx;
          height: 46rpx;
          background: #c34554;
          border-radius: 23rpx;
          color: #fff;
          font-size: 24rpx;
          font-weight: 600;
        }
        .right-two {
          font-size: 24rpx;
          color: #848484;
          margin: 20rpx 0;
        }
        .right-three {
          font-size: 40rpx;
          color: #848484;
          font-weight: bold;
        }
        .right-four {
          background-color: #52b88a;
        }
      }
    }
  }
  .screen-box {
    /deep/.u-drawer {
      top: 170rpx;
    }
    /deep/.u-mask {
      top: 170rpx;
    }
  }
  .tr-box {
    padding: 30rpx 50rpx;
    background-color: #f1f3f8;
    .tr-title {
      color: #373737;
      font-size: 34rpx;
      font-weight: bold;
    }
    .tr-img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 24rpx 0;
      > image {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
      }
    }
    .tr-common {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 30rpx;
      border-radius: 10rpx;
      margin-bottom: 24rpx;
      .tr-left {
        color: #373737;
        font-size: 28rpx;
      }
      .tr-right {
        display: flex;
        align-items: center;
        justify-content: center;
        > view {
        }
        > image {
          margin-left: 10rpx;
          width: 16rpx;
          height: 10rpx;
        }
      }
    }
    .tr-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;
      .content-left {
        color: #373737;
        font-size: 24rpx;
      }
      .content-right {
        display: flex;
        align-items: center;
        justify-content: center;
        > text {
          color: #4059ff;
          font-size: 24rpx;
        }
        > view {
          color: #373737;
          font-size: 24rpx;
        }
      }
    }
    .tr-footer {
      .tr-footer-common {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 30rpx;
        border-bottom: 1rpx solid #d8d8d8;
      }
    }
    .tr-end {
      margin: 60rpx 0 20rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: bold;
      border-radius: 8rpx;
    }
    .buy {
      background-color: #c34554;
    }
    .sell {
      background-color: #52b88a;
    }
  }
}
</style>
