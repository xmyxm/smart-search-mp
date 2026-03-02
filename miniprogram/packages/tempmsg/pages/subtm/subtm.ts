import { queryGlobalSubscribeStatus, openSubscribeStatus, openSettingPanel } from '../../utils/subscribe'
import { getAccessToken, getUserInfo } from '../../../../utils/commonrequest'
import { subscribeTemplates, chooseTemplateIcons } from '../../utils/config'
import { setSubscribeMessage } from '../../utils/indexrequest'

Page({
	data: {
		title: '弹窗订阅消息',
		content: '', // 用于存储用户输入的内容
		qrcodeUrl: '',
		subscribeTemplateList: [],
		logContent: '',
	},
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		queryGlobalSubscribeStatus(subscribeTemplates).then(res => {
			console.log('----------查询订阅状态', res)
			this.setData({
				subscribeTemplateList: res.subscriptionInfoList,
			})
		})
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
	bindUserTap(event: any) {
		const { tmplid, type } = event.currentTarget.dataset
		// 'accept'表示用户同意订阅这条消息，'reject'表示用户拒绝订阅这条消息，'ban'表示已被后台封禁
		if (type === 'accept') {
			return
		} else if (type === 'reject') {
			return openSettingPanel()
			
		} else if (type === 'ban') {
			return openSettingPanel()
		} else {
			const list = this.data.subscribeTemplateList.map((item: any) => ({
				...item,
				type: item.tmplId === tmplid ? 'xuanzhong' : item.type,
				icon: item.tmplId === tmplid ? chooseTemplateIcons.xuanzhong : item.icon,
			}))
			this.setData({ subscribeTemplateList: list as any })
		}
	},
	bindUserSubscribe() {
		const tmplIds = this.data.subscribeTemplateList.filter((item: any) => item.type === 'xuanzhong').map((item: any) => item.tmplId)
		openSubscribeStatus(tmplIds).then(res => {
			console.log('----------点击订阅', res)
			if (res && res.isPass) {
				const list = this.data.subscribeTemplateList.map((item: any) => {
					if (res.currentSubscriptionInfo[item.tmplId]) {
						item.type = res.currentSubscriptionInfo[item.tmplId]
						item.icon = res.currentSubscriptionInfo[item.tmplId]
					}
					return { ...item }
				})
				this.setData({ subscribeTemplateList: list as any })
			}
		})
	},
	addLogContent(content: string) {
		this.setData({
			logContent: this.data.logContent + content + '\n',
		})
	},
	clearLogContent() {
		this.setData({
			logContent: '',
		})
	},
	// 事件处理函数
	bindCreateSubscribe(event: any) {
		const { tmplid } = event.currentTarget.dataset
		const AppID = 'wxddad6eb2e48f7db3'
		// 没有服务号的管理或开发权限看不到 AppSecret
		const AppSecret = 'a04a537d9bfc2256717779a49ea0881f'

		const tmplInfo = (this.data.subscribeTemplateList as Array<any>).find((item: any) => item.tmplId === tmplid) as any;

		if (tmplInfo) {
			const { tmplId, data } = tmplInfo;
			const oprions = {
				template_id: tmplId,
				page: 'pages/index/index',
				touser: '', // 接收者（用户）的 openid
				data,
				miniprogram_state: 'formal',
				lang: 'zh_CN'
			}
			getUserInfo().then((userInfo: any) => {
				if (userInfo) {
					oprions.touser = userInfo.openid
				}
				return getAccessToken(AppID, AppSecret)
			}).then((accessToken: string) => setSubscribeMessage(accessToken, oprions)).then((res: any) => {
				if (res.errcode === 0) {
					this.addLogContent('发送成功');
					wx.showToast({
						title: '发送成功',
						icon: 'success',
						duration: 2000,
					})
				} else {
					wx.showToast({
						title: '发送失败',
						icon: 'none',
						duration: 2000,
					})
					this.addLogContent('发送失败');
					this.addLogContent(res.errmsg);
				}
			})
		} else {
			wx.showToast({
				title: '请先完成消息订阅',
				icon: 'none',
				duration: 2000,
			})
		}
	},
})
