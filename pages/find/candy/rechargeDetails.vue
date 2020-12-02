<template>
  <view>
    <view class="common head">
      <view style="flex: 2">时间</view>
      <view style="flex: 2">兑换数量</view>
      <view style="flex: 2">得到数量</view>
      <view style="flex: 2">汇率</view>
    </view>
    <view v-if="this.list.length != 0"
          class="footer">
      <view class="common text"
            v-for="(item, index) in list"
            :key="index">
        <view style="flex: 2">{{item.createTime | creatTimes}}</view>
        <view style="flex: 2">{{item.fromTokenCount}}</view>
        <view style="flex: 2">{{item.toTokenCount}}</view>
        <view style="flex: 2">{{item.toTokenPriceNow}}</view>
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
      // 时间数量状态
      page: {
        // 当前显示的页码值
        pageNum: 1,
        // 每页显示的条数
        pageSize: 20,
      },
      // 节流阀
      flag: '',
      total: '',
      rate: ''
    };
  },
  onLoad () {
    this.getLists()
  },
  // 监听页面滚动到底部的事件
  onReachBottom () {
    this.page.pageIndex += 1;
    if (this.flag) {
      this.getLists();
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
    async getLists () {
      let data = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum
      }
      let res = await this.$api.api.BmsTokenConversionOrderList(data)
      if (res.data.code == 200) {
        this.total = res.data.data.total
        this.list.push(...res.data.data.list)
        this.flag = true
        if (this.total == this.list.length) {
          this.flag = false
        }
      }
    }
  },
}
</script>

<style lang="less">
.head {
  padding: 30rpx 0;
}
.common {
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
  border-bottom: 1rpx solid #ddd;
  padding: 20rpx 0;
  > view {
    font-size: 26rpx;
  }
  .success {
    color: #0dbb5b;
  }
  .fail {
    color: #fd313f;
  }
  .wait {
    color: #258efb;
  }
}
.date {
  font-size: 40rpx;
  font-weight: 600;
  text-align: center;
  margin: 30rpx auto;
}
</style>
