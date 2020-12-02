<template>
  <view>
    <view class="list">
      <view class="head-box">
        <view class="head">
          <u-dropdown ref="uDropdown">
            <u-dropdown-item v-model="value1"
                             :title="label1"
                             @change="changeOptions1"
                             :options="options1"></u-dropdown-item>
            <!-- <u-dropdown-item v-model="value2"
                             :title="label2">
              <view class="slot-content">
                <view class="slot-item"
                      v-for="(item, index) in options2"
                      :key="index"
                      :class="index == value2 ? 'value2Active':''"
                      @click="changeActive(index)">
                  <view>{{item.label}}</view>
                  <image :src="item.type"></image>
                </view>
              </view>
            </u-dropdown-item> -->
          </u-dropdown>
        </view>
      </view>
      <view class="head-box-copy"></view>
      <view class="content">
        <view class="content-title-box">
          <view class="content-title">
            <view style="flex: 1">ID</view>
            <view style="flex: 2">今日团队</view>
            <view style="flex: 2">累计团队</view>
          </view>
        </view>
        <view class="content-title-box-copy"></view>
        <view class="content-footer"
              v-if="contentBox.length == 0 ? false:true">
          <view class="content-box"
                v-for="(item, index) in contentBox"
                :key="index">
            <view style="flex: 1">{{item.id}}</view>
            <view style="flex: 2">{{item.teamEarningsDay}}FHC/{{item.teamReferrerDay}}人</view>
            <view style="flex: 2">{{item.teamEarningsTotal}}FHC/{{item.teamReferrerTotal}}人</view>
          </view>
        </view>
        <view v-else
              class="date">暂无更多数据</view>
      </view>
    </view>
    <view class="footer-box">
      <view class="footer">
        <view class="footer-item">
          <text class="one">{{teamProfit.teamReferrerDay}}</text>
          <view>今日网体注册</view>
        </view>
        <view class="footer-item">
          <text class="two">{{teamProfit.teamEarningsDay}}</text>
          <view>今日网体交易额（FHC）</view>
        </view>
        <view class="footer-item">
          <text class="three">{{teamProfit.teamReferrerTotal}}</text>
          <view>总网体注册</view>
        </view>
        <view class="footer-item">
          <text class="four">{{teamProfit.teamEarningsTotal}}</text>
          <view>累计网体交易额（FHC）</view>
        </view>
      </view>
    </view>
    <view class="footer-copy"></view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      value1: 1,
      // value2: 0,
      label1: '',
      // label2: '',
      options1: [
        {
          label: 'D1',
          value: 1
        },
        {
          label: 'D2',
          value: 2
        },
        {
          label: 'D3',
          value: 3
        },
        {
          label: 'D4',
          value: 4
        },
        {
          label: 'D5',
          value: 5
        }
      ],
      // options2: [{
      //   label: '今日推广(降序)',
      //   value: 0,
      //   type: '/static/lower-arrow.png'
      // },
      // {
      //   label: '今日推广(升序)',
      //   value: 1,
      //   type: '/static/up-arrow.png'
      // },
      // {
      //   label: '累计推广(降序)',
      //   value: 2,
      //   type: '/static/lower-arrow.png'
      // },
      // {
      //   label: '累计推广(升序)',
      //   value: 3,
      //   type: '/static/up-arrow.png'
      // }
      // ],
      contentBox: [],
      flag: true,
      limit: 10,
      offset: 0,
      teamProfit: {}
    }
  },
  created () {
    this.label1 = this.options1[this.value1 - 1].label
    // this.label2 = this.options2[this.value2].label
    // 获取团队列表数据
    this.getTeams()
    this.getSelfTeams()
  },
  mounted () {
    uni.$on('onReachBottomTeam', (data) => {
      this.offset += 10
      if (this.flag) {
        this.getTeams()
      } else {
        this.$api.msg('已经加载全部')
      }
    })
  },
  methods: {
    async getTeams (val) {
      if (val == 1) {
        this.contentBox = []
      }
      let data = {
        limit: this.limit,
        offset: this.offset,
        communityLevel: this.value1
      }
      let res = await this.$api.api.getTeam(data)
      this.flag = true
      if (res.data.data.list.length == 0) {
        this.flag = false
        this.$api.msg('已经加载全部')
      }
      this.contentBox.push(...res.data.data.list)
    },
    // 获取自己团队动态收益业绩
    async getSelfTeams () {
      let res = await this.$api.api.getSelfTeam()
      this.teamProfit = res.data.data
    },
    // changeActive (index) {
    //   this.value2 = index
    //   this.label2 = this.options2[this.value2].label
    //   this.$refs.uDropdown.close()
    // },
    changeOptions1 (index) {
      this.value1 = index
      this.label1 = this.options1[this.value1 - 1].label
      this.contentBox = []
      this.offset = 0
      this.getTeams()
    },
    async searchVal (val) {
      this.contentBox = []
      let data = {
        referrerMemberId: val
      }
      let res = await this.$api.api.getSeachTeam(data)
      if (JSON.stringify(res.data.data) == '{}') {
        this.$api.msg('未查到该用户')
      } else {
        this.contentBox.push(res.data.data)
      }
    }
  },
}
</script>

<style lang="less">
.list {
  /deep/.u-dropdown__content__popup {
    position: fixed;
    width: 100%;
    top: 400rpx;
  }
  /deep/.u-dropdown__menu {
    width: 101%;
    position: fixed;
    left: 50%;
    top: 320rpx;
    z-index: 9;
    transform: translateX(-50%);
    background-color: #fff;
    height: 102rpx !important;
    z-index: 99;
  }
  /deep/.u-dropdown__content__mask {
    position: fixed;
  }
  .head-box {
    // width: 680rpx;
    // position: fixed;
    // top: 330rpx;
    // left: 50%;
    // transform: translateX(-50%);
    // background-color: #fff;
    // z-index: 99;
    .head {
      margin: auto;
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      // .slot-content {
      //   background-color: #fff;
      //   .value2Active {
      //     color: #2979ff !important;
      //   }
      //   .slot-item {
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     padding: 0 30rpx;
      //     height: 110rpx;
      //     border-top: 1rpx solid #f6f7f9;
      //     > image {
      //       width: 20rpx;
      //       height: 20rpx;
      //     }
      //   }
      // }
    }
  }
  .head-box-copy {
    width: 100%;
    height: 100rpx;
  }
  .content {
    // margin: 40rpx auto 0;
    // width: 690rpx;
    background-color: #fff;
    // border: 1rpx solid #d8d8d8;
    // box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
    // border-radius: 15rpx;
    // padding: 0 30rpx;
    .content-title-box {
      position: fixed;
      width: 100%;
      background-color: #fff;
      .content-title {
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-bottom: 1rpx solid #d8d8d8;
        > view {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .content-title-box-copy {
      width: 100%;
      height: 96rpx;
    }
    .content-footer {
      .content-box {
        padding: 20rpx 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1rpx solid #d8d8d8;
        > view {
          display: flex;
          align-items: center;
          justify-content: center;
          word-break: break-all;
          color: #999;
          font-size: 24rpx;
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
.footer-box {
  width: 100%;
  position: fixed;
  bottom: 100rpx;
  background-color: #fff;
  .footer {
    width: 690rpx;
    margin: 20rpx auto 0;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    .footer-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 334rpx;
      height: 120rpx;
      background: #ffffff;
      border: 1rpx solid #d8d8d8;
      box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
      border-radius: 15rpx;
      margin: 10rpx 0;
      .one {
        color: #4059ff;
      }
      .two {
        color: #28c484;
      }
      .three {
        color: #ed9c0e;
      }
      .four {
        color: #f05757;
      }
      > text {
        font-size: 36rpx;
        font-weight: 600;
      }
      > view {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}
.footer-copy {
  width: 100%;
  height: 320rpx;
}
</style>
