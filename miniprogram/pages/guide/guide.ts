import { perfComponent } from '../../miniprogram_npm/log-pf/index'
import guideList from './util/dataconfig'

perfComponent({
	data: {
		guideInfo: guideList[0],
	},
	methods: {
		onLoad(options: any) {
			const { id } = options || {}
			if (id) {
				const info = guideList.find(item => item.id === id)
				if (info) {
					this.setData({ guideInfo: info })
				}
			}
		},
		// 事件处理函数
		bindVersionTap() {
			wx.showToast({
				title: '',
				icon: 'none',
				duration: 2000,
			})
		},
	},
})
