<template>
  <view class="index">
    <view class="common">
      <view style="flex: 3">矿机名称</view>
      <view style="flex: 3">购买时间</view>
      <view style="flex: 2">购买价格</view>
      <view style="flex: 2">购买状态</view>
    </view>
    <view class="footer"
          v-if="this.list.length != 0">
      <view class="common text"
            v-for="(item, index) in list"
            :key="index">
        <view style="flex: 3">{{item.machineryName}}</view>
        <view style="flex: 3">{{item.creatTime | creatTimes}}</view>
        <view style="flex: 2">{{item.price}}</view>
        <view style="flex: 2">成功</view>
      </view>
    </view>
    <view v-else
          class="date">暂无更多数据</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分页
      page: {
        // 当前显示的页码值
        pageNum: 1,
        // 每页显示的条数
        pageSize: 10,
      },
      // 总的数据条数
      total: '',
      // 节流阀
      flag: true,
    };
  },
  onLoad () {
    this.getList()
  },
  // 监听页面滚动到底部的事件
  onReachBottom () {
    this.page.pageNum += 1;
    if (this.flag) {
      this.getList();
    } else {
      this.$api.msg('没有更多数据了');
    }
  },
  filters: {
    creatTimes (val) {
      return val = val.split('T')[0]
    }
  },
  methods: {
    async getList () {
      let data = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      }
      let res = await this.$api.api.getMachineryOrder(data)
      if (res.data.code == 200) {
        this.total = res.data.data.total
        this.flag = true
        this.list.push(...res.data.data.list)
        if (this.list.length == this.total) {
          this.flag = false
        }
      }
    }
  }
}
</script>

<style lang="less">
.index {
  padding: 0 30rpx;
  .common {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    > view {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .text {
    padding: 20rpx 0;
    border-bottom: 1rpx solid #d8d8d8;
  }
  .date {
    font-size: 40rpx;
    font-weight: 600;
    text-align: center;
    margin: 30rpx auto;
  }
}
</style>
