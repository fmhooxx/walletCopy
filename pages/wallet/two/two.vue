<template>
  <view>
    <commonWallet :num="num"></commonWallet>
    <view class="index">
      <view class="content"
            v-if="ids.length != 0">
        <view v-for="(item, index) in ids"
              :key="index">{{item.text}}</view>
      </view>
      <view class="list">
        <view class="item"
              v-for="(item, index) in list"
              @click="shishiClick(item)"
              :class="item.flag == true ? 'active':''"
              :key="index">{{item.text}}</view>
      </view>
      <view class="text">请按顺序点击您刚才抄写保存的助记词, 再次点击可取消选择</view>
      <view class="btn"
            :class="isActives == true ? 'active' : ''"
            @click="goIndex">确认</view>
    </view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
import commonWallet from '../commonWallet/commonWallet'
export default {
  components: {
    commonWallet
  },
  data () {
    return {
      num: 3,
      list: [],
      ids: [],
      // arr: [],
      // newArr: [],
      newList: [],
      mnemonic: '',
      id: '',
      textList: [],
      // 币种
      currency: '',
      loading: true,
      contractAddress: ''
    };
  },
  onLoad (options) {
    this.contractAddress = options.contractAddress
    console.log(options.contractAddress)
    this.currency = options.currency
    const newIds = uni.getStorageSync('mnemonicList')
    this.newList = uni.getStorageSync('mnemonicList')
    this.mnemonic = uni.getStorageSync('mnemonic')
    this.list = this.rand(newIds)
    // this.newArr = this.newList.map((item, index) => {
    //   return item.id
    // })
  },
  onBackPress (options) {
    if (options.from === 'navigateBack') {
      return false;
    }
    this.back();
    return true;
  },
  computed: {
    isActives () {
      if (this.textList.length == 12) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    back () {
      uni.navigateBack({
        delta: 3
      });
    },
    // 打乱数组的排列方式
    rand (arr) {
      var len = arr.length
      //首先从最大的数开始遍历，之后递减
      for (var i = arr.length - 1; i >= 0; i--) {
        //随机索引值randomIndex是从0-arr.length中随机抽取的
        var randomIndex = Math.floor(Math.random() * (i + 1));
        //下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
        var itemIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemIndex;
      }
      //每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
      return arr;
    },
    goIndex () {
      // this.loading = true
      if (this.loading == false) {
        return this.$api.msg('请勿连续多次点击')
      }
      this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 100000);
      const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      const bitcoin = require('bitcoinjs-lib');
      const bip39 = require('bip39');
      const bip32 = require('bip32');
      if (this.textList.length < 12) {
        // this.loading = false
        this.$api.msg('请将助记词选择完整');
      } else {
        const bool = this.textList.join(' ')
        const flag = bip39.validateMnemonic(bool)
        // const flag = this.scalarArrayEquals(this.arr, this.newArr)
        if (flag == true) {
          if (this.currency == 'ETH') {
            // ETH
            const ethers = require('ethers');
            const HDKey = require('ethereumjs-wallet').hdkey;
            const _wallet1 = ethers.Wallet.fromMnemonic(bool);
            const seed = bip39.mnemonicToSeed(bool);
            const masterKey = HDKey.fromMasterSeed(seed);
            const getChildKey = masterKey.derivePath("m/44'/60'/0'/0/" + 0)
            // 获取 ETH 地址
            const getAddress = getChildKey.getWallet().getAddressString()
            // 获取 ETH 私钥
            const getPrivateKey = getChildKey.getWallet().getPrivateKeyString().slice(2)
            // this.currency = 'ETH'

            const getPrivateKeys = CryptoJS.AES.encrypt(getPrivateKey, encryption).toString();
            const mnemonics = CryptoJS.AES.encrypt(this.mnemonic, encryption).toString();

            getApp().globalData.obj.address = getAddress
            getApp().globalData.obj.key = getPrivateKeys
            getApp().globalData.obj.flag = true
            getApp().globalData.obj.currency = this.currency
            getApp().globalData.obj.mnemonic = mnemonics
            if (getApp().globalData.obj.list != undefined) {
              var length = getApp().globalData.obj.list.length
            } else {
              var length = 0
            }
            getApp().globalData.obj.list = [
              {
                lId: 0,
                img: '/static/USDT.png',
                text: 'USDT',
                unitPrice: '0',
                money: '0'
              },
              {
                lId: 1,
                img: '/static/eth.png',
                text: 'ETH',
                unitPrice: '0',
                money: '0'
              },
              // {
              //   lId: 2,
              //   img: '/static/FHC.png',
              //   text: 'FHC',
              //   unitPrice: '0',
              //   money: '0'
              // }
            ]
            this.getUmsMemberTradingAddress(getAddress)
            // console.log('ETH 地址:' + getAddress)
            // console.log('ETH 私钥:' + getPrivateKey)
          } else if (this.currency == 'BTC') {
            // BTC
            // const btcNetwork = bitcoin.networks.testnet;
            const btcNetwork = bitcoin.networks.mainnet;
            const BTCSeed = bip39.mnemonicToSeed(bool);
            const BTCNode = bip32.fromSeed(BTCSeed, btcNetwork);
            const BTCPath = "m/44'/0'/0'/0/0";
            const BTCChild = BTCNode.derivePath(BTCPath);
            // 获取 BTC 私钥
            const BTCPrivateKey = BTCChild.toWIF();
            const BTCKeyPair = bitcoin.ECPair.fromWIF(BTCPrivateKey, btcNetwork);
            // 获取 BTC 地址
            const {
              address
            } = bitcoin.payments.p2pkh({
              pubkey: BTCKeyPair.publicKey,
              network: btcNetwork
            });
            // this.currency = 'BTC'
            const BTCPrivateKeys = CryptoJS.AES.encrypt(BTCPrivateKey, encryption).toString();
            const mnemonics = CryptoJS.AES.encrypt(this.mnemonic, encryption).toString();
            getApp().globalData.obj.address = address
            getApp().globalData.obj.key = BTCPrivateKeys
            getApp().globalData.obj.flag = true
            getApp().globalData.obj.currency = this.currency
            getApp().globalData.obj.list = []
            getApp().globalData.obj.mnemonic = mnemonics
            this.getUmsMemberTradingAddress(address)
            // console.log('BTC 私钥:' + BTCPrivateKey)
            // console.log('BTC 地址:' + address)
          }
        } else {
          // this.loading = false
          this.$api.msg('助记词的顺序错误, 请重新选择');
        }
      }
    },
    // tokenCurrency 代币种类 BTC 的时候填 Omni USDT, ETH 的时候 ERC20 USDT
    // tokenTradingAddress 代表地址和 交易地址 tradingAddress 相同
    async getUmsMemberTradingAddress (tradingAddress) {
      if (this.currency == 'ETH') {
        var tokenCurrency = 'ERC20 USDT'
      } else if (this.currency == 'BTC') {
        var tokenCurrency = 'Omni USDT'
      }
      let data = {
        currency: this.currency,
        tokenCurrency: tokenCurrency,
        tokenTradingAddress: this.contractAddress,
        tradingAddress: tradingAddress
      }
      let res = await this.$api.api.umsMemberTradingAddress(data)
      if (res.data.code == 200) {
        // this.loading = false
        if (uni.getStorageSync('list') == '') {
          getApp().globalData.list = []
        } else {
          getApp().globalData.list = uni.getStorageSync('list')
        }
        getApp().globalData.list.push(getApp().globalData.obj)
        uni.setStorageSync('list', getApp().globalData.list)
        this.$api.msg(res.data.message);
        uni.removeStorageSync('mnemonic')
        uni.removeStorageSync('mnemonicList')
        getApp().globalData.obj = {}
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          });
        }, 1500);
        // var pages = getCurrentPages();
        // var prevPage = pages[pages.length - 4]
        // prevPage.$vm.requestAll(uni.getStorageSync('list'))
        // uni.navigateBack({
        //   delta: 3
        // });
      } else {
        // this.loading = false
        this.$api.msg(res.data.message);
      }
    },
    // proud night december enrich umbrella vanish mass excite thank river thunder inquiry
    // 判断两个数组的数据是否相同
    // scalarArrayEquals (array1, array2) {
    //   return array1.length == array2.length && array1.every(function (v, i) { return v === array2[i] });
    // },
    shishiClick (item) {
      const { text, id } = item
      var flag = this.ids.some(item => {
        return item.id == id
      })
      var index = this.list.findIndex(item => {
        return item.id == id
      })
      if (flag == false) {
        this.list[index].flag = true
        this.ids.push(this.list[index])
        // this.arr.push(id)
        this.textList.push(this.list[index].text)
      } else {
        var i = this.ids.findIndex(item => {
          return item.id == id
        })
        this.list[index].flag = false
        this.ids.splice(i, 1)
        // this.arr.splice(i, 1)
        this.textList.splice(i, 1)
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
  padding: 0 30rpx;
  .content {
    margin: 30rpx 0;
    padding: 30rpx;
    border-radius: 30rpx;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    > view {
      padding: 6rpx;
      box-sizing: content-box;
      width: 20%;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border-radius: 12rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      margin-right: 10rpx;
      font-size: 26rpx;
      color: #415aff;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      padding: 6rpx;
      box-sizing: content-box;
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 12rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      font-size: 26rpx;
    }
    .active {
      background-color: #415aff;
      color: #fff;
    }
  }
  .text {
    font-size: 24rpx;
    padding: 20rpx;
    border-radius: 30rpx;
    color: #fb2503;
    background-color: #fff;
  }
  .btn {
    margin: 100rpx auto 0;
    width: 500rpx;
    height: 100rpx;
    color: #fff;
    font-weight: 600;
    font-size: 32rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50rpx;
    background-color: #d4d8e4;
  }
  .active {
    background-color: #415aff;
  }
}
.popup-box {
  line-height: 240rpx;
  text-align: center;
}
</style>
