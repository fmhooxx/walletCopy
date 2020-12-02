<template>
  <view>
    <view class="common head">
      <view style="flex: 2">入场券单号</view>
      <view style="flex: 2">时间</view>
      <view style="flex: 2">币种</view>
      <view style="flex: 1">数量</view>
      <view style="flex: 2">状态</view>
    </view>
    <view class="common text"
          v-for="(item, index) in list"
          :key="index">
      <view style="flex: 2">{{item.id}}</view>
      <view style="flex: 2">{{item.addtime}}</view>
      <view style="flex: 2">USDT</view>
      <view style="flex: 1">1</view>
      <!-- <view style="flex: 2"
            :class="[item.state == '成功' ? 'success':'', item.state == '失败' ? 'fail':'',item.state == '等待' ? 'wait':'']">{{item.state}}</view> -->
      <view style="flex: 2"
            class="success">成功</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // list: [
      //   {
      //     id: '12345678',
      //     time: '2020-10-05',
      //     currency: 'USDT',
      //     num: '1',
      //     state: '成功'
      //   },
      //   {
      //     id: '12345678',
      //     time: '2020-10-05',
      //     currency: 'USDT',
      //     num: '1',
      //     state: '失败'
      //   },
      //   {
      //     id: '12345678',
      //     time: '2020-10-05',
      //     currency: 'USDT',
      //     num: '1',
      //     state: '等待'
      //   }
      // ],
      // 分页
      page: {
        // 当前显示的页码值
        pageNum: 1,
        // 每页显示的条数
        pageSize: 20,
      },
      // 节流阀
      flag: '',
      total: ''
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
  methods: {
    async getLists () {
      let data = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      let res = await this.$api.api.getList(data)
      if (res.data.code == 200) {
        res.data.data.list.forEach(item => {
          item.addtime = item.addtime.split('T')[0]
        })
        this.list.push(...res.data.data.list)
        this.total = res.data.data.total
        this.flag = true
        if (this.total == this.list.length) {
          this.flag = false
        }
      } else {
        this.$api.msg(res.data.message)
      }
    }
  },
}
</script>

<style lang="less">
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
</style>
