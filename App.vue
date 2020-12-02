<!-- <script src="https://buguoheng.com/static/js/vconsole.min.js"></script> -->
<script>
const unorm = require('./unorm.js')
export default {
  globalData: {
    list: [],
    obj: {},
    mnemonicList: [],
    mnemonic: ''
  },
  mounted () {
    /**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
     * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
     * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
     * */
    // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
    this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
    // 收到新消息
    this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
    // 会话列表更新
    this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
      this.$store.commit("updateConversationList", event.data);
    });
  },
  methods: {
    onReadyStateUpdate ({ name }) {
      const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
      //自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
      this.$store.commit("toggleIsSDKReady", isSDKReady);
      //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
    },

    onReceiveMessage ({ data: messageList }) {
      // this.handleAt(messageList);
      this.$store.commit("pushCurrentMessageList", messageList);
    },
    //根据消息列表请求聊天对象的用户信息 并完成数据拼接

  },
  onLaunch: function (e) {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.versions.mobile) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        uni.setStorageSync('isWeixin', true);
      } else {
        uni.setStorageSync('isWeixin', false);
      }
      if (browser.versions.ios) {
        uni.setStorageSync('browser', 'IOS');
      }
      if (browser.versions.android) {
        uni.setStorageSync('browser', 'Android');
      }
    }
    // console.log(e)
    // let type = e.query.type
    // if (type == 1) {
    //   return uni.reLaunch({
    //     url: '/pages/register/download'
    //   });
    // }
    let path = e.path
    if (path == 'pages/register/download') {
      return uni.reLaunch({
        url: '/pages/register/download'
      });
    }
    // uni.setStorageSync('referrer', e.query.referrer);
    let referrer = e.query.referrer
    if (referrer != '' && referrer != undefined) {
      return uni.reLaunch({
        url: '/pages/register/register?referrer=' + referrer
      });
    }
    getApp().globalData.list = uni.getStorageSync('list') || [];
    if (uni.getStorageSync('token') != '') {
      uni.switchTab({
        url: '/pages/index/index'
      });
    } else {
      uni.clearStorageSync()
      getApp().globalData.list = []
      uni.navigateTo({
        url: '/pages/login/login'
      });
    }
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "./common/css/common.scss";
@import "uview-ui/index.scss";
</style>
