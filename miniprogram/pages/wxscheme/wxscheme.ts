import { createUrlLink, createUrlScheme } from './util/createwxcode'
import { perfPage } from '../../miniprogram_npm/log-pf/index'
import { STORAGE_KEY } from '../../enum/storagekey'
import { WxcodeStateType } from './util/datatype'
import { APPID_KEY } from '../../enum/appid'

const SELECTLIST = [
	{
		type: 'urllink',
		name: 'URL Link',
		checked: true,
	},
	{
		type: 'urlscheme',
		name: 'URL Scheme',
		checked: false,
	}
]

perfPage({
	data: {
		typeInfoList: SELECTLIST,
		typeInfo: SELECTLIST[0],
		path: '',
		queryStr: '',
	} as WxcodeStateType,
	onLoad() {
		const path = wx.getStorageSync(STORAGE_KEY.WXSCHEME_INPUT_PATH) || ''
		const queryStr = wx.getStorageSync(STORAGE_KEY.WXSCHEME_INPUT_QUERY) || ''
		this.setData({ path, queryStr })
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
			title: '小程序scheme生成工具',
			path: 'pages/wxscheme/wxscheme', // 分享路径
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
	radioChange(event: any) {
		console.log('选中的值为:', event.detail.value)
		const typeInfo = this.data.typeInfoList.find(
			(item: any) => item.type === event.detail.value,
		)
		this.setData({ typeInfo })
	},
	// 处理 textarea 输入事件
	handlePath(event: any) {
		const path = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			path,
		})
		wx.setStorage({
			key: STORAGE_KEY.WXSCHEME_INPUT_PATH,
			data: path,
			success() {
				console.log('更新输入记录缓存成功')
			},
			fail(err) {
				console.error('更新输入记录缓存失败', err)
			},
		})
	},
	handleQuery(event: any) {
		const queryStr = typeof event === 'object' ? event.detail.value.trim() : event
		this.setData({
			queryStr,
		})
		wx.setStorage({
			key: STORAGE_KEY.WXSCHEME_INPUT_QUERY,
			data: queryStr,
			success() {
				console.log('更新输入记录缓存成功')
			},
			fail(err) {
				console.error('更新输入记录缓存失败', err)
			},
		})
	},
	bindClearTap() {
		this.handlePath('')
		this.handleQuery('')
	},
	verifyPath(suscallback: Function) {
		let path = this.data.path.trim()
		let queryStr = this.data.queryStr.trim()
		if (path) {
			let errMsg = ''
			if (path.startsWith('/')) {
				path = path.slice(1)
			} else {
				errMsg = '小程序路径必须以/开头'
			}
			const pathRegex = /^([a-zA-Z0-9_]+\/)+[a-zA-Z0-9_]+/
			if (!pathRegex.test(path)) {
				errMsg = '小程序路径不符合规则'
			}
			if (errMsg) {
				wx.showToast({
					title: errMsg,
					icon: 'none',
					duration: 2000,
				})
			} else if (suscallback) {
				suscallback(path, queryStr)
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
		this.verifyPath((path: string, queryStr: string) => {
			wx.navigateToMiniProgram({
				appId: APPID_KEY.DIANPING_MP_MAIN,
				path: path + (queryStr ? `?${queryStr}`: ''),
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
		})
	},
	bindCreateLink() {
		const that = this
		this.verifyPath((path: string, queryStr: string) => {
			if (that.data.typeInfo.type === 'urllink') {
				createUrlLink(path, queryStr).then((res) => {
					console.log('====================createUrlLink sus', res)
					//@ts-ignore
					if (res && res.url_link) {
						//@ts-ignore
						that.copyURL(res.url_link, that.data.typeInfo.name)
					} else {
						that.createError()
					}
				}).catch(err => {
					console.error('================createUrlLink err', err)
				})
			} else {
				createUrlScheme(path, queryStr).then((res) => {
					console.log('====================createUrlScheme sus', res)
					//@ts-ignore
					if (res && res.openlink) {
						//@ts-ignore
						that.copyURL(res.openlink, that.data.typeInfo.name)
					} else {
						that.createError()
					}
				}).catch(err => {
					console.error('================createUrlScheme err', err)
				})
			}
		})
	},
	copyURL(poipath: string, msg: string) {
		wx.setClipboardData({
			data: poipath,
			success() {
				wx.showToast({
					title: `${msg} 复制成功`,
					icon: 'success',
					duration: 2000,
				})
			},
			fail() {
				wx.showToast({
					title: `${msg} 复制失败`,
					icon: 'none',
					duration: 2000,
				})
			},
		})
	},
	createError() {
		wx.showToast({
			title: `${this.data.typeInfo.name} 生成失败`,
			icon: 'success',
			duration: 5000,
		})
		setTimeout(() => {
			wx.showToast({
				title: `禁止连续操作`,
				icon: 'success',
				duration: 3000,
			})
		}, 6000)
	}
})
