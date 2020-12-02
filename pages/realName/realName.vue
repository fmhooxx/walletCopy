<template>
  <view class="index">
    <view class="common">
      <text>真实姓名</text>
      <view>
        <u-input v-model="uname"
                 type="text"
                 placeholder="请输入您的真实姓名"
                 clearable
                 @blur="unameBlur" />
      </view>
    </view>
    <view class="common">
      <text>身份证号</text>
      <view>
        <u-input v-model="idCard"
                 type="text"
                 placeholder="请输入您的身份证号码"
                 clearable
                 @blur="idCardBlur" />
      </view>
    </view>
    <view @click="binding"
          class="btn">实名认证</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      uname: '张三',
      idCard: '342425199706301122'
    };
  },
  methods: {
    async binding () {
      if (!this.unameBlur()) {
        return this.$api.msg('请输入姓名')
      }
      if (!this.idCardBlur()) {
        return this.$api.msg('请输入正确的身份证号码')
      }
      let data = {
        realName: this.uname,
        idNumbe: this.idCard
      }
      let res = await this.$api.api.bindIDnumber(data)
      if (res.data.code == 200) {
        this.$api.msg(res.data.message)
      } else {
        this.$api.msg(res.data.message)
      }
    },
    unameBlur () {
      var regName = /^[\u4e00-\u9fa5]{2,4}$/
      return regName.test(this.uname)
    },
    idCardBlur () {
      var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return regId.test(this.idCard)
    }
  },
}
</script>


<style lang="less">
.index {
  padding: 0 30rpx;
  border-top: 1rpx solid transparent;
  .common {
    margin-top: 50rpx;
    > text {
      font-size: 34rpx;
    }
    > view {
      border-bottom: 1rpx solid #415aff;
      margin: 20rpx 0;
      padding: 10rpx 0;
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
    background-color: #415aff;
  }
}
</style>
