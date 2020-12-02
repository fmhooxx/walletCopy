import TIM from '../js/tim.js';
import COS from "../js/cos.js";


let appId = uni.getStorageSync("appid")
let appkey = uni.getStorageSync("appkey")
let StartTime = uni.getStorageSync("infos").StartTime
let ExpiredTime = uni.getStorageSync("infos").ExpiredTime
// let Token = uni.getStorageSync("infos").Credentials.Token
// let TmpSecretId = uni.getStorageSync("infos").Credentials.TmpSecretId
// let TmpSecretKey = uni.getStorageSync("infos").Credentials.TmpSecretKey
console.log(appkey)
console.log(appId)
const options = {
	SDKAppID: 1400378604 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示
const TIMData = TIM
// 注册 COS SDK 插件
// console.log(COS)
tim.registerPlugin({
	'cos-js-sdk': COS
});

var cos = new COS({
	SecretId: "AKIDmidgdP7UkokU1McWN2UxFKDvd9TaGxBE",

	SecretKey: "f6MNgoeU9duMUnEsNhplXDh5qgDtOmz6"
	// getAuthorization: function (options, callback) {
	//     // 异步获取临时密钥
	//         callback({
	//             TmpSecretId: TmpSecretId,
	//             TmpSecretKey: TmpSecretKey,
	//             XCosSecurityToken: Token,
	//             // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
	//             StartTime: StartTime, // 时间戳，单位秒，如：1580000000
	//             ExpiredTime: ExpiredTime, // 时间戳，单位秒，如：1580000900
	//         });
	// }
});
// console.log(cos)

// var cos = new COS({
// 	getAuthorization: function(callback) {
// 		// 异步获取临时密钥
// 		let data1 = {
// 			action: 'GetCOSAPIKey',
// 			// userBindName: this.mobile,
// 			// password: this.password
// 		};
// 		this.$api.api.login(data1).then((res1) => {
// 			uni.setStorageSync("appid", res1.data.Credentials.TmpSecretId)
// 			uni.setStorageSync("appkey", res1.data.Credentials.TmpSecretKey)
// 			callback({
// 				TmpSecretId: res1.data.Credentials.TmpSecretId,
// 				TmpSecretKey: res1.data.Credentials.TmpSecretKey,
// 				XCosSecurityToken: res1.data.Credentials.Token,
// 				// 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
// 				StartTime: res1.data.StartTime, // 时间戳，单位秒，如：1580000000
// 				ExpiredTime: res1.data.ExpiredTime, // 时间戳，单位秒，如：1580000900
// 			});
// 			console.log(res1.data.Credentials.TmpSecretId)
// 			console.log(res1.data.Credentials.TmpSecretKey)
// 		})
// 		// $.get('http://example.com/server/sts.php', {
// 		//     bucket: options.Bucket,
// 		//     region: options.Region,
// 		// }, function (data) {
// 		//     var credentials = data && data.credentials;
// 		//     if (!data || !credentials) return console.error('credentials invalid');
// 		//     callback({
// 		//         TmpSecretId: credentials.tmpSecretId,
// 		//         TmpSecretKey: credentials.tmpSecretKey,
// 		//         XCosSecurityToken: credentials.sessionToken,
// 		//         // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
// 		//         StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
// 		//         ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
// 		//     });
// 		// });
// 	}
// });

/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
	const SDKAPPID = 1400378604;
	const EXPIRETIME = 604800;
	const SECRETKEY = '1a561b823d4cd1df70a16218b730e315af3024dac313abeb4289e3f3a81c387a';

	if (SDKAPPID === '' || SECRETKEY === '') {
		alert(
			'请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
			'\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js'
		);
	}
	const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
	const userSig = generator.genTestUserSig(userID);
	return {
		sdkAppId: SDKAPPID,
		userSig: userSig
	};
}

export default {
	tim,
	TIMData,
	genTestUserSig,
	cos
}