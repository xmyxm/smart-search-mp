import { lifeList } from '../../config/lifedata'

Component({
	data: {
		lifeList,
	},
	lifetimes: {
		// 组件生命周期钩子函数
		created() {
			// 在组件实例刚刚被创建时执行
		},
		attached() {
			// 在组件实例进入页面节点树时执行
		},
		ready() {
			// 在组件在视图层布局完成后执行
		},
		moved() {
			// 在组件实例被移动到节点树另一个位置时执行
		},
		detached() {
			// 在组件实例被从页面节点树移除时执行
		},
		error() {
			// 每当组件方法抛出错误时执行
		},
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
