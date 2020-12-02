<template>
  <view class="index">
    <view class="head">
      <view class="head-title">
        <view style="flex: 2">对方ID</view>
        <text></text>
        <view style="flex: 2">收益数量</view>
        <!-- <text></text>
        <view style="flex: 2">来源</view> -->
        <text></text>
        <view style="flex: 2">时间</view>
      </view>
      <view class="head-content"
            v-if="head.length == 0 ? false:true">
        <view class="common"
              v-for="(item, index) in head"
              :key="index">
          <view style="flex: 2">{{item.memberId}}</view>
          <view style="flex: 2"
                v-if="id == item.driveOneId ">{{item.driveOneEarnings}}</view>
          <!-- <view style="flex: 2"
                v-if="id == item.driveOneId ">直推</view> -->
          <view style="flex: 2"
                v-if="id == item.driveThreeId ">{{item.driveThreeEarnings}}</view>
          <!-- <view style="flex: 2"
                v-if="id == item.driveThreeId ">三推</view> -->
          <view style="flex: 2"
                v-if="id == item.driveTwoId ">{{item.driveTwoEarnings}}</view>
          <!-- <view style="flex: 2"
                v-if="id == item.driveTwoId ">间推</view> -->
          <view style="flex: 2">{{item.time}}</view>
        </view>
      </view>
      <view v-else
            class="date">暂无更多数据</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      head: [],
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
    }
  },
  onLoad () {
    this.id = uni.getStorageSync('id');
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
    async getList () {
      let data = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum
      }
      let res = await this.$api.api.getDriveEarningsList(data)
      this.total = res.data.data.total
      res.data.data.list.map(item => {
        item.time = item.creatTime.split('T')[0]
      })
      this.head.push(...res.data.data.list)
      if (this.head.length == this.total) {
        this.flag = false
      }
    }
  }
}
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style lang="less">
.index {
  border-top: 1rpx solid transparent;
  .head {
    // width: 690rpx;
    // margin: 20rpx auto;
    // padding: 14rpx;
    // border: 1rpx solid #d8d8d8;
    // box-shadow: 0rpx 5rpx 8px 0rpx rgba(27, 27, 27, 0.13);
    // border-radius: 12rpx;
    background-color: #fff;
    .head-title {
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-bottom: 1rpx solid #d8d8d8;
      text {
        border-left: 1rpx solid #d8d8d8;
        height: 60%;
      }
      > view {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    }
    .head-content {
      .common {
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        // border-top: 1rpx solid #d8d8d8;
        border-bottom: 1rpx solid #d8d8d8;
        > view {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 26rpx;
          color: #666;
        }
      }
    }
    .date {
      font-size: 40rpx;
      font-weight: 600;
      text-align: center;
      margin: auto;
      padding: 30rpx;
    }
  }
}
</style>
