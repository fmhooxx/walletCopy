<template>
  <view class="index">
    <view class="header">
      <text>一建卖币</text>
      <view>
        <u-dropdown>
          <u-dropdown-item v-model="value"
                           :title="active"
                           @change="changeOptions"
                           :options="options"></u-dropdown-item>
        </u-dropdown>
      </view>
    </view>
    <view class="box">
      <view class="box-head">
        <view class="limit">限额: <text>100-1000000</text></view>
        <view class="reference">
          <view>{{active}}参考价</view>
          <text>1.00 CNY/{{active}}</text>
        </view>
      </view>
      <view class="box-common">
        <view>
          <u-input v-model="number"
                   border-color="#B0B0B0"
                   type="number"
                   placeholder-style="color:#B0B0B0"
                   placeholder="购买数量" />
        </view>
        <text>{{active}}</text>
      </view>
      <view class="box-common">
        <view>
          <u-input v-model="price"
                   border-color="#B0B0B0"
                   type="number"
                   :disabled="true"
                   placeholder-style="color:#B0B0B0"
                   placeholder="需要金额" />
        </view>
        <text class="CNY">CNY</text>
      </view>
      <view class="list">
        <view class="list-item"
              v-for="(item, index) in list"
              :key="index"
              @click="changeList(index)"
              :class="index == current ? 'item-active':''">
          <view>{{item.text}}</view>
          <image v-show="index == current"
                 src="/static/tr-active.png"></image>
        </view>
      </view>
      <view class="btn">一键买入</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      value: 0,
      options: [{
        label: 'USDT',
        value: 0,
      },
      {
        label: 'FHC',
        value: 1,
      }],
      active: '',
      number: '',
      price: '',
      list: [
        {
          id: 0,
          text: '银行卡'
        },
        {
          id: 1,
          text: '支付宝'
        },
        {
          id: 2,
          text: '微信'
        }
      ],
      current: 0
    };
  },
  created () {
    this.active = this.options[0].label
  },
  methods: {
    changeList (index) {
      this.current = index
    },
    changeOptions (index) {
      this.active = this.options[index].label
    }
  },
}
</script>

<style lang="less">
.index {
  .header {
    position: relative;
    height: 80rpx;
    line-height: 80rpx;
    > text {
      color: #3f3f3f;
      font-size: 35rpx;
      font-weight: 600;
      margin-left: 30rpx;
    }
    > view {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      /deep/.u-dropdown__menu__item {
        justify-content: flex-end;
        padding-right: 30rpx;
        /deep/.u-dropdown__menu__item__text {
          color: #3f3f3f;
          font-size: 35rpx;
          font-weight: 600;
        }
      }
    }
  }
  .box {
    padding: 0 30rpx;
    .box-head {
      margin: 20rpx 0;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .limit {
        font-size: 28rpx;
        color: #bbbbbb;
        > text {
          color: #4b4b4b;
          font-size: 28rpx;
          font-weight: bold;
          margin-left: 20rpx;
        }
      }
      .reference {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        > view {
          color: #bbbbbb;
          font-size: 28rpx;
          font-weight: 500;
        }
        > text {
          color: #52b88a;
          font-size: 28rpx;
          font-weight: bold;
        }
      }
    }
    .box-common {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22rpx;
      border-radius: 9rpx;
      border: 1rpx solid #b8b8b8;
      margin-bottom: 34rpx;
      > view {
        width: 80%;
      }
      > text {
        color: #3f3f3f;
        font-size: 28rpx;
        font-weight: bold;
      }
      .CNY {
        color: #52b88a;
      }
    }
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .list-item {
        position: relative;
        width: 142rpx;
        height: 82rpx;
        background: #f3f3f3;
        border: 3rpx solid transparent;
        color: #b0b0b0;
        border-radius: 9rpx;
        > view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        > image {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 45rpx;
          height: 35rpx;
        }
      }
      .item-active {
        color: #4059ff;
        border: 3rpx solid #4059ff;
        background-color: #fff;
      }
    }
    .btn {
      margin: 32rpx auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 686rpx;
      height: 82rpx;
      background: #52b88a;
      border-radius: 9rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}
</style>
