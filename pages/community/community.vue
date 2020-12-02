<template>
  <view class="index">
    <view class="head-bgi"></view>
    <view class="head">
      <view class="common">
        <view class="common-one">会员ID</view>
        <view class="common-two">{{id}}</view>
      </view>
      <view class="common">
        <view class="common-one">入场券编号</view>
        <view class="common-two">
          <u-input v-model="number"
                   type="number"
                   placeholder-style="text-align: right;"
                   placeholder="请输入入场券编号"
                   :clearable="true" />
        </view>
      </view>
      <view class="common">
        <view class="common-one">联系电话</view>
        <view class="common-two">
          <u-input v-model="phone"
                   type="number"
                   placeholder-style="text-align: right;"
                   placeholder="请输入联系电话"
                   :clearable="true" />
        </view>
      </view>
      <view class="common">
        <view class="common-one">微信号</view>
        <view class="common-two">
          <u-input v-model="weChat"
                   placeholder-style="text-align: right;"
                   placeholder="请输入微信号"
                   :clearable="true" />
        </view>
      </view>
      <view class="footer">
        <view :class="isActives == true ? 'active' : ''"
              @click="determine">确认</view>
        <view @click="cancel">取消</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      number: '',
      phone: '',
      weChat: ''
    };
  },
  onLoad () {
    this.id = uni.getStorageSync('id')
  },
  computed: {
    isActives () {
      if (this.number.trim().length != 0 && this.phone.trim().length != 0 && this.weChat.trim().length != 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    determine () {
      if (!this.isActives) {
        return this.$api.msg('请将信息填写完整')
      }
    },
    cancel () {
      this.number = ''
      this.phone = ''
      this.weChat = ''
    }
  }
}
</script>
<style>
page {
  background-color: #f8f8f8;
  /* background-color: skyblue; */
}
</style>
<style lang="less">
.index {
  position: relative;
  .head-bgi {
    height: 88rpx;
    width: 100%;
    background-color: #415aff;
  }
  .head {
    position: absolute;
    top: 44rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 690rpx;
    background-color: #fff;
    padding: 0 30rpx;
    border-radius: 20rpx;
    box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(27, 27, 27, 0.13);
    .common {
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #d8d8d8;
      .common-one {
        color: #333;
        font-size: 26rpx;
      }
      .common-two {
        font-size: 26rpx;
        color: #999;
      }
    }
    .footer {
      padding: 100rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      > view {
        width: 170rpx;
        height: 60rpx;
        border-radius: 30rpx;
        line-height: 60rpx;
        text-align: center;
        font-size: 30rpx;
        color: #fff;
        box-shadow: 0rpx 4rpx 5rpx 0rpx rgba(142, 142, 142, 0.57);
        background-color: #8e8e8e;
      }
      .active {
        background-color: #4059ff;
      }
    }
  }
}
</style>
