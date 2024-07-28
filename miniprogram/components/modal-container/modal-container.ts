Component({
	options: {
		multipleSlots: true, // 在组件定义时的选项中启用多slot支持
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		name: {
			type: String,
			value: 'page name',
		},
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		displayStyle: '',
	},
	lifetimes: {
		created() {
			// 组件实例刚刚被创建好时， created 生命周期被触发。此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data 。 此时还不能调用 setData 。 通常情况下，这个生命周期只应该用于给组件 this 添加一些自定义属性字段
		},
		attached() {
			// 在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
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
	pageLifetimes: {
		// 组件所在页面的生命周期
		show() {
			// 页面被展示
		},
		hide() {
			// 页面被隐藏
		},
		resize(size) {
			// 页面尺寸变化
			console.log('dialog component resize', size)
		},
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		hideModal() {
			this.triggerEvent('hideModal')
		},
	},
})
