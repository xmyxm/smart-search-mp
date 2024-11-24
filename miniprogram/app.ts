import { Base64 } from 'js-base64'

// app.ts
App<IAppOption>({
	globalData: {},
	onLaunch() {
		console.log('加密文本测试:', Base64.encode('加密文本测试'))

		// 展示本地存储能力
		const logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				getApp().globalData.mainLoginCode = res.code
				console.log(res.code)
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			},
		})
	},
})
