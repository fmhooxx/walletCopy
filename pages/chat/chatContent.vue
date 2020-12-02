<template>
  <view>
    <view class="content"
          @touchstart="hideDrawer">
      <scroll-view class="msg-list"
                   scroll-y="true"
                   :scroll-with-animation="scrollAnimation"
                   :scroll-top="scrollTop"
                   :scroll-into-view="scrollToView"
                   @scrolltoupper="loadHistory"
                   upper-threshold="50">
        <!-- 加载历史数据waitingUI -->
        <view class="loading"
              v-if="isHistoryLoading">
          <view class="spinner">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
          </view>
        </view>
        <view class="row"
              v-for="(item, index) in msgList"
              :key="index"
              :id="item.ID">
          <!-- 用户消息 -->
          <block>
            <!-- 自己发出的消息 -->
            <view class="my"
                  v-if="item.flow == 'out'">
              <!-- 左-消息 -->
              <view class="left">
                <!-- 文字消息 -->
                <view v-if="item.type == TIM.TYPES.MSG_TEXT"
                      class="bubble">
                  <view v-html="nodesFliter(item.payload.text)"></view>
                  <!-- <rich-text :nodes="nodesFliter(item.payload.text)"></rich-text> -->
                </view>
              </view>
              <!-- 右-头像 -->
              <view class="right">
                <image src="/static/avatar.png"></image>
              </view>
            </view>
            <!-- 别人发出的消息 -->
            <view class="other"
                  v-else>
              <!-- 左-头像 -->
              <view class="left">
                <image src="/static/avatar.png"></image>
              </view>
              <!-- 右-用户名称-时间-消息 -->
              <view class="right">
                <view class="username">
                  <view class="name">{{ toUserInfo }}</view>
                  <view class="time">{{ timeFliter(item.time) }}</view>
                </view>

                <!-- 文字消息 -->
                <view v-if="item.type == TIM.TYPES.MSG_TEXT"
                      class="bubble">
                  <view v-html="nodesFliter(item.payload.text)"></view>
                  <!-- <rich-text :nodes="nodesFliter(item.payload.text)"></rich-text> -->
                </view>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <!-- 抽屉栏 -->
    <view class="popup-layer"
          :class="popupLayerClass"
          @touchmove.stop.prevent="discard">
      <!-- 表情 -->
      <swiper class="emoji-swiper"
              :class="{ hidden: hideEmoji }"
              indicator-dots="true"
              duration="150">
        <swiper-item v-for="(page, pid) in emojiList"
                     :key="pid">
          <view v-for="(em, eid) in page"
                :key="eid"
                @tap="addEmoji(em)">
            <image mode="widthFix"
                   :src="'/static/img/emoji/' + em.url"></image>
          </view>
        </swiper-item>
      </swiper>
      <!-- 更多功能 相册-拍照-红包 -->
      <view class="more-layer"
            :class="{ hidden: hideMore }">
        <view class="list">
          <view class="box"
                @tap="chooseImage">
            <view class="icon tupian2"></view>
          </view>
          <view class="box"
                @tap="camera">
            <view class="icon paizhao"></view>
          </view>
          <view class="box"
                @tap="handRedEnvelopes">
            <view class="icon hongbao"></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部输入栏 -->
    <view class="input-box"
          :class="popupLayerClass"
          @touchmove.stop.prevent="discard">
      <!-- H5下不能录音，输入栏布局改动一下 -->
      <!-- #ifndef H5 -->
      <view class="voice">
        <view class="icon"
              :class="isVoice ? 'jianpan' : 'yuyin'"
              @tap="switchVoice"></view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="more"
            @tap="showMore">
        <view class="icon add"></view>
      </view>
      <!-- #endif -->
      <view class="textbox">
        <view class="voice-mode"
              :class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
              @touchstart="voiceBegin"
              @touchmove.stop.prevent="voiceIng"
              @touchend="voiceEnd"
              @touchcancel="voiceCancel">{{ voiceTis }}</view>
        <view class="text-mode"
              :class="isVoice ? 'hidden' : ''">
          <view class="box">
            <textarea auto-height="true"
                      v-model="textMsg"
                      @focus="textareaFocus" />
          </view>
          <view class="em"
                @tap="chooseEmoji">
            <view class="icon biaoqing"></view>
          </view>
        </view>
      </view>
      <!-- #ifndef H5 -->
      <view class="more"
            @tap="showMore">
        <view class="icon add"></view>
      </view>
      <!-- #endif -->
      <view class="send"
            :class="isVoice ? 'hidden' : ''"
            @tap="sendText">
        <view class="btn">发送</view>
      </view>
    </view>
    <!-- 录音UI效果 -->
    <view class="record"
          :class="recording ? '' : 'hidden'">
      <view class="ing"
            :class="willStop ? 'hidden' : ''">
        <view class="icon luyin2"></view>
      </view>
      <view class="cancel"
            :class="willStop ? '' : 'hidden'">
        <view class="icon chehui"></view>
      </view>
      <view class="tis"
            :class="willStop ? 'change' : ''">{{ recordTis }}</view>
    </view>
    <!-- 红包弹窗 -->
    <view class="windows"
          :class="windowsState">
      <!-- 遮罩层 -->
      <view class="mask"
            @touchmove.stop.prevent="discard"
            @tap="closeRedEnvelope"></view>
      <view class="layer"
            @touchmove.stop.prevent="discard">
        <view class="open-redenvelope">
          <view class="top">
            <view class="close-btn">
              <view class="icon close"
                    @tap="closeRedEnvelope"></view>
            </view>
            <image src="/static/img/im/face/face_1.jpg"></image>
          </view>
          <view class="from">来自{{ redenvelopeData.from }}</view>
          <view class="blessing">{{ redenvelopeData.blessing }}</view>
          <view class="money">{{ redenvelopeData.money }}</view>
          <view class="showDetails"
                @tap="toDetails(redenvelopeData.rid)">
            查看领取详情 <view class="icon to"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import userList from '../../common/tim/user.js';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      //TIM变量
      flag: true,
      conversationActive: null,
      toUserId: '',
      toUserInfo: null,
      userInfo: null,
      nextReqMessageID: '',
      count: 15,
      isCompleted: '',
      msgList: [],
      TIM: null,

      //文字消息
      textMsg: '',
      //消息列表
      isHistoryLoading: false,
      scrollAnimation: false,
      scrollTop: 0,
      scrollToView: '',

      msgImgList: [],
      myuid: 0,

      //录音相关参数
      // #ifndef H5
      //H5不能录音
      RECORDER: uni.getRecorderManager(),
      // #endif
      isVoice: false,
      voiceTis: '按住 说话',
      recordTis: '手指上滑 取消发送',
      recording: false,
      willStop: false,
      initPoint: { identifier: 0, Y: 0 },
      recordTimer: null,
      recordLength: 0,

      //播放语音相关参数
      AUDIO: uni.createInnerAudioContext(),
      playMsgid: null,
      VoiceTimer: null,
      // 抽屉参数
      popupLayerClass: '',
      // more参数
      hideMore: true,
      //表情定义
      hideEmoji: true,
      emojiList: "",
      src: '',
      //表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
      onlineEmoji: {
        '100.gif': 'AbNQgA.gif',
        '101.gif': 'AbN3ut.gif',
        '102.gif': 'AbNM3d.gif',
        '103.gif': 'AbN8DP.gif',
        '104.gif': 'AbNljI.gif',
        '105.gif': 'AbNtUS.gif',
        '106.gif': 'AbNGHf.gif',
        '107.gif': 'AbNYE8.gif',
        '108.gif': 'AbNaCQ.gif',
        '109.gif': 'AbNN4g.gif',
        '110.gif': 'AbN0vn.gif',
        '111.gif': 'AbNd3j.gif',
        '112.gif': 'AbNsbV.gif',
        '113.gif': 'AbNwgs.gif',
        '114.gif': 'AbNrD0.gif',
        '115.gif': 'AbNDuq.gif',
        '116.gif': 'AbNg5F.gif',
        '117.gif': 'AbN6ET.gif',
        '118.gif': 'AbNcUU.gif',
        '119.gif': 'AbNRC4.gif',
        '120.gif': 'AbNhvR.gif',
        '121.gif': 'AbNf29.gif',
        '122.gif': 'AbNW8J.gif',
        '123.gif': 'AbNob6.gif',
        '124.gif': 'AbN5K1.gif',
        '125.gif': 'AbNHUO.gif',
        '126.gif': 'AbNIDx.gif',
        '127.gif': 'AbN7VK.gif',
        '128.gif': 'AbNb5D.gif',
        '129.gif': 'AbNX2d.gif',
        '130.gif': 'AbNLPe.gif',
        '131.gif': 'AbNjxA.gif',
        '132.gif': 'AbNO8H.gif',
        '133.gif': 'AbNxKI.gif',
        '134.gif': 'AbNzrt.gif',
        '135.gif': 'AbU9Vf.gif',
        '136.gif': 'AbUSqP.gif',
        '137.gif': 'AbUCa8.gif',
        '138.gif': 'AbUkGQ.gif',
        '139.gif': 'AbUFPg.gif',
        '140.gif': 'AbUPIS.gif',
        '141.gif': 'AbUZMn.gif',
        '142.gif': 'AbUExs.gif',
        '143.gif': 'AbUA2j.gif',
        '144.gif': 'AbUMIU.gif',
        '145.gif': 'AbUerq.gif',
        '146.gif': 'AbUKaT.gif',
        '147.gif': 'AbUmq0.gif',
        '148.gif': 'AbUuZV.gif',
        '149.gif': 'AbUliF.gif',
        '150.gif': 'AbU1G4.gif',
        '151.gif': 'AbU8z9.gif',
        '152.gif': 'AbU3RJ.gif',
        '153.gif': 'AbUYs1.gif',
        '154.gif': 'AbUJMR.gif',
        '155.gif': 'AbUadK.gif',
        '156.gif': 'AbUtqx.gif',
        '157.gif': 'AbUUZ6.gif',
        '158.gif': 'AbUBJe.gif',
        '159.gif': 'AbUdIO.gif',
        '160.gif': 'AbU0iD.gif',
        '161.gif': 'AbUrzd.gif',
        '162.gif': 'AbUDRH.gif',
        '163.gif': 'AbUyQA.gif',
        '164.gif': 'AbUWo8.gif',
        '165.gif': 'AbU6sI.gif',
        '166.gif': 'AbU2eP.gif',
        '167.gif': 'AbUcLt.gif',
        '168.gif': 'AbU4Jg.gif',
        '169.gif': 'AbURdf.gif',
        '170.gif': 'AbUhFS.gif',
        '171.gif': 'AbU5WQ.gif',
        '172.gif': 'AbULwV.gif',
        '173.gif': 'AbUIzj.gif',
        '174.gif': 'AbUTQs.gif',
        '175.gif': 'AbU7yn.gif',
        '176.gif': 'AbUqe0.gif',
        '177.gif': 'AbUHLq.gif',
        '178.gif': 'AbUOoT.gif',
        '179.gif': 'AbUvYF.gif',
        '180.gif': 'AbUjFU.gif',
        '181.gif': 'AbaSSJ.gif',
        '182.gif': 'AbUxW4.gif',
        '183.gif': 'AbaCO1.gif',
        '184.gif': 'Abapl9.gif',
        '185.gif': 'Aba9yR.gif',
        '186.gif': 'AbaFw6.gif',
        '187.gif': 'Abaiex.gif',
        '188.gif': 'AbakTK.gif',
        '189.gif': 'AbaZfe.png',
        '190.gif': 'AbaEFO.gif',
        '191.gif': 'AbaVYD.gif',
        '192.gif': 'AbamSH.gif',
        '193.gif': 'AbaKOI.gif',
        '194.gif': 'Abanld.gif',
        '195.gif': 'Abau6A.gif',
        '196.gif': 'AbaQmt.gif',
        '197.gif': 'Abal0P.gif',
        '198.gif': 'AbatpQ.gif',
        '199.gif': 'Aba1Tf.gif',
        '200.png': 'Aba8k8.png',
        '201.png': 'AbaGtS.png',
        '202.png': 'AbaJfg.png',
        '203.png': 'AbaNlj.png',
        '204.png': 'Abawmq.png',
        '205.png': 'AbaU6s.png',
        '206.png': 'AbaaXn.png',
        '207.png': 'Aba000.png',
        '208.png': 'AbarkT.png',
        '209.png': 'AbastU.png',
        '210.png': 'AbaB7V.png',
        '211.png': 'Abafn1.png',
        '212.png': 'Abacp4.png',
        '213.png': 'AbayhF.png',
        '214.png': 'Abag1J.png',
        '215.png': 'Aba2c9.png',
        '216.png': 'AbaRXR.png',
        '217.png': 'Aba476.png',
        '218.png': 'Abah0x.png',
        '219.png': 'Abdg58.png',
      },
      //红包相关参数
      windowsState: '',
      redenvelopeData: {
        rid: null, //红包ID
        from: null,
        face: null,
        blessing: null,
        money: null,
        id: ''
      },
    };
  },
  computed: {
    ...mapState({
      currentMessageList: (state) => state.currentMessageList,
    }),
  },
  watch: {
    currentMessageList (newVal, oldVal) {
      this.msgList = newVal;
      console.log(newVal);
      this.screenMsg(newVal, oldVal);
    },
  },
  onLoad (option) {
    console.log(this.cos)
    this.id = option.id
    this.toUserInfo = option.name
    uni.setNavigationBarTitle({
      title: option.name
    })
    this.emojiList = this.$emo.emojiList
    // this.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
    this.toUserId = this.$store.state.toUserId;
    this.conversationActive = this.$store.state.conversationActive;
    this.TIM = this.$TIM;
    //获取聊天对象的用户信息---有后端的情况这里 使用后端api请求、
    //防止初次聊天的时候 没有对方的基础信息
    // userList.forEach((item) => {
    //   if (this.toUserId == item.userId) {
    //     this.toUserInfo = item;
    //   }
    // });
    this.getMsgList();
    //语音自然播放结束
    this.AUDIO.onEnded((res) => {
      this.playMsgid = null;
    });
    // #ifndef H5
    //录音开始事件
    this.RECORDER.onStart((e) => {
      this.recordBegin(e);
    });
    //录音结束事件
    this.RECORDER.onStop((e) => {
      this.recordEnd(e);
    });
    // #endif
  },
  onShow () {
    this.scrollTop = 9999999;
    this.isHistoryLoading = false;
  },
  onUnload () {
    //退出页面 将所有的会话内的消息设置为已读
    let promise = this.tim.setMessageRead({
      conversationID: this.conversationActive.conversationID,
    });
    promise
      .then(function (imResponse) {
        // console.log('全部已读')
        // 已读上报成功
      })
      .catch(function (imError) {
        // 已读上报失败
        console.warn('setMessageRead error:', imError);
      });
  },
  methods: {
    //聊天的节点加上外层的div
    nodesFliter (str) {
      let nodeStr = ""
      if ((/\.(png|jpg|gif|jpeg|webp)$/).test(str)) {
        str = "http://" + str
        nodeStr =
          '<img style="max-width: 200px; max-height: 200px;" src=' + str + '>'
      } else if ((/\.(mp3|mp4)$/).test(str)) {
        nodeStr =
          str = "http://" + str
        nodeStr =
          '<div class="shishi"><video width="200" height="160" controls><source src="' + str + '" type="video/mp4"></video></div>'
      }
      else {
        nodeStr =
          '<div style="align-items: center;word-wrap:break-word;">' +
          str +
          '</div>';
      }
      return nodeStr;
    },
    //时间过滤
    timeFliter (timer) {
      let timeData = new Date(timer * 1000);
      let str = this.$emo.dateTimeFliter(timeData);
      return str;
    },
    // 接受消息(定位消息)
    screenMsg (newVal, oldVal) {
      // console.log(newVal,oldVal)
      if (newVal[0] && oldVal[0]) {
        if (newVal[0].ID != oldVal[0].ID && newVal.length >= this.count) {
          let _index = newVal.length - oldVal.length - 3;
          this.$nextTick(() => {
            this.scrollToView = newVal[_index].ID;
          });
          // console.log(this.scrollToView)
          //拉取历史记录不用改变定位消息
        } else {
          //新的消息来了 自动向下滑动到最新消息
          this.$nextTick(() => {
            this.scrollToView = newVal[newVal.length - 1].ID;
          });
        }
      } else {
        //第一次拉取历史记录 定位到最后一条消息
        // this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID});
      }
    },
    //触发滑动到顶部(加载历史信息记录)
    loadHistory (e) {
      this.isHistoryLoading = true;
      // 更多消息列表
      let conversationID = this.conversationActive.conversationID;
      let promise = this.tim.getMessageList({
        conversationID: conversationID,
        nextReqMessageID: this.nextReqMessageID,
        count: this.count,
      });
      promise.then((res) => {
        // this.$store.commit('unshiftCurrentMessageList', res.data.messageList);
        this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        this.isCompleted = res.data.isCompleted;
        this.isHistoryLoading = false;
      });

      // //这段代码很重要，不然每次加载历史数据都会跳到顶部
      // this.$nextTick(function() {
      // 	this.scrollToView = this.nextReqMessageID;//跳转上次的第一行信息位置
      // 	this.$nextTick(function() {
      // 		this.scrollAnimation = true;//恢复滚动动画
      // 	});
      // });
    },
    // 加载初始页面消息
    getMsgList () {
      // 历史消息列表
      let conversationID = this.conversationActive.conversationID;
      let promise = this.tim.getMessageList({
        conversationID: conversationID,
        count: this.count,
      });
      promise.then((res) => {
        this.$store.commit('pushCurrentMessageList', res.data.messageList);
        this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        this.isCompleted = res.data.isCompleted;
        if (res.data.messageList.length > 0) {
          this.scrollToView =
            res.data.messageList[res.data.messageList.length - 1].ID;
        }
        // console.log(this.nextReqMessageID)
        // console.log(this.scrollToView)
      });
      // 滚动到底部
      this.$nextTick(function () {
        //进入页面滚动到底部
        this.scrollTop = 9999;
        this.$nextTick(function () {
          this.scrollAnimation = true;
        });
      });
    },
    //处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
    setPicSize (content) {
      // 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
      let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
      let maxH = uni.upx2px(350); //350是定义消息图片最大高度
      if (content.w > maxW || content.h > maxH) {
        let scale = content.w / content.h;
        content.w = scale > 1 ? maxW : maxH * scale;
        content.h = scale > 1 ? maxW / scale : maxH;
      }
      return content;
    },
    //更多功能(点击+弹出)
    showMore () {
      this.isVoice = false;
      this.hideEmoji = true;
      if (this.hideMore) {
        this.hideMore = false;
        this.openDrawer();
      } else {
        this.hideDrawer();
      }
    },
    // 打开抽屉
    openDrawer () {
      this.popupLayerClass = 'showLayer';
    },
    // 隐藏抽屉
    hideDrawer () {
      this.popupLayerClass = '';
      setTimeout(() => {
        this.hideMore = true;
        this.hideEmoji = true;
      }, 150);
    },
    // 选择图片发送
    chooseImage () {
      this.getImage('album');
    },
    //拍照发送
    camera () {
      this.video()
    },
    //发红包
    handRedEnvelopes () {
      uni.navigateTo({
        url: 'HM-hand/HM-hand',
      });
      this.hideDrawer();
    },
    //视频 
    video () {
      var self = this;
      this.hideDrawer();
      uni.chooseVideo({
        maxDuration: 60,
        count: 1,
        sourceType: ['album'],
        success: function (res) {
          self.src = res.tempFilePath;
          let pp = self.cos;
          let date = new Date()
          let mm = date.getTime()
          let pic = mm + ".mp4"
          pp.putObject(
            {
              Bucket: 'im-1302325494',
              Region: 'ap-nanjing',
              Key: pic,
              StorageClass: 'STANDARD',
              Body: res.tempFile, // 上传文件对象
              onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
              }
            },
            function (err, data) {
              console.log(err || data);
              console.log(data.Location);
              self.sendMsg(data.Location);
            }
          );
        }
      });
    },
    //选照片 or 拍照
    getImage (type) {
      this.hideDrawer();
      let that = this
      uni.chooseImage({
        sourceType: [type],
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: (res) => {
          console.log(res)
          let pp = that.cos;
          let date = new Date()
          let mm = date.getTime()
          let pic = mm + ".png"
          console.log(pp)
          pp.putObject(
            {
              Bucket: 'im-1302325494',
              Region: 'ap-nanjing',
              Key: pic,
              StorageClass: 'STANDARD',
              Body: res.tempFiles[0], // 上传文件对象
              onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
              }
            },
            function (err, data) {
              console.log(err || data);
              console.log(data.Location);
              that.sendMsg(data.Location);
            }
          );
          // for (let i = 0; i < res.tempFilePaths.length; i++) {
          //   uni.getImageInfo({
          //     src: res.tempFilePaths[i],
          //     success: (image) => {
          //       // console.log(image.width);
          //       // console.log(image.height);
          //       let msg = {
          //         url: res.tempFilePaths[i],
          //         w: image.width,
          //         h: image.height,
          //       };
          //       this.sendMsg(msg, 'img');
          //     },
          //   });
          // }
        },
      });
    },
    // 选择表情
    chooseEmoji () {
      this.hideMore = true;
      if (this.hideEmoji) {
        this.hideEmoji = false;
        this.openDrawer();
      } else {
        this.hideDrawer();
      }
    },
    //添加表情
    addEmoji (em) {
      this.textMsg += em.alt;
    },

    //获取焦点，如果不是选表情ing,则关闭抽屉
    textareaFocus () {
      if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
        this.hideDrawer();
      }
    },
    // 发送文字消息
    sendText () {
      this.hideDrawer(); //隐藏抽屉
      if (!this.textMsg) {
        return;
      }
      let content = this.replaceEmoji(this.textMsg);
      let msg = { text: content };
      this.sendMsg(msg, 'text');
      this.textMsg = ''; //清空输入框
    },
    //替换表情符号为图片
    replaceEmoji (str) {
      let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
        // console.log("item: " + item);
        for (let i = 0; i < this.emojiList.length; i++) {
          let row = this.emojiList[i];
          for (let j = 0; j < row.length; j++) {
            let EM = row[j];
            if (EM.alt == item) {
              //在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
              //比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
              let onlinePath = 'https://s2.ax1x.com/2019/04/12/';
              let imgstr =
                '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
              // console.log("imgstr: " + imgstr);
              return imgstr;
            }
          }
        }
      });
      return replacedStr;
    },

    // 发送消息
    sendMsg (content, type) {
      let cc = ""
      if (content.text) {
        cc = content.text
      } else {
        cc = content
      }
      let id = this.id + ""
      let message = this.tim.createTextMessage({
        to: id,
        conversationType: 'C2C',
        payload: {
          text: cc,
        },
      });
      this.$store.commit('pushCurrentMessageList', message);
      let pomise = this.tim.sendMessage(message);
      pomise.then((res) => {
        this.$nextTick(() => {
          // 滚动到底
          this.scrollToView = res.data.message.ID;
        });
      });
    },

    // 添加文字消息到列表
    addTextMsg (msg) {
      this.msgList.push(msg);
    },
    // 添加语音消息到列表
    addVoiceMsg (msg) {
      this.msgList.push(msg);
    },
    // 添加图片消息到列表
    addImgMsg (msg) {
      msg.msg.content = this.setPicSize(msg.msg.content);
      this.msgImgList.push(msg.msg.content.url);
      this.msgList.push(msg);
    },
    addRedEnvelopeMsg (msg) {
      this.msgList.push(msg);
    },
    // 添加系统文字消息到列表
    addSystemTextMsg (msg) {
      this.msgList.push(msg);
    },
    // 添加系统红包消息到列表
    addSystemRedEnvelopeMsg (msg) {
      this.msgList.push(msg);
    },
    // 打开红包
    openRedEnvelope (msg, index) {
      let rid = msg.content.rid;
      uni.showLoading({
        title: '加载中...',
      });
      // console.log("index: " + index);
      //模拟请求服务器效果
      setTimeout(() => {
        //加载数据
        if (rid == 0) {
          this.redenvelopeData = {
            rid: 0, //红包ID
            from: '大黑哥',
            face: '/static/img/im/face/face.jpg',
            blessing: '恭喜发财，大吉大利',
            money: '已领完',
          };
        } else {
          this.redenvelopeData = {
            rid: 1, //红包ID
            from: '售后客服008',
            face: '/static/img/im/face/face_2.jpg',
            blessing: '恭喜发财',
            money: '0.01',
          };
          if (!msg.content.isReceived) {
            // {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
            this.sendSystemMsg(
              {
                text:
                  '你领取了' +
                  (msg.userinfo.uid == this.myuid
                    ? '自己'
                    : msg.userinfo.username) +
                  '的红包',
              },
              'redEnvelope'
            );
            // console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
            this.msgList[index].msg.content.isReceived = true;
          }
        }
        uni.hideLoading();
        this.windowsState = 'show';
      }, 200);
    },

    // 关闭红包弹窗
    closeRedEnvelope () {
      this.windowsState = 'hide';
      setTimeout(() => {
        this.windowsState = '';
      }, 200);
    },
    sendSystemMsg (content, type) {
      let lastid = this.msgList[this.msgList.length - 1].msg.id;
      lastid++;
      let row = {
        type: 'system',
        msg: { id: lastid, type: type, content: content },
      };
      this.screenMsg(row);
    },
    //领取详情
    toDetails (rid) {
      uni.navigateTo({
        url: 'HM-details/HM-details?rid=' + rid,
      });
    },
    // 预览图片
    showPic (msg) {
      uni.previewImage({
        indicator: 'none',
        current: msg.content.url,
        urls: this.msgImgList,
      });
    },
    // 播放语音
    playVoice (msg) {
      this.playMsgid = msg.id;
      this.AUDIO.src = msg.content.url;
      this.$nextTick(function () {
        this.AUDIO.play();
      });
    },
    // 录音开始
    voiceBegin (e) {
      if (e.touches.length > 1) {
        return;
      }
      this.initPoint.Y = e.touches[0].clientY;
      this.initPoint.identifier = e.touches[0].identifier;
      this.RECORDER.start({ format: 'mp3' }); //录音开始,
    },
    //录音开始UI效果
    recordBegin (e) {
      this.recording = true;
      this.voiceTis = '松开 结束';
      this.recordLength = 0;
      this.recordTimer = setInterval(() => {
        this.recordLength++;
      }, 1000);
    },
    // 录音被打断
    voiceCancel () {
      this.recording = false;
      this.voiceTis = '按住 说话';
      this.recordTis = '手指上滑 取消发送';
      this.willStop = true; //不发送录音
      this.RECORDER.stop(); //录音结束
    },
    // 录音中(判断是否触发上滑取消发送)
    voiceIng (e) {
      if (!this.recording) {
        return;
      }
      let touche = e.touches[0];
      //上滑一个导航栏的高度触发上滑取消发送
      if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
        this.willStop = true;
        this.recordTis = '松开手指 取消发送';
      } else {
        this.willStop = false;
        this.recordTis = '手指上滑 取消发送';
      }
    },
    // 结束录音
    voiceEnd (e) {
      if (!this.recording) {
        return;
      }
      this.recording = false;
      this.voiceTis = '按住 说话';
      this.recordTis = '手指上滑 取消发送';
      this.RECORDER.stop(); //录音结束
    },
    //录音结束(回调文件)
    recordEnd (e) {
      clearInterval(this.recordTimer);
      if (!this.willStop) {
        // console.log("e: " + JSON.stringify(e));
        let msg = {
          length: 0,
          url: e.tempFilePath,
        };
        let min = parseInt(this.recordLength / 60);
        let sec = this.recordLength % 60;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        msg.length = min + ':' + sec;
        this.sendMsg(msg, 'voice');
      } else {
        // console.log('取消发送录音');
      }
      this.willStop = false;
    },
    // 切换语音/文字输入
    switchVoice () {
      this.hideDrawer();
      this.isVoice = this.isVoice ? false : true;
    },
    discard () {
      return;
    },
  },
};
</script>
<style lang="scss">
page {
  background-color: #e5e5e5;
}
@font-face {
  font-family: "HMfont-home";
  src: url("data:application/x-font-woff2;charset=utf-8;base64,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")
    format("woff2");
}
.icon {
  font-family: "HMfont-home" !important;
  font-size: 56upx;
  font-style: normal;
  color: #333;
  &.biaoqing:before {
    content: "\e797";
  }
  &.jianpan:before {
    content: "\e7b2";
  }
  &.yuyin:before {
    content: "\e805";
  }
  &.tupian:before {
    content: "\e639";
  }
  &.chehui:before {
    content: "\e904";
  }
  &.luyin:before {
    content: "\e905";
  }
  &.luyin2:before {
    content: "\e677";
  }
  &.other-voice:before {
    content: "\e667";
  }
  &.my-voice:before {
    content: "\e906";
  }
  &.hongbao:before {
    content: "\e626";
  }
  &.tupian2:before {
    content: "\e674";
  }
  &.paizhao:before {
    content: "\e63e";
  }
  &.add:before {
    content: "\e655";
  }
  &.close:before {
    content: "\e607";
  }
  &.to:before {
    content: "\e675";
  }
}
.hidden {
  display: none !important;
}
.popup-layer {
  &.showLayer {
    transform: translate3d(0, -42vw, 0);
  }
  transition: all 0.15s linear;
  width: 96%;
  height: 42vw;
  padding: 20upx 2%;
  background-color: #f3f3f3;
  border-top: solid 1upx #ddd;
  position: fixed;
  z-index: 20;
  top: 100%;
  .emoji-swiper {
    height: 40vw;
    swiper-item {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      view {
        width: 12vw;
        height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 8.4vw;
          height: 8.4vw;
        }
      }
    }
  }
  .more-layer {
    width: 100%;
    height: 42vw;
    .list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .box {
        width: 18vw;
        height: 18vw;
        border-radius: 20upx;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 3vw 2vw 3vw;
        .icon {
          font-size: 70upx;
        }
      }
    }
  }
}
.input-box {
  width: 98%;
  min-height: 100upx;
  padding: 0 1%;
  background-color: #f2f2f2;
  display: flex;
  position: fixed;
  z-index: 20;
  bottom: -2upx;
  &.showLayer {
    transform: translate3d(0, -42vw, 0);
  }
  transition: all 0.15s linear;
  border-bottom: solid 1upx #ddd;
  .voice,
  .more {
    flex-shrink: 0;
    width: 90upx;
    height: 100upx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .send {
    //H5发送按钮左边距
    /* #ifdef H5 */
    margin-left: 20upx;
    /* #endif */
    flex-shrink: 0;
    width: 100upx;
    height: 100upx;
    display: flex;
    align-items: center;
    .btn {
      width: 90upx;
      height: 56upx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #f09b37, #eb632c);
      color: #fff;
      border-radius: 6upx;
      font-size: 24upx;
    }
  }
  .textbox {
    width: 100%;
    min-height: 70upx;
    margin-top: 15upx;
    .voice-mode {
      width: calc(100% - 2upx);
      height: 68upx;
      border-radius: 70upx;
      border: solid 1upx #cdcdcd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      background-color: #fff;
      color: #555;
      &.recording {
        background-color: #e5e5e5;
      }
    }
    .text-mode {
      width: 100%;
      min-height: 70upx;
      display: flex;
      background-color: #fff;
      border-radius: 40upx;
      .box {
        width: 100%;
        padding-left: 30upx;
        min-height: 70upx;
        display: flex;
        align-items: center;
        textarea {
          width: 100%;
        }
      }
      .em {
        flex-shrink: 0;
        width: 80upx;
        padding-left: 10upx;
        height: 70upx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.record {
  width: 40vw;
  height: 40vw;
  position: fixed;
  top: 55%;
  left: 30%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20upx;
  .ing {
    width: 100%;
    height: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // 模拟录音音效动画
    @keyframes volatility {
      0% {
        background-position: 0% 130%;
      }
      20% {
        background-position: 0% 150%;
      }
      30% {
        background-position: 0% 155%;
      }
      40% {
        background-position: 0% 150%;
      }
      50% {
        background-position: 0% 145%;
      }
      70% {
        background-position: 0% 150%;
      }
      80% {
        background-position: 0% 155%;
      }
      90% {
        background-position: 0% 140%;
      }
      100% {
        background-position: 0% 135%;
      }
    }
    .icon {
      background-image: linear-gradient(to bottom, #f09b37, #fff 50%);
      background-size: 100% 200%;
      animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 150upx;
      color: #f09b37;
    }
  }
  .cancel {
    width: 100%;
    height: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: #fff;
      font-size: 150upx;
    }
  }
  .tis {
    width: 100%;
    height: 10vw;
    display: flex;
    justify-content: center;
    font-size: 28upx;
    color: #fff;
    &.change {
      color: #f09b37;
    }
  }
}
.content {
  width: 100%;
  .msg-list {
    width: 96%;
    padding: 0 2%;
    position: absolute;
    top: 0;
    bottom: 100upx;
    .loading {
      //loading动画
      display: flex;
      justify-content: center;
      @keyframes stretchdelay {
        0%,
        40%,
        100% {
          transform: scaleY(0.6);
        }
        20% {
          transform: scaleY(1);
        }
      }
      .spinner {
        margin: 20upx 0;
        width: 60upx;
        height: 100upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        view {
          background-color: #f06c7a;
          height: 50upx;
          width: 6upx;
          border-radius: 6upx;
          animation: stretchdelay 1.2s infinite ease-in-out;
        }
        .rect2 {
          animation-delay: -1.1s;
        }
        .rect3 {
          animation-delay: -1s;
        }
        .rect4 {
          animation-delay: -0.9s;
        }
        .rect5 {
          animation-delay: -0.8s;
        }
      }
    }
    .row {
      .system {
        display: flex;
        justify-content: center;
        view {
          padding: 0 30upx;
          height: 50upx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #c9c9c9;
          color: #fff;
          font-size: 24upx;
          border-radius: 40upx;
        }
        .red-envelope {
          image {
            margin-right: 5upx;
            width: 30upx;
            height: 30upx;
          }
        }
      }
      &:first-child {
        margin-top: 20upx;
      }
      padding: 20upx 0;
      .my .left,
      .other .right {
        width: 100%;
        display: flex;
        .bubble {
          max-width: 70%;
          min-height: 50upx;
          border-radius: 10upx;
          padding: 15upx 20upx;
          display: flex;
          align-items: center;
          font-size: 32upx;
          word-break: break-word;
          &.img {
            background-color: transparent;
            padding: 0;
            overflow: hidden;
            img {
              // style="width: 200px; height: 200px;"
              max-width: 350rpx;
              max-height: 350rpx;
            }
            image {
              max-width: 350upx;
              max-height: 350upx;
            }
          }
          &.red-envelope {
            background-color: transparent;
            padding: 0;
            overflow: hidden;
            position: relative;
            justify-content: center;
            align-items: flex-start;
            image {
              width: 250upx;
              height: 313upx;
            }
            .tis {
              position: absolute;
              top: 6%;
              font-size: 26upx;
              color: #9c1712;
            }
            .blessing {
              position: absolute;
              bottom: 14%;
              color: #e9b874;
              width: 80%;
              text-align: center;
              overflow: hidden;
              // 最多两行
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          &.voice {
            .icon {
              font-size: 40upx;
              display: flex;
              align-items: center;
            }
            .icon:after {
              content: " ";
              width: 53upx;
              height: 53upx;
              border-radius: 100%;
              position: absolute;
              box-sizing: border-box;
            }
            .length {
              font-size: 28upx;
            }
          }
        }
      }
      .my .right,
      .other .left {
        flex-shrink: 0;
        width: 80upx;
        height: 80upx;
        image {
          width: 80upx;
          height: 80upx;
          border-radius: 10upx;
        }
      }
      .my {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .left {
          min-height: 80upx;
          align-items: center;
          justify-content: flex-end;
          .bubble {
            overflow: hidden;
            background-color: #fff;
            max-width: 350upx;
            max-height: 350upx;
            // color: #fff;
            &.voice {
              .icon {
                color: #fff;
              }
              .length {
                margin-right: 20upx;
              }
            }
            &.play {
              @keyframes my-play {
                0% {
                  transform: translateX(80%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .icon:after {
                border-left: solid 10upx rgba(240, 108, 122, 0.5);
                animation: my-play 1s linear infinite;
              }
            }
          }
        }
        .right {
          margin-left: 15upx;
        }
      }
      .other {
        width: 100%;
        display: flex;
        .left {
          margin-right: 15upx;
        }
        .right {
          flex-wrap: wrap;
          .username {
            width: 100%;
            height: 45upx;
            font-size: 24upx;
            color: #999;
            display: flex;
            .name {
              margin-right: 50upx;
            }
          }
          .bubble {
            background-color: #fff;
            color: #333;
            image {
              max-width: 350upx;
              max-height: 350upx;
            }
            &.voice {
              .icon {
                color: #333;
              }
              .length {
                margin-left: 20upx;
              }
            }
            &.play {
              @keyframes other-play {
                0% {
                  transform: translateX(-80%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .icon:after {
                border-right: solid 10upx rgba(255, 255, 255, 0.8);

                animation: other-play 1s linear infinite;
              }
            }
          }
        }
      }
    }
  }
}
.windows {
  .mask {
    position: fixed;
    top: 100%;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  .layer {
    position: fixed;
    width: 80%;
    height: 70%;
    left: 10%;
    z-index: 1001;
    border-radius: 20upx;
    overflow: hidden;
    top: 100%;
    transform: scale3d(0.5, 0.5, 1);
    transition: all 0.2s ease-out;
  }
  &.show {
    display: block;
    .mask {
      top: 0;
      opacity: 1;
    }
    .layer {
      transform: translate3d(0, -85vh, 0) scale3d(1, 1, 1);
    }
  }
  &.hide {
    display: block;
    .mask {
      top: 0;
      opacity: 0;
    }
    .layer {
      //transform: translate3d(0,-85vh,0) scale3d(.5,.5,1);
    }
  }
}
.open-redenvelope {
  width: 100%;
  height: 70vh;
  background-color: #cf3c35;
  position: relative;
  .top {
    width: 100%;
    background-color: #fe5454;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 0 0 100% 100%;
    box-shadow: inset 0 -20upx 0 #9c1712;
    .close-btn {
      width: 100%;
      height: 80upx;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30upx;
      .icon {
        color: #9c1712;
        margin-top: 10upx;
        margin-right: 10upx;
      }
    }
    image {
      width: 130upx;
      height: 130upx;
      border: solid 12upx #cf3c35;
      border-radius: 100%;

      margin-bottom: -65upx;
    }
    margin-bottom: 65upx;
  }
  .from,
  .blessing,
  .money,
  .showDetails {
    width: 90%;
    padding: 5upx 5%;
    display: flex;
    justify-content: center;
    font-size: 32upx;
    color: #fff;
  }
  .money {
    font-size: 100upx;
    color: #f8d757;
    display: flex;
    padding-top: 20upx;
  }
  .showDetails {
    position: absolute;
    bottom: 20upx;
    align-items: center;
    font-size: 28upx;
    color: #f8d757;
    .icon {
      font-size: 26upx;
      color: #f8d757;
    }
  }
}
</style>
