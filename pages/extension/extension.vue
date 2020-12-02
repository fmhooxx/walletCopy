<template>
  <view class="index">
    <view class="search-copy"></view>
    <view class="search-box">
      <view class="search"
            v-if="current!=0">
        <u-input v-model="val"
                 placeholder="搜索ID"
                 @input="searchInput"
                 :clearable="true" />
        <view @click="searchVal">搜索</view>
      </view>
    </view>
    <view class="tab-box"
          :class="current == 0 ? 'member-box':''">
      <view class="tab">
        <view v-for="(item, index) in tabList"
              @click="changeTab(index)"
              :class="index == current ? 'active' : ''"
              :key="item.id">{{item.text}}</view>
      </view>
    </view>
    <view class="tab-box-copy"
          :class="current == 0 ? 'tab-box-copy-member':''"></view>
    <member ref="member"
            v-if="current == 0"></member>
    <team ref="team"
          v-else></team>
    <view class="btn-copy"></view>
    <view class="btn">
      <view @click="profit">收益明细</view>
    </view>
  </view>
</template>

<script>
import member from './member'
import team from './team'
export default {
  components: {
    member,
    team
  },
  data () {
    return {
      val: '',
      tabList: [
        {
          id: 0,
          text: '会员'
        },
        {
          id: 1,
          text: '团队'
        }
      ],
      current: 0,
      topReferrerStatus: ''
    }
  },
  onLoad () {
    this.getInfo()
  },
  onReachBottom () {
    if (this.current == 0) {
      uni.$emit('onReachBottoms');
    } else if (this.current == 1) {
      uni.$emit('onReachBottomTeam');
    }
  },
  methods: {
    async getInfo () {
      let res = await this.$api.api.getInfo()
      if (res.data.code == 200) {
        this.topReferrerStatus = res.data.data.topReferrerStatus
      }
    },
    profit () {
      uni.navigateTo({
        url: '/pages/extension/profitDetails'
      });
    },
    searchInput (e) {
      if (e == '') {
        if (this.current == 0) {
          this.$refs.member.getMember()
        } else if (this.current == 1) {
          this.$refs.team.getTeams(1)
        }
      }
    },
    searchVal () {
      if (this.val.trim().length == 0) {
        return this.$api.msg('请输入搜索内容')
      }
      if (this.current == 1) {
        this.$refs.team.searchVal(this.val)
      }
    },
    changeTab (index) {
      this.current = index
      // if (this.topReferrerStatus == 0) {
      //   return this.$api.msg('您还不是团队长, 暂时无法查看')
      // } else if (this.topReferrerStatus == 1) {
      //   this.current = index
      // }
    }
  },
}
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style lang="less">
.index {
  border-top: 1rpx solid #415aff;
  .tab-box {
    width: 100%;
    // height: 200rpx;
    top: 206rpx;
    position: fixed;
    z-index: 99;
    background-color: #fff;
    .tab {
      margin: 20rpx auto;
      width: 690rpx;
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background-color: #fff;
      border: 1rpx solid #d8d8d8;
      box-shadow: 0rpx 5rpx 9rpx 0rpx rgba(27, 27, 27, 0.13);
      border-radius: 15rpx;
      > view {
        width: 100rpx;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 4rpx solid transparent;
      }
      .active {
        border-bottom: 4rpx solid #4059ff;
      }
    }
  }
  .member-box {
    height: 160rpx;
    top: 132rpx;
  }
  .tab-box-copy {
    width: 100%;
    background-color: #fff;
  }
  .tab-box-copy-member {
    // height: 70rpx;
  }
  .search-copy {
    width: 100%;
    height: 130rpx;
    background-color: #fff;
  }
  .search-box {
    position: fixed;
    width: 100%;
    top: 80rpx;
    background-color: #415aff;
    padding: 30rpx;
    z-index: 99;
    .search {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 0 20rpx;
      border-radius: 40rpx;
      > view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14%;
        height: 70rpx;
      }
    }
  }
  .btn-copy {
    width: 100%;
    height: 140rpx;
  }
  .btn {
    width: 100%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    > view {
      width: 690rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30rpx;
      color: #fff;
      background: #4059ff;
      box-shadow: 0rpx 4rpx 5rpx 0rpx rgba(142, 142, 142, 0.57);
      border-radius: 40rpx;
    }
  }
}
</style>
