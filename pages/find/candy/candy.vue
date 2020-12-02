<template>
  <view class="index">
    <view class="head">
      <view class="head-top">
        <view class="head-one">
          <view>
            <image src="/static/USDT.png"></image>
            <text>USDT</text>
          </view>
          <view>
            <image src="/static/FLC.png"></image>
            <text>FHC</text>
          </view>
        </view>
        <view class="head-two">
          <text></text>
          <image src="/static/arrow.png"></image>
          <text></text>
        </view>
        <view class="head-three">
          <input placeholder="转出数量"
                 @input="cahngeNum"
                 @blur="blurNum"
                 type="number"
                 placeholder-class="head-text"
                 v-model="num" />
          <view class="head-text number">{{number}}</view>
        </view>
      </view>
      <view class="head-bottom">
        <view class="head-footer">
          <view class="head-rate">
            <text>汇率</text>
            <view>1FHC={{FHC}}USDT</view>
          </view>
          <view class="exchange"
                @click="exchange">兑换</view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="common"
            v-for="(item, index) in list"
            :key="index"
            :class="[index == 0 ? 'zone' : '',index == 1 ? 'one' : '', index == 2 ? 'two' : '',index == 3 ? 'three' : '',index == 4 ? 'four' : '']">
        <view class="left">
          <image :src="item.img"></image>
          <view class="left-box">
            <view class="left-one">{{item.symbol}}</view>
            <view class="left-two"
                  v-if="index == 0 ? false:true">众筹总量<view>{{item.totalCirculation}}枚</view>
            </view>
            <view class="left-two"
                  v-if="index == 0 ? false:true">剩余数量<view>{{item.indulgence}}枚</view>
            </view>
          </view>
        </view>
        <view class="right">
          <!-- <text>持有: {{item.raisePrice}}u</text> -->
          <view class="raisePrice">
            <view>持有：</view>{{item.raisePrice}}
          </view>
          <view class="text"
                @click="other(item.id, item.symbol)">{{item.text}}</view>
        </view>
      </view>
      <view class="otc" v-if="false"
            @click="goUrl('/pages/transaction/assetManagement')">
        <image src="/static/otc.png"></image>
      </view>
    </view>
    <view class="details"
          @click="goUrl('/pages/find/candy/rechargeDetails')">
      <view>兑换明细</view>
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
          img: '/static/USDT.png',
          symbol: 'USDT',
          // totalResidue: '1468968.00',
          raisePrice: '0.00',
          text: '查看明细'
        }
      ],
      num: '',
      number: '收到数量',
      FHC: ''
    };
  },
  created () {
    this.getBmsHotTokens()
  },
  methods: {
    removeList () {
      this.list = [
        {
          id: 0,
          img: '/static/USDT.png',
          symbol: 'USDT',
          // totalResidue: '1468968.00',
          raisePrice: '0.00',
          text: '查看明细'
        }
      ]
    },
    exchange () {
      if (this.num.trim().length == 0) {
        return this.$api.msg('请输入兑换数量')
      }
      uni.showModal({
        title: '提示',
        content: '确定兑换?',
        success: (ress) => {
          if (ress.confirm) {
            this.exchanges()
          } else if (ress.cancel) {
          }
        }
      });

    },
    async exchanges () {
      let data = {
        fromTokenId: 5,
        toTokenId: 1,
        fromTokenCount: this.num
      }
      let res = await this.$api.api.BmsTokenConversionOrder(data)
      this.$api.msg(res.data.message)
      this.num = ''
      this.number = '收到数量'
      setTimeout(() => {
        this.getBmsHotTokens()
      }, 1500);
    },
    toFixeds (num, decimal) {
      num = num.toString();
      let index = num.indexOf('.');
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
      } else {
        num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
    },
    blurNum () {
      if (this.num.trim().length == 0) {
        return
      }
      this.num = this.toFixeds(this.num, 2)
    },
    cahngeNum () {
      let num = this.toFixeds(this.num, 2)
      let result = 1 / this.FHC
      this.number = Math.floor((num * result) * 100) / 100
      if (this.num == '') {
        this.number = '收到数量'
      }
    },
    async getBmsHotTokens () {
      let res = await this.$api.api.getBmsHotToken()
      if (res.data.code == 200) {
        this.list = [
          {
            id: 0,
            img: '/static/USDT.png',
            symbol: 'USDT',
            // totalResidue: '1468968.00',
            raisePrice: '0.00',
            text: '查看明细'
          }
        ]
        res.data.data.map(item => {
          item.text = '查看明细'
          item.raisePrice = 0
        })
        this.FHC = res.data.data[0].closingPrice
        this.list.push(...res.data.data)
        this.getInfo()
      }
    },
    other (id, symbol) {
      // uni.navigateTo({
      //   url: '/pages/find/candy/details'
      // });
      // return
      // if (!this.isList()) {
      //   return this.$api.msg('请先建立钱包或者导入钱包')
      // }
      if (id == 0) {
        this.goUrl('/pages/find/candy/details?status=' + 0 + '&symbol=' + symbol)
      }
      if (id == 1) {
        this.goUrl('/pages/find/candy/details?status=' + 1 + '&symbol=' + symbol)
        // this.goUrl('/pages/mine/index?id=' + id)
      } else {
        this.$api.msg('暂未开启挖矿')
      }
    },
    async getInfo () {
      let res = await this.$api.api.getInfo()
      if (res.data.code == 200) {
        this.list[0].raisePrice = res.data.data.husdt.toFixed(4)
        this.list[1].raisePrice = res.data.data.fhc.toFixed(4)
      } else if (res.data.code == 401) {
        uni.reLaunch({
          url: '/pages/login/login'
        });
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    },
    isList () {
      var list = uni.getStorageSync('list')
      if (list.length == 0) {
        return false
      }
      return true
    },
    handle () {
      return
      if (!this.isList()) {
        return this.$api.msg('请先建立钱包或者导入钱包')
      }
      uni.navigateTo({
        url: '/pages/find/privatePlacement/admission'
      });
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
  position: relative;
  margin-bottom: 20rpx;
  .head {
    position: relative;
    width: 690rpx;
    margin: 30rpx auto;
    border-radius: 15rpx;
    background-color: #fff;
    border: 1rpx solid #f2f2f2;
    box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
    .head-top {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .head-one {
        width: 100%;
        padding: 52rpx 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        > view {
          display: flex;
          align-items: center;
          > image {
            width: 51rpx;
            height: 51rpx;
            margin-right: 20rpx;
          }
          > text {
            font-size: 45rpx;
            color: #666;
            font-weight: 600;
          }
        }
      }
      .head-two {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > text {
          width: 40%;
          height: 1rpx;
          background-color: #f2f2f2;
        }
        > image {
          width: 80rpx;
          height: 80rpx;
        }
      }
      .head-three {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding-bottom: 30rpx;
        .head-text {
          color: #d7d7d7;
          font-size: 30rpx;
          font-weight: 500;
        }
        .number {
          color: #000;
        }
      }
    }
    .head-bottom {
      padding: 0 30rpx;
      height: 120rpx;
      .head-footer {
        padding: 0 34rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1rpx solid #f2f2f2;
        width: 100%;
        height: 100%;
        .head-rate {
          display: flex;
          align-items: center;
          > text {
            font-size: 28rpx;
            color: #999;
            margin-right: 20rpx;
          }
          > view {
            font-size: 28rpx;
            color: #666;
          }
        }
        .exchange {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 136rpx;
          height: 81rpx;
          background: #4059ff;
          border-radius: 19rpx;
          color: #fff;
        }
      }
    }
  }
  .footer {
    .common {
      margin: 20rpx auto 0;
      width: 690rpx;
      height: 280rpx;
      // background: linear-gradient(-21deg, #f19f66, #ec5793);
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40rpx;
      .left {
        height: 100%;
        display: flex;
        align-items: center;
        > image {
          width: 90rpx;
          height: 90rpx;
        }
        .left-box {
          margin-left: 20rpx;
          .left-one {
            color: #fff;
            font-size: 44rpx;
          }
          .left-two {
            font-size: 28rpx;
            color: #eee;
            > text {
              margin-left: 20rpx;
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        // align-items: center;
        align-items: flex-end;
        .raisePrice {
          text-align: right;
          font-size: 28rpx;
          color: #eee;
        }
        .text {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10rpx;
          font-size: 26rpx;
          width: 160rpx;
          font-weight: 600;
          height: 60rpx;
          border-radius: 35rpx;
          color: #e8683c;
          border: 2rpx solid #e8683c;
          background-color: #fff;
        }
      }
    }
    .otc {
      width: 690rpx;
      height: 280rpx;
      margin: 20rpx auto 0;
      > image {
        width: 100%;
        height: 100%;
      }
    }
    .zone {
      background: linear-gradient(-21deg, #f865b2, #4b7dff);
    }
    .one {
      background: linear-gradient(-21deg, #f19f66, #ec5793);
    }
    .two {
      background: linear-gradient(-21deg, #6939f7, #f865b2);
    }
    .three {
      background: linear-gradient(-21deg, #345fcb, #80cffc);
    }
    .four {
      background: linear-gradient(-21deg, #11948c, #50f0e6);
    }
  }
  .details {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 90rpx;
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
