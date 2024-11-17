// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
	data: {
		openLinkList: [
			{
				type: 1,
				name: '跳转任意小程序页面',
				path: '/pages/openmp/openmp',
				icon: 'https://p0.meituan.net/travelcube/26901b7a81a1be9047f8bc87c01ef3376020.png',
			},
			{
				type: 1,
				name: '小程序 Webview 链接生成工具',
				path: '/pages/webview/webview',
				icon: 'https://p0.meituan.net/travelcube/6c684c00868675f1cb5c55d72065c8fa4613.png',
			},
			{
				type: 1,
				name: '小程序商详页地址生成工具',
				path: '/pages/poi/poi',
				icon: 'https://p0.meituan.net/travelcube/054a593bfee33ead7e0ccab925c1c99b1351.png',
			},
			{
				type: 1,
				name: '小程序团详地址生成工具',
				path: '/pages/tuan/tuan',
				icon: 'https://p0.meituan.net/travelcube/482672b224c4ed58cdc11f882e41c5dc3523.png',
			},
			{
				type: 1,
				name: '小程序页面路径二维码生成工具',
				path: '/pages/wxcode/wxcode',
				icon: 'https://p1.meituan.net/travelcube/20e860f5d799a1fd972ae9a30e6fcc241021.png',
			},
			{
				type: 1,
				name: '小程序插件体验',
				path: '/pages/plugin/plugin',
				icon: 'https://p0.meituan.net/travelcube/e4737f1059f1c7a184ba36064444ecfe3515.png',
			},
			{
				type: 3,
				name: '拉起半屏小程序体验',
				appid: 'wx734c1ad7b3562129',
				path: '/pages/home/home',
				icon: 'https://p0.meituan.net/travelcube/b28a6ce5dab0a43d560fc5a12edc26461934.png',
			},
		],
	},
	onLoad() {
		console.log(app)
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
			title: '微智搜',
			path: '/pages/index/index', // 分享路径
			imageUrl: 'https://p1.meituan.net/travelcube/cb57f3010eb5cd0f5175b7bc1eb771213226.png', // 自定义分享图片
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
	// 事件处理函数
	bindViewTap(event: any) {
		const { path, type, appid } = event.currentTarget.dataset
		if (path) {
			if (type === 1) {
				wx.navigateTo({
					url: path,
					success() {
						console.log('navigateTo success')
					},
					fail(error) {
						console.log('navigateTo fail', error)
					},
				})
			} else if (type === 3) {
				const options = {
					appId: appid,
					path: path,
					success() {
						console.log('openEmbeddedMiniProgram success')
					},
					fail(error: any) {
						console.log('openEmbeddedMiniProgram fail', error)
					},
				}
				wx.openEmbeddedMiniProgram(options)
			}
		}
	},
})
