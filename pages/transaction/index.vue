<template>
  <view class="index">
    <view class="index-box">
      <view class="index-head-box">
        <view class="index-head-return"
              @click="goReturn">
          <view></view>
        </view>
        <view class="index-head">
          <view class="index-tab-list">
            <view @click="changeTab(index)"
                  :class="[index == current ? 'index-active':'', index == 0 ? 'index-active-left':'',index == 1 ? 'index-active-right':'']"
                  v-for="(item, index) in tabList"
                  :key="index">{{item.text}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="index-box-copy"></view>
    <transaction v-if="current == 0"></transaction>
    <order v-else></order>
  </view>
</template>

<script>
import transaction from './transaction'
import order from './order'
export default {
  components: {
    transaction,
    order
  },
  data () {
    return {
      tabList: [
        {
          id: 0,
          text: '交易'
        },
        {
          id: 1,
          text: '订单'
        }
      ],
      current: 0
    };
  },
  methods: {
    goReturn () {
      uni.navigateBack({
        delta: 1
      });
    },
    changeTab (index) {
      this.current = index
    }
  },
}
</script>

<style lang="less">
.index {
  .index-box {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
    .index-head-box {
      height: 88rpx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #415aff;
      .index-head-return {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > view {
          width: 20rpx;
          height: 20rpx;
          border-bottom: 1rpx solid #fff;
          border-left: 1rpx solid #fff;
          transform: rotate(45deg);
        }
      }
      .index-head {
        width: 90%;
        height: 100%;
        background-color: #415aff;
        display: flex;
        align-items: center;
        justify-content: center;
        .index-tab-list {
          width: 314rpx;
          height: 46rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1rpx solid #fff;
          border-radius: 10rpx;
          > view {
            height: 100%;
            width: 100%;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #415aff;
            color: #fff;
            font-size: 28rpx;
            font-weight: 500;
          }
          .index-active {
            background-color: #fff;
            color: #415aff;
          }
          .index-active-left {
            border-radius: 10rpx 0rpx 0rpx 10rpx;
          }
          .index-active-right {
            border-radius: 0rpx 10rpx 10rpx 0rpx;
          }
        }
      }
    }
  }
  .index-box-copy {
    height: 88rpx;
    width: 100%;
  }
}
</style>
