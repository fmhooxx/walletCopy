<template>
  <view>
    <view class="userInfo-hd">
      <image src="/static/avatar.png"
             mode=""></image>
      <view class="userName">
        <view>13988998888</view>
        <view class="date">注册时间：2020-04-13</view>
      </view>
    </view>
    <view class="user-list">
      <view>
        <view class="up">近30日成交量</view>
        <view class="blew">24</view>
      </view>
      <view>
        <view class="up">近30日申诉</view>
        <view class="blew">2</view>
      </view>
      <view>
        <view class="up">近30日胜诉</view>
        <view class="blew">2</view>
      </view>
      <view>
        <view class="up">总成交量</view>
        <view class="blew">243</view>
      </view>
      <view>
        <view class="up">总申诉量</view>
        <view class="blew">32</view>
      </view>
      <view>
        <view class="up">总胜诉量</view>
        <view class="blew">30</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  onLoad () {
  },
  methods: {

  },
};
</script>

<style lang="less">
.userInfo-hd {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50rpx 30rpx 30rpx 30rpx;

  image {
    height: 88rpx;
    width: 88rpx;
    margin-right: 30rpx;
  }

  .userName {
    font-size: 28rpx;
    color: #223041;
    font-weight: 500;

    .date {
      font-size: 22rpx;
      color: #878787;
    }
  }
}

.user-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 30rpx 0;

  .up {
    font-size: 24rpx;
    color: #878787;
  }

  .blew {
    font-size: 30rpx;
    color: #223041;
    font-weight: 500;
  }

  view {
    width: 33%;
    text-align: center;
    padding: 12rpx 0;

    view {
      width: 100%;
    }
  }
}
</style>
