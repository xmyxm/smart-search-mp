import drawQrcode from '../../utils/index'

Page({
	data: {
		placeholderText: '请输入：链接/文本',
		content: '', // 用于存储用户输入的内容
	},
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
	},
	onShow() {
		// 页面显示/切入前台时触发。
	},
	onReady() {
		// 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
	},
	onHide() {
		// 页面隐藏/切入后台时触发。 如 wx.navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
	},
	onUnload() {
		// 页面卸载时触发。如wx.redirectTo或wx.navigateBack到其他页面时。
	},
	onRouteDone() {
		// 路由动画完成时触发。如 wx.navigateTo 页面完全推入后 或 wx.navigateBack 页面完全恢复时。
	},
	onPullDownRefresh() {
		// 监听用户下拉刷新事件。
	},

	onReachBottom() {
		// 监听用户上拉触底事件
	},
	onPageScroll() {
		// 监听用户滑动页面事件。
	},
	onShareAppMessage() {
		// 监听用户点击页面内转发按钮（button 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容。
		return {
			title: '二维码生成器',
			path: 'packages/qrocde/pages/index/index', // 分享路径
			imageUrl: 'https://p0.meituan.net/travelcube/a2af48433a8ef3751ae58e2afec784589104.png', // 自定义分享图片
			success() {
				wx.showToast({
					title: '分享成功',
					icon: 'success',
					duration: 2000,
				})
			},
			fail() {
				wx.showToast({
					title: '分享失败',
					icon: 'none',
					duration: 2000,
				})
			},
		}
	},
	// 处理 textarea 输入事件
	handleInput(event: any) {
		this.setData({
			content: event.detail.value.trim(),
		})
	},
	// 事件处理函数
	bindCreateQRCodeTap() {
		const { content, placeholderText } = this.data
		console.log('----bindCreateQRCodeTap', content)
		if (!content) {
			wx.showToast({
				title: placeholderText,
				icon: 'none',
				duration: 2000,
			})
		}
		drawQrcode({
			width: 200,
			height: 200,
			canvasId: 'myQrcode',
			// ctx: wx.createCanvasContext('myQrcode'),
			text: content,
			// v1.0.0+版本支持在二维码上绘制图片
			image: {
				imageResource: 'https://p0.meituan.net/travelcube/afef95131eb86fee084a96727a58fa352086.png',
				dx: 70,
				dy: 70,
				dWidth: 60,
				dHeight: 60,
			},
		})
	},
})
