import { getAccessToken, getUserInfo } from '../../../../utils/commonrequest'
import { setUserNotify, getQRcodeImgUrl } from '../../utils/indexrequest'

Page({
	data: {
		title: '新版一次性订阅消息',
		content: '', // 用于存储用户输入的内容
		qrcodeUrl: '',
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
			title: this.data.title,
			path: 'packages/fuwuhao/pages/index/index', // 分享路径
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
	onLiveActivityCreate(evt: any) {
		const notify_code = evt.detail.code
		const AppID = 'wxddad6eb2e48f7db3'
		const AppSecret = 'a04a537d9bfc2256717779a49ea0881f'
		const content_json = JSON.stringify({

		})
		const data = {
			notify_type: 1005,
			openid: "",
			notify_code,
			content_json
		}
		getUserInfo().then((userInfo: any) => {
			if (userInfo) {
				data.openid = userInfo.openid
			}
			return getAccessToken(AppID, AppSecret)
		}).then((accessToken: string) => setUserNotify(accessToken, data)).then((res) => {
			console.log(res)
			this.setData({ qrcodeUrl: res })
		})
	},
})
