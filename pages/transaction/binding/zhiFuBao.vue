<template>
  <view class="index">
    <view class="box">
      <view class="common">
        <text>姓名</text>
        <view>
          <u-input v-model="uname"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入姓名"
                   :border="true" />
        </view>
      </view>
      <view class="common">
        <text>微信号</text>
        <view>
          <u-input v-model="weixin"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入微信号"
                   :border="true" />
        </view>
      </view>
      <view class="upload">
        <image src="/static/plus-add.png"></image>
        <view>上传支付宝收款二维码</view>
      </view>
      <view class="footer">
        <view class="footer-one"
              @click="remove">重置</view>
        <view class="footer-two"
              @click="determine">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      uname: '',
      weixin: ''
    };
  },
  methods: {
    determine () {
      this.condition()
    },
    remove () {
      this.uname = '',
        this.weixin = ''
    },
    condition () {
      if (this.uname.trim().length == 0) {
        return this.$api.msg('请输入姓名')
      }
      if (this.weixin.trim().length == 0) {
        return this.$api.msg('请输入支付宝账号')
      }
    },
  },
}
</script>

<style lang="less">
.index {
  position: relative;
  .box {
    width: 90%;
    position: absolute;
    top: 60rpx;
    left: 50%;
    transform: translateX(-50%);
    .common {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      > text {
        color: #223041;
        font-size: 28rpx;
        font-weight: bold;
        flex: 1;
      }
      > view {
        flex: 5;
      }
    }
    .upload {
      margin: 60rpx auto 0;
      width: 586rpx;
      height: 300rpx;
      background: #fafbfd;
      border-radius: 5rpx;
      border: 2rpx dashed #6c7aa7;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > image {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 30rpx;
      }
      > view {
        color: #aeaeae;
        font-size: 24rpx;
      }
    }
    .footer {
      margin-top: 100rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200rpx;
        height: 70rpx;
        border-radius: 8rpx;
      }
      .footer-one {
        color: #7d7d7d;
        font-size: 28rpx;
        font-weight: bold;
        background-color: #eaeaea;
      }
      .footer-two {
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
        background-color: #4059ff;
      }
    }
  }
}
</style>
