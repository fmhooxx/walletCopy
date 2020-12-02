<template>
  <view class="index">
    <view class="head">
      <view class="head-common"
            @click="goUrl('/pages/defi/details?grantStatus=' + 0)">
        <view>进行中</view>
      </view>
      <view class="head-common"
            @click="goUrl('/pages/defi/details?grantStatus=' + 1)">
        <view>已完成</view>
      </view>
      <view class="head-common"
            @click="goUrl('/pages/defi/complete')">
        <view>购买明细</view>
      </view>
    </view>
    <view class="common"
          v-for="(item, index) in list"
          :key="index">
      <view class="common-top">
        <image :src="item.img"></image>
        <view class="common-copy">
          <view class="common-box">
            <image :src="item.ico"></image>
            <view class="box-right">
              <view class="right-one"
                    :style="{color: item.fontColor}">{{item.machineryName}}</view>
              <view class="right-two"
                    :style="{color: item.fontColor}">
                <view>
                  <view>价格</view>
                  <view>{{item.price}}FHC</view>
                </view>
                <view>
                  <view>运行天数</view>
                  <view>{{item.runCycle}}(天)</view>
                </view>
                <view>
                  <view>收益比例</view>
                  <view>{{item.earningsRatio | earningsRatios}}倍</view>
                </view>
                <!-- <view>价值:{{item.price}}u</view>
                <text>运行天数: {{item.hashrate}}d</text>
                <text>总产值: 120u</text> -->
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="common-bottom">
        <view class="bottom-one">
          <view><text>矿机说明:</text>{{item.title}}</view>
          <!-- <text v-if="item.investmentDiscount > item.price ? true:false">特惠</text> -->
        </view>
        <text></text>
        <view class="bottom-two"
              @click="purchase(item.id)">兑换</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: []
    };
  },
  onShow () {
    this.getInfo()
    this.getBmsMiningMachineryCycles()
  },
  filters: {
    earningsRatios (val) {
      return val = val + 1
    }
  },
  methods: {
    async getInfo () {
      let res = await this.$api.api.getInfo()
      if (res.data.code == 401) {
        uni.reLaunch({
          url: '/pages/login/login'
        });
      }
    },
    async purchase (id) {
      uni.showModal({
        title: '温馨提示',
        content: '确定兑换该矿机吗?',
        success: (res) => {
          if (res.confirm) {
            this.purchases(id)
          } else if (res.cancel) {
          }
        }
      });
    },
    async purchases (id) {
      let data = {
        miningCycleMachineryId: id
      }
      let res = await this.$api.api.buyCycleMachinery(data)
      if (res.data.code == 200) {
        this.$api.msg(res.data.data)
      } else {
        this.$api.msg(res.data.message)
      }
    },
    async getBmsMiningMachineryCycles () {
      let res = await this.$api.api.getBmsMiningMachineryCycle()
      if (res.data.code == 200) {
        this.list = res.data.data
      } else {
        this.$api.msg(res.data.message)
      }
    },
    goUrl (url) {
      uni.navigateTo({
        url: url
      });
    }
  },
}
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style lang="scss">
.index {
  padding: 0 30rpx;
  border-top: 1rpx solid transparent;
  .head {
    margin: 20rpx auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 690rpx;
    height: 100rpx;
    background-color: #fff;
    border-radius: 30rpx;
    .head-common {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      // > image {
      //   width: 50rpx;
      //   height: 50rpx;
      //   margin-right: 20rpx;
      // }
      > view {
        font-size: 28rpx;
        color: #3c3e4b;
      }
    }
  }
  .common {
    position: relative;
    border-radius: 20rpx;
    margin: 20rpx 0;
    background-color: #fff;
    border: 1rpx solid #f8f8f8;
    box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(27, 27, 27, 0.13);
    .common-top {
      height: 210rpx;
      > image {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
      }
      .common-copy {
        position: absolute;
        top: 50rpx;
        // left: 50rpx;
        left: 0;
        width: 100%;
        // height: 100%;
        .common-box {
          display: flex;
          align-items: center;
          padding: 0 20rpx;
          > image {
            width: 112rpx;
            height: 112rpx;
          }
          .zero {
            color: #52e9f2;
          }
          .one {
            color: #eac442;
          }
          .two {
            color: #eb6718;
          }
          .box-right {
            flex: 1;
            width: 100%;
            font-size: 42rpx;
            font-style: oblique;
            font-weight: 700;
            margin-left: 30rpx;

            .right-one {
            }
            .right-two {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20rpx;
              > view {
                font-size: 24rpx;
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: center;
                > view {
                  text-align: center;
                }
              }
              // > text {
              //   margin-left: 70rpx;
              // }
            }
          }
        }
      }
    }
    .common-bottom {
      display: flex;
      align-items: center;
      padding: 28rpx;
      > text {
        height: 100rpx;
        width: 1rpx;
        background-color: #d8d8d8;
        margin: 0 20rpx;
      }
      .bottom-one {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        color: #999;
        font-size: 26rpx;
        > text {
          color: red;
        }
        > view {
          > text {
            color: #666;
            font-size: 26rpx;
            font-weight: 600;
          }
        }
      }
      .bottom-two {
        width: 126rpx;
        height: 42rpx;
        background: #4059ff;
        box-shadow: 0rpx 6rpx 4rpx 0rpx rgba(27, 27, 27, 0.38);
        border-radius: 6rpx;
        text-align: center;
        line-height: 42rpx;
        color: #fff;
        font-size: 26rpx;
      }
    }
  }
}
</style>
