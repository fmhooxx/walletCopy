<template>
  <view class="index">
    <textarea placeholder="请留下您的宝贵意见"
              maxlength="300"
              v-model="val"></textarea>
    <view class="btn"
          :class="isActives == true ? 'active' : ''"
          @click="submit">提交</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      val: ''
    };
  },
  methods: {
    async submit () {
      if (!this.isActives) {
        return this.$api.msg('请输入您的宝贵意见')
      }
      let data = {
        feedback: this.val
      }
      let res = await this.$api.api.addProduct(data)
      this.$api.msg(res.data.message)
      setTimeout(() => {
        uni.navigateBack({
          delta: 1
        });
      }, 1500);
    }
  },
  computed: {
    isActives () {
      if (this.val.trim().length != 0) {
        return true
      } else {
        return false
      }
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
  border-top: 1rpx solid transparent;
  > textarea {
    background-color: #fff;
    width: 100%;
    height: 400rpx;
    margin: 20rpx 0;
    padding: 20rpx;
    border-radius: 20rpx;
  }
  .btn {
    font-size: 34rpx;
    margin-top: 30rpx;
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
