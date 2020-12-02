<template>
  <view>
    <!-- 		<view class="list" @click="jump('/pages/chat/chatContent')">
			<image src="../../static/avatar.png" mode=""></image>
			<view class="message">
				<view>快来吃饭</view>
				<view class="num">2</view>
			</view>
		</view> -->
    <view class="list-box"
          v-if="conversationList.length>0">
      <view class="item-box"
            v-for="(item,index) in conversationList"
            :key="index"
            @click="toRoom(item)">
        <view class="item-img">
          <img :src="item.userProfile.avatar"
               alt="">
        </view>
        <view class="item-text">
          <view class="item-user">
            {{item.userProfile.nick}}
          </view>
          <view class="item-text-info">
            <rich-text :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>

          </view>
        </view>
        <view class="item-msg">
          <view class="item-msg-icon"
                v-if="item.unreadCount">{{item.unreadCount}}</view>
        </view>
      </view>
    </view>
    <view class="list-box"
          v-else>
      <view class="msg-box">暂无聊天记录，请选择好友进行聊天</view>
    </view>
  </view>
</template>

<script>
import {
  mapState
} from "vuex";
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isSDKReady: state => state.isSDKReady,
      conversationList: state => state.conversationList
    })
  },
  watch: {
    isSDKReady (val) {
      console.log(val)
      //isSDKReady == true 
      if (val) {
        //更新用户自己的基础资料（头像+昵称+个性签名）
        // this.updateUserInfo()
        //请求会话列表
        this.getConversationList()
      }
    }
  },
  onLoad () {
    this.getMessage()
  },
  onShow () {
    setTimeout(() => {
      this.getConversationList()
    }, 3000)
  },
  methods: {
    ju1mp () {
      console.log(this.conversationList)
    },
    jump (url) {
      uni.navigateTo({
        url: url
      })
    },
    nodesFliter (str) {
      let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
      return nodeStr
    },
    getMessage () {
      setTimeout(() => {
        let promise = this.tim.login({
          userID: '666666',
          userSig: 'eJwtzFELgjAUhuH-suuQo9ucCd1lQWU0jKDLckc5WDGW6SD674l6*T0fvF92PhRBh46lLAqALcZNBl8tVTTyw1Qzv01zs5YMS0MBwFUSg5ge9JYcDi6ljABg0paeoy1VzKMwTuYK1UP13hf5Drv1NvfHPXJfboxTTX0SusyucJGd5N71mf5oWLHfH6-qMLs_',
        })
        promise.then((res) => {
          console.log(res)
          //登录成功后 更新登录状态
          this.$store.commit("toggleIsLogin", true);
          //自己平台的用户基础信息
          // uni.setStorageSync('userInfo', JSON.stringify(userInfo))
          //tim 返回的用户信息
          uni.setStorageSync('userTIMInfo', JSON.stringify(res.data.data))
          // uni.reLaunch({
          // 	url: '../tim/record'
          // })
        }).catch((err) => {
          console.warn('login error:', err); // 登录失败的相关信息
        });
      }, 1000)
    },
    //获取消息列表
    getConversationList () {
      // 拉取会话列表
      let promise = this.tim.getConversationList();
      promise.then((res) => {
        let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
        if (conversationList.length) {
          //将返回的会话列表拼接上 用户的基本资料  
          //说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
          // this.conversationList = conversationList
          this.$store.commit("updateConversationList", conversationList);
        }
      }).catch((err) => {
        console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
      });
    },
    toRoom (item) {
      item.conversationID = "C2C123456"
      this.$store.commit('updateConversationActive', item)
      uni.navigateTo({
        url: './chatContent'
      })
    },
  }
}
</script>

<style scoped lang="scss">
.list-box {
  width: 94%;
  margin: 40rpx auto;
}

.item-box {
  width: auto;
  height: 130rpx;
  padding: 20rpx;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

.item-img {
  float: left;
  margin-top: 20rpx;
  width: 80rpx;
  height: 80rpx;
}

.item-img img {
  width: 80rpx;
  height: 80rpx;
}

.item-text {
  float: left;
  margin-left: 30rpx;
  width: 500rpx;
  height: 100rpx;
  color: #666;
  font-size: 28rpx;
}

.item-user {
  width: auto;
  height: 60rpx;
  line-height: 60rpx;
  color: 333;
  font-size: 32rpx;
}

.item-text-info {
  width: auto;
  height: 60rpx;
  line-height: 60rpx;
  color: #666;
  font-szie: 24rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-box {
  width: auto;
  height: 80rpx;
  padding: 0 20rpx;
}

.nav-tab {
  padding-top: 20rpx;
  background: #fff;
  height: 80rpx;
}

.tab-item {
  float: left;
  height: 70rpx;
  padding: 0 20rpx;
  line-height: 70rpx;
  color: #666;
  font-size: 28rpx;
  border: 1px solid #f56c6c;
  border-top-left-radius: 25rpx;
  border-bottom-left-radius: 25rpx;
}

.tab-item1 {
  float: left;
  height: 70rpx;
  padding: 0 20rpx;
  line-height: 70rpx;
  color: #666;
  font-size: 28rpx;
  border: 1px solid #f56c6c;
  border-top-right-radius: 25rpx;
  border-bottom-right-radius: 25rpx;
}

.tab-item-active {
  color: #fff;
  background: #f56c6c;
}

.msg-box {
  line-height: 30rpx;
  font-size: 28rpx;
  color: #666;
}
// .list {
// 	padding: 30rpx 30rpx;
// 	border-bottom: 1rpx solid #EEEEEE;
// 	display: flex;
// 	align-items: center;

// 	image {
// 		height: 80rpx;
// 		width: 80rpx;
// 		border-radius: 50%;
// 	}

// 	.message {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		margin-left: 15rpx;
// 		width: 82%;

// 		.num {
// 			height: 40rpx;
// 			width: 40rpx;
// 			border-radius: 50%;
// 			background-color: red;
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			font-size: 16rpx;
// 			color: #FFFFFF;
// 		}
// 	}
// }
</style>
