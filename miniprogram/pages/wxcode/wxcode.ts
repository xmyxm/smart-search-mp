import { platformInfoList, PlatformInfoType } from './util/platformdata'
import { defaultCopyContent, defaultPlaceholderText } from './util/default'
import { WxcodeStateType, MpUrlHistoryInfoType } from './util/datatype'
import { createWxCode, saveImageToPhotosAlbum } from './util/createwxcode'
import { perfPage } from '../../miniprogram_npm/log-pf/index'
import { HISTORY_IMAGE_ICON } from '../../enum/img'
import { STORAGE_KEY } from '../../enum/storagekey'
import { formatMiniTime } from '../../utils/util'

perfPage({
	data: {
		imgInfoMap: HISTORY_IMAGE_ICON,
		placeholderText: defaultPlaceholderText,
		platformInfoList,
		content: defaultCopyContent,
		mpUrlHistoryList: [],
		showModal: false,
		modalPath: '',
		modalContent: '',
	} as WxcodeStateType,
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		const historyList: MpUrlHistoryInfoType[] = (wx.getStorageSync(STORAGE_KEY.WXCODE_HISTORY_LIST) || []).map(
			({ appid, mpUrl, base64, timeStamp }: MpUrlHistoryInfoType) => {
				const time = formatMiniTime(new Date(Number(timeStamp)))
				const icon = (platformInfoList.find((item: PlatformInfoType) => item.appid === appid) || {}).icon || ''
				return {
					appid,
					icon,
					mpUrl,
					base64,
					timeStamp,
					time,
				}
			},
		)

		const content = wx.getStorageSync(STORAGE_KEY.WXCODE_INPUT_CONTENT) || ''
		this.setData({ mpUrlHistoryList: historyList, content })
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
			title: '小程序码生成工具',
			path: 'pages/wxcode/wxcode', // 分享路径
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
			key: STORAGE_KEY.WXCODE_INPUT_CONTENT,
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
	verifyPath(suscallback: Function) {
		let content = this.data.content.trim()
		if (content) {
			let errMsg = ''
			if (content.startsWith('/')) {
				content = content.slice(1)
			}
			const pathRegex = /^([a-zA-Z0-9_]+\/)+[a-zA-Z0-9_]+/
			if (!pathRegex.test(content)) {
				errMsg = '小程序路径不符合规则'
			}
			if (errMsg) {
				wx.showToast({
					title: errMsg,
					icon: 'none',
					duration: 2000,
				})
			} else if (suscallback) {
				suscallback(content)
			}
		} else {
			wx.showToast({
				title: '请输入小程序路径',
				icon: 'none',
				duration: 2000,
			})
		}
	},
	bindOpenMiniProgram() {
		this.verifyPath((content: string) => {
			const { appid = '' } = this.data.platformInfoList.find(item => item.select) || {}
			if (appid && content) {
				wx.navigateToMiniProgram({
					appId: appid,
					path: content,
					extraData: {},
					envVersion: 'release', // 可选
					success(res) {
						console.log('打开成功', res)
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
			} else {
				wx.showToast({
					title: '参数不完整，无法完成跳转',
					icon: 'none',
					duration: 2000,
				})
			}
		})
	},
	bindCopyClipboardTap() {
		const that = this
		wx.getClipboardData({
			success(res) {
				that.handleInput(res.data)
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
	bindCreateWxCodeTap() {
		this.verifyPath((content: string) => {
			const { appid = '', icon = '' } = this.data.platformInfoList.find(item => item.select) || {}
			const wxCodeInfo = this.data.mpUrlHistoryList.find((item: MpUrlHistoryInfoType) => {
				return item.appid === appid && item.mpUrl === content
			})
			if (wxCodeInfo) {
				this.setData({
					showModal: true,
					modalContent: wxCodeInfo.base64,
				})
			} else {
				createWxCode(content).then((imgbase: string) => {
					if (imgbase) {
						const historyList: MpUrlHistoryInfoType[] = this.data.mpUrlHistoryList.filter(
							(item: MpUrlHistoryInfoType) => {
								return !(item.appid === appid && item.mpUrl === content)
							},
						)
						const currentTime = Date.now()
						historyList.unshift({
							icon,
							appid,
							mpUrl: content,
							base64: imgbase,
							timeStamp: `${currentTime}`,
							time: formatMiniTime(new Date(currentTime)),
						})
						if (historyList.length > 500) {
							historyList.length = 500
						}
						this.setData({
							mpUrlHistoryList: historyList,
						})
						const historyListCacheData = historyList.map((item: MpUrlHistoryInfoType) => ({
							appid: item.appid,
							mpUrl: item.mpUrl,
							base64: item.base64,
							timeStamp: item.timeStamp,
						}))
						wx.setStorage({
							key: STORAGE_KEY.WXCODE_HISTORY_LIST,
							data: historyListCacheData,
							success() {
								console.log('更新链接缓存成功', historyListCacheData)
							},
							fail(err) {
								console.error('更新链接缓存失败', err)
							},
						})
						this.setData({ showModal: true, modalContent: imgbase })
					} else {
						wx.showToast({
							title: '生成小程序码失败',
							icon: 'none',
							duration: 2000,
						})
					}
				})
			}
		})
	},
	openImageDialog(event: any) {
		const { appid, base64, mpurl } = event.currentTarget.dataset
		if (appid && mpurl && base64) {
			this.setData({ showModal: true, modalPath: mpurl, modalContent: base64 })
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
			mpUrlHistoryList: [],
		})
		wx.setStorage({
			key: STORAGE_KEY.WXCODE_HISTORY_LIST,
			data: [],
			success() {
				console.log('清除链接缓存成功')
			},
			fail(err) {
				console.error('清除链接缓存失败', err)
			},
		})
	},
	bindCopyTap(event: any) {
		const { mpurl } = event.currentTarget.dataset
		if (mpurl) {
			this.copyURL(mpurl, '路径')
		}
	},
	copyURL(poipath: string, msg: string) {
		wx.setClipboardData({
			data: poipath,
			success() {
				wx.showToast({
					title: `${msg}复制成功`,
					icon: 'success',
					duration: 2000,
				})
			},
			fail() {
				wx.showToast({
					title: `${msg}复制失败`,
					icon: 'none',
					duration: 2000,
				})
			},
		})
	},
	bindModalTap() {
		this.setData({
			showModal: false,
			modalPath: '',
			modalContent: '',
		})
	},

	bindDowloadImageTap() {
		const { modalContent } = this.data
		saveImageToPhotosAlbum(modalContent)
		this.bindModalTap()
	},

	openOtherMiniProgram(event: any) {
		const { mpurl, appid } = event.currentTarget.dataset
		if (mpurl && appid) {
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
					wx.showToast({
						title: `打开失败`,
						icon: 'none',
						duration: 2000,
					})
				},
			})
		}
	},
})
