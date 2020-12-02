<template>
  <view class="index-box">
    <view class="list-bgc"></view>
    <view class="index">
      <view class="list">
        <view class="list-item"
              v-for="(item, index) in list"
              :key="index">
          <view class="item-left">
            <image :src="img"></image>
            <view>{{item.text}}</view>
          </view>
          <view class="item-center"><text>{{item.money}}</text><text class="usdt">{{item.usdt}}</text></view>
          <view class="item-right"
                :class="item.type == true ? 'true':'false' ">{{huilv}}%</view>
        </view>
      </view>
      <view class="head">
        <view class="head-item"
              v-for="(item, index) in head"
              :key="index">
          <text>{{item.text}}</text>
          <view>{{item.money}}</view>
        </view>
      </view>
      <view class="details">
        <view class="qiun-columns">
          <view class="qiun-charts">
            <view class="date-choose">
              <view v-for="(item,idx) in date"
                    :key="idx"
                    :class="item.id == current? 'choose' : ''"
                    @click="choose(item.id)">{{item.name}}</view>
            </view>
            <canvas canvas-id="chart_example"
                    id="chart_example"
                    class="charts"
                    :width="cWidth*pixelRatio"
                    :height="cHeight*pixelRatio"
                    :style="{'width':cWidth+'px','height':cHeight+'px'}"
                    @touchstart="touchLineA"></canvas>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="footer-title">
          <text></text>
          <view v-show="symbol =='ethusdt'">以太坊(Ethereum)简介</view>
          <view v-show="symbol =='btcusdt'">比特币(BitCoin)简介</view>
          <view v-show="symbol =='etcusdt'">ETC简介</view>
          <view v-show="symbol =='eosusdt'">EOS简介</view>
          <view v-show="symbol =='ltcusdt'">莱特币(Litecoin)简介</view>
        </view>
        <view class="footer-item"
              v-for="(item, index) in info[index]"
              :key="index">
          <text>{{item.text}}</text>
          <view>{{item.content}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import uCharts from '../../../components/u-charts/u-charts'
import uCharts from '../../../common/js/echarts.js'
var _self;
var canvaLineA = null;
export default {
  data () {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      textarea: '',
      huilv: '?',
      current: 0,
      date: [{
        id: 0,
        name: '小时'
      }, {
        id: 1,
        name: '月'
      }, {
        id: 2,
        name: '年'
      }],
      name: {
        "btc": [{
          name: "张三",
          age: "李四"
        }, { name: "王五", age: "苹果" }],
        "eos": [{

        }]
      },
      list: [
        // {id: 0,
        // money: "58,060.66",
        // range: " 5.49%",
        // text: "BTC",
        // type: true}
      ],
      flag: true,
      selectedMode: 'single',
      data: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        grid: {
          x: 45,
          y: 45,
          x2: 5,
          y2: 20,
          borderWidth: 1
        },
        yAxis: {
          type: 'value',
          min: '',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 13120],
          type: 'line',
          areaStyle: {}
        }]
      },
      img: '',
      index: null,
      head: [{
        id: 0,
        text: '开盘价',
        money: '?'
      },
      {
        id: 1,
        text: '最高',
        money: '?'
      },
      {
        id: 2,
        text: '最低',
        money: '?'
      },
      {
        id: 3,
        text: '成交量',
        money: '?'
      }
      ],
      symbol: '',
      info: [[{
        id: 0,
        text: '发行时间',
        content: '2008-11-1'
      },
      {
        id: 1,
        text: '发行总量',
        content: '21,000,000'
      },
      {
        id: 2,
        text: '流通总量',
        content: '18,374,575'
      },
      {
        id: 3,
        text: '众筹价格',
        content: '--'
      },
      {
        id: 4,
        text: '区块查询',
        content: 'https://www.blockchain.com/explorer'
      },
      {
        id: 5,
        text: '官网',
        content: 'https://bitcoin.org/en/'
      }], [{
        id: 0,
        text: '发行时间',
        content: '2014-07-24'
      },
      {
        id: 1,
        text: '发行总量',
        content: '110,249,440'
      },
      {
        id: 2,
        text: '流通总量',
        content: '110,249,440'
      },
      {
        id: 3,
        text: '众筹价格',
        content: '$0.31'
      },
      {
        id: 4,
        text: '区块查询',
        content: 'https://etherscan.io/'
      },
      {
        id: 5,
        text: '官网',
        content: 'https://ethereum.org/'
      }], [{
        id: 0,
        text: '发行时间',
        content: '2015-11-1'
      },
      {
        id: 1,
        text: '发行总量',
        content: '210,000,000'
      },
      {
        id: 2,
        text: '流通总量',
        content: '116,313,299'
      },
      {
        id: 3,
        text: '众筹价格',
        content: '--'
      },
      {
        id: 4,
        text: '区块查询',
        content: 'https://etc.tokenview.com/cn'
      },
      {
        id: 5,
        text: '官网',
        content: 'https://ethereumclassic.org/'
      }], [
        {
          id: 0,
          text: '发行时间',
          content: '2017-7-2'
        },
        {
          id: 1,
          text: '发行总量',
          content: '1,017,939,651'
        },
        {
          id: 2,
          text: '流通总量',
          content: '921,239,639'
        },
        {
          id: 3,
          text: '众筹价格',
          content: '--'
        },
        {
          id: 4,
          text: '区块查询',
          content: 'https://eostracker.io/'
        },
        {
          id: 5,
          text: '官网',
          content: 'https://eos.io/'
        }
      ], [{
        id: 0,
        text: '发行时间',
        content: '2011-11-09'
      },
      {
        id: 1,
        text: '发行总量',
        content: '84,000,000'
      },
      {
        id: 2,
        text: '流通总量',
        content: '64,364,381'
      },
      {
        id: 3,
        text: '众筹价格',
        content: '--'
      },
      {
        id: 4,
        text: '区块查询',
        content: 'http://explorer.litecoin.net/chain/Litecoin'
      },
      {
        id: 5,
        text: '官网',
        content: 'https://litecoin.com/en/'
      }]
      ]
    };
  },
  onLoad (options) {
    const item = JSON.parse(options.item)
    this.list.push(item)
    uni.setNavigationBarTitle({
      title: item.text + '行情'
    });
    if (item.text == 'BTC') {
      this.symbol = 'btcusdt'
      this.index = 0
      this.img = "/static/btc.png"
    }
    if (item.text == 'ETH') {
      this.symbol = 'ethusdt'
      this.index = 1
      this.img = "/static/eth.png"
    }
    if (item.text == 'ETC') {
      this.symbol = 'etcusdt'
      this.index = 2
      this.img = "/static/etc.png"
    }
    if (item.text == 'EOS') {
      this.symbol = 'eosusdt'
      this.index = 3
      this.img = "/static/eos.png"
    }
    if (item.text == 'LTC') {
      this.symbol = 'ltcusdt'
      this.index = 4
      this.img = "/static/ltc.png"
    }
    this.data.series[0].data = []
    this.getData('60min')
    this.getData1()
    _self = this;
    //#ifdef MP-ALIPAY
    uni.getSystemInfo({
      success: function (res) {
        if (res.pixelRatio > 1) {
          //正常这里给2就行，如果pixelRatio=3性能会降低一点
          //_self.pixelRatio =res.pixelRatio;
          _self.pixelRatio = 2;
        }
      }
    });
    //#endif
    this.cWidth = uni.upx2px(690);
    this.cHeight = uni.upx2px(500);
    // this.showLineA("canvasLineA",this.data);
    // this.getServerData();
  },
  async mounted () {
    let data1 = {
      symbol: this.symbol,
      period: '1day',
      size: 6
    }
    uni.request({
      url: 'https://huobi.gup-go.club/blockchain/huobi/market/history/kline',
      data: data1,
      success: (resDay) => {
        let a = resDay.data.data[0].close - resDay.data.data[0].open
        let b = resDay.data.data[0].open
        let c = a / b * 100
        this.huilv = c.toFixed(2)
        if (this.flag) {
          this.list[0].money = resDay.data.data[0].close
          this.list[0].usdt = "USDT"
          this.head.forEach((item, index) => {
            if (index == 0) {
              this.head[index].money = resDay.data.data[0].open
            }
            if (index == 1) {
              this.head[index].money = resDay.data.data[0].high
            }
            if (index == 2) {
              this.head[index].money = resDay.data.data[0].low
            }
            if (index == 3) {
              this.head[index].money = resDay.data.data[0].amount.toFixed(2)
            }
          })
          this.flag = false
        }
      }
    })
  },
  methods: {
    choose (id) {
      this.current = id
      if (id == 0) {
        this.data.xAxis.data = []
        this.data.series[0].data = []
        let date = '60min'
        this.getData(date)
      } else if (id == 1) {
        this.data.xAxis.data = []
        this.data.series[0].data = []
        let date = '1mon'
        this.getData(date)
      } else if (id == 2) {
        this.data.xAxis.data = []
        this.data.series[0].data = []
        let date = '1year'
        this.getData(date)
      }
    },
    echarts () {
      let this_ = this;
      let myChart = uCharts.init(document.getElementById('chart_example'));
      let option = this.data;
      myChart.setOption(option)
    },
    async getData1 () {
      // let data = {
      // 	symbol: this.symbol
      // }
      // uni.request({
      // 	url:"http://8.210.126.199/blockchain/huobi/market/detail/merged",
      // 	data:data,
      // 	success: (res) => {
      // 		this.list[0].money = res.data.data.close
      // 		this.list[0].usdt = "USDT"
      // 		this.head.forEach((item, index) => {
      // 			if (index == 0) {
      // 				this.head[index].money = res.data.data.open
      // 			}
      // 			if (index == 1) {
      // 				this.head[index].money = res.data.data.high
      // 			}
      // 			if (index == 2) {
      // 				this.head[index].money = res.data.data.low
      // 			}
      // 			if (index == 3) {
      // 				this.head[index].money = res.data.data.amount.toFixed(2)
      // 			}
      // 		})
      // 	}
      // })
    },
    async getData (date) {
      let data = {
        symbol: this.symbol,
        period: date,
        size: 6
      }
      let x = ''
      if (date == '60min') {
        let time = new Date().getHours()
        let dataTime = ''
        if (time < 6) {
          for (let a = 0; a < 6; a++) {
            if (time - a < 0) {
              dataTime = 24 + (time - a)
            }
            this.data.xAxis.data.push(dataTime)
          }
        } else {
          for (let a = 6; a > 0; a--) {
            dataTime = time - a
            this.data.xAxis.data.push(dataTime)
          }
        }
      } else if (date == '1mon') {
        let time = new Date().getMonth() + 2
        let dataTime = ''
        if (time < 6) {
          for (let a = 0; a < 6; a++) {
            if (time - a < 0) {
              dataTime = 12 + (time - a)
            }
            this.data.xAxis.data.push(dataTime)
          }
        } else {
          for (let a = 6; a > 0; a--) {
            dataTime = time - a
            this.data.xAxis.data.push(dataTime)
          }
        }
      } else if (date == '1year') {
        let time = new Date().getFullYear() + 1
        let dataTime = ''
        for (let a = 6; a > 0; a--) {
          dataTime = time - a
          this.data.xAxis.data.push(dataTime)
        }
      }
      uni.request({
        url: 'https://huobi.gup-go.club/blockchain/huobi/market/history/kline',
        data: data,
        success: (res) => {
          res.data.data.forEach((item, index) => {
            this.data.series[0].data.push(item.close)

          })
          this.data.yAxis.min = Math.min.apply(Math, this.data.series[0].data)
          let arr1 = []
          for (var i = this.data.series[0].data.length - 1; i >= 0; i--) {
            arr1[arr1.length] = this.data.series[0].data[i];
          }
          if (arr1.length == 6) {
            this.data.series[0].data = arr1
          } else {
            let arr = [0, 0]
            this.data.series[0].data = arr.concat(arr1)
          }
          this.echarts()
        }
      })
    },
    showLineA (canvasId, chartData) {
      canvaLineA = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'line',
        fontSize: 11,
        padding: [15, 20, 0, 15],
        legend: {
          show: true,
          padding: 5,
          lineHeight: 11,
          margin: 0,
        },
        dataLabel: true,
        dataPointShape: true,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        xAxis: {
          type: 'grid',
          gridColor: '#CCCCCC',
          gridType: 'dash',
          dashLength: 10,
          boundaryGap: 'justify',
          dashLength: 1,
        },
        yAxis: {
          gridType: 'dash',
          gridColor: '#CCCCCC',
          dashLength: 8,
          splitNumber: 5,
          format: (val) => {
            return val.toFixed(0) + '元'
          }
        },
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          line: {
            type: 'curve'
          }
        }
      });
      //下面是默认选中索引
      let cindex = 3;
      //下面是自定义文案
      let textList = [{
        text: '我是一个标题',
        color: null
      }, {
        text: '自定义1：值1',
        color: '#2fc25b'
      }, {
        text: '自定义2：值2',
        color: '#facc14'
      }, {
        text: '自定义3：值3',
        color: '#f04864'
      }];
      //下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
      let tmpevent = {
        mp: {
          changedTouches: [{
            x: 0,
            y: 80
          }]
        }
      };
      setTimeout(() => {
        // canvaLineA.showToolTip(tmpevent, {
        //   index: cindex,
        //   textList: textList
        // });
      }, 200)
    },
    touchLineA (e) {
      console.log(e)

      // canvaLineA.touchLegend(e);
      // canvaLineA.showToolTip(e, {
      //   format: function (item, category) {
      //     return category + ' ' + item.name + ':' + item.data
      //   }
      // });
    },
    changeData () {
      if (isJSON(_self.textarea)) {
        let newdata = JSON.parse(_self.textarea);
        canvaLineA.updateData({
          series: newdata.series,
          categories: newdata.categories
        });
      } else {
        uni.showToast({
          title: '数据格式错误',
          image: '../../../static/images/alert-warning.png'
        })
      }
    }
  }
}
</script>
<style>
page {
  background-color: #f9f9f9;
}
</style>
<style lang="less">
.list-bgc {
  width: 100%;
  height: 80rpx;
  background-color: #415aff;
  position: relative;
}

.index {
  padding: 0 30rpx;

  .list {
    position: absolute;
    top: 10rpx;
    width: 690rpx;

    .list-item {
      padding: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0rpx 10rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);

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
          margin-left: 10rpx;
          font-size: 16rpx;
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

  .head {
    margin-top: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #fff;
    padding: 30rpx 0;
    border-radius: 20rpx;
    box-shadow: 0rpx 10rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);

    .head-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      > text {
        font-size: 26rpx;
        color: #bbb;
      }

      > view {
        font-size: 28rpx;
        font-weight: 600;
      }
    }
  }

  .details {
    margin: 30rpx 0;
    box-shadow: 0rpx 10rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);

    .qiun-charts {
      border-radius: 20rpx;
      width: 690rpx;
      height: 500upx;
      background-color: #ffffff;
      .date-choose {
        display: flex;
        justify-content: center;
        view {
          height: 40rpx;
          width: 120rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .choose {
          background-color: #415aff;
          color: #ffffff;
        }
      }
    }

    .charts {
      border-radius: 20rpx;
      width: 690rpx;
      height: 500upx;
      background-color: #ffffff;
    }
  }

  .footer {
    margin-bottom: 20rpx;
    padding: 30rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0rpx 10rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);

    .footer-title {
      display: flex;
      align-items: center;

      > text {
        width: 6rpx;
        height: 24rpx;
        background-color: #415aff;
        margin-right: 30rpx;
      }

      > view {
        font-size: 28rpx;
        font-weight: 600;
        color: #242f6a;
      }
    }

    .footer-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20rpx 0;

      > text {
        font-size: 24rpx;
        color: #bbb;
      }

      > view {
        font-size: 28rpx;
        font-weight: 600;
        color: #3a4479;
        width: 346rpx;
        height: 100rpx;
        word-break: break-all;
        text-align: right;
      }
    }
  }
}
</style>
