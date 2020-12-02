<template>
  <view class="index">
    <view class="list">
      <view class="list-item"
            v-for="(item, index) in list"
            :key="index"
            @click="goDetails(item)">
        <view class="item-left">
          <image :src="item.img"></image>
          <view>{{item.text}}</view>
        </view>
        <view class="item-center">{{item.money}} <text class="usdt">USDT</text></view>
        <view class="item-right"
              :class="item.type == true ? 'true':'false' ">{{item.range}}%</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      websock: null,
      list: [
        {
          id: 0,
          text: 'BTC',
          money: '0.00',
          range: '0.00',
          type: true,
          img: "/static/btc.png"
        },
        {
          id: 1,
          text: 'ETH',
          money: '0.00',
          range: '0.00',
          type: false,
          img: "/static/eth.png"
        },
        {
          id: 2,
          text: 'ETC',
          money: '0.00',
          range: '0.00',
          type: false,
          img: "/static/etc.png"
        },
        {
          id: 3,
          text: 'EOS',
          money: '0.00',
          range: '0.00',
          type: false,
          img: "/static/eos.png"
        }, {
          id: 4,
          text: 'LTC',
          money: '0.00',
          range: '0.00',
          type: false,
          img: "/static/ltc.png"
        }
      ]
    };
  },
  onLoad () {
    // this.etcInit()
  },
  onShow () {
    this.btcInit()
  },
  onHide () {
    this.websock.close()
  },
  onUnload () {
    this.websock.close()
  },
  methods: {
    btcInit () {
      const wsuri = "wss://huobi.gup-go.club/ws";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage (e) { //数据接收
      if (e.data == "") return
      const redata = JSON.parse(e.data);
      const arr = redata.ch.split('.')
      if (typeof redata.tick != "undefined") {
        if (arr[1] == 'btcusdt') {
          this.list[0].money = redata.tick.close
          let a = redata.tick.close - redata.tick.open
          if (a < 0) {
            this.list[0].type = false
          } else {
            this.list[0].type = true
          }
          let b = redata.tick.open
          let c = a / b * 100
          this.list[0].range = c.toFixed(2)
        } else if (arr[1] == 'ethusdt') {
          this.list[1].money = redata.tick.close
          let a = redata.tick.close - redata.tick.open
          if (a < 0) {
            this.list[1].type = false
          } else {
            this.list[1].type = true
          }
          let b = redata.tick.open
          let c = a / b * 100
          this.list[1].range = c.toFixed(2)
        } else if (arr[1] == 'etcusdt') {
          this.list[2].money = redata.tick.close
          let a = redata.tick.close - redata.tick.open
          if (a < 0) {
            this.list[2].type = false
          } else {
            this.list[2].type = true
          }
          let b = redata.tick.open
          let c = a / b * 100
          this.list[2].range = c.toFixed(2)
        } else if (arr[1] == 'eosusdt') {
          this.list[3].money = redata.tick.close
          let a = redata.tick.close - redata.tick.open
          if (a < 0) {
            this.list[3].type = false
          } else {
            this.list[3].type = true
          }
          let b = redata.tick.open
          let c = a / b * 100
          this.list[3].range = c.toFixed(2)
        } else if (arr[1] == 'ltcusdt') {
          this.list[4].money = redata.tick.close
          let a = redata.tick.close - redata.tick.open
          if (a < 0) {
            this.list[4].type = false
          } else {
            this.list[4].type = true
          }
          let b = redata.tick.open
          let c = a / b * 100
          this.list[4].range = c.toFixed(2)
        }
      }
    },
    goDetails (item) {
      var item = JSON.stringify(item)
      uni.navigateTo({
        url: '/pages/quotation/details/details?item=' + item
      });
    },
    etcInit () {
      const wsuri = "wss://huobi.gup-go.club/ws/eth";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage1;
      this.websock.onclose = this.websocketclose1;
    },
    websocketonmessage1 (e) { //数据接收
      const redata = JSON.parse(e.data);
      console.log(redata)
      if (typeof redata.tick != "undefined") {
        this.list[1].money = redata.tick.close
        let a = redata.tick.close - redata.tick.open
        let b = redata.tick.open
        let c = a / b * 100
        this.list[1].range = c.toFixed(2)
      }
    }
  },
}
</script>
<style>
page {
  background-color: #f9f9f9;
}
</style>
<style lang="less">
.index {
  padding: 0 30rpx;
  .list {
    margin-top: 30rpx;
    .list-item {
      padding: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
      box-shadow: 0rpx 6rpx 10rpx -6rpx rgba(0, 0, 0, 0.6);
      .item-left {
        display: flex;
        align-items: center;
        > image {
          width: 80rpx;
          height: 80rpx;
          margin-right: 20rpx;
        }
        > view {
          font-size: 34rpx;
          font-weight: 600;
        }
      }
      .item-center {
        font-size: 34rpx;
        font-weight: 600;
        .usdt {
          font-size: 16rpx;
          margin-left: 10rpx;
        }
      }
      .false {
        color: #56fe39;
      }
      .true {
        color: #fe674b;
      }
      .item-right {
        font-size: 34rpx;
        font-weight: 600;
      }
    }
  }
}
</style>
