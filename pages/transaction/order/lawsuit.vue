<template>
  <view class="index">
    <view class="common">
      <view>买家ID</view>
      <text>13899889888</text>
    </view>
    <view class="common">
      <view>卖家ID</view>
      <text>13899889888</text>
    </view>
    <view class="common">
      <view>订单号</view>
      <text>200430289983</text>
    </view>
    <view class="common">
      <view>时间</view>
      <text>2020-04-13 13:11:33</text>
    </view>
    <view class="common">
      <view>单价(CNY/USDT)</view>
      <text>1.05</text>
    </view>
    <view class="common">
      <view>总金额(CNY)</view>
      <text>100</text>
    </view>
    <view class="common">
      <view>总数量(USDT)</view>
      <text>200</text>
    </view>
    <view class="common">
      <view>对方申诉理由</view>
      <text>未收到收款</text>
    </view>
    <view class="reason">
      <text>凭证:</text>
      <view>
        <image src="/static/USDT.png"
               @click="open"></image>
      </view>
    </view>
    <view class="appeal">
      <view class="appeal-title">应诉理由:</view>
      <view class="appeal-content">
        <textarea placeholder="必填"
                  v-model="val"
                  auto-height></textarea>
      </view>
    </view>
    <view class="voucher">
      <view class="voucher-title">上传凭证：<text>（非必选）</text></view>
      <view class="voucher-box"
            @click="updata"
            v-if="isImg">
        <image src="/static/camera.png"></image>
        <view>上传凭证</view>
      </view>
      <view class="img-box"
            v-else>
        <view @click="clear">
          <image src="/static/close.png"></image>
        </view>
        <image :src="img"
               @click="open"></image>
      </view>
    </view>
    <view class="btn">
      <view>提交</view>
    </view>
    <u-popup v-model="show"
             border-radius="14"
             mode="center">
      <view>
        <image src="/static/USDT.png"></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      val: '',
      show: false,
      img: ''
    };
  },
  computed: {
    isImg () {
      if (this.img == '') {
        return true
      }
      return false
    }
  },
  methods: {
    clear () {
      uni.showModal({
        title: '温馨提示',
        content: '确定删除?',
        success: (res) => {
          if (res.confirm) {
            this.img = ''
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    updata () {
      uni.chooseImage({
        count: 1,
        success: res => {
          console.log(res)
          this.img = res.tempFilePaths[0]
        }
      })
    },
    open () {
      this.show = true
    }
  },
}
</script>

<style lang="less">
/deep/.u-mode-center-box {
  padding: 20rpx;
}
.index {
  padding: 0 30rpx;
  .common {
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > view {
      color: #223041;
      font-size: 28rpx;
    }
    > text {
      color: #5e5e5e;
      font-size: 28rpx;
    }
  }
  .reason {
    > view {
      margin: 20rpx 0;
      width: 220rpx;
      height: 180rpx;
      > image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .appeal {
    .appeal-title {
      color: #223041;
      font-size: 28rpx;
    }
    .appeal-content {
      margin: 20rpx 0;
      padding: 40rpx 30rpx;
      border: 1rpx solid #b5b5b5;
      border-radius: 20rpx;
    }
  }
  .voucher {
    .voucher-title {
      color: #223041;
      font-size: 28rpx;
      > text {
        color: #b0b0b0;
        font-size: 24rpx;
      }
    }
    .voucher-box {
      margin-top: 18rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 220rpx;
      height: 180rpx;
      background: #fcfcfc;
      border: 2rpx dashed #afafaf;
      > image {
        width: 60rpx;
        height: 46rpx;
        margin-bottom: 20rpx;
      }
      > view {
        color: #000000;
        font-size: 24rpx;
        font-weight: bold;
      }
    }
    .img-box {
      position: relative;
      margin: 20rpx 0;
      width: 220rpx;
      height: 180rpx;
      padding: 20rpx;
      > image {
        width: 100%;
        height: 100%;
      }
      > view {
        width: 40rpx;
        height: 40rpx;
        text-align: center;
        line-height: 40rpx;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #fff;
        border-radius: 50%;
        z-index: 1;
        border: 1rpx solid #333333;
        > image {
          // width: 40rpx;
          // height: 40rpx;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .btn {
    margin-top: 48rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > view {
      color: #fff;
      font-size: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 216rpx;
      height: 72rpx;
      background: #c34554;
      border-radius: 36rpx;
    }
  }
}
</style>
