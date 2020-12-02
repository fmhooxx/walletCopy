<template>
  <view class="indexs">
    <view class="tab-box">
      <view class="tab">
        <view class="tab-item"
              @click="changeTab(index)"
              :class="current == index ? 'active':''"
              v-for="(item, index) in tabList"
              :key="index">{{item.text}}</view>
      </view>
    </view>
    <view class="tab-copy"></view>
    <buy v-if="current == 0"></buy>
    <sell v-if="current == 1"></sell>
    <list v-if="current == 2"></list>
  </view>
</template>

<script>
import buy from './buy'
import sell from './sell'
import list from './list'
export default {
  components: {
    buy,
    sell,
    list
  },
  data () {
    return {
      tabList: [
        {
          id: 0,
          text: '委托买币'
        },
        {
          id: 1,
          text: '委托卖币'
        },
        {
          id: 2,
          text: '委托列表'
        }
      ],
      current: 0
    };
  },
  methods: {
    changeTab (index) {
      this.current = index
    }
  },
}
</script>
<style>
page {
  background-color: #fff;
}
</style>
<style lang="less">
.indexs {
  .tab-box {
    width: 100%;
    position: fixed;
    top: 88rpx;
    z-index: 99;
    .tab {
      color: #fff;
      height: 120rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background-color: #223041;
      .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90%;
        border-bottom: 2rpx solid transparent;
      }
      .active {
        color: #c34554;
        border-bottom: 2rpx solid #c34554;
      }
    }
  }
  .tab-copy {
    height: 120rpx;
    width: 100%;
  }
}
</style>
