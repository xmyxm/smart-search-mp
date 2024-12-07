import appConfig from '../../config/appconfig'

Component({
	data: {
		appConfig,
	},
	methods: {
		// 事件处理函数
		bindVersionTap() {
			wx.showToast({
				title: appConfig.APP_VERSION,
				icon: 'none',
				duration: 2000,
			})
		},
	},
})
