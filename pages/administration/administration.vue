<template>
  <view class="index">
    <view class="head-box">
      <view class="head common"
            @click="copy">
        <text>钱包地址</text>
        <view>{{obj.address}}</view>
      </view>
      <view class="wallet-uname common"
            @click="openPopup">
        <text>钱包名称</text>
        <view class="common-right">
          <view>{{obj.walletUname}}</view>
          <text></text>
        </view>
      </view>
    </view>
    <u-popup v-model="show"
             border-radius="14"
             width="500rpx"
             mode="center">
      <view class="popup">
        <view class="popup-head">钱包名称</view>
        <view class="popup-input">
          <input placeholder="请输入新的钱包名称"
                 focus
                 v-model="walletUname" />
        </view>
        <view class="popup-footer">
          <view class="popup-left"
                @click="closePopup">取消</view>
          <text></text>
          <view class="popup-right"
                @click="determine">确认</view>
        </view>
      </view>
    </u-popup>
    <view class="wallet"
          @click="openPwd(1)">
      <view>钱包备份</view>
      <text></text>
    </view>
    <view class="footer"
          @click="openPwd(2)">移除</view>
    <u-popup v-model="walletShow"
             border-radius="14"
             width="500rpx"
             mode="center">
      <view class="popup">
        <view class="popup-head">请输入密码</view>
        <view class="popup-input">
          <input placeholder="请输入密码"
                 focus
                 password
                 v-model="pwd" />
        </view>
        <view class="popup-footer">
          <view class="popup-left"
                @click="closePwd">取消</view>
          <text></text>
          <view class="popup-right"
                @click="determinePwd">确认</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
  data () {
    return {
      obj: {},
      show: false,
      walletUname: '',
      index: '',
      walletShow: false,
      pwd: '',
      type: ''
    };
  },
  onLoad (options) {
    this.index = options.index
    this.obj = uni.getStorageSync('list')[this.index - 1]
  },
  onHide () {
    this.pwd = ''
    this.walletUname = ''
    this.show = false
    this.walletShow = false
  },
  methods: {
    openPwd (type) {
      this.type = type
      this.walletShow = true
    },
    closePwd () {
      this.pwd = ''
      this.walletShow = false
    },
    determinePwd () {
      const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
      const decrypt = CryptoJS.AES.decrypt(this.obj.pwd, encryption).toString(CryptoJS.enc.Utf8)
      if (this.pwd.trim().length < 6 || this.pwd.trim().length > 16) {
        this.pwd = ''
        return this.$api.msg('请输入6到16位的钱包密码')
      }
      if (this.pwd != decrypt) {
        this.pwd = ''
        return this.$api.msg('密码不正确, 请重新输入')
      }
      if (this.type == 1) {
        uni.navigateTo({
          url: '/pages/administration/tips?index=' + this.index
        });
      }
      if (this.type == 2) {
        this.$api.msg('操作成功')
        // setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        });
        // }, 1500);
        getApp().globalData.list = uni.getStorageSync('list');
        getApp().globalData.list.splice(this.index - 1, 1)
        uni.setStorageSync('list', getApp().globalData.list)
        // var pages = getCurrentPages();
        // var prevPage = pages[pages.length - 1]
        // prevPage.$vm.requestAll(uni.getStorageSync('list'))
      }
    },
    determine () {
      if (this.walletUname.trim() == '') {
        this.walletUname = ''
        return this.$api.msg('请输入内容')
      }
      getApp().globalData.list[this.index - 1].walletUname = this.walletUname
      uni.setStorageSync('list', getApp().globalData.list)
      this.show = false
      this.walletUname = ''
    },
    openPopup () {
      this.show = true
    },
    closePopup () {
      this.walletUname = ''
      this.show = false
    },
    copy () {
      uni.setClipboardData({
        data: this.obj.address,
        success: (data) => {
          uni.getClipboardData({
            success: res => {
              this.$api.msg('复制成功')
            }
          })
        }
      })
    }
  },
}
</script>

<style>
page {
  background-color: #f6f6f6;
}
</style>

<style lang="less">
.index {
  .head-box {
    padding: 0 30rpx;
    background-color: #fff;
    .common {
      padding: 20rpx 0;
    }
    .head {
      border-bottom: 1rpx solid #f6f6f6;
      > view {
        color: #aaa;
        font-size: 28rpx;
      }
    }
    .wallet-uname {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #f6f6f6;
      .common-right {
        display: flex;
        align-items: center;
        > text {
          margin-left: 10rpx;
          width: 20rpx;
          height: 20rpx;
          border-bottom: 4rpx solid #bbb;
          border-right: 4rpx solid #bbb;
          transform: rotate(-45deg);
        }
      }
    }
  }
  .wallet {
    padding: 20rpx 30rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > text {
      margin-left: 10rpx;
      width: 20rpx;
      height: 20rpx;
      border-bottom: 4rpx solid #bbb;
      border-right: 4rpx solid #bbb;
      transform: rotate(-45deg);
    }
  }
  .popup {
    padding: 30rpx;
    .popup-head {
      font-size: 34rpx;
      font-weight: 600;
      text-align: center;
    }
    .popup-input {
      border: 1rpx solid #ddd;
      border-radius: 10rpx;
      padding: 10rpx;
      margin: 30rpx 0;
    }
    .popup-footer {
      border-top: 1rpx solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-around;
      // justify-content: space-evenly;
      > view {
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 10rpx;
        font-size: 32rpx;
        font-weight: 600;
        color: #415aff;
      }
      > text {
        width: 4rpx;
        height: 60rpx;
        background-color: #ddd;
      }
      .popup-left {
      }
      .popup-right {
      }
    }
  }
  .footer {
    text-align: center;
    margin-top: 60rpx;
    color: red;
    font-size: 34rpx;
    padding: 20rpx 30rpx;
    background-color: #fff;
  }
}
/deep/.u-mode-center-box {
  background-color: #f6f6f6;
}
</style>
