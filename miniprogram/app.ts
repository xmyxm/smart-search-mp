import { Base64 } from 'js-base64'
import { perf, perfApp } from './miniprogram_npm/log-pf/index'

perf.init({
	token: 'xxxxx',
	debug: true,
	version: '1.0.0',
})

// app.ts
perfApp({
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
