import { openLinkList } from './util/config'
import { PathType } from './util/pathtype'
// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
	data: {
		openLinkList,
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
			if (type === PathType.MiniProgramPath) {
				wx.navigateTo({
					url: path,
					success() {
						console.log('navigateTo success')
					},
					fail(error) {
						console.log('navigateTo fail', error)
					},
				})
			} else if (type === PathType.MiniProgramApp) {
				const options = {
					appId: appid,
					path: path,
					success() {
						console.log('navigateToMiniProgram success')
					},
					fail(error: any) {
						console.log('navigateToMiniProgram fail', error)
					},
				}
				wx.navigateToMiniProgram(options)
			} else if (type === PathType.MiniProgramEmbeddedApp) {
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
