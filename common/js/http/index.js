import http from './interface';
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
// export const test = (data) => {
// 	 http.config.baseUrl = "http://szw.ngrok.gdcome.com:81/"
// 	//设置请求前拦截器
// var token = uni.getStorageSync('token')
// http.interceptor.request = (config) => {
// 	console.log(config)
// 	return config;
// }
// 	//设置请求结束后拦截器
// 	http.interceptor.response = (response) => {
// 		console.log(response)
// 		//判断返回状态 执行相应操作
// 		return response;
// 	}
// 	return http.request({
// 		baseUrl: 'http://szw.ngrok.gdcome.com:81/',
// 		url: '',
// 		dataType: 'text',
// 		data
// 	})
// }
export const getInfo1 = (data) => {
	return http.get("CmsNews/list ", data)
}
export const sendcode1 = (data) => {
	return http.get("CmsNews/list", data)
}
// 发送验证码
export const sendcode = (data) => {
	return http.get('sso/getAuthCode', data);
};
// 注册账号
export const register = (data) => {
	return http.post('sso/register', data);
};
// 修改密码
export const updatePassword = (data) => {
	return http.post('sso/updatePassword', data);
};
// 登录
export const login = (data) => {
	return http.post('sso/login', data);
};
// 退出
export const logout = (data) => {
	return http.post('sso/logout', data);
};
// 绑定身份证
export const bindIDnumber = (data) => {
	return http.Auth_post('sso/bindIDnumber', data);
};
// 获取用户信息
export const getInfo = (data) => {
	return http.Auth_get('sso/info', data);
};
// 用户交易地址
export const umsMemberTradingAddress = (data) => {
	return http.add_post('umsMemberTradingAddress/add', data);
};
// btc 交易
export const btcPush = (data) => {
	return http.post('txs/push', data);
};
export const swiper = (data) => {
	return http.post('bitcoin', data);
};
//k线数据
export const lineData = (data) => {
	return http.get('blockchain/huobi/market/history/kline', data);
};
//聚合行情
export const merged = (data) => {
	return http.get('blockchain/huobi/market/detail/merged', data);
};
//添加好友
export const addOpple = (data) => {
	return http.Auth_get("umc/queryContacts", data)
}
export const addOpple1 = (data) => {
	return http.Auth_post("umc/add", data)
}
//好友列表
export const peopleList = (data) => {
	return http.Auth_get('umc/ContactsListAll', data);
};
//签名
export const userSign = (data) => {
	return http.Auth_get('sso/userSig', data);
};
// 获取以太坊余额
export const getEthBalance = (data) => {
	return http.Auth_post('eth/getBalance', data);
};
// 以太坊 gasPrice 手续费 实际是 gasPrice * gasLimit
export const getGasPrice = (data) => {
	return http.Auth_get('eth/gsaPrice', data);
};
export const getGasLimit = (data) => {
	return http.Auth_post('eth/gasLimit', data);
};
// 以太坊交易编号
export const getNonces = (data) => {
	return http.Auth_post('eth/getNonce', data);
};
// 以太坊广播交易
export const sendRawTransaction = (data) => {
	return http.Auth_post('eth/sendRawTransaction', data);
};
// 查询USDT
export const ethCall = (data) => {
	return http.Auth_post('eth/ethCall', data);
};
// 查询入场券记录
export const getList = (data) => {
	return http.Auth_get('BmsTicketLog/list', data);
};
// 购买入场券
export const Tickets = (data) => {
	return http.Auth_post('Husdt/purchaseTickets', data);
};
// 查询入场券
export const coupons = (data) => {
	return http.Auth_get('sso/coupon', data);
};
// 查询充值记录
export const recharge = (data) => {
	return http.Auth_get('BmsRechargeDetailTransactionLog/list', data);
};
// 意见反馈
export const addProduct = (data) => {
	return http.Auths_post('member/feedback/addProduct', data);
};
// 查询矿机列表
export const getBmsMiningMachineryList = (data) => {
	return http.Auth_get('BmsMiningMachinery/list ', data);
};
// 查询购买矿机记录列表
export const getMachineryOrder = (data) => {
	return http.Auth_get('BmsMiningMachineryOrderDetail/list', data);
};
// 获取热门代币接口(糖果)
export const getBmsHotToken = (data) => {
	return http.Auth_get('BmsHotToken/listAll', data);
};
// 购买矿机
export const buyMachinery = (data) => {
	return http.Auth_post('BmsMiningMachineryOrder/buyMachinery', data);
};
// 获取合约矿机列表数据
export const getBmsMiningMachineryCycle = (data) => {
	return http.Auth_get('BmsMiningMachineryCycle/list', data);
};
// 购买合约矿机
export const buyCycleMachinery = (data) => {
	return http.Auth_post('BmsMiningMachineryCycleOrder/buyCycleMachinery', data);
};
// 查询HUSDT FHC变动记录
export const BmsHusdtChangeHistory = (data) => {
	return http.Auth_get('BmsHusdtChangeHistory/list', data);
};
// 代币兑换
export const BmsTokenConversionOrder = (data) => {
	return http.Auth_post('BmsTokenConversionOrder/conversionToken', data);
};
// 代币兑换列表
export const BmsTokenConversionOrderList = (data) => {
	return http.Auth_get('BmsTokenConversionOrder/list', data);
};
// 查看交易信息
export const getTransaction = (data) => {
	return http.Auth_get('eth/getTransaction', data);
};
// 获取直推T1层收益业绩
export const getMenberAchievement1 = (data) => {
	return http.Auth_get('sso/getDirectYieldT1ResultList', data);
};
// 获取直推T2层收益业绩
export const getMenberAchievement2 = (data) => {
	return http.Auth_get('sso/getDirectYieldT2ResultList', data);
};
// 获取直推T3层收益业绩
export const getMenberAchievement3 = (data) => {
	return http.Auth_get('sso/getDirectYieldT3ResultList', data);
};
// 获取团队动态业绩收益
export const getTeam = (data) => {
	return http.Auth_get('sso/getMemberTeamEarningsResult', data);
};
// 获取搜多某个ID的团队动态收益业绩
export const getSeachTeam = (data) => {
	return http.Auth_get('sso/getSeachTeamEarningsResult', data);
};
// 获取自己团队动态收益业绩
export const getSelfTeam = (data) => {
	return http.Auth_get('sso/getSelfTeamEarningsResult', data);
};
// 收益明细
export const getDriveEarningsList = (data) => {
	return http.Auth_get('BmsMiningMachineryCycleOrder/getDriveEarningsList', data);
};
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	sendcode,
	register,
	updatePassword,
	login,
	logout,
	bindIDnumber,
	getInfo,
	umsMemberTradingAddress,
	btcPush,
	swiper,
	lineData,
	merged,
	addOpple,
	peopleList,
	userSign,
	getEthBalance,
	getGasPrice,
	getGasLimit,
	getNonces,
	sendRawTransaction,
	sendcode1,
	addOpple1,
	getInfo1,
	ethCall,
	getList,
	Tickets,
	coupons,
	recharge,
	addProduct,
	getBmsMiningMachineryList,
	getMachineryOrder,
	getBmsHotToken,
	buyMachinery,
	getBmsMiningMachineryCycle,
	buyCycleMachinery,
	BmsHusdtChangeHistory,
	BmsTokenConversionOrder,
	BmsTokenConversionOrderList,
	getTransaction,
	getMenberAchievement1,
	getMenberAchievement2,
	getMenberAchievement3,
	getTeam,
	getSeachTeam,
	getSelfTeam,
	getDriveEarningsList
};