<template>
  <view class="index">
    <view class="common"
          v-if="false">
      <text>当前密码</text>
      <view>
        <u-input v-model="usedPwd"
                 type="password"
                 placeholder-class="placeholder-common"
                 placeholder="请输入密码"
                 :clearable="true" />
      </view>
    </view>
    <view class="common">
      <text>新密码</text>
      <view>
        <u-input v-model="pwd"
                 type="password"
                 placeholder-class="placeholder-common"
                 placeholder="请输入新密码"
                 :clearable="true" />
      </view>
    </view>
    <view class="common">
      <text>确认密码</text>
      <view>
        <u-input v-model="confirmPwd"
                 type="password"
                 placeholder-class="placeholder-common"
                 placeholder="请再次输入密码"
                 :clearable="true" />
      </view>
    </view>
    <view class="common">
      <text>手机号码</text>
      <view>
        <u-input v-model="phone"
                 type="number"
                 placeholder-class="placeholder-common"
                 placeholder="请输入手机号码"
                 :clearable="true" />
      </view>
    </view>
    <view class="common">
      <text>动态验证</text>
      <view class="code-box">
        <view>
          <u-input v-model="code"
                   type="number"
                   placeholder="请再次输入密码"
                   :clearable="true" />
        </view>
        <text v-if="isLogin"
              @click="getCode">发送验证码</text>
        <text v-else>{{num}}秒后重发</text>
      </view>
    </view>
    <view class="btn"
          @click="preservation"
          :class="isCondition == true ? 'condition':''">保存</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      usedPwd: '',
      pwd: '',
      confirmPwd: '',
      code: '',
      phone: '',
      // 控制发送以及剩余时间的切换显示
      isLogin: true,
      // 定时器命名
      timer: "",
      // 倒计时内容
      num: 60,
    };
  },
  onLoad (options) {
    uni.setNavigationBarTitle({
      title: options.text
    })
  },
  computed: {
    isCondition () {
      if (this.pwd.trim().length != 0 && this.confirmPwd.trim().length != 0 && this.code.trim().length != 0 && this.phone.trim().length != 0) {
        return true
      }
      return false
    }
  },
  methods: {
    async preservation () {
      if (this.pwd.length < 6 || this.pwd.length > 16) {
        return this.$api.msg('请输入六到十六位的密码')
      }
      if (this.confirmPwd.length < 6 || this.confirmPwd.length > 16) {
        return this.$api.msg('请输入六到十六位的密码')
      }
      if (this.pwd != this.confirmPwd) {
        return this.$api.msg('两次密码不一致, 请重新输入')
      }
      if (this.code.length != 6) {
        return this.$api.msg('请输入六位数的验证码')
      }
      let data = {
        telephone: this.phone,
        password: this.pwd,
        authCode: this.code
      }
      let res = await this.$api.api.updatePassword(data)
      if (res.data.code == 200) {
        this.$api.msg('修改密码成功')
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
<style>
page {
  background-color: #f1f3f8;
}
</style>
<style lang="less">
.index {
  border-top: 1rpx solid transparent;
  .common {
    margin: 20rpx auto;
    padding: 0 30rpx;
    width: 650rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8rpx;
    > text {
      flex: 1;
      color: #373737;
      font-size: 24rpx;
      margin-right: 10rpx;
    }
    > view {
      flex: 4;
      .placeholder-common {
        text-align: right;
      }
    }
    .code-box {
      display: flex;
      align-items: center;
      > view {
        flex: 2;
      }
      > text {
        flex: 1;
        color: #4059ff;
        font-size: 26rpx;
      }
    }
  }
  .btn {
    margin: 40rpx auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4059ff;
    font-size: 30rpx;
    width: 650rpx;
    height: 80rpx;
    background-color: #fff;
    border-radius: 8rpx;
    letter-spacing: 20rpx;
  }
  .condition {
    color: #fff;
    background-color: #4059ff;
  }
}
</style>
