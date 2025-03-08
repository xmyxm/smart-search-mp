import { perfComponent } from '../../miniprogram_npm/log-pf/index'
import { toolList } from '../../config/toolsdata'

perfComponent({
	data: {
		toolList,
	},
	methods: {
		// 事件处理函数
		bindViewTap(event: any) {
			const link = event.currentTarget.dataset.value
			wx.setClipboardData({
				data: link,
				success() {
					wx.showToast({
						title: '复制成功',
						icon: 'success',
						duration: 2000,
					})
				},
				fail() {
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
