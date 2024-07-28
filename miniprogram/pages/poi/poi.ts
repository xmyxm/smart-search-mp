import { platformInfoList, PlatformInfoType } from './util/platformdata'
import { WebviewStateType, PoiPathHistoryInfoType } from './util/datatype'
import { defaultCopyContent, defaultPlaceholderText } from './util/default'
import { storageKey } from '../../enum/storagekey'
import { formatMiniTime } from '../../utils/util'

Page({
	data: {
		placeholderText: defaultPlaceholderText,
		platformInfoList,
		content: defaultCopyContent,
		poiPathHistoryList: [],
		showModal: false,
		modalContent: '',
	} as WebviewStateType,
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		const historyList: PoiPathHistoryInfoType[] = (wx.getStorageSync(storageKey.POI_URL_HISTORY_LIST) || []).map(
			({ appid, poiPath, timeStamp }: PoiPathHistoryInfoType) => {
				const time = formatMiniTime(new Date(Number(timeStamp)))
				const icon = (platformInfoList.find((item: PlatformInfoType) => item.appid === appid) || {}).icon || ''
				return {
					icon,
					poiPath,
					timeStamp,
					time,
				}
			},
		)

		const content = wx.getStorageSync(storageKey.POI_URL_INPUT_CONTENT) || ''
		this.setData({ poiPathHistoryList: historyList, content })
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
			title: '小程序商户链接生成工具',
			path: 'pages/poi/poi', // 分享路径
			imageUrl: 'https://p1.meituan.net/travelcube/22dd461137b5560e7544045e66f416d025980.jpg', // 自定义分享图片，尺寸 500px*400px，官方要求 5:4
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
		const content = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			content,
		})
		wx.setStorage({
			key: storageKey.POI_URL_INPUT_CONTENT,
			data: content,
			success() {
				console.log('更新输入记录缓存成功')
			},
			fail(err) {
				console.error('更新输入记录缓存失败', err)
			},
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
	bindClearTap() {
		this.handleInput('')
	},
	bindCreatePoiPathTap() {
		const { content } = this.data
		if (content) {
			// 定义正则表达式
			const regex = /shopshare\/([a-zA-Z0-9]+)\?/
			// 使用正则表达式进行匹配
			const match = content.match(regex)
			if (match && match[1]) {
				const shopUuid = match[1]
				const {
					appid = '',
					path = '',
					icon = '',
					pathCP = '',
				} = this.data.platformInfoList.find(item => item.select) || {}
				const currentPoiPath = `${path}?shopUuid=${shopUuid}${pathCP}`
				const historyList: PoiPathHistoryInfoType[] = this.data.poiPathHistoryList.filter(
					(item: PoiPathHistoryInfoType) => {
						return !(item.appid === appid && item.poiPath === currentPoiPath)
					},
				)
				const currentTime = Date.now()
				historyList.unshift({
					icon,
					appid,
					poiPath: currentPoiPath,
					timeStamp: `${currentTime}`,
					time: formatMiniTime(new Date(currentTime)),
				})
				if (historyList.length > 50) {
					historyList.length = 50
				}
				this.setData({
					poiPathHistoryList: historyList,
				})
				const historyListCacheData = historyList.map((item: PoiPathHistoryInfoType) => ({
					appid: item.appid,
					poiPath: item.poiPath,
					timeStamp: item.timeStamp,
				}))
				wx.setStorage({
					key: storageKey.POI_URL_HISTORY_LIST,
					data: historyListCacheData,
					success() {
						console.log('更新链接缓存成功')
					},
					fail(err) {
						console.error('更新链接缓存失败', err)
					},
				})
			} else {
				wx.showToast({
					title: '未能匹配出商户ID，请复制正确的分享链接',
					icon: 'none',
					duration: 2000,
				})
			}
		} else {
			wx.showToast({
				title: '请贴入文本链接',
				icon: 'none',
				duration: 2000,
			})
		}
	},
	bindCopyTap(event: any) {
		const { mpurl } = event.currentTarget.dataset
		if (mpurl) {
			this.copyURL(mpurl)
		}
	},
	openOtherMiniProgram(event: any) {
		// 'pages/webview/webview?url=https%3A%2F%2Fcube.dianping.com%2Fcube%2Fblock%2Fd91c203ec9f0%2F295324%2Findex.html'
		const { mpurl, appid } = event.currentTarget.dataset
		console.log('---------appid、mpurl', appid, mpurl)
		if (appid && mpurl) {
			wx.navigateToMiniProgram({
				appId: appid,
				path: mpurl,
				extraData: {},
				envVersion: 'release', // 可选
				success(res) {
					console.log('打开成功', res)
				},
				fail(err) {
					console.error('打开失败', err)
				},
			})
		} else {
			wx.showToast({
				title: '参数不完整，无法完成跳转',
				icon: 'none',
				duration: 2000,
			})
		}
	},
	bindClearChacheDataTap() {
		this.setData({
			poiPathHistoryList: [],
		})
		wx.setStorage({
			key: storageKey.POI_URL_HISTORY_LIST,
			data: [],
			success() {
				console.log('清除链接缓存成功')
			},
			fail(err) {
				console.error('清除链接缓存失败', err)
			},
		})
	},
	bindmpUrlTap(event: any) {
		const { mpurl } = event.currentTarget.dataset
		this.setData({
			modalContent: mpurl,
			showModal: true,
		})
	},
	bindModalTap() {
		this.setData({
			showModal: !this.data.showModal,
		})
	},
	// 处理 textarea 输入事件
	handleModalInput(event: any) {
		const modalContent = event.detail.value.trim()
		this.setData({
			modalContent,
		})
	},
	bindCopyModalContentTap() {
		this.copyURL(this.data.modalContent)
		this.bindModalTap()
	},
	copyURL(mpurl: string) {
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
	},
})
