<template>
  <view>
    <view class="search">
      <view class="search-box">
        <view class="search-left"
              @click="cancel">取消</view>
        <view class="search-middle">
          <u-icon color="#fff"
                  size="40"
                  name="search"></u-icon>
          <input placeholder="输入搜索内容"
                 @input="inputVal"
                 placeholder-style="color: #fff"
                 v-model="val" />
        </view>
        <view class="search-right"
              @click="search">搜索</view>
      </view>
    </view>
    <view class="footer-box">
      <view class="box"
            v-for="(item, index) in list"
            :key="index">
        <view class="head">{{item.createTime}}</view>
        <view class="center"><text></text>{{item.title}}</view>
        <view class="footer">{{item.content}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      page: 6,
      start: 1,
      total: '',
      list: [],
      flag: '',
      val: ''
    };
  },
  created () {
    this.getData()
  },
  mounted () {
    uni.$on('onReachBottom', (data) => {
      this.start += 1
      if (this.flag) {
        this.getData()
      } else {
        this.$api.msg('已经加载全部')
      }
    })
  },
  methods: {
    inputVal () {
      if (this.val == '') {
        this.getData()
      }
    },
    cancel () {
      if (this.val.trim().length != 0) {
        this.getData()
      }
      this.val = ''
    },
    async search () {
      if (this.val.trim().length == 0) {
        return this.$api.msg('请输入搜索内容')
      }
      let data = {
        titleName: this.val,
        status: 1
      }
      let res = await this.$api.api.sendcode1(data)
      if (res.data.code == 200) {
        res.data.data.list.forEach(item => {
          item.createTime = item.createTime.split('T')[0]
        })
        this.list = []
        this.list = res.data.data.list
      } else {
        this.$api.msg(res.data.message)
      }
    },
    async getData () {
      let data = {
        pageSize: this.page,
        pageNum: this.start
      }
      let res = await this.$api.api.sendcode1(data)
      if (res.data.code == 200) {
        this.total = res.data.data.total
        res.data.data.list.forEach(item => {
          item.createTime = item.createTime.split('T')[0]
        })
        this.list.push(...res.data.data.list)
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
.search {
  position: fixed;
  height: 100rpx;
  width: 100%;
  top: 80rpx;
  .search-box {
    margin-top: 100rpx;
    height: 100rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #415aff;
    .search-left {
      font-size: 30rpx;
      color: #fff;
      flex: 1;
      width: 100%;
      height: 100%;
      line-height: 100rpx;
      text-align: center;
    }
    .search-middle {
      flex: 5;
      display: flex;
      align-items: center;
      border: 1rpx solid #fff;
      border-radius: 10rpx;
      padding: 10rpx 20rpx;
      > input {
        margin-left: 30rpx;
        color: #fff;
      }
    }
    .search-right {
      font-size: 30rpx;
      color: #fff;
      flex: 1;
      width: 100%;
      height: 100%;
      line-height: 100rpx;
      text-align: center;
    }
  }
}
.footer-box {
  margin-top: 220rpx;
  .box {
    padding: 0 30rpx;
    margin-bottom: 40rpx;
    .head {
      margin: 10rpx 0;
      font-size: 28rpx;
      color: #bbb;
    }
    .center {
      margin: 10rpx 0;
      font-size: 34rpx;
      font-weight: 600;
      color: #040042;
      display: flex;
      align-items: center;
      > text {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background-color: #0d2aff;
        margin-right: 20rpx;
      }
    }
    .footer {
      padding-left: 30rpx;
      font-size: 28rpx;
      color: #bbb;
      border-left: 1rpx solid #ccc;
    }
  }
}
</style>
