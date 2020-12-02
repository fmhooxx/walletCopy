<template>
  <view class="indexs">
    <view class="list">
      <view class="head-box">
        <view class="head">
          <u-dropdown ref="uDropdown">
            <u-dropdown-item v-model="value1"
                             :title="label1"
                             @change="changeOptions1"
                             :options="options1"></u-dropdown-item>
            <u-dropdown-item v-model="value2"
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
            </u-dropdown-item>
          </u-dropdown>
        </view>
      </view>
      <view class="head-box-copy"></view>
      <view class="content">
        <view class="content-title-box">
          <view class="content-title">
            <view style="flex: 1">ID</view>
            <view style="flex: 2">今日推广(FHC)</view>
            <view style="flex: 2">累计推广(FHC)</view>
          </view>
        </view>
        <view class="content-title-box-copy"></view>
        <view class="content-footer"
              v-if="contentBox.length == 0 ? false:true">
          <view class="content-box"
                v-for="(item, index) in contentBox"
                :key="index">
            <view style="flex: 1">{{item.id}}</view>
            <view style="flex: 2">{{item.directYieldDay}}</view>
            <view style="flex: 2">{{item.directYieldTotal}}</view>
          </view>
        </view>
        <view v-else
              class="date">暂无更多数据</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      value1: 0,
      value2: 0,
      label1: '',
      label2: '',
      options1: [{
        label: 'T1',
        value: 0,
      },
      {
        label: 'T2',
        value: 1,
      },
      {
        label: 'T3',
        value: 2,
      }
      ],
      options2: [{
        label: '今日推广(降序)',
        value: 0,
        type: '/static/lower-arrow.png'
      },
      {
        label: '今日推广(升序)',
        value: 1,
        type: '/static/up-arrow.png'
      },
      {
        label: '累计推广(降序)',
        value: 2,
        type: '/static/lower-arrow.png'
      },
      {
        label: '累计推广(升序)',
        value: 3,
        type: '/static/up-arrow.png'
      }
      ],
      contentBox: [],
      flag: true,
      limit: 10,
      offset: 0
    }
  },
  created () {
    this.label1 = this.options1[this.value1].label
    this.label2 = this.options2[this.value2].label
    // 获取会员列表数据
    this.getMember()
  },
  mounted () {
    uni.$on('onReachBottoms', (data) => {
      this.offset += 10
      if (this.flag) {
        this.getMember()
      } else {
        this.$api.msg('已经加载全部')
      }
    })
  },
  methods: {
    async getMember () {
      let orderBy = ''
      let sortBy = ''
      if (this.label2 == '今日推广(降序)') {
        orderBy = 'direct_yield_day'
        sortBy = 'desc'
      } else if (this.label2 == '今日推广(升序)') {
        orderBy = 'direct_yield_day'
        sortBy = 'asc'
      } else if (this.label2 == '累计推广(降序)') {
        orderBy = 'direct_yield_total'
        sortBy = 'desc'
      } else if (this.label2 == '累计推广(升序)') {
        orderBy = 'direct_yield_total'
        sortBy = 'asc'
      }
      let data = {
        limit: this.limit,
        offset: this.offset,
        orderBy: orderBy,
        sortBy: sortBy
      }
      if (this.value1 == 0 || this.value1 == undefined) {
        var res = await this.$api.api.getMenberAchievement1(data)
      } else if (this.value1 == 1) {
        var res = await this.$api.api.getMenberAchievement2(data)
      } else if (this.value1 == 2) {
        var res = await this.$api.api.getMenberAchievement3(data)
      }
      if (res.data.code == 200) {
        this.flag = true
        if (res.data.data.list.length == 0) {
          this.flag = false
          this.$api.msg('已经加载全部')
        }
        this.contentBox.push(...res.data.data.list)
      } else {
        this.$api.msg(res.data.message)
      }
    },
    changeActive (index) {
      this.value2 = index
      this.label2 = this.options2[this.value2].label
      this.contentBox = []
      this.offset = 0
      this.getMember()
      this.$refs.uDropdown.close()
    },
    changeOptions1 (index) {
      this.value1 = index
      this.label1 = this.options1[this.value1].label
      this.contentBox = []
      this.offset = 0
      this.getMember()
    },
  },
}
</script>

<style lang="less">
.indexs {
  // padding: 0 30rpx;
  /deep/.u-dropdown__content__popup {
    position: fixed;
    width: 100%;
    top: 380rpx;
  }
  /deep/.u-dropdown__menu {
    width: 101%;
    position: fixed;
    left: 50%;
    top: 280rpx;
    transform: translateX(-50%);
    background-color: #fff;
    height: 102rpx !important;
    z-index: 99;
  }
  /deep/.u-dropdown__content__mask {
    position: fixed;
  }
  .list {
    // width: 690rpx;
    background-color: #fff;
    // border: 1rpx solid #d8d8d8;
    box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
    border-radius: 15rpx;
    margin: auto;
    .head-box {
      // width: 680rpx;
      // position: fixed;
      // left: 50%;
      // transform: translateX(-50%);
      // background-color: #fff;
      .head {
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .slot-content {
          background-color: #fff;
          .value2Active {
            color: #2979ff !important;
          }
          .slot-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30rpx;
            height: 110rpx;
            border-top: 1rpx solid #f6f7f9;
            > image {
              width: 20rpx;
              height: 20rpx;
            }
          }
        }
      }
    }
    .head-box-copy {
      width: 100%;
      // height: 90rpx;
    }
    .content {
      margin-top: 66rpx;
      .content-title-box {
        position: fixed;
        width: 100%;
        background-color: #fff;
        .content-title {
          height: 96rpx;
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
          padding: 30rpx 0;
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
        margin: 30rpx auto;
      }
    }
  }
}
</style>
