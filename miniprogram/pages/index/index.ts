// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl =
	'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
	data: {
		userInfo: {
			avatarUrl: defaultAvatarUrl,
			nickName: '',
		},
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
			title: '微智搜',
			path: '/pages/index/index', // 分享路径
			imageUrl:
				'https://wx.qlogo.cn/mmhead/wzJhLVPsrd0K5G3fPwK6u4dIqicJwATDGUayslsgeeMr3cDibkSoMZms9jAkiaaG3FplBdWJO8ViaTU/0', // 自定义分享图片
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
	bindViewTap() {
		wx.navigateTo({
			// url: '../logs/logs',
			// url: '../tool/tool',
			// url: '/pages/tool/tool',
			url: '/packages/qrcode/pages/index/index',
			success: function () {
				console.log('navigateTo success')
			},
			fail: function (error) {
				console.log('navigateTo fail', error)
			},
		})
	},
	onChooseAvatar(e: any) {
		const { avatarUrl } = e.detail
		this.setData({
			'userInfo.avatarUrl': avatarUrl,
		})
	},
	getUserProfile() {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: res => {
				console.log(res)
				this.setData({
					'userInfo.nickName': res.userInfo.nickName,
				})
			},
		})
	},
})
