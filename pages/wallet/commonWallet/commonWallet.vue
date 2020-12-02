<template>
  <view>
    <view class="head-bgi"></view>
    <view class="box-copy">
      <view class="box">
        <view class="box-common">
          <view>
            <view class="number"
                  v-if="num >= 1 ? false:true">1</view>
            <u-icon v-else
                    name="checkmark-circle-fill"
                    color="#415aff"
                    size="60"></u-icon>
          </view>
          <view class="common-text"
                :class="num >= 1 ? 'box-text':''">创建钱包</view>
        </view>
        <text :class="num >= 1 ? 'box-one':''">.........</text>
        <view class="box-common">
          <view>
            <view class="number"
                  v-if="num >= 2 ? false:true">2</view>
            <u-icon v-else
                    name="checkmark-circle-fill"
                    color="#415aff"
                    size="60"></u-icon>
          </view>
          <view class="common-text"
                :class="num >= 2 ? 'box-text':''">备份助记词</view>
        </view>
        <text :class="num >= 3 ? 'box-one':''">.........</text>
        <view class="box-common">
          <view>
            <view class="number"
                  v-if="num >= 3 ? false:true">3</view>
            <u-icon v-else
                    name="checkmark-circle-fill"
                    color="#415aff"
                    size="60"></u-icon>
          </view>
          <view class="common-text"
                :class="num >= 3 ? 'box-text':''">确认助记词</view>
        </view>
      </view>
    </view>
    <view class="footer"></view>
  </view>
</template>

<script>
export default {
  props: {
    // 控制显示的进度
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    };
  }
}
</script>

<style lang="less">
.head-bgi {
  width: 100%;
  height: 80rpx;
  background-color: #415aff;
}
.box-copy {
  position: absolute;
  left: 50%;
  top: 30rpx;
  transform: translate(-50%);
  width: 690rpx;
  height: 160rpx;
  border-radius: 30rpx;
  background-color: #fff;
  box-shadow: 0rpx 4rpx 20rpx -10rpx rgba(0, 0, 0, 0.4);
  .box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    > text {
      margin-bottom: 50rpx;
    }
    .box-one {
      color: #415aff;
    }
    .box-common {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 140rpx;
      width: 140rpx;
      .number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50rpx;
        height: 50rpx;
        padding: 10rpx;
        border-radius: 50%;
        background-color: #415aff;
        color: #fff;
        margin-bottom: 10rpx;
      }
      .common-text {
        font-size: 26rpx;
        font-weight: 600;
      }
      .box-text {
        margin-top: -6rpx;
        font-size: 26rpx;
        font-weight: 600;
        color: #ff1507;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 140rpx;
}
</style>
