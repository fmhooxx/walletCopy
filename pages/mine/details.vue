<template>
  <view class="index">
    <view class="common head">
      <view style="flex: 2">矿机名称</view>
      <view style="flex: 2">购买时间</view>
      <view style="flex: 1">算力</view>
      <view style="flex: 2">应付金额</view>
    </view>
    <view class="footer"
          v-if="this.list.length != 0">
      <view class="common text"
            v-for="(item, index) in list"
            :key="index"
            @click="seeDetails(item.title)">
        <view style="flex: 2">{{item.machineryName}}</view>
        <view style="flex: 2">{{item.creatTime}}</view>
        <view style="flex: 1">{{item.hashrate}}d</view>
        <view style="flex: 2">{{item.payAmount}}u</view>
      </view>
    </view>
    <view v-else
          class="date">暂无更多数据</view>
    <u-popup border-radius="14"
             mode="center"
             v-model="show">
      <view class="box">{{title}}</view>
    </u-popup>
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
        pageSize: 20,
      },
      // 总的数据条数
      total: '',
      // 节流阀
      flag: true,
      show: false,
      title: ''
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
  methods: {
    seeDetails (title) {
      this.show = true
      this.title = title
    },
    async getList () {
      let data = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      let res = await this.$api.api.getMachineryOrder(data)
      if (res.data.code == 200) {
        this.total = res.data.data.total
        this.flag = true
        res.data.data.list.forEach(item => {
          item.creatTime = item.creatTime.split('T')[0]
        })
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
}
.common {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > view {
    text-align: center;
  }
}
.head {
  height: 80rpx;
}
.text {
  border-bottom: 1rpx solid rgb(221, 213, 213);
  padding: 30rpx 0;
  // border-radius: 20rpx;
  // box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(27, 27, 27, 0.13);
  > view {
    font-size: 26rpx;
  }
}
.date {
  font-size: 40rpx;
  font-weight: 600;
  text-align: center;
  margin: 30rpx auto;
}
.box {
  padding: 30rpx;
}
</style>
