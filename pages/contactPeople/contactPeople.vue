<template>
  <view class="estimate">
    <view class="estimate_hd">
      <image src="../../static/left.png"
             mode=""
             @click="back"></image>
      <text class="list_title">好友列表</text>
      <image src="../../static/add.png"
             mode=""
             @click="add()"></image>
    </view>
    <scroll-view scroll-y="true"
                 class="scroll-box"
                 id="user-main"
                 :scroll-into-view="toView">
      <ren-enIndex ref="ren"></ren-enIndex>
      <view class="fixed-right">
        <view class="item-index c-flex-center"
              v-for="(item, index) in letters"
              :key="index"
              @click="onIndexClick(item.letter)">{{ item.letter }}</view>
      </view>
      <view class="c-btm-safearea"></view>
    </scroll-view>
  </view>
</template>

<script>
import RenEnIndex from '../../components/u-charts/ren-enIndex.vue';
export default {
  components: {
    RenEnIndex
  },
  data () {
    return {
      toView: 'user-find',
      letters: [],
      userData: [
        { name: 'AREN', avatar: 'https://ftp.bmp.ovh/imgs/2020/05/81b19b3314dad88a.png' },
        { name: '艾希', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Ashe.png' },
        { name: '小学僧', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/LeeSin.png' },
        { name: '托儿索', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Yasuo.png' },
        { name: '放逐之刃', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Riven.png' },
        { name: '崔斯特', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/TwistedFate.png' },
        { name: '潮汐海灵', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Fizz.png' },
        { name: '刀锋意志', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/Irelia.png' },
        { name: '#无名', avatar: 'http://game.gtimg.cn/images/lol/act/img/champion/MasterYi.png' }
      ]
    };
  },
  onReady () {
    setTimeout(() => {
      console.log(this.$refs.ren.isHave)
      let data = this.$refs.ren.sortedData;
      this.letters = data.filter(item => {
        if (item.hasData) {
          return item;
        }
      });
    }, 800)
    // this.$nextTick(() => {

    // })
  },
  onLoad () {
    this.userSign()
    // this.peopleList()
  },
  methods: {
    back () {
      uni.switchTab({
        url: "/pages/index/index"
      })
    },
    async userSign () {
      let id = uni.getStorageSync('id')
      let sign = uni.getStorageSync('sign')
      this.IMlogin(id, sign)
      // let data = {}
      // let res = await this.$api.api.userSign(data);
      // if(res.data.code == 200){
      //  uni.setStorageSync('sign',res.data.data)
      //  this.IMlogin(res.data.data)
      // }
    },
    IMlogin (id, sign) {
      let ids = id + ""
      let signs = sign + ""
      let promise = this.tim.login({
        userID: ids,
        userSig: signs
      })
      promise.then((res) => {
        // console.log(res)
      }).catch((err) => {
        // console.warn('login error:', err); // 登录失败的相关信息
      });
    },
    add () {
      uni.navigateTo({
        url: "search/search"
      })
    },
    // async peopleList () {
    //   let data = {
    //     // memberId:100001
    //   }
    //   let res = await this.$api.api.peopleList(data)
    //   console.log(res)
    //   if (res.data.code == 200) {
    //     // console.log(res.data.data.list)
    //     res.data.data.list.forEach((item) => {
    //       item.avatar = "http://game.gtimg.cn/images/lol/act/img/champion/Riven.png",
    //         item.name = "放逐之刃"

    //     })
    //     this.userData = res.data.data.list
    //     // console.log(this.userData)
    //   }

    // },
    onIndexClick (index) {
      // let text = `<font  style="font-size:30px;">${index}</font>`;//app可以原生提示
      // plus.nativeUI.toast(text, {
      //     verticalAlign: 'center',
      //     type: 'richtext'
      // });
      uni.showToast({
        icon: 'none',
        title: index
      });
      if (index == '#') {
        this.toView = 'other';
      } else {
        this.toView = index;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.estimate {
  .estimate_hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    padding: 0 30rpx;
    image {
      height: 40rpx;
      width: 40rpx;
    }
    .list_title {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  .scroll-box {
    height: 100vh;
    .title {
      margin-top: 20rpx;
      color: #5a5a5a;
      height: 94rpx;
      line-height: 94rpx;
      padding-left: 24rpx;
      font-size: 36rpx;
      font-weight: bold;
      background-color: #fff;
    }
    .fixed-right {
      position: fixed;
      top: 200rpx;
      right: 10rpx;
      width: 40rpx;
      padding: 20rpx 0;
      background-color: #21191b;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 99;
      .item-index {
        color: #b89249;
        width: 24rpx;
        height: 24rpx;
        font-weight: bold;
        font-size: 20rpx;
        text-align: center;
        padding: 12rpx 0;
      }
    }
  }
}
</style>