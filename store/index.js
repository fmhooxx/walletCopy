import Vue from 'vue'
import Vuex from 'vuex'
import tim from '../common/js/tim.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isLogin: false,
		isSDKReady: false, // TIM SDK 是否 ready

		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表
		data: [],
		list: []
	},

	mutations: {
		// 钱包列表数据
		updataList(state, list) {
			state.list = list
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
			state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
			state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state, conversationItem) {
			state.conversationActive = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.contactsId
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			// 还没当前会话，则跳过
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.conversationID === state.conversationActive.conversationID) {
				state.currentMessageList = [...state.currentMessageList, data]
			}
			console.log('1111')
			console.log(state.currentMessageList)
		},
		getcont(state, data) {
			data.forEach((item, index) => {
				item.createTime = item.createTime.split('T')[0]
			})
			state.data = state.data.concat(data)
		}
	},

	actions: {

	}
})

export default store