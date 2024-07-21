import { formatTime } from '../../utils/util'

Component({
	data: {
		logs: [],
	},
	lifetimes: {
		attached() {
			this.setData({
				logs: (wx.getStorageSync('logs') || []).map((log: string) => {
					return {
						date: formatTime(new Date(log)),
						timeStamp: log,
					}
				}),
			})
		},
	},
	methods: {
		// 事件处理函数
		bindLogTap() {
			console.log(`记录启动次数：${this.data.logs.length}`)
		},
	},
})
