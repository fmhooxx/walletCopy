<template>
  <view class="index">
    <view class="head">
      <view class="head-title">
        <u-icon size="60"
                color="#fff"
                name="list-dot"
                @click="openSide"></u-icon>
        <view @click="goUrl('/pages/chat/chat')">
          <image src="/static/news.png"></image>
          <text></text>
        </view>
      </view>
    </view>
    <view class="swiper">
      <swiper class="swiper-box"
              :current="current"
              circular
              @change="bannerChange">
        <swiper-item class="swiper-item"
                     v-for="(item, index) in banner"
                     :key="index"
                     @click="goAdministration(item, index)">
          <view class="swiper-content">
            <view class="swiper-copy"
                  v-if="current == 0 ? false:true">
              <view class="swiper-name">
                <view>{{item.walletUname}}的钱包</view>
                <text>{{item.currency}}</text>
              </view>
              <view class="swiper-money"><text class="swiper-money-one"></text><text v-if="item.flag">{{item.address}}</text><text v-else>*********</text></view>
              <view class="swiper-footer">
                <view class="swiper-one"
                      @click.stop="switchMoney(index)">
                  <view>交易地址</view>
                  <u-icon name="eye"
                          color="#b2b6c1"
                          size="40"></u-icon>
                </view>
              </view>
            </view>
            <view v-else
                  class="swiper-wallet">
              <view class="aaa"
                    @click="goUrl('/pages/ImportWallet/ImportWallet')">导入钱包</view>
              <view @click="goUrl('/pages/wallet/newlyBuild/newlyBuild')">新建钱包</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view class="swiper-ids">
        <view v-for="(item, index) in banner"
              :key="index"
              :class="index == current ? 'active-ids':''"></view>
      </view>
    </view>
    <view class="center">
      <view class="center-title">
        <view class="title-common"
              @click="goUrl('/pages/collection/collection')">
          <image src="/static/transfer-out.png"></image>
          <view>收款</view>
        </view>
        <text></text>
        <view class="title-common"
              @click="goUrl('/pages/collection/transferOut/transferOut')">
          <image src="/static/collection.png"></image>
          <view>转账</view>
        </view>
      </view>
      <view class="assets">
        <view class="assets-title">
          <view><text></text>我的资产</view>
          <image @click="goAssetsBox"
                 v-if="false"
                 src="/static/plus.png"></image>
        </view>
        <view class="assets-list">
          <swiper :current="current"
                  circular
                  class="assets-swiper"
                  @change="bannersChange">
            <swiper-item v-for="(item, index) in banner"
                         :key="index">
              <view v-for="(k,y) in item.list"
                    :key="y"
                    class="list"
                    @click="goAssets(item, k)">
                <view class="list-left">
                  <image :src="k.img"></image>
                  <text>{{k.text}}</text>
                </view>
                <view class="list-right">
                  <text v-if="k.unitPrice == undefined ? false:true">{{k.unitPrice}}</text>
                  <!-- <view>≈<text>¥</text>{{k.money}}</view> -->
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <!-- 侧边弹出层 -->
    <u-popup v-model="isSide"
             width="60%">
      <view class="side-box">
        <view class="side-title">
          <image src="/static/avatar.png"></image>
          <view>
            <view class="side-communityLevel">{{info.communityLevel | communityLevels}}</view>
            <view>{{info.id}}</view>
            <!-- <text>已实名</text> -->
          </view>
        </view>
        <view class="side-list">
          <view class="side-item"
                v-for="(item, index) in sideList"
                @click="goOther(item.id)"
                :key="index">
            <image :src="item.img"></image>
            <text>{{item.text}}</text>
          </view>
        </view>
        <view class="side-footer"
              @click="signOut">
          <image src="/static/sign-out.png"></image>
          <view>退出登录</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      info: {},
      isSide: false,
      sideList: [
        {
          id: 0,
          text: '联系人',
          img: '/static/contacts.png'
        },
        {
          id: 1,
          text: '分享推广',
          img: '/static/share.png'
        },
        // {
        //   id: 2,
        //   text: '社区申请',
        //   img: '/static/authentication.png'
        // },
        {
          id: 3,
          text: '社区管理',
          img: '/static/community.png'
        },
        {
          id: 4,
          text: '意见反馈',
          img: '/static/feedback.png'
        },
        // {
        //   id: 5,
        //   text: '安全中心',
        //   img: '/static/set.png'
        // }
      ],
      current: 0,
      banner: [
        // {
        //   id: 0,
        //   name: '张三',
        //   money: '239,852.00',
        //   img: '/static/qrCode.png',
        //   flag: true,
        //   list: [
        //     {
        //       lId: 0,
        //       img: '/static/bitcoin.png',
        //       text: 'ETH',
        //       unitPrice: '8.00',
        //       money: '12388.68'
        //     },
        //     {
        //       lId: 1,
        //       img: '/static/bitcoin.png',
        //       text: 'BTC',
        //       unitPrice: '800.00',
        //       money: '324238.76'
        //     }
        //   ]
        // },
        // {
        //   id: 1,
        //   name: '李四',
        //   money: '318,346.00',
        //   img: '/static/qrCode.png',
        //   flag: true
        // },
        {
          id: 0
        }
      ],
      bannerLength: null,
      address: '',
      money: '',
      // 正式USDT
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      // 测试 USDT(自己发行的)
      // contractAddress: '0x2416e70196910fa663284cb7e53a6cc8172d1890',
      // contractAddress: '0xccc84eefc50008ef78473f9c8d2be4b4ce730417',
      // 自己发行的FHC
      // FHC: '0xccc84eefc50008ef78473f9c8d2be4b4ce730417',
    };
  },
  onShow () {
    this.banner = [{ id: 0 }]
    this.banner.push(...uni.getStorageSync('list'))
    this.bannerLength = this.banner.length
    this.current = 0
    this.getInfo()
    this.getIf()
  },
  onLoad () {
    // this.getInfo()
    // this.getIf()
  },
  onUnload () {
    this.isSide = false
  },
  onHide () {
    this.banner = [{ id: 0 }]
    this.bannerLength = this.banner.length
    this.isSide = false
  },
  filters: {
    communityLevels (val) {
      if (val == 0) {
        return val = '会员D0'
      }
      if (val == 1) {
        return val = '管理D1'
      }
      if (val == 2) {
        return val = '管理D2'
      }
      if (val == 3) {
        return val = '管理D3'
      }
      if (val == 4) {
        return val = '管理D4'
      }
      if (val == 5) {
        return val = '管理D5'
      }
    }
  },
  methods: {
    // requestAll (data) {
    //   this.banner = [{ id: 0 }]
    //   this.banner.push(...uni.getStorageSync('list'))
    //   this.bannerLength = this.banner.length
    //   this.current = 0
    //   this.getInfo()
    //   this.getIf()
    // },
    goAdministration (item, index) {
      if (index == 0) return
      uni.navigateTo({
        url: '/pages/administration/administration?index=' + index
      });
    },
    goAssetsBox () {
      if (this.current == 0) {
        return
      }
      uni.navigateTo({
        url: '/pages/assetsBox/index/index?current=' + this.current
      });
    },
    async getInfo () {
      let res = await this.$api.api.getInfo()
      if (res.data.code == 200) {
        this.info = res.data.data
        uni.setStorageSync('id', res.data.data.id)
        uni.setStorageSync('phone', res.data.data.phone)
      }
    },
    async getIf () {
      let res = await this.$api.api.userSign()
      uni.setStorageSync('sign', res.data.data)
    },
    goOther (id) {
      if (this.info.id == '' && this.info.id == undefined) {
        return this.$api.msg('请先登录')
      }
      if (id == 0) {
        this.goUrl('/pages/contactPeople/contactPeople')
      } else if (id == 1) {
        this.goUrl('/pages/share/share')
      } else if (id == 2) {
        this.goUrl('/pages/community/community')
        // if (this.info.topReferrerStatus == 0) {
        //   this.goUrl('/pages/community/community')
        // } else if (this.info.topReferrerStatus == 1) {
        //   this.goUrl('/pages/extension/extension')
        // }
      } else if (id == 3) {
        this.goUrl('/pages/extension/extension')
        // this.goUrl('/pages/realName/realName')
      } else if (id == 4) {
        this.goUrl('/pages/feedback/feedback')
      } else if (id == 5) {
        this.goUrl('/pages/index/security')
      }
    },
    goAssets (item, k) {
      if (k.text == 'USDT') {
        uni.navigateTo({
          url: '/pages/assets/assets?text=' + k.text + '&current=' + this.current + '&lId=' + k.lId + '&contractAddress=' + this.contractAddress
        });
      } else if (k.text == 'ETH') {
        uni.navigateTo({
          url: '/pages/collection/transferOut/transferOut?current=' + this.current
        });
      } else if (k.text == 'FHC') {
        uni.navigateTo({
          url: '/pages/assets/assets?text=' + k.text + '&current=' + this.current + '&lId=' + k.lId + '&contractAddress=' + this.FHC
        });
      }
    },
    goUrl (url) {
      if (url == '/pages/collection/collection' || url == '/pages/collection/transferOut/transferOut') {
        if (uni.getStorageSync('list') == '') {
          return this.$api.msg('请先导入钱包或者新建钱包')
        }
      }
      if (url == '/pages/chat/chat') {
        return
      }
      let token = uni.getStorageSync('token')
      if (token == '') {
        uni.reLaunch({
          url: '/pages/login/login'
        });
      } else {
        if (url == '/pages/wallet/newlyBuild/newlyBuild' || url == '/pages/ImportWallet/ImportWallet') {
          uni.navigateTo({
            url: url + '?contractAddress=' + this.contractAddress
          });
        } else {
          uni.navigateTo({
            url: url
          });
        }
      }
    },
    switchMoney (index) {
      this.banner[index].flag = !this.banner[index].flag
    },
    bannerChange (e) {
      this.current = e.detail.current
      if (this.banner[this.current].currency == 'ETH') {
        this.ethCalls(this.current, this.contractAddress, 'USDT')
        // this.ethCalls(this.current, this.FHC, 'FHC')
        this.getEth(this.current)
      }
    },
    bannersChange (e) {
      this.current = e.detail.current
    },
    async getEth (number) {
      if (this.current == 0) {
        return
      }
      if (this.banner[number] != undefined) {
        this.address = this.banner[number].address
      } else {
        this.address = ''
      }
      let data = {
        address: this.address
      }
      let res = await this.$api.api.getEthBalance(data)
      if (res.data.code == 200) {
        this.banner = [{ id: 0 }]
        this.banner.push(...uni.getStorageSync('list'))
        this.bannerLength = this.banner.length
        let num = res.data.data.balance / 1000000000000000000
        this.banner[number].list[1].unitPrice = num
        getApp().globalData.list = uni.getStorageSync('list')
        getApp().globalData.list[this.current - 1].list[1].unitPrice = num
        uni.setStorageSync('list', getApp().globalData.list)
      }
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
    // 查询 USDT 精度问题
    async accuracy (number, coinAddress, type, money) {
      if (this.current == 0) {
        return
      }
      if (this.banner[number] != undefined) {
        this.address = this.banner[number].address
      } else {
        this.address = ''
      }
      let value = 0
      const addPreZero = (num) => (num == null || num.length == null || num.length <= 0 || num <= 0) ? '' : ('0000000000000000000000000000000000000000000000000000000000000000' + num.replace('0x', '')).slice(-64)
      let total = this.functionSignature('decimals') + addPreZero(this.address) + addPreZero(value.toString(16))
      let datas = {
        // 钱包地址
        account: this.address,
        // 合约地址
        coinAddress: coinAddress,
        function: total
      }
      let ress = await this.$api.api.ethCall(datas)
      if (ress.data.code == 200) {
        var str = ress.data.data.result
        var num = parseInt(str, 16)
        var result = Math.pow(10, num)
        uni.setStorageSync('accuracy', result);
        this.banner = [{ id: 0 }]
        this.banner.push(...uni.getStorageSync('list'))
        this.bannerLength = this.banner.length
        if (type == 'USDT') {
          this.banner[number].list[0].unitPrice = money / result
          getApp().globalData.list[number - 1].list[0].unitPrice = money / result
        } else if (type == 'FHC') {
          this.banner[number].list[2].unitPrice = money / result
          getApp().globalData.list[number - 1].list[2].unitPrice = money / result
        }
        uni.setStorageSync('list', getApp().globalData.list);
      }
    },
    // 查询USDT的余额
    async ethCalls (number, coinAddress, type) {
      if (this.current == 0) {
        return
      }
      if (this.banner[number] != undefined) {
        this.address = this.banner[number].address
      } else {
        this.address = ''
      }
      let value = 0
      const addPreZero = (num) => (num == null || num.length == null || num.length <= 0 || num <= 0) ? '' : ('0000000000000000000000000000000000000000000000000000000000000000' + num.replace('0x', '')).slice(-64)
      let content = this.functionSignature('balanceOf') + addPreZero(this.address) + addPreZero(value.toString(16))
      let data = {
        // 钱包地址
        account: this.address,
        // 合约地址
        coinAddress: coinAddress,
        function: content
      }
      let res = await this.$api.api.ethCall(data)
      if (res.data.code == 200) {
        // console.log(res)
        var str = res.data.data.result
        let money = parseInt(str, 16)
        this.accuracy(number, coinAddress, type, money)
      }
    },
    openSide () {
      this.isSide = true
    },
    signOut () {
      this.isSide = false
      uni.showModal({
        title: '温馨提示',
        content: '退出后将删除所有钱包数据,请务必确保所有钱包已备份',
        confirmColor: '#384eec',
        success: (res) => {
          if (res.confirm) {
            this.logout()
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async logout () {
      let data = {}
      let res = await this.$api.api.logout(data)
      if (res.data.code == 200) {
        uni.clearStorageSync()
        getApp().globalData.list = []
        // uni.removeStorageSync('token');
        uni.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        this.$api.msg(res.data.message)
      }
    }
  },
};
</script>
<style>
page {
  background-color: #f9f9f9;
}
</style>

<style lang="less">
.index {
  position: relative;
  .head {
    width: 100%;
    height: 360rpx;
    background-color: #3e57fc;
    .head-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;
      > view {
        position: relative;
        > image {
          width: 44rpx;
          height: 44rpx;
        }
        > text {
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          width: 8rpx;
          height: 8rpx;
          border-radius: 50%;
          background-color: red;
        }
      }
    }
  }
  .swiper {
    height: 360rpx;
    width: 100%;
    position: absolute;
    top: 100rpx;
    left: 50%;
    transform: translate(-50%);
    .swiper-box {
      height: 100%;
      width: 100%;
      .swiper-item {
        width: 100%;
        height: 100%;
        padding: 0 28rpx;
        box-sizing: border-box;
        border-radius: 20rpx;
        .swiper-content {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
          background-color: #fff;
          .swiper-copy {
            width: 100%;
            height: 100%;
            padding: 30rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .swiper-name {
              color: #b2b6c1;
              display: flex;
              align-items: center;
              > text {
                margin-left: 20rpx;
                font-size: 24rpx;
                padding: 4rpx 10rpx;
                border-radius: 20rpx;
                background-color: #eaebfb;
              }
            }
            .swiper-money {
              font-size: 38rpx;
              font-weight: 700;
              white-space: nowrap; /*一行显示*/
              overflow: hidden; /*超出部分隐藏*/
              text-overflow: ellipsis; /*用...代替超出部分*/
              .swiper-money-one {
                margin: 0 10rpx;
              }
            }
            .swiper-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .swiper-one {
                display: flex;
                align-items: center;
                > view {
                  margin-right: 16rpx;
                  color: #b2b6c1;
                }
              }
              > image {
                width: 80rpx;
                height: 80rpx;
              }
            }
          }
          .swiper-wallet {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            > view {
              width: 240rpx;
              height: 100rpx;
              border-radius: 50rpx;
              font-size: 30rpx;
              font-weight: 600;
              color: #fff;
              line-height: 100rpx;
              text-align: center;
              &:first-child {
                background-color: #fed90d;
              }
              &:last-child {
                background-color: #3f59fe;
              }
            }
          }
        }
      }
    }
    .swiper-ids {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      > view {
        height: 6rpx;
        width: 20rpx;
        background-color: #d1d6fb;
        margin: 0 10rpx;
      }
      .active-ids {
        width: 40rpx;
        background-color: #3a53fa;
        transition: all 0.6s;
      }
    }
  }
  .center {
    margin-top: 160rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    .center-title {
      // padding: 30rpx 0;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background-color: #fff;
      border-radius: 20rpx;
      > text {
        height: 30rpx;
        width: 2rpx;
        background-color: #f5f4f5;
      }
      .title-common {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: center;
        > image {
          width: 50rpx;
          height: 50rpx;
          margin-right: 20rpx;
        }
        > view {
          font-size: 28rpx;
          font-weight: 600;
        }
      }
    }
    .assets {
      margin-top: 30rpx;
      background-color: #fff;
      border-radius: 20rpx 20rpx 0 0;
      box-sizing: border-box;
      .assets-title {
        padding: 0 30rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1rpx solid #eee;
        > view {
          font-size: 28rpx;
          font-weight: 600;
          > text {
            display: inline-block;
            height: 20rpx;
            margin-right: 16rpx;
            border-left: 4rpx solid #3e57fc;
          }
        }
        > image {
          width: 40rpx;
          height: 40rpx;
        }
      }
      .assets-list {
        box-sizing: border-box;
        width: 92%;
        height: 100%;
        display: flex;
        position: fixed;
        flex-direction: column;
        .assets-swiper {
          flex: 1;
          background-color: #fff;
          padding: 0 30rpx;
          .list {
            height: 120rpx;
            border-bottom: 1rpx solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .list-left {
              display: flex;
              align-items: center;
              > image {
                width: 80rpx;
                height: 80rpx;
                margin-right: 20rpx;
              }
              > text {
                font-size: 38rpx;
                font-weight: 600;
              }
            }
            .list-right {
              text-align: right;
              > text {
                display: inline-block;
                margin-bottom: 20rpx;
                font-size: 34rpx;
                font-weight: 600;
              }
              > view {
                font-size: 26rpx;
                font-weight: 600;
                color: #fd4f30;
                > text {
                  display: inline-block;
                  margin: 0 6rpx;
                }
              }
            }
          }
        }
      }
    }
  }
  // 侧边弹出层样式
  .side-box {
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .side-title {
      padding: 160rpx 0 0 60rpx;
      display: flex;
      align-items: center;
      > image {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        margin-right: 40rpx;
      }
      > view {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .side-communityLevel {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20rpx;
          font-size: 24rpx;
          color: #fff;
          background: linear-gradient(131deg, #ddba8c 0%, #eed3a0 100%);
        }
        > view {
          font-size: 30rpx;
          font-weight: 600;
          margin: 10rpx 0;
        }
        > text {
          font-size: 24rpx;
          margin-top: 16rpx;
          width: 120rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          border-radius: 20rpx;
          background-color: #5c6eee;
        }
      }
    }
    .side-list {
      // margin-top: 180rpx;
      padding-left: 60rpx;
      .side-item {
        display: flex;
        align-items: center;
        margin: 60rpx 0;
        > image {
          width: 46rpx;
          height: 46rpx;
        }
        > text {
          margin-left: 40rpx;
        }
      }
    }
    .side-footer {
      // margin-top: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > image {
        width: 44rpx;
        height: 44rpx;
      }
      > view {
        margin-top: 20rpx;
      }
    }
  }
  /deep/.uni-scroll-view-content {
    background-color: #3e57fc;
  }
}
</style>
