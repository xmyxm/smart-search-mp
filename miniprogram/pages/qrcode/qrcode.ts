import { defaultCopyContent, defaultPlaceholderText } from './util/default'
import { QrcodeStateType, UrlHistoryInfoType } from './util/datatype'
import { perfPage } from '../../miniprogram_npm/log-pf/index'
import { createQrcode } from '../../utils/qrcode/index'
import { HISTORY_IMAGE_ICON } from '../../enum/img'
import { STORAGE_KEY } from '../../enum/storagekey'
import { formatMiniTime } from '../../utils/util'

perfPage({
	data: {
		imgInfoMap: HISTORY_IMAGE_ICON,
		placeholderText: defaultPlaceholderText,
		content: defaultCopyContent,
		urlHistoryList: [],
		showModal: false,
		modalImgUrl: '',
		modalUrl: '',
	} as QrcodeStateType,
	onLoad() {
		// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
		const historyList: UrlHistoryInfoType[] = (wx.getStorageSync(STORAGE_KEY.QRCODE_URL_HISTORY_LIST) || []).map(
			({ url, timeStamp }: UrlHistoryInfoType) => {
				const time = formatMiniTime(new Date(Number(timeStamp)))
				return {
					url,
					timeStamp,
					time,
				}
			},
		)

		const content = wx.getStorageSync(STORAGE_KEY.QRCODE_URL_INPUT_CONTENT) || ''
		this.setData({ urlHistoryList: historyList, content })
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
			title: '二维码生成工具',
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
	handleInput(event: any) {
		const content = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			content,
		})
		wx.setStorage({
			key: STORAGE_KEY.QRCODE_URL_INPUT_CONTENT,
			data: content,
			success() {
				console.log('更新输入记录缓存成功')
			},
			fail(err) {
				console.error('更新输入记录缓存失败', err)
			},
		})
	},
	bindClearTap() {
		this.handleInput('')
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
	bindCreateQrcodeTap() {
		const { content } = this.data
		if (content) {
			console.log('生成二维码的 url', content)
			const url = content
			createQrcode(content).then((imgUrl: any) => {
				if (imgUrl) {
					const historyList: UrlHistoryInfoType[] = this.data.urlHistoryList.filter(
						(item: UrlHistoryInfoType) => {
							return !(item.url === url)
						},
					)
					const currentTime = Date.now()
					historyList.unshift({
						url,
						timeStamp: `${currentTime}`,
						time: formatMiniTime(new Date(currentTime)),
					})
					if (historyList.length > 50) {
						historyList.length = 50
					}
					this.setData({
						showModal: true,
						modalImgUrl: imgUrl,
						urlHistoryList: historyList,
					})
					const historyListCacheData = historyList.map((item: UrlHistoryInfoType) => ({
						url: item.url,
						timeStamp: item.timeStamp,
					}))
					wx.setStorage({
						key: STORAGE_KEY.QRCODE_URL_HISTORY_LIST,
						data: historyListCacheData,
						success() {
							console.log('更新链接缓存成功', historyListCacheData)
						},
						fail(err) {
							console.error('更新链接缓存失败', err)
						},
					})
				}
			})
		} else {
			wx.showToast({
				title: '请贴入http链接',
				icon: 'none',
				duration: 2000,
			})
		}
	},
	bindClearChacheDataTap() {
		this.setData({
			urlHistoryList: [],
		})
		wx.setStorage({
			key: STORAGE_KEY.QRCODE_URL_HISTORY_LIST,
			data: [],
			success() {
				console.log('清除链接缓存成功')
			},
			fail(err) {
				console.error('清除链接缓存失败', err)
			},
		})
	},
	bindUrlDetailTap(event: any) {
		const { url } = event.currentTarget.dataset
		createQrcode(url).then((imgUrl: any) => {
			this.setData({
				showModal: true,
				modalImgUrl: imgUrl,
				modalUrl: url,
			})
		})
	},
	bindModalTap() {
		this.setData({
			showModal: !this.data.showModal,
		})
	},
	bindCopyModalContentTap() {
		const { modalImgUrl } = this.data
		function saveImage(modalImgUrl: string) {
			wx.saveImageToPhotosAlbum({
				filePath: modalImgUrl,
				success() {
					wx.showToast({
						title: '保存成功',
						icon: 'success',
					})
				},
				fail(err) {
					console.error('保存失败:', err)
					wx.showToast({
						title: '保存失败',
						icon: 'none',
					})
				},
			})
		}
		wx.authorize({
			scope: 'scope.writePhotosAlbum',
			success() {
				// 用户已经授权
				saveImage(modalImgUrl) // 调用保存图片的函数
			},
			fail() {
				// 引导用户到设置页面进行授权
				wx.openSetting({
					success(settingData) {
						if (settingData.authSetting['scope.writePhotosAlbum']) {
							saveImage(modalImgUrl) // 调用保存图片的函数
						} else {
							wx.showToast({
								title: '需要相册权限',
								icon: 'none',
							})
						}
					},
				})
			},
		})
	},
})
