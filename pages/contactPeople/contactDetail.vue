<template>
  <view>
    <view v-if="!list.username">
      <view class="add">
        <view>未找到</view>
      </view>
    </view>
    <view v-else>
      <view class="add">
        <view class="add_head">
          <image src="../../static/avatar.png"
                 mode=""></image>
          <view>
            <view>{{list.username}}</view>
            <view><text>昵称：</text><text>下话费</text></view>
            <view><text>地区：</text><text>浙江杭州</text></view>
          </view>
        </view>

        <view class="add_people"
              @click="add">
          添加好友
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: ''
    };
  },
  onLoad (options) {
    this.getData(options.keys)
  },
  methods: {
    async getData (keys) {
      let data = {
        phone: keys
      }
      let res = await this.$api.api.addOpple(data)
      if (res.data.code == 200) {
        this.list = res.data.data
      }
    },
    async add () {
      let data = {
        contactsId: this.list.id
      }
      let res = await this.$api.api.addOpple1(data)
      if (res.data.code == 200) {
        this.list = res.data.data
        this.$api.msg("添加成功")
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 300)
      } else {
        this.$api.msg("添加失败")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  .add_head {
    display: flex;
    align-items: center;
    padding: 0 60rpx;
    image {
      height: 120rpx;
      width: 120rpx;
      margin-right: 40rpx;
    }
  }
  .add_people {
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80rpx;
    border-bottom: 1rpx solid #f4f4f4;
    border-top: 1rpx solid #f4f4f4;
  }
}
</style>
