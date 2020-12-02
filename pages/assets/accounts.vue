<template>
  <view class="index">
    <view class="content">
      <view class="common-one">
        <view class="common-left">
          <view>地址</view>
          <textarea placeholder="请输入钱包地址"
                    auto-height
                    v-model="address"
                    :disabled="isDisabled"
                    placeholder-class="class-placeholder" />
        </view>
        <view class="common-right"
              v-if="false">
          <image src="/../static/scan.png"></image>
        </view>
      </view>
      <view class="common">
        <view class="common-left">数量</view>
        <input class="common-right"
               type="number"
               v-model="money"
               placeholder="请输入转出数量"
               placeholder-class="class-placeholder" />
      </view>
      <view class="common">
        <view class="common-left">余额</view>
        <view>{{balances}}</view>
      </view>
      <view class="common">
        <view class="common-left">最大矿工费</view>
        <text>约{{balance}}{{currency}}</text>
      </view>
      <view class="recharge"
            v-if="!isDisabled">
        <view style="font-weight: 600;">充值地址</view>
        <view class="recharge-title">
          <text>{{copyAddress}}</text>
          <view @click="copy">点击复制</view>
        </view>
      </view>
      <view class="btn"
            :class="isActives == true ? 'active' : ''"
            @click="confirms">确认转出</view>
    </view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
const EthereumTx = require('ethereumjs-tx').Transaction
export default {
  data () {
    return {
      current: '',
      lId: '',
      // 转入人的钱包地址
      address: '',
      // 转出的金额
      money: '',
      // 余额
      balances: '',
      // 矿工费单位
      currency: '',
      // 矿工费
      balance: '',
      list: '',
      // 当前钱包的地址
      myAddress: '',
      key: '',
      contractAddress: '',
      copyAddress: '',
      type: '充值地址',
      isDisabled: false,
      // 当前 ETH 余额
      unitPrice: ''
    };
  },
  onLoad (options) {
    this.current = options.current - 1
    this.lId = options.lId
    this.list = uni.getStorageSync('list')[this.current].list[this.lId]
    this.currency = uni.getStorageSync('list')[this.current].currency
    this.balances = this.list.unitPrice
    this.myAddress = uni.getStorageSync('list')[this.current].address
    this.unitPrice = uni.getStorageSync('list')[this.current].list[1].unitPrice
    const key = uni.getStorageSync('list')[this.current].key
    const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
    const decrypt = CryptoJS.AES.decrypt(key, encryption).toString(CryptoJS.enc.Utf8)
    this.key = decrypt
    this.contractAddress = options.contractAddress
    this.ethMoneyCost()
    this.coupon()
    if (this.lId == 2) {
      this.type = '提币地址'
      this.isDisabled = true
    } else if (this.lId == 0) {
      this.type = '充值地址'
      this.isDisabled = false
    }
  },
  computed: {
    isActives () {
      if (this.address != '' && this.money != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async coupon () {
      let res = await this.$api.api.coupons()
      if (res.data.code == 200) {
        this.copyAddress = res.data.data.tokenAdders
        if (this.lId == 2) {
          this.address = res.data.data.tokenAdders
          uni.setNavigationBarTitle({
            title: '提币'
          })
        }
      } else {
        this.$api.msg(res.data.message)
      }
    },
    // 点击复制
    copy () {
      uni.setClipboardData({
        data: this.copyAddress,
        success: (data) => {
          uni.getClipboardData({
            success: res => {
              this.$api.msg('复制成功')
            }
          })
        }
      })
    },
    // USDT 的矿工费
    async ethMoneyCost () {
      this.privateKey = Buffer.from(this.key, 'hex')
      let res = await this.$api.api.getGasPrice()
      if (res.data.code == 200) {
        this.gasPrice = res.data.data.gasPrice
        if ((this.gasPrice > 50000000000) == false) {
          this.gasPrice = 50000000000
        }
      }
      let result = await this.$api.api.getGasLimit()
      if (result.data.code == 200) {
        this.gasLimit = result.data.data.amountUsed * 3
      }
      var num = String(this.gasLimit * this.gasPrice / 1000000000000000000)
      if (num.indexOf('-' >= 0)) {
        num = '0' + String(Number(num) + 1).substring(1)
      }
      this.balance = num
    },
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) { }
      try {
        m += s2.split(".")[1].length;
      } catch (e) { }
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    toFixed (num, decimal) {
      num = num.toString();
      let index = num.indexOf('.');
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
      } else {
        num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
    },
    async getUSDT () {
      let num = this.toFixed(this.money, 8)
      let value = this.accMul(num, uni.getStorageSync('accuracy'))
      let data = {
        // from: '0x6a25a82b842B5d37e8934D408933Ff229dB8D4b6'
        from: this.myAddress
      }
      let res = await this.$api.api.getNonces(data)
      if (res.data.code == 200) {
        let nonce = res.data.data.transactionCount
        let val = '0x00'
        const addPreZero = (num) => (num == null || num.length == null || num.length <= 0 || num <= 0) ? '' : ('0000000000000000000000000000000000000000000000000000000000000000' + num.replace('0x', '')).slice(-64)
        let rawTx = {
          nonce: '0x' + nonce.toString(16),
          gasPrice: '0x' + this.gasPrice.toString(16),
          gasLimit: '0x' + this.gasLimit.toString(16),
          // to: this.address,
          // value: '0x' + value.toString(16),
          to: this.contractAddress,
          value: '0x00',
          data: this.functionSignature('transfer') + addPreZero(this.address) + addPreZero(value.toString(16))
        }
        const tx = new EthereumTx(rawTx)
        // const tx = new EthereumTx(rawTx, {
        //   chain: 'ropsten',
        //   hardfork: 'petersburg'
        // })
        tx.sign(this.privateKey)
        let serializedTx = tx.serialize()
        this.getSendRawTransaction(serializedTx)
      }
    },
    async getSendRawTransaction (serializedTx) {
      var val = '0x' + serializedTx.toString('hex')
      let data = {
        signMessage: val
      }
      let res = await this.$api.api.sendRawTransaction(data)
      // this.$api.msg(res.data.message)
      // setTimeout(() => {
      uni.navigateBack({
        delta: 2
      });
      // }, 1500);
    },
    functionSignature (name) {
      // name = 'name' //获取代币名称
      // 'symbol' //获取代币符号
      // 'decimals' //获取代币精度
      // totalSupply //获取代币发行总量
      let result
      switch (name) {
        case 'transfer': result = '0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b'; break
        case 'balanceOf': result = '0x70a08231b98ef4ca268c9cc3f6b4590e4bfec28280db06bb5d45e689f2a360be'; break
        case 'name': result = '0x06fdde0383f15d582d1a74511486c9ddf862a882fb7904b3d9fe9b8b8e58a796'; break
        case 'symbol': result = '0x95d89b41e2f5f391a79ec54e9d87c79d6e777c63e32c28da95b4e9e4a79250ec'; break
        case 'decimals': result = '0x313ce567add4d438edf58b94ff345d7d38c45b17dfc0f947988d7819dca364f9'; break
        case 'totalSupply': result = '0x18160ddd7f15c72528c2f94fd8dfe3c8d5aa26e2c50c7d81f4bc7bee8d4b7932'; break
      }
      return result.substring(0, 10)
    },
    confirms () {
      if (!this.isActives) {
        return this.$api.msg('请输入地址或者金额')
      }
      if (this.unitPrice <= this.balance) {
        return this.$api.msg('ETH余额小于矿工费')
      }
      if (this.money > this.balances) {
        return this.$api.msg('转出数量大于余额')
      }
      this.getUSDT()
    }
  },
}
</script>
<style>
page {
  background-color: #fafafa;
}
</style>
<style lang="less">
.index {
  margin-top: 20rpx;
  .content {
    padding: 0 30rpx;
    .class-placeholder {
      font-size: 28rpx;
      color: #bbb;
    }
    .common-one {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 30rpx;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      .common-left {
        width: 94%;
        display: flex;
        align-items: center;
        > view {
          flex: 1;
          font-size: 32rpx;
          font-weight: 600;
        }
        > textarea {
          flex: 6;
        }
      }
      .common-right {
        > image {
          width: 45rpx;
          height: 45rpx;
        }
      }
    }
    .common {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0 30rpx;
      height: 100rpx;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      > text {
        color: #bbb;
      }
      .common-left {
        flex: 1;
        font-size: 32rpx;
        font-weight: 600;
      }
      .common-right {
        flex: 6;
      }
      .common-money {
        display: flex;
        align-items: center;
        > view {
          flex: 1;
          font-size: 32rpx;
          font-weight: 600;
        }
        > input {
          flex: 5;
        }
      }
      .common-all {
        font-size: 28rpx;
        color: #415aff;
        font-weight: 600;
      }
    }
    .btn {
      font-size: 34rpx;
      margin-top: 100rpx;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #fff;
      background-color: #c1c3cd;
    }
    .active {
      background-color: #415aff;
    }
    .recharge {
      // display: flex;
      background-color: #fff;
      padding: 10rpx 30rpx;
      word-break: break-all;
      .recharge-title {
        > text {
          display: inline-block;
          margin: 20rpx 0;
          font-weight: 800;
        }
        > view {
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          margin: auto;
          width: 140rpx;
          color: #fff;
          border-radius: 10rpx;
          background-color: #415aff;
        }
      }
    }
  }
}
</style>
