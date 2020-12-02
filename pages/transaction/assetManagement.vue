<template>
  <view class="index">
    <view class="list">
      <view class="list-item"
            v-for="(item, index) in list"
            @click="goOther(index)"
            :key="index">
        <view class="item-left">
          <image :src="item.url"></image>
          <view>{{item.text}}</view>
        </view>
        <view class="item-right"></view>
      </view>
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
          text: '交易',
          url: '/static/jiaoyi.png'
        },
        {
          id: 1,
          text: '委托交易',
          url: '/static/buySell.png'
        },
        {
          id: 2,
          text: '我的收款',
          url: '/static/shoukuan.png'
        }
      ]
    };
  },
  methods: {
    goOther (index) {
      if (index == 0) {
        return this.goUrl('/pages/transaction/index')
      }
      if (index == 1) {
        return this.goUrl('/pages/transaction/entrust/index')
      }
      if (index == 2) {
        return this.goUrl('/pages/transaction/binding/binding')
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

<style>
page {
  background-color: #f5f5f5;
}
</style>

<style lang="less">
.index {
  .list {
    .list-item {
      height: 125rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;
      background-color: #fff;
      margin-bottom: 4rpx;
      .item-left {
        display: flex;
        align-items: center;
        > image {
          width: 61rpx;
          height: 56rpx;
          margin-right: 20rpx;
        }
        > view {
          color: #2d2d2d;
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .item-right {
        width: 26rpx;
        height: 26rpx;
        border-bottom: 1rpx solid #a4a4a4;
        border-right: 1rpx solid #a4a4a4;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
