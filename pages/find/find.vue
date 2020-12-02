<template>
  <view>
    <view class="head">
      <view class="tab-box">
        <view class="tab"
              v-for="(item, index) in tab"
              @click="changeTab(index)"
              :key="index"
              :class="index == current ? 'active':''">
          <view>{{item.text}}</view>
        </view>
      </view>
    </view>
    <view class="head-copy"
          v-if="current == 0 ? false:true"></view>
    <view>
      <newsFlash v-if="current == 0"></newsFlash>
      <candy ref="candy"
             v-else></candy>
    </view>
  </view>
</template>

<script>
import newsFlash from './newsFlash/newsFlash'
import candy from './candy/candy'
export default {
  components: {
    newsFlash,
    candy
  },
  data () {
    return {
      tab: [
        {
          id: 0,
          text: '快讯'
        },
        {
          id: 1,
          text: '资产'
        }
      ],
      current: 0,
    };
  },
  onShow () {
    if (this.current == 1) {
      this.$refs.candy.getBmsHotTokens()
    }
  },
  onHide () {
    this.current = 0
    if (this.current == 1) {
      this.$refs.candy.removeList()
    }
  },
  onReachBottom () {
    if (this.current == 0) {
      uni.$emit('onReachBottom');
    }
  },
  methods: {
    changeTab (index) {
      this.current = index
    }
  },
}
</script>

<style lang="less">
.head {
  width: 100%;
  height: 100rpx;
  background-color: #415aff;
  padding: 0 30rpx;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 80rpx;
  .tab-box {
    box-sizing: border-box;
    padding: 20rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .tab {
      color: #bbb;
      border-bottom: 1rpx solid transparent;
    }
    .active {
      color: #fff;
      border-bottom: 1rpx solid #fff;
    }
  }
}
.head-copy {
  height: 80rpx;
  width: 100%;
}
</style>
