import { perfComponent } from '../../miniprogram_npm/log-pf/index'
import guideList from './util/dataconfig'

// 在微信小程序中，使用 `Component` 构造器来编写页面（Page）是一种特殊的使用方式，通常我们使用 `Page` 构造器来创建页面。但是，微信小程序也支持使用 `Component` 构造器来创建页面
perfComponent({
	data: {
		guideInfo: guideList[0],
	},
	lifetimes: {
		ready(options: any) {
			const { id } = options || {}
			if (id) {
				const info = guideList.find(item => item.id === id)
				if (info) {
					// @ts-ignore
					this.setData({ guideInfo: info })
				}
			}
		},
	},
	methods: {
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
