<template>
  <view class="index">
    <view class="common"
          v-for="(item, index) in list"
          @click="other(item.id,item.text)"
          :key="index">
      <view>
        <image :src="item.img"></image>
        <view>{{item.text}}</view>
      </view>
      <text></text>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          id: 0,
          text: '登录密码设置',
          img: '/static/lock.png'
        },
        {
          id: 1,
          text: '资金密码设置',
          img: '/static/lock.png'
        }
      ]
    };
  },
  methods: {
    other (id, text) {
      let url = '/pages/index/pwdSettings?id=' + id + '&text=' + text
      this.goUrl(url)
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    }
  },
}
</script>
<style>
</style>
<style lang="less">
.index {
  .common {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 33rpx;
    border-bottom: 10rpx solid #f5f5f5;
    > view {
      display: flex;
      align-items: center;
      > image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }
      > view {
        color: #aeaeae;
        font-size: 28rpx;
      }
    }
    > text {
      width: 26rpx;
      height: 26rpx;
      border-bottom: 1rpx solid #b4b4b4;
      border-right: 1rpx solid #b4b4b4;
      transform: rotate(-45deg);
    }
  }
}
</style>
