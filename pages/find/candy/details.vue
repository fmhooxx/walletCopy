<template>
  <view class="index">
    <view class="common">
      <view style="flex: 2">变动前数量</view>
      <view style="flex: 2">变动数量</view>
      <view style="flex: 2">变动后数量</view>
      <view style="flex: 2">变动时间</view>
    </view>
    <view class="footer"
          v-if="this.list.length != 0">
      <view class="common text"
            v-for="(item, index) in list"
            :key="index">
        <view style="flex: 2">{{item.startNumber}}</view>
        <view style="flex: 2"
              :class="[item.changeType == 0 ? 'add' : '',item.changeType == 1 ? 'reduce':'']">{{item.changeType | changeType}}{{item.changeCount}}</view>
        <view style="flex: 2">{{item.endNumber}}</view>
        <view style="flex: 2">{{item.createTime | creatTimes}}</view>
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
      // 0 USDT 1 FHC
      status: null
    };
  },
  onLoad (options) {
    uni.setNavigationBarTitle({
      title: options.symbol + '变动明细'
    })
    this.status = options.status
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
    },
    changeType (val) {
      if (val == 0) {
        return val = '+'
      }
      if (val == 1) {
        return val = '-'
      }
      if (val == undefined || val == '') {
        return val = ''
      }
    }
  },
  methods: {
    async getList () {
      let data = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        currency: this.status
      }
      let res = await this.$api.api.BmsHusdtChangeHistory(data)
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
    .add {
      color: #fe674b;
      font-weight: 600;
    }
    .reduce {
      color: #56fe39;
      font-weight: 600;
    }
  }
  .date {
    font-size: 40rpx;
    font-weight: 600;
    text-align: center;
    margin: 30rpx auto;
  }
}
</style>
