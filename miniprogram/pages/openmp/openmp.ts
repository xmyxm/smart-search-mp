import { defaultAppIdPlaceholderText, defaultPathPlaceholderText } from './util/default'
import { platformInfoList, PlatformInfoType, envVersionList } from './util/platformdata'
import { OpenMPStateType, MpUrlHistoryInfoType } from './util/datatype'
import { perfPage } from '../../miniprogram_npm/log-pf/index'
import { HISTORY_IMAGE_ICON } from '../../enum/img'
import { STORAGE_KEY } from '../../enum/storagekey'
import { formatMiniTime } from '../../utils/util'

perfPage({
	data: {
		imgInfoMap: HISTORY_IMAGE_ICON,
		envVersionList,
		envVersionInfo: envVersionList[0],
		platformInfoList,
		appIdPlaceholderText: defaultAppIdPlaceholderText,
		pathPlaceholderText: defaultPathPlaceholderText,
		appid: '',
		path: '',
		mpUrlHistoryList: [],
	} as OpenMPStateType,
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		const historyList: MpUrlHistoryInfoType[] = (wx.getStorageSync(STORAGE_KEY.OPENMP_HISTORY_LIST) || []).map(
			({ appid, mpUrl, envVersion, timeStamp }: MpUrlHistoryInfoType) => {
				const time = formatMiniTime(new Date(Number(timeStamp)))
				const icon = (platformInfoList.find((item: PlatformInfoType) => item.appid === appid) || {}).icon || ''
				return {
					icon,
					appid,
					mpUrl,
					envVersion,
					timeStamp,
					time,
				}
			},
		)

		const { appid } = this.data.platformInfoList[0]
		this.setData({ mpUrlHistoryList: historyList, appid })
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
			title: '跳转任意小程序页面',
			path: 'pages/openmp/openmp', // 分享路径
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
	bindCopyClipboardTap() {
		const that = this
		wx.getClipboardData({
			success(res) {
				that.setData({ path: res.data })
				console.log('剪切板内容:', res.data)
			},
			fail(err: any) {
				wx.showToast({
					title: `读取剪切板失败: ${err.message || '剪切板无内容'}`,
					icon: 'none',
					duration: 2000,
				})
			},
		})
	},
	bindSelectPlatformTap(event: any) {
		const { appid, defaultpath } = event.currentTarget.dataset
		const list: PlatformInfoType[] = this.data.platformInfoList.map((item: any) => ({
			...item,
			select: item.appid === appid,
		}))
		this.setData({ platformInfoList: list, appid, path: defaultpath })
	},
	// 处理 textarea 输入事件
	handleInput(event: any) {
		const appid = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			appid,
		})
	},
	handleTextarea(event: any) {
		const path = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			path,
		})
	},
	radioChange(event: any) {
		console.log('选中的值为:', event.detail.value)
		const envVersionInfo = this.data.envVersionList.find(item => item.envVersion === event.detail.value)
		this.setData({ envVersionInfo })
	},
	bindOpenMPURLTap() {
		const {
			appid,
			path,
			envVersionInfo: { envVersion },
		} = this.data
		const url = path.trim().replace(/^\//, '')
		if (appid) {
			if (url) {
				this.openMiniProgram(appid, url, envVersion, () => {
					const { icon = '' } = this.data.platformInfoList.find(item => item.select) || {}
					const historyList: MpUrlHistoryInfoType[] = this.data.mpUrlHistoryList.filter(
						(item: MpUrlHistoryInfoType) => {
							return !(item.mpUrl === url && item.appid === appid)
						},
					)
					const currentTime = Date.now()
					historyList.unshift({
						icon,
						appid,
						mpUrl: url,
						envVersion,
						timeStamp: `${currentTime}`,
						time: formatMiniTime(new Date(currentTime)),
					})
					if (historyList.length > 100) {
						historyList.length = 100
					}
					this.setData({
						mpUrlHistoryList: historyList,
					})
					const historyListCacheData = historyList.map((item: MpUrlHistoryInfoType) => ({
						appid: item.appid,
						mpUrl: item.mpUrl,
						timeStamp: item.timeStamp,
					}))
					wx.setStorage({
						key: STORAGE_KEY.OPENMP_HISTORY_LIST,
						data: historyListCacheData,
						success() {
							console.log('更新链接缓存成功', historyListCacheData)
						},
						fail(err) {
							console.error('更新链接缓存失败', err)
						},
					})
				})
			} else {
				wx.showToast({
					title: '请输入正确的小程序路径',
					icon: 'none',
					duration: 2000,
				})
			}
		} else {
			wx.showToast({
				title: '请输入AppId',
				icon: 'none',
				duration: 2000,
			})
		}
	},
	bindCopyTap(event: any) {
		const { appid, mpurl } = event.currentTarget.dataset
		if (appid && mpurl) {
			this.copyURL(`AppId: ${appid}、path: ${mpurl}`, '链接')
		}
	},
	openOtherMiniProgram(event: any) {
		const { mpurl, appid, envversion } = event.currentTarget.dataset
		if (appid && mpurl) {
			this.openMiniProgram(appid, mpurl, envversion)
		} else {
			wx.showToast({
				title: '参数不完整，无法完成跳转',
				icon: 'none',
				duration: 2000,
			})
		}
	},

	openMiniProgram(appId: string, path: string, envVersion: string = 'release', suscallback?: Function) {
		wx.navigateToMiniProgram({
			appId,
			path,
			extraData: {},
			// @ts-ignore
			envVersion, // 可选
			success(res) {
				console.log('打开成功', res)
				if (suscallback) {
					suscallback()
				}
			},
			fail(err) {
				console.error('打开失败', err)
				wx.showToast({
					title: `打开失败`,
					icon: 'none',
					duration: 2000,
				})
			},
		})
	},
	bindClearChacheDataTap() {
		this.setData({
			mpUrlHistoryList: [],
		})
		wx.setStorage({
			key: STORAGE_KEY.OPENMP_HISTORY_LIST,
			data: [],
			success() {
				console.log('清除链接缓存成功')
			},
			fail(err) {
				console.error('清除链接缓存失败', err)
			},
		})
	},
	copyURL(mpurl: string, msg: string) {
		wx.setClipboardData({
			data: mpurl,
			success() {
				wx.showToast({
					title: `${msg}复制成功`,
					icon: 'success',
					duration: 2000,
				})
			},
			fail() {
				wx.showToast({
					title: `${msg}复制成功`,
					icon: 'none',
					duration: 2000,
				})
			},
		})
	},
})
