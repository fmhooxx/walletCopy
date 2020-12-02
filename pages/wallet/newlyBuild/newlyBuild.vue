<template>
  <view>
    <commonWallet :num="num"></commonWallet>
    <view class="index">
      <view class="head">
        <view class="head-left">钱包分类</view>
        <view class="head-right"
              @click="openShow">
          <text>{{active}}钱包</text>
          <image src="/static/lower-arrow.png"></image>
        </view>
      </view>
      <view class="content">
        <view class="content-item">
          <image src="/static/wallet.png"></image>
          <input placeholder="请输入钱包名称"
                 placeholder-style="font-size: 28rpx;"
                 v-model="walletUname" />
        </view>
        <view class="content-item">
          <image src="/static/pwd.png"></image>
          <input placeholder="请设置钱包密码"
                 password
                 placeholder-style="font-size: 28rpx;"
                 v-model="pwd" />
        </view>
        <view class="content-item">
          <image src="/static/pwd.png"></image>
          <input placeholder="请确认钱包密码"
                 password
                 placeholder-style="font-size: 28rpx;"
                 v-model="againPwd" />
        </view>
      </view>
      <view class="footer">
        <view>1.钱包密码不同于账号密码, 请妥善保管</view>
        <view>2.建议密码格式为"大小写字母+数字+符号"</view>
      </view>
      <view class="btn"
            :class="isActives == true ? 'active' : ''"
            @click="establish">确认创建</view>
    </view>
    <!-- 钱包种类选择 -->
    <u-picker v-model="show"
              @confirm="walletConfirm"
              range-key="text"
              mode="selector"
              :range="walletList"></u-picker>
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
      num: 1,
      active: '',
      walletUname: '',
      pwd: '',
      confirmPwd: '',
      againPwd: '',
      id: '',
      contractAddress: ''
    };
  },
  onLoad (options) {
    this.contractAddress = options.contractAddress
    this.active = this.walletList[0].text
    // this.id = this.walletList[0].id
  },
  onHide () {
    this.walletUname = ''
    this.pwd = ''
    this.againPwd = ''
  },
  computed: {
    isActives () {
      if (this.walletUname != '' && this.pwd != '' && this.againPwd != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    establish () {
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
      const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      var pwd = CryptoJS.AES.encrypt(this.pwd, encryption).toString()
      const obj = {
        // wId: getApp().globalData.list.length,
        walletUname: this.walletUname,
        pwd: pwd,
        mnemonic: '',
        address: '',
        key: ''
      }
      getApp().globalData.obj = obj
      // uni.setStorageSync('list', getApp().globalData.list);
      uni.navigateTo({
        url: '/pages/wallet/one/one?currency=' + this.active + '&contractAddress=' + this.contractAddress
      });
    },
    // goUrl (url) {
    //   uni.navigateTo({
    //     url: url + '?id=' + this.id
    //   });
    // },
    openShow () {
      this.show = true
    },
    walletConfirm (e) {
      const index = e[0]
      // this.id = this.walletList[index].id
      this.active = this.walletList[index].text
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
  .head {
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
  .content {
    margin: 30rpx 0;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    .content-item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #eee;
      > input {
        width: 100%;
      }
      > image {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
      }
    }
  }
  .footer {
    > view {
      font-size: 24rpx;
      color: #ff2c04;
      font-weight: 600;
    }
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
</style>
