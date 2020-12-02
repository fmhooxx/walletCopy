<template>
  <view class="index">
    <view class="box">
      <view class="common">
        <text>开户银行</text>
        <view>
          <u-input v-model="bank"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入开户银行名称"
                   :border="true" />
        </view>
      </view>
      <view class="common">
        <text>用户名称</text>
        <view>
          <u-input v-model="uname"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入用户名称"
                   :border="true" />
        </view>
      </view>
      <view class="common">
        <text>营业网点</text>
        <view>
          <u-input v-model="bankName"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入营业网点"
                   :border="true" />
        </view>
      </view>
      <view class="common">
        <text>银行卡号</text>
        <view>
          <u-input v-model="cardNum"
                   type="number"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入银行卡号"
                   :border="true" />
        </view>
      </view>
      <view class="common">
        <text>预留手机</text>
        <view>
          <u-input v-model="phone"
                   type="number"
                   border-color="#B0B0B0"
                   placeholder-style="color:#B0B0B0"
                   placeholder="请输入预留手机号码"
                   :border="true" />
        </view>
      </view>
      <view class="upload">
        <image src="/static/plus-add.png"></image>
        <view>上传银行卡正面</view>
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
      // 开户银行
      bank: '',
      // 用户名称
      uname: '',
      // 营业网点
      bankName: '',
      // 银行卡号
      cardNum: '',
      // 预留手机号
      phone: '',
    };
  },
  methods: {
    determine () {
      this.condition()
    },
    condition () {
      if (this.bank.trim().length == 0) {
        return this.$api.msg('请输入开户银行名称')
      }
      if (this.uname.trim().length == 0) {
        return this.$api.msg('请输入用户名称')
      }
      if (this.bankName.trim().length == 0) {
        return this.$api.msg('请输入营业网点')
      }
      if (this.cardNum.trim().length == 0) {
        return this.$api.msg('请输入银行卡号')
      }
      if (this.phone.trim().length == 0) {
        return this.$api.msg('请输入预留手机号码')
      }
    },
    remove () {
      this.bank = ''
      this.uname = ''
      this.bankName = ''
      this.cardNum = ''
      this.phone = ''
    }
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
        flex: 4;
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
