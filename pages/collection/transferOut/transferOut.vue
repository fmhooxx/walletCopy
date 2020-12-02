<template>
  <view class="index">
    <view class="head-box">
      <view class="head">
        <view class="head-left">钱包名称</view>
        <view class="head-right"
              @click="openShow">
          <text>{{active}}</text>
          <image src="/static/lower-arrow.png"></image>
        </view>
      </view>
      <u-picker v-model="show"
                @confirm="walletConfirm"
                range-key="walletUname"
                mode="selector"
                :range="walletList"></u-picker>
      <!-- <collectionCom @handle="handle"></collectionCom> -->
    </view>
    <view class="content">
      <view class="common-one">
        <view class="common-left">
          <view>地址</view>
          <textarea placeholder="请输入钱包地址"
                    auto-height
                    v-model="address"
                    placeholder-class="class-placeholder" />
        </view>
        <view class="common-right"
              v-if="false">
          <image src="/../static/scan.png"></image>
        </view>
      </view>
      <!-- <view class="common">
        <view class="common-left common-money">
          <view>金额</view>
          <input type="text"
                 placeholder="请输入转出金额"
                 placeholder-class="class-placeholder" />
        </view>
        <view class="common-all">全部转出</view>
      </view> -->
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
      <view class="btn"
            :class="isActives == true ? 'active' : ''"
            @click="confirms">确认转出</view>
    </view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
import collectionCom from '../collectionCom/collectionCom'
// const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx').Transaction
const FormData = require('form-data')
const bitcoin = require('bitcoinjs-lib');
const fetch = require('node-fetch');
const testnet = bitcoin.networks.testnet;
// const url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';
const url = 'https://api.blockcypher.com/v1/btc/main/addrs/';
const WAValidator = require('wallet-address-validator');
export default {
  components: {
    collectionCom
  },
  data () {
    return {
      // 选中的钱包地址
      meAddress: '',
      show: false,
      // 选中的钱包名称
      active: '',
      // 选中的钱包私钥
      key: '',
      // 转入人的钱包地址
      address: '',
      // 转出的金额
      money: '',
      // 余额
      balances: '',
      // 判断是何种钱包类型
      currency: '',
      // 矿工费
      balance: '',
      // 检查地址
      flag: '',
      bob: '',
      fee: '',
      unspentList: '',
      privateKey: '',
      gasLimit: '',
      gasPrice: '',
      current: ''
    };
  },
  onLoad (options) {
    // vanish belt unique pause focus pig aunt accuse ordinary actress boy genuine
    // random fury initial leopard shuffle focus tag flip tragic angle feed absorb
    this.walletList = uni.getStorageSync('list')
    this.current = options.current - 1
    if (options.current != undefined || options.current != undefined) {
      const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      const decrypt = CryptoJS.AES.decrypt(this.walletList[this.current].key, encryption).toString(CryptoJS.enc.Utf8)
      this.active = this.walletList[this.current].walletUname
      this.key = decrypt
      this.currency = this.walletList[this.current].currency
      this.meAddress = this.walletList[this.current].address
      if (this.currency == 'BTC') {
        this.btcMoneyCost()
      } else if (this.currency == 'ETH') {
        this.ethMoneyCost()
        this.ethBalance()
      }
    } else {
      if (this.walletList.length != 0) {
        const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
        const decrypt = CryptoJS.AES.decrypt(this.walletList[0].key, encryption).toString(CryptoJS.enc.Utf8)
        this.active = this.walletList[0].walletUname
        this.key = decrypt
        this.currency = this.walletList[0].currency
        this.meAddress = this.walletList[0].address
        if (this.currency == 'BTC') {
          this.btcMoneyCost()
        } else if (this.currency == 'ETH') {
          this.ethMoneyCost()
          this.ethBalance()
        }
      }
    }
  },
  onShow () {
    // if (this.currency == 'BTC') {
    //   this.btcMoneyCost()
    // } else if (this.currency == 'ETH') {
    //   this.ethMoneyCost()
    //   this.ethBalance()
    // }
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
    // ETH 的矿工费
    async ethMoneyCost () {
      this.privateKey = Buffer.from(this.key, 'hex')
      let res = await this.$api.api.getGasPrice()
      if (res.data.code == 200) {
        this.gasPrice = res.data.data.gasPrice
        if ((this.gasPrice > 50000000000) == false) {
          this.gasPrice = 50000000000
        }
      }
      // let value = this.money * 1000000000000000000
      // // 转出人的地址
      // let from = this.meAddress
      // // 将要转给人的地址
      // let to = this.address
      let result = await this.$api.api.getGasLimit()
      if (result.data.code == 200) {
        this.gasLimit = result.data.data.amountUsed
      }
      var num = String(this.gasLimit * this.gasPrice / 1000000000000000000)
      if (num.indexOf('-' >= 0)) {
        num = '0' + String(Number(num) + 1).substring(1)
      }
      this.balance = num
    },
    // ETH 的余额
    async ethBalance () {
      let data = {
        address: this.meAddress
      }
      let res = await this.$api.api.getEthBalance(data)
      if (res.data.code == 200) {
        this.balances = res.data.data.balance / 1000000000000000000
      }
    },
    async getETH () {
      let value = this.money * 1000000000000000000
      let data = {
        from: this.meAddress
      }
      let res = await this.$api.api.getNonces(data)
      if (res.data.code == 200) {
        let nonce = res.data.data.transactionCount
        // let web3 = new Web3()
        let rawTx = {
          nonce: '0x' + nonce.toString(16),
          gasPrice: '0x' + this.gasPrice.toString(16),
          gasLimit: '0x' + this.gasLimit.toString(16),
          to: this.address,
          value: '0x' + value.toString(16),
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
      // console.log(res)
      // this.$api.msg(res.data.message)
      // setTimeout(() => {
      uni.navigateBack({
        delta: 1
      });
      // }, 1500);
    },
    // BTC 的余额以及矿工费
    async btcMoneyCost () {
      this.bob = bitcoin.ECPair.fromWIF(this.key, testnet);
      // const bob = bitcoin.ECPair.fromWIF('cPjYU67RLhjpTEFzqgS7e9uTv9kpeBofc8o7g8AeLzGxjEvzxXEb', testnet);
      const {
        address: address2
      } = bitcoin.payments.p2pkh({
        pubkey: this.bob.publicKey,
        network: testnet
      });
      const myAddress = address2;
      // 查询余额
      const res = await fetch(url + myAddress);
      const json = await res.json();
      if (res.status == 200 || json.address != undefined) {
        this.flag = true
      } else {
        this.flag = false
      }
      const balance = json.final_balance
      if (balance <= 0) {
        return this.balances = balance / 100000000
      }
      this.balances = balance / 100000000
      const txrefs = json.txrefs;
      this.unspentList = txrefs.filter(item => !item.spent_by && item.tx_output_n !== -1);
      const txb = new bitcoin.TransactionBuilder(testnet);
      txb.setVersion(1);
      this.unspentList.forEach(item => txb.addInput(item.tx_hash, item.tx_output_n));
      // 矿工费
      uni.request({
        url: 'https://bitcoinfees.earn.com/api/v1/fees/recommended',
        header: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        success: (res) => {
          let result = res.data.fastestFee
          let number = null
          if (result > 62) {
            number = 62
          } else {
            number = result
          }
          this.fee = (this.unspentList.length * 148 + 2 * 34 + 10 - this.unspentList.length) * number;
          var num = String(this.fee / 100000000)
          if (num.indexOf('-' >= 0)) {
            num = '0' + String(Number(num) + 1).substring(1)
          }
          this.balance = num
        }
      });
    },
    async getBTC () {
      uni.showLoading({
        title: '加载中'
      });
      // const bob = bitcoin.ECPair.fromWIF('cPjYU67RLhjpTEFzqgS7e9uTv9kpeBofc8o7g8AeLzGxjEvzxXEb', testnet);
      const {
        address: address2
      } = bitcoin.payments.p2pkh({
        pubkey: this.bob.publicKey,
        network: testnet
      });
      const myAddress = address2;
      // 查询余额
      const res = await fetch(url + myAddress);
      const json = await res.json();
      const balance = json.final_balance
      if (balance == 0) {
        return this.$api.msg('余额不足')
      }
      const txrefs = json.txrefs;
      const txb = new bitcoin.TransactionBuilder(testnet);
      txb.setVersion(1);
      this.unspentList.forEach(item => txb.addInput(item.tx_hash, item.tx_output_n));
      // 转入的地址和金额
      txb.addOutput(this.address, this.money * 100000000);
      txb.addOutput(myAddress, balance - this.money * 100000000 - this.fee);
      this.unspentList.forEach((item, index) => {
        txb.sign(index, this.bob)
      });
      const tx = txb.build().toHex();
      const results = await fetch('https://api.blockcypher.com/v1/btc/main/txs/push', {
        // const results = await fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          tx
        })
      });
      if (results.status == 201) {
        uni.hideLoading()
        // this.$api.msg('交易成功')
        // setTimeout(() => {
        uni.navigateBack({
          delta: 1
        });
        // }, 1500);
      } else {
        this.$api.msg('未知错误, 请联系管理员')
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 1500);
      }
    },
    confirms () {
      if (this.isActives == false) {
        return this.$api.msg('地址或金额未填写')
      }
      if (this.walletList.length == 0) {
        return this.$api.msg('请先创建钱包')
      }
      if (this.currency == 'BTC') {
        if (!this.flag) {
          return this.$api.msg('请检查地址是否正确')
        }
        var num = (Number(this.money) + Number(this.balance))
        var result = Math.round(num * 100000000) / 100000000
        var number = Math.round(this.balances * 100000000) / 100000000
        if (result > number) {
          return this.$api.msg('转出金额大于余额')
        }
        this.getBTC()
      } else if (this.currency == 'ETH') {
        var flag = WAValidator.validate(this.address, 'ETH')
        if (flag == false) {
          return this.$api.msg('请填写正确的地址')
        }
        var num = (Number(this.money) + Number(this.balance))
        var result = Math.round(num * 1000000000000000000) / 1000000000000000000
        var number = Math.round(this.balances * 1000000000000000000) / 1000000000000000000
        var moneys = Math.round(this.balances * 1000000000000000000) / 1000000000000000000
        if (result > number) {
          return this.$api.msg('转出金额大于余额')
        }
        if (this.money < this.balance) {
          return this.$api.msg('ETH余额小于矿工费')
        }
        this.getETH()
      }
    },
    openShow () {
      this.show = true
    },
    walletConfirm (e) {
      const index = e[0]
      const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      const decrypt = CryptoJS.AES.decrypt(this.walletList[index].key, encryption).toString(CryptoJS.enc.Utf8)
      this.active = this.walletList[index].walletUname
      this.key = decrypt
      this.currency = this.walletList[index].currency
      this.meAddress = this.walletList[index].address
      this.balances = ''
      this.balance = ''
      if (this.currency == 'BTC') {
        this.btcMoneyCost()
      } else if (this.currency == 'ETH') {
        this.ethMoneyCost()
        this.ethBalance()
      }
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
  .head-box {
    padding: 0 30rpx;
    margin: 30rpx 0;
    .head {
      height: 140rpx;
      border-radius: 20rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30rpx 0;
      .head-left {
        font-size: 34rpx;
        font-weight: 600;
      }
      .head-right {
        display: flex;
        align-items: center;
        > text {
          font-size: 34rpx;
          font-weight: 600;
          color: #fb2503;
        }
        > image {
          margin-left: 40rpx;
          width: 30rpx;
          height: 20rpx;
        }
      }
    }
  }
  .head-bgc {
    height: 100rpx;
    width: 100%;
    background-color: #415aff;
  }
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
  }
}
</style>
