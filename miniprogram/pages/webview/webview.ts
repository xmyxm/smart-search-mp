import { platformInfoList, PlatformInfoType } from './util/platformdata'
import { storageKey } from '../../enum/storagekey'
import { formatMiniTime } from '../../utils/util'
import { WebviewStateType, MpUrlHistoryInfoType } from './util/datatype'

Page({
	data: {
		placeholderText: '请输入URL链接',
		platformInfoList,
		content: '',
		mpUrlHistoryList: [],
	} as WebviewStateType,
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		const historyList: MpUrlHistoryInfoType[] = (
			wx.getStorageSync(storageKey.WEBVIEW_MPURL_HISTORY_LIST) || []
		).map(({ appid, mpUrl, timeStamp }: MpUrlHistoryInfoType) => {
			const time = formatMiniTime(new Date(Number(timeStamp)))
			console.log('time:', time)
			return {
				icon: platformInfoList.find((item: PlatformInfoType) => item.appid === appid)?.icon || '',
				mpUrl,
				timeStamp,
				time,
			}
		})

		this.setData({ mpUrlHistoryList: historyList })
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
			title: '小程序跳转链接生成工具',
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
	// 处理 textarea 输入事件
	handleInput(event: any) {
		this.setData({
			content: event.detail.value.trim(),
		})
	},
	bindSelectPlatformTap(event: any) {
		const { appid } = event.currentTarget.dataset
		if (appid) {
			const list: PlatformInfoType[] = this.data.platformInfoList.map((item: any) => ({
				...item,
				select: item.appid === appid,
			}))
			this.setData({ platformInfoList: list })
		}
	},
	bindCreateMPURLTap() {
		const currentMpUrl = this.data.content
		const selectPlatformInfo = this.data.platformInfoList.find(item => item.select)
		const historyList: MpUrlHistoryInfoType[] = this.data.mpUrlHistoryList.filter(({ appid, mpUrl }) => {
			return !(appid === selectPlatformInfo?.appid && mpUrl === currentMpUrl)
		})
		const currentTime = Date.now()
		historyList.unshift({
			icon: selectPlatformInfo?.icon || '',
			appid: selectPlatformInfo?.appid || '',
			mpUrl: currentMpUrl,
			timeStamp: `${currentTime}`,
			time: formatMiniTime(new Date(currentTime)),
		})
		this.setData({
			mpUrlHistoryList: historyList,
		})
		const historyListCacheData = historyList.map(({ appid, mpUrl, timeStamp }: MpUrlHistoryInfoType) => ({
			appid,
			mpUrl,
			timeStamp,
		}))
		wx.setStorage({
			key: storageKey.WEBVIEW_MPURL_HISTORY_LIST,
			data: historyListCacheData,
			success() {
				console.log('生成链接存储成功')
			},
			fail(err) {
				console.error('生成链接存储失败', err)
			},
		})
	},
	bindCopyTap(event: any) {
		const { mpurl } = event.currentTarget.dataset
		if (mpurl) {
			wx.setClipboardData({
				data: mpurl,
				success() {
					wx.showToast({
						title: '链接复制成功',
						icon: 'success',
						duration: 2000,
					})
				},
				fail() {
					wx.showToast({
						title: '链接复制失败',
						icon: 'none',
						duration: 2000,
					})
				},
			})
		}
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			// url: '../logs/logs',
			// url: '../tool/tool',
			// url: '/pages/tool/tool',
			url: '/packages/qrcode/pages/index/index',
			success() {
				console.log('navigateTo success')
			},
			fail(error) {
				console.log('navigateTo fail', error)
			},
		})
	},
})
