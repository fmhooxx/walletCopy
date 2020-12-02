<template>
  <view class="index">
    <view class="list">
      <view class="list-title">
        <text></text>
        <view>交易记录</view>
      </view>
      <view class="record">
        <view>哈希值</view>
        <view>时间</view>
        <view>查看详情</view>
      </view>
      <view v-if="list.length == 0 ? false:true">
        <view class="list-item"
              v-for="(item, index) in list"
              @click="seeDetails(index)"
              :key="index">
          <view class="item-left">{{item.transaction_hash}}</view>
          <view class="item-middle">{{item.timer}}</view>
          <view class="item-right">
            <text class="true">{{item.title}}</text>
          </view>
        </view>
      </view>
      <view v-else
            class="no-list">暂无交易记录</view>
    </view>
    <view class="footer-copy"></view>
    <view class="footer-box">
      <view class="footer">
        <view class="footer-common"
              @click="goUrl('/pages/collection/collection')">
          <image src="/static/transfer-out.png"></image>
          <text>收款</text>
        </view>
        <view class="footer-common"
              @click="goUrl('/pages/assets/accounts')">
          <image src="/static/collection.png"></image>
          <text>转账</text>
        </view>
      </view>
    </view>
    <u-popup v-model="show"
             border-radius="20"
             mode="center">
      <view class="popup">
        <view class="common">
          <text>哈希</text>
          <view>{{obj.transaction_hash}}</view>
        </view>
        <view class="common">
          <text>时间</text>
          <view>{{obj.timer}}</view>
        </view>
        <view class="common">
          <text>转出地址</text>
          <view>{{from}}</view>
        </view>
        <view class="common">
          <text>转入地址</text>
          <view>{{to}}</view>
        </view>
        <view class="common">
          <text>数量</text>
          <view>{{number}}USDT</view>
        </view>
        <view class="btn"
              @click="copy">点击复制哈希值</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
let result2 = ''
export default {
  data () {
    return {
      list: [],
      current: '',
      lId: '',
      contractAddress: '',
      flag: true,
      page: {
        pageSize: 20,
        pageNum: 0
      },
      total: '',
      index: '',
      address: '',
      show: false,
      obj: {},
      to: '',
      number: '',
      from: ''
    };
  },
  // // 监听页面滚动到底部的事件
  onReachBottom () {
    this.page.pageNum += 1;
    if (this.flag) {
      this.getRecharge();
    } else {
      this.$api.msg('没有更多数据了');
    }
  },
  onLoad (options) {
    this.contractAddress = options.contractAddress
    this.current = options.current
    this.index = options.current - 1
    this.lId = options.lId
    this.address = uni.getStorageSync('list')[this.index].address
    this.getRecharge()
  },
  methods: {
    copy () {
      uni.setClipboardData({
        data: this.obj.transaction_hash,
        success: (data) => {
          uni.getClipboardData({
            success: res => {
              this.show = false
              this.$api.msg('复制成功')
            }
          })
        }
      })
    },
    async seeDetails (index) {
      // console.log(this.list[index])
      let data = {
        txId: this.list[index].transaction_hash
      }
      let res = await this.$api.api.getTransaction(data)
      if (res.data.code == 200) {
        this.show = true
        this.obj = this.list[index]
        this.from = res.data.data.from
        this.to = '0x' + res.data.data.input.slice(10, 74).replace(/\b(0+)/gi, "")
        let num = res.data.data.input.slice(74).replace(/\b(0+)/gi, "")
        this.number = this.hex2int(num) / 1000000
      }
    },
    hex2int (hex) {
      var len = hex.length, a = new Array(len), code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    getRecharge () {
      uni.request({
        url: `https://api.blockchair.com/ethereum/dashboards/address/${this.address}?limit=${this.page.pageSize}&offset=${this.page.pageNum}`,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          if (res.data.context.code == 200) {
            let address = this.address
            let result = res.data.data
            result[address].calls.map(item => {
              item.timer = this.dateFormat(item.time, 'yyyy-MM-dd HH:mm:ss')
              item.title = '查看详情'
            })
            this.list = result[address].calls
            this.total = result[address].address.transaction_count
            this.flag = true
            if (this.total == this.list.length) {
              this.flag = false;
            }
          } else {
            this.$api.msg(res.data.context.error)
          }
        }
      });
    },
    dateFormat (date, format) {
      date = new Date(date);
      var o = {
        'M+': date.getMonth() + 1, //month
        'd+': date.getDate(), //day
        'H+': date.getHours() + 8, //hour+8小时
        'm+': date.getMinutes(), //minute
        's+': date.getSeconds(), //second
        'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
        'S': date.getMilliseconds() //millisecond
      };
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

      for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

      return format;
    },
    goUrl (url) {
      uni.navigateTo({
        url: url + '?current=' + this.current + '&lId=' + this.lId + '&contractAddress=' + this.contractAddress
      });
    },
  }
}
</script>

<style>
page {
  background-color: #f9f9f9;
}
</style>

<style lang="less">
.qiun-charts {
  border-radius: 20rpx;
  margin: auto;
  width: 690upx;
  height: 500upx;
  background-color: #ffffff;
  box-shadow: 0rpx 10rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);
}

.charts {
  border-radius: 20rpx;
  width: 690upx;
  height: 500upx;
  background-color: #ffffff;
}
.index {
  padding-top: 1rpx;
  .list {
    padding: 0 30rpx;
    .list-title {
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      > text {
        height: 24rpx;
        width: 40rpx;
        border-left: 6rpx solid #415aff;
      }
      > view {
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .record {
      padding: 10rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      margin: 20rpx 0;
      border-radius: 10rpx;
      > view {
        flex: 1;
        text-align: center;
      }
    }
    .list-item {
      padding: 20rpx 30rpx;
      border-radius: 30rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30rpx;
      .item-left {
        flex: 1;
        // padding-right: 20rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-middle {
        flex: 1;
        // padding: 0 20rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-right {
        text-align: center;
        flex: 1;
        > text {
          // font-size: 34rpx;
          // font-weight: 600;
        }
        .false {
          color: #56fe39;
        }
        .true {
          color: #fe674b;
        }
        > view {
          font-size: 28rpx;
          color: #bbb;
        }
      }
    }
  }
  .no-list {
    margin: 20rpx 0;
    text-align: center;
    font-size: 34rpx;
    font-weight: 900;
  }
  .footer-copy {
    height: 120rpx;
    width: 100%;
  }
  .footer-box {
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    background-color: #f9f9f9;
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40rpx;
      .footer-common {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        height: 100rpx;
        width: 320rpx;
        border-radius: 50rpx;
        border: 1rpx solid #eee;
        > image {
          width: 50rpx;
          height: 50rpx;
          margin-right: 30rpx;
        }
        > text {
          font-size: 34rpx;
          font-weight: 600;
        }
      }
      .one {
        background-color: #fed90d;
      }
      .two {
        background-color: #4059fe;
      }
    }
  }
  .popup {
    padding: 20rpx;
    word-break: break-all;
    width: 690rpx;
    .common {
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      > view {
        flex: 5;
      }
      > text {
        flex: 2;
      }
    }
    .btn {
      margin: 10rpx auto;
      width: 300rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #fff;
      background-color: #415aff;
      font-size: 32rpx;
      font-weight: 600;
      border-radius: 20rpx;
    }
  }
}
</style>
