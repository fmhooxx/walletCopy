<template>
  <view class="index">
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
                <view>{{item.price}}u</view>
                <text>{{item.hashrate}}d</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="common-bottom">
        <view class="bottom-one">
          <text>矿机说明:</text>{{item.title}}
        </view>
        <text></text>
        <view class="bottom-two"
              @click="purchase(item.id)">兑换</view>
      </view>
    </view>
    <view class="details"
          @click="goUrl('/pages/mine/details')">
      <view>购买明细</view>
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
  onLoad () {
    this.getBmsMiningMachineryLists()
  },
  methods: {
    async purchase (id) {
      uni.showModal({
        title: '温馨提示',
        content: '确定兑换该矿机吗?',
        success: (res) => {
          if (res.confirm) {
            this.purchases(id)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async purchases (id) {
      let data = {
        miningMachineryId: id
      }
      let res = await this.$api.api.buyMachinery(data)
      if (res.data.code == 200) {
        this.$api.msg(res.data.data)
      } else {
        this.$api.msg(res.data.message)
      }
    },
    async getBmsMiningMachineryLists () {
      let res = await this.$api.api.getBmsMiningMachineryList()
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
        left: 50rpx;
        // width: 100%;
        // height: 100%;
        .common-box {
          display: flex;
          align-items: center;
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
            font-size: 42rpx;
            font-style: oblique;
            font-weight: 700;
            margin-left: 50rpx;

            .right-one {
            }
            .right-two {
              display: flex;
              align-items: center;
              margin-top: 20rpx;
              font-size: 28rpx;
              > text {
                margin-left: 70rpx;
              }
            }
          }
        }
      }
    }
    .common-bottom {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 28rpx;
      > text {
        height: 100rpx;
        width: 2rpx;
        background-color: #d8d8d8;
        margin: 0 20rpx;
      }
      .bottom-one {
        width: 80%;
        color: #999;
        font-size: 26rpx;
        > text {
          color: #666;
          font-size: 26rpx;
          font-weight: 600;
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
  .details {
    position: fixed;
    top: 40%;
    right: 0;
    transform: translateY(-50%);
    width: 90rpx;
    height: 100rpx;
    border-radius: 100rpx 0 0 100rpx;
    background-color: #ea541d;
    color: #fff;
    padding: 0 10rpx;
    text-align: center;
    font-size: 28rpx;
    > view {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
