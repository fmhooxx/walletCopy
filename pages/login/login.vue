<template>
  <view>
    <view class="bitcoin-box">
      <view class="bitcoin-img">
        <image src="/static/login.png"></image>
      </view>
      <text>FHC</text>
    </view>
    <view class="index">
      <view class="info">
        <view>
          <u-input v-model="phone"
                   type="number"
                   placeholder="请输入手机号码"
                   :clearable="true" />
        </view>
        <view>
          <u-input v-model="pwd"
                   @blur="pwdBlur"
                   type="password"
                   placeholder="请输入密码"
                   :clearable="true" />
        </view>
      </view>
      <view class="footer">
        <view @click="goUrl('/pages/forgetPwd/forgetPwd')">忘记密码?</view>
        <view class="register"
              @click="goUrl('/pages/register/register')">立即注册</view>
      </view>
      <view class="btn"
            :class="isActives == true ? 'active' : ''"
            @click="goIndex">登录</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      // 13253495869
      // 15067434676
      // 17855355076
      phone: '',
      // 123456
      pwd: ''
      // 13566641023
      // 99329528

      // 15355575822
      // 123456
    };
  },
  computed: {
    isActives () {
      if (this.phone != '' && this.pwd != '') {
        return true
      } else {
        return false
      }
    }
  },
  onHide () {
    this.phone = ''
    this.pwd = ''
  },
  onUnload () {
    this.phone = ''
    this.pwd = ''
  },
  methods: {
    pwdBlur () {
      this.pwd = this.pwd.replace(/\s+/g, '')
    },
    otherFun (phone) {
      if (!!phone) {
        this.phone = phone
      }
    },
    async goIndex () {
      var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        return this.$api.msg('请正确填写手机号码')
      }
      if (this.pwd.length < 6 || this.pwd.length > 16) {
        return this.$api.msg('请输入六到十六位的密码')
      }
      let data = {
        username: this.phone,
        password: this.pwd
      }
      let res = await this.$api.api.login(data)
      if (res.data.code == 200) {
        var token = res.data.data.tokenHead + ' ' + res.data.data.token
        uni.setStorageSync('token', token);
        // var pages = getCurrentPages();
        // var prevPage = pages[0]
        // if (prevPage.$vm.requestAll != undefined) {
        //   prevPage.$vm.requestAll(uni.getStorageSync('list'))
        // }
        uni.reLaunch({
          url: '/pages/index/index'
        });
      } else {
        this.$api.msg(res.data.message)
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    }
  },
}
</script>

<style lang="less">
.bitcoin-box {
  width: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 100rpx;
  .bitcoin-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140rpx;
    height: 140rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0rpx 10rpx 10rpx 0rpx rgba(234, 235, 254, 1);
    > image {
      width: 100rpx;
      height: 100rpx;
    }
  }
  > text {
    margin-top: 20rpx;
    font-size: 34rpx;
    font-weight: 600;
    color: #2118e7;
  }
}
.index {
  padding: 0 60rpx;
  .info {
    > view {
      border-bottom: 1rpx solid #f2f3f5;
      margin: 40rpx 0;
    }
  }
  .footer {
    margin: 60rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > view {
      color: #c4c8cf;
      font-size: 24rpx;
    }
    .register {
      font-weight: 600;
      color: #3f59fd;
    }
  }
  .btn {
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
</style>
