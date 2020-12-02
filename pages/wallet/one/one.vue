<template>
  <view>
    <commonWallet :num="num"></commonWallet>
    <view class="index">
      <view class="list">
        <view class="item"
              v-for="(item, index) in list"
              :key="index">{{item.text}}</view>
      </view>
      <view class="text">请将上面的助记词按顺序抄写在一张纸上, 保存在安全的地方</view>
      <view class="btn"
            @click="goUrl('/pages/wallet/two/two')">已抄写到纸上</view>
    </view>
  </view>
</template>

<script>
// import '../../../all.js'
import commonWallet from '../commonWallet/commonWallet'
export default {
  components: {
    commonWallet
  },
  data () {
    return {
      num: 2,
      list: [],
      currency: '',
      contractAddress: ''
    };
  },
  onLoad (options) {
    this.contractAddress = options.contractAddress
    // 生成助记词
    this.getMnemonic()
    this.currency = options.currency
  },
  onBackPress (options) {
    if (options.from === 'navigateBack') {
      return false;
    }
    this.back();
    return true;
  },
  methods: {
    back () {
      uni.navigateBack({
        delta: 2
      });
    },
    getMnemonic () {
      const bip39 = require('bip39');
      const mnemonic = bip39.generateMnemonic()
      var arr = []
      arr = mnemonic.split(' ')
      this.list = arr.map((item, index) => ({ text: item, id: index }))
      uni.setStorageSync('mnemonicList', this.list);
      uni.setStorageSync('mnemonic', mnemonic);
    },
    goUrl (url) {
      uni.navigateTo({
        url: url + '?currency=' + this.currency + '&contractAddress=' + this.contractAddress
      });
    },
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
}
</style>
