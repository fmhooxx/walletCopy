<template>
  <view class="index">
    <view class="title">使用助记词导入的同时修改钱包密码</view>
    <view class="head">
      <view class="head-left">钱包分类</view>
      <view class="head-right"
            @click="openShow">
        <text>{{active}}钱包</text>
        <image src="/static/lower-arrow.png"></image>
      </view>
    </view>
    <!-- 钱包种类选择 -->
    <u-picker v-model="show"
              @confirm="walletConfirm"
              range-key="text"
              mode="selector"
              :range="walletList"></u-picker>
    <view class="box">
      <view class="mnemonic">
        <textarea class="mnemonic-box"
                  v-model="mnemonic"
                  maxlength="280"
                  placeholder="输入助记词单词, 并使用空格分隔" />
      </view>
      <view class="set">
        <view class="set-head">设置密码</view>
        <view class="input-box">
          <u-input v-model="walletUname"
                   @blur="walletUnameBlur"
                   placeholder="钱包名称"
                   :clearable="true" />
        </view>
        <view class="input-box">
          <u-input v-model="pwd"
                   @blur="pwdBlur"
                   type="password"
                   placeholder="请输入密码"
                   :clearable="true" />
        </view>
        <view class="input-box">
          <u-input v-model="againPwd"
                   @blur="againPwdBlur"
                   type="password"
                   placeholder="重复输入密码"
                   :clearable="true" />
        </view>
        <view class="btn"
              @click="start"
              :class="isActives == true ? 'active' : ''">开始导入</view>
      </view>
    </view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
  data () {
    return {
      // vanish belt unique pause focus pig aunt accuse ordinary actress boy genuine
      // random fury initial leopard shuffle focus tag flip tragic angle feed absorb
      mnemonic: '',
      walletUname: '',
      pwd: '',
      againPwd: '',
      active: '',
      show: false,
      walletList: [
        {
          id: 0,
          text: 'ETH'
        },
        {
          id: 1,
          text: 'BTC'
        }
      ],
      loading: true,
      encryption: '',
      flag: '',
      pwds: '',
      contractAddress: ''
    };
  },
  computed: {
    isActives () {
      if (this.walletUname.trim().length != 0 && this.pwd.trim().length != 0 && this.againPwd.trim().length != 0) {
        return true
      } else {
        return false
      }
    }
  },
  onLoad (options) {
    this.contractAddress = options.contractAddress
    this.active = this.walletList[0].text
  },
  methods: {
    pwdBlur () {
      this.pwd = this.pwd.replace(/\s+/g, '')
    },
    againPwdBlur () {
      this.againPwd = this.againPwd.replace(/\s+/g, '')
    },
    walletUnameBlur (e) {
      this.walletUname = this.walletUname.replace(/\s+/g, '')
    },
    walletConfirm (e) {
      const index = e[0]
      this.id = this.walletList[index].id
      this.active = this.walletList[index].text
    },
    openShow () {
      this.show = true
    },
    start () {
      this.encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      if (this.walletUname.trim().length == 0) {
        return this.$api.msg('请输入钱包名称')
      }
      if (this.pwd.trim().length < 6 || this.pwd.trim().length > 16) {
        return this.$api.msg('请设置6到16位的钱包密码')
      }
      if (this.againPwd.trim().length < 6 || this.againPwd.trim().length > 16) {
        return this.$api.msg('请设置确认6到16位的钱包密码')
      }
      if (this.pwd.trim() != this.againPwd.trim()) {
        return this.$api.msg('两次密码不一致, 请重新输入')
      }
      if (this.active == '') {
        return this.$api.msg('请选择导入的钱包分类')
      }
      if (this.loading == false) {
        return this.$api.msg('请勿连续多次点击')
      }
      this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 3000);
      const pwds = CryptoJS.AES.encrypt(this.pwd, this.encryption).toString()
      this.pwds = pwds
      const list = uni.getStorageSync('list')
      if (list.length != 0) {
        this.flag = list.some(item => {
          const decrypt = CryptoJS.AES.decrypt(item.mnemonic, this.encryption).toString(CryptoJS.enc.Utf8)
          return decrypt == this.mnemonic
        })
      } else {
        this.flag = false
      }
      if (this.flag == true) {
        return this.$api.msg('该钱包已经存在, 无需再导入')
      }
      const bitcoin = require('bitcoinjs-lib');
      const bip39 = require('bip39');
      const bip32 = require('bip32');
      const bool = bip39.validateMnemonic(this.mnemonic)
      if (bool == false) {
        // this.loading = false
        this.$api.msg('助记词不正确')
      } else {
        if (this.active == 'ETH') {
          // ETH
          const ethers = require('ethers');
          const HDKey = require('ethereumjs-wallet').hdkey;
          const _wallet1 = ethers.Wallet.fromMnemonic(this.mnemonic);
          const seed = bip39.mnemonicToSeed(this.mnemonic);
          const masterKey = HDKey.fromMasterSeed(seed);
          const getChildKey = masterKey.derivePath("m/44'/60'/0'/0/" + 0)
          // 获取 ETH 地址
          const getAddress = getChildKey.getWallet().getAddressString()
          // 获取 ETH 私钥
          const getPrivateKey = getChildKey.getWallet().getPrivateKeyString().slice(2)
          const getPrivateKeys = CryptoJS.AES.encrypt(getPrivateKey, this.encryption).toString();
          const mnemonics = CryptoJS.AES.encrypt(this.mnemonic, this.encryption).toString();

          getApp().globalData.obj.address = getAddress
          getApp().globalData.obj.key = getPrivateKeys
          getApp().globalData.obj.flag = true
          getApp().globalData.obj.currency = this.active
          getApp().globalData.obj.mnemonic = mnemonics
          getApp().globalData.obj.pwd = this.pwds
          getApp().globalData.obj.walletUname = this.walletUname
          // if (getApp().globalData.obj.list != undefined) {
          //   var length = getApp().globalData.obj.list.length
          // } else {
          //   var length = 0
          // }
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
          if (uni.getStorageSync('list') == '') {
            getApp().globalData.list = []
          } else {
            getApp().globalData.list = uni.getStorageSync('list')
          }
          getApp().globalData.list.push(getApp().globalData.obj)
          uni.setStorageSync('list', getApp().globalData.list)
          getApp().globalData.obj = {}
          this.$api.msg('导入成功')
          this.getUmsMemberTradingAddress(getAddress)
          // var pages = getCurrentPages();
          // var prevPage = pages[pages.length - 2]
          // prevPage.$vm.requestAll(uni.getStorageSync('list'))
          // this.loading = false
        } else if (this.active == 'BTC') {
          // BTC
          const btcNetwork = bitcoin.networks.testnet;
          const BTCSeed = bip39.mnemonicToSeed(this.mnemonic);
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
          const BTCPrivateKeys = CryptoJS.AES.encrypt(BTCPrivateKey, this.encryption).toString();
          const mnemonics = CryptoJS.AES.encrypt(this.mnemonic, this.encryption).toString();
          getApp().globalData.obj.address = address
          getApp().globalData.obj.key = BTCPrivateKeys
          getApp().globalData.obj.flag = true
          getApp().globalData.obj.currency = this.active
          getApp().globalData.obj.mnemonic = mnemonics
          getApp().globalData.obj.pwd = this.pwds
          getApp().globalData.obj.walletUname = this.walletUname
          getApp().globalData.obj.list = []
          if (uni.getStorageSync('list') == '') {
            getApp().globalData.list = []
          } else {
            getApp().globalData.list = uni.getStorageSync('list')
          }
          getApp().globalData.list.push(getApp().globalData.obj)
          uni.setStorageSync('list', getApp().globalData.list)
          getApp().globalData.obj = {}
          this.$api.msg('导入成功')
          this.getUmsMemberTradingAddress(address)
          // var pages = getCurrentPages();
          // var prevPage = pages[pages.length - 2]
          // prevPage.$vm.requestAll(uni.getStorageSync('list'))
          // this.loading = false
        }
      }
    },
    async getUmsMemberTradingAddress (tradingAddress) {
      if (this.active == 'ETH') {
        var tokenCurrency = 'ERC20 USDT'
      } else if (this.active == 'BTC') {
        var tokenCurrency = 'Omni USDT'
      }
      let data = {
        currency: this.active,
        tokenCurrency: tokenCurrency,
        tokenTradingAddress: this.contractAddress,
        tradingAddress: tradingAddress
      }
      let res = await this.$api.api.umsMemberTradingAddress(data)
      this.$api.msg('导入成功')
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        });
      }, 1500);
    }
  },
}
</script>



<style lang="less">
.index {
  .title {
    font-size: 28rpx;
    background-color: #eee;
    padding: 30rpx;
  }
  .head {
    border: 1rpx solid #eee;
    margin: 10rpx auto;
    width: 690rpx;
    height: 100rpx;
    border-radius: 20rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .box {
    padding: 0 30rpx;
    .mnemonic-box {
      margin: 30rpx 0;
      padding: 10rpx;
      height: 400rpx;
      width: 100%;
      border-radius: 10rpx;
      border: 4rpx solid #eee;
    }
    .set {
      .set-head {
        font-size: 34rpx;
        margin-bottom: 10rpx;
      }
      .input-box {
        padding: 10rpx 0;
        border-bottom: 1rpx solid #ddd;
        margin-bottom: 20rpx;
      }
      .btn {
        font-size: 34rpx;
        margin-top: 80rpx;
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
  .popup-box {
    line-height: 240rpx;
    text-align: center;
  }
}
</style>
