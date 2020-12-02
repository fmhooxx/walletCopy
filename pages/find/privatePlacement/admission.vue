<template>
  <view class="index">
    <view class="head">
      <view class="head-bgi">
        <image src="/static/pBanner.png"></image>
      </view>
      <view class="head-box">
        <view class="head-title">
          <text class="one">FHC 启动大狂欢</text>
          <text class="two">百万USDT等你来抢</text>
        </view>
        <view class="head-footer">百万USDT</view>
      </view>
    </view>
    <view class="footer">
      <view class="explain">
        <text>认购说明</text>
        <view>一共发行了{{ticketSumOver}}张,本次共有{{total}}张USDT入场券, 还剩下{{ticketSum}}张</view>
      </view>
      <view class="box">
        <view class="common">
          <image src="/static/available.png"></image>
          <view class="content">
            <view class="content-box">
              <view class="box-left">
                <view class="left-time">
                  <view class="number">800<text>USDT</text></view>
                  <view class="data">仅限12月12日使用</view>
                </view>
                <view class="left-num">可购买{{surplus}}张</view>
              </view>
              <view class="box-right"
                    @click="getPurchase">
                <image src="/static/a.png"></image>
              </view>
            </view>
          </view>
        </view>
        <view class="common">
          <image src="/static/bought.png"></image>
          <view class="content">
            <view class="content-box">
              <view class="box-left">
                <view class="left-time">
                  <view class="number">800<text>USDT</text></view>
                  <view class="data">仅限12月12日使用</view>
                </view>
                <view class="left-num bought">已购买{{purchased}}张</view>
              </view>
              <view class="box-right">
                <image src="/static/b.png"></image>
              </view>
            </view>
          </view>
        </view>
        <view class="common">
          <image src="/static/used.png"></image>
          <view class="content">
            <view class="content-box">
              <view class="box-left">
                <view class="left-time">
                  <view class="number">800<text>USDT</text></view>
                  <view class="data">仅限12月12日使用</view>
                </view>
                <view class="left-num bought">已使用{{purchased}}张</view>
              </view>
              <view class="box-right">
                <image src="/static/u.png"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="details"
          @click="goUrl('/pages/find/privatePlacement/details')">
      <view>抢卷明细</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      // 一共发行了多少张
      ticketSumOver: '',
      // 本次共有多少张入场券
      total: '',
      // 还可以抢的张数
      ticketSum: '',
      // 可购买多少张
      surplus: '',
      // 已经购买多少张入场券，
      purchased: '',
      // 已使用多少张入场券
      used: ''
    };
  },
  onLoad () {
    this.coupon()
  },
  methods: {
    async coupon () {
      let res = await this.$api.api.coupons()
      if (res.data.code == 200) {
        this.total = res.data.data.ticketSum
        this.ticketSum = res.data.data.ticketRemain
        this.surplus = res.data.data.residueDegree
        this.purchased = res.data.data.ticket
        this.ticketSumOver = res.data.data.ticketSumOver
        this.used = res.data.data.usedTicket
      } else {
        this.$api.msg(res.data.message)
      }
    },
    getPurchase () {
      if (this.surplus == 0) {
        return this.$api.msg('可购买为零张')
      }
      uni.showModal({
        title: '温馨提示',
        content: '是否确定购买?',
        success: (res) => {
          if (res.confirm) {
            this.purchase()
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    },
    async purchase () {
      let res = await this.$api.api.Tickets()
      if (res.data.code == 200) {
        this.this.coupon()
      } else {
        this.$api.msg(res.data.message)
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

<style lang="less">
.index {
  position: relative;
  margin-bottom: 20rpx;
  padding-top: 10rpx;
  .head {
    position: relative;
    width: 690rpx;
    height: 400rpx;
    margin: auto;
    .head-bgi {
      width: 690rpx;
      height: 400rpx;
      border-radius: 30rpx;
      > image {
        width: 100%;
        height: 100%;
        border-radius: 30rpx;
      }
    }
    .head-box {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .head-title {
        font-style: oblique;
        font-size: 30rpx;
        > text {
          font-size: 26rpx;
          margin: 10rpx auto;
          display: block;
          background-color: #ea541d;
          color: #eee;
        }
        .one {
          width: 40%;
        }
        .two {
          width: 40%;
        }
      }
      .head-footer {
        font-style: oblique;
        font-weight: 900;
        font-size: 80rpx;
        background: linear-gradient(180deg, #fff 0%, #fbe8b9 98.779296875%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .footer {
    padding: 0 30rpx;
    .explain {
      border: 1rpx dashed #bbb;
      padding: 20rpx;
      border-radius: 10rpx;
      > text {
        font-size: 36rpx;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
      > view {
        text-indent: 2em;
      }
    }
    .box {
      margin-top: 10rpx;
      .common {
        position: relative;
        > image {
          width: 690rpx;
          height: 260rpx;
        }
        .content {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          .content-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .box-left {
              margin-left: 40rpx;
              display: flex;
              align-items: center;
              .left-time {
                .number {
                  font-weight: 600;
                  text-shadow: 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.2);
                  background: linear-gradient(0deg, #ffffff 0%, #ffffff 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  font-size: 60rpx;
                  > text {
                    font-size: 30rpx;
                    margin-left: 10rpx;
                  }
                }
                .data {
                  font-size: 16rpx;
                  color: #fff;
                }
              }
              .left-num {
                margin-left: 40rpx;
                // padding: 10rpx 20rpx;
                width: 200rpx;
                height: 80rpx;
                line-height: 80rpx;
                text-align: center;
                background-color: #fff;
                border-radius: 10rpx;
                font-size: 34rpx;
                font-weight: 600;
                color: #f93165;
              }
              .bought {
                color: #306cf4;
              }
            }
            .box-right {
              margin-right: 40rpx;
              width: 80rpx;
              height: 80rpx;
              // background-color: skyblue;
              // border-radius: 50%;
              // font-size: 28rpx;
              // font-weight: 600;
              // color: #fff;
              // text-align: center;
              // line-height: 80rpx;
              > image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  .details {
    position: fixed;
    top: 40%;
    right: 0;
    transform: translateY(-50%);
    width: 100rpx;
    height: 100rpx;
    border-radius: 100rpx 0 0 100rpx;
    background-color: #415aff;
    color: #fff;
    padding: 0 10rpx;
    text-align: center;
    font-size: 28rpx;
    > view {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
