<template>
  <view class="index">
    <view class="head">忘记密码</view>
    <view class="common pwd-box">
      <text>+86</text>
      <view>
        <u-input v-model="phone"
                 type="number"
                 placeholder="请输入手机号码"
                 :clearable="true" />
      </view>
    </view>
    <view class="common">
      <text>验证码</text>
      <view>
        <u-input v-model="code"
                 type="number"
                 placeholder="请输入验证码"
                 :clearable="true" />
      </view>
      <text class="code"
            v-if="isLogin"
            @click="getCode">获取验证码</text>
      <text class="code"
            v-else>{{num}}秒后重发</text>
    </view>
    <view class="common pwd-box">
      <text>密码</text>
      <view>
        <u-input v-model="pwd"
                 type="password"
                 @blur="pwdBlur"
                 placeholder="请设置新密码"
                 :clearable="true" />
      </view>
    </view>
    <view class="btn"
          :class="isActives == true ? 'active' : ''"
          @click="modify">修改</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      // 控制发送以及剩余时间的切换显示
      isLogin: true,
      // 定时器命名
      timer: '',
      // 倒计时内容
      num: 60,
      phone: '',
      code: '',
      pwd: ''
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
  methods: {
    pwdBlur () {
      this.pwd = this.pwd.replace(/\s+/g, '')
    },
    modify () {
      uni.showModal({
        title: '温馨提示',
        confirmColor: '#3f59fd',
        content: '确认修改密码?',
        success: (res) => {
          if (res.confirm) {
            this.modifyPwd()
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async modifyPwd () {
      var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        return this.$api.msg('请正确填写手机号码')
      }
      if (this.code.length != 6) {
        return this.$api.msg('请输入六位数的验证码')
      }
      if (this.pwd.length < 6 || this.pwd.length > 16) {
        return this.$api.msg('请输入六到十六位的密码')
      }
      let data = {
        telephone: this.phone,
        password: this.pwd,
        authCode: this.code
      }
      let res = await this.$api.api.updatePassword(data)
      if (res.data.code == 200) {
        this.$api.msg('修改密码成功')
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]
        prevPage.$vm.otherFun(this.phone)
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 1500);
      } else {
        this.$api.msg(res.data.message)
      }
    },
    async getCode () {
      var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        return this.$api.msg('请正确填写手机号码')
      }
      let data = {
        telephone: this.phone,
        category: 'motifyPassword'
      }
      let res = await this.$api.api.sendcode(data)
      if (res.data.code == 200) {
        this.$api.msg(res.data.message)
        this.countDown()
      } else {
        this.$api.msg(res.data.message)
      }
    },
    // 倒计时
    countDown () {
      this.isLogin = false
      // 获取倒计时的初始值
      var time = this.num;
      // 为定时器命名
      this.timer = setInterval(() => {
        // 每隔一秒 num 就减一 实现同步
        time--;
        // 然后把 num 存进 data, 让用户知道时间在倒记着
        this.num = time;
        if (time == 0) {
          clearInterval(this.timer);
          // 当时间为 0 的时候 隐藏定时器的内容 显示发送的内容 并且为定时器重新赋值
          this.isLogin = true;
          this.num = 60;
        }
      }, 1000);
    }
  },
}
</script>

<style lang="less">
.index {
  padding: 0 60rpx;
  .head {
    padding: 140rpx 0;
    text-align: center;
    font-size: 40rpx;
    font-weight: 600;
    color: #000;
  }
  .common {
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #f6f6f6;
    margin-bottom: 40rpx;
    > text {
      flex: 1;
    }
    > view {
      flex: 2;
      margin-right: 10rpx;
    }
    .code {
      color: #384eed;
    }
  }
  .pwd-box {
    > text {
      flex: 1;
    }
    > view {
      flex: 3;
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
