import { menuList } from '../../config/menudata'

Component({
	data: {
		menuList,
	},
	methods: {
		// 事件处理函数
		bindViewTap(event: any) {
			const link = event.currentTarget.dataset.value
			wx.setClipboardData({
				data: link,
				success: function () {
					wx.showToast({
						title: '复制成功',
						icon: 'success',
						duration: 2000,
					})
				},
				fail: function () {
					wx.showToast({
						title: '复制失败',
						icon: 'none',
						duration: 2000,
					})
				},
			})
		},
	},
})
