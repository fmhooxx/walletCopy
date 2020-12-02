<template>
  <view class="index">
    <view class="head">
      <view class="common header">
        <view style="flex: 2">矿机名称</view>
        <text></text>
        <view style="flex: 2">购买时间</view>
        <text></text>
        <view style="flex: 2">价格</view>
      </view>
      <view class="common">
        <view style="flex: 2">天数比例</view>
        <text></text>
        <view style="flex: 2">合约天数</view>
        <text></text>
        <view style="flex: 2">每日产量</view>
        <text></text>
        <view style="flex: 2">总产量</view>
      </view>
    </view>
    <view class="footer"
          v-if="this.list.length != 0">
      <view class="head"
            v-for="(item, index) in list"
            :key="index">
        <view class="common header">
          <view style="flex: 2">{{item.machineryName}}</view>
          <text></text>
          <view style="flex: 2">{{item.creatTime | creatTimes}}</view>
          <text></text>
          <view style="flex: 2">{{item.payAmount}}</view>
        </view>
        <view class="common">
          <view style="flex: 2"
                v-if="item.day >= item.runCycle ? false:true">{{item.day}}/{{item.runCycle}}</view>
          <view style="flex: 2"
                v-else>{{item.runCycle}}/{{item.runCycle}}</view>
          <text></text>
          <view style="flex: 2">{{item.runCycle}}</view>
          <text></text>
          <view v-if="item.day >= item.runCycle ? false:true"
                style="flex: 2">{{item.grantNumber / item.runCycle | toFixeds}}</view>
          <view v-else
                style="flex: 2">{{item.grantNumber}}</view>
          <text></text>
          <view style="flex: 2">{{item.grantNumber}}</view>
        </view>
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
      title: '',
      // 状态
      grantStatus: 0
    };
  },
  onLoad (options) {
    this.grantStatus = options.grantStatus
    if (this.grantStatus == 0) {
      uni.setNavigationBarTitle({
        title: '进行中'
      })
    } else if (this.grantStatus == 1) {
      uni.setNavigationBarTitle({
        title: '已完成'
      })
    }
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
    toFixeds (val) {
      return val = Math.floor(val * 100) / 100
    }
  },
  methods: {
    getTimes (time, timer) {
      var BirthDay = new Date(time);
      if (this.grantStatus == 0) {
        var today = new Date();
      } else if (this.grantStatus == 1) {
        var today = new Date(timer);
      }
      var timeold = (today.getTime() - BirthDay.getTime());
      var sectimeold = timeold / 1000
      var secondsold = Math.floor(sectimeold);
      var msPerDay = 24 * 60 * 60 * 1000
      var e_daysold = timeold / msPerDay
      var daysold = Math.floor(e_daysold);
      var e_hrsold = (e_daysold - daysold) * 24;
      var hrsold = Math.floor(e_hrsold);
      var e_minsold = (e_hrsold - hrsold) * 60;
      var minsold = Math.floor((e_hrsold - hrsold) * 60);
      var seconds = Math.floor((e_minsold - minsold) * 60);
      var span_dt_dt = daysold + " 天 " + hrsold + " 小时 " + minsold + " 分 " + seconds + " 秒了";
      if (daysold == -1) {
        daysold = 0
      }
      return daysold
    },
    async getList () {
      let data = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        grantStatus: this.grantStatus
      }
      let res = await this.$api.api.getMachineryOrder(data)
      if (res.data.code == 200) {
        this.total = res.data.data.total
        this.flag = true
        res.data.data.list.map(item => {
          if (this.grantStatus == 0) {
            item.day = this.getTimes(item.creatTime.split('T')[0])
          } else if (this.grantStatus == 1) {
            item.day = this.getTimes(item.creatTime.split('T')[0], item.orderStopTime.split('T')[0])
          }
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
  border-top: 1rpx solid transparent;
}
.head {
  background: #ffffff;
  border: 1rpx solid #d8d8d8;
  box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
  border-radius: 15rpx;
  margin: 30rpx 0;
}
.common {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  > view {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > text {
    width: 2rpx;
    height: 80%;
    background-color: #d8d8d8;
  }
}
.header {
  border-bottom: 1rpx solid #d8d8d8;
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
