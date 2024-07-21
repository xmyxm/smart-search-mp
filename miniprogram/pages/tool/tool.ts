import { menuList } from '../../config/menudata'

Component({
	data: {
		menuList,
	},
	methods: {
		// 事件处理函数
		bindViewTap() {
			wx.navigateTo({
				url: '../logs/logs',
			})
		},
		// 事件处理函数
		bindViewClick() {
			console.log(menuList)
		},
	},
})
