// https://developers.weixin.qq.com/minigame/dev/guide/open-ability/qr-code.html
// https://developers.weixin.qq.com/minigame/dev/api-backend/open-api/qr-code/wxacode.get.html
// https://developers.weixin.qq.com/minigame/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html

// https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html

const AppID = 'wx734c1ad7b3562129'
const AppSecret = 'd9d441e619c080bd71cd4d033374a1b5'

function getAccessToken(): Promise<string> {
	return new Promise(resolve => {
		const url = `https://qqweb.top/api/wxtoken?appid=${AppID}&secret=${AppSecret}`
		wx.request({
			url,
			method: 'GET',
			header: {
				'content-type': 'application/json', // 默认值
			},
			success: (res: any) => {
				if (res.data.data) {
					const token: string = res.data.data.access_token
					resolve(token)
				} else {
					console.error('获取 access_token 失败', res)
					resolve('')
				}
			},
			fail: err => {
				console.error('获取 access_token 异常', err)
				resolve('')
			},
		})
	})
}

function getMiniProgramCode(
	accessToken: string,
	path: string = '',
	scene: string = '',
	page: string = '',
): Promise<string> {
	return new Promise(resolve => {
		if (accessToken) {
			let url = `https://qqweb.top/api/`
			if (scene) {
				url += `wxcodeunlimit?access_token=${accessToken}&scene=${scene}&page=${page}&width=430`
			} else {
				url += `wxcode?access_token=${accessToken}&path=${path}&width=430`
			}
			wx.request({
				url,
				method: 'GET',
				success: (res: any) => {
					if (res.statusCode === 200) {
						if (res.data.data.imageUrl) {
							resolve(res.data.data.imageUrl)
						} else {
							console.error('生成小程序二维码失败', res)
						}
					} else {
						console.error('生成小程序二维码接口异常', res)
					}
				},
				fail: err => {
					console.error('生成小程序二维码代码异常', err)
					resolve('')
				},
			})
		} else {
			console.error('缺少生成小程序二维码的必要 accessToken')
			resolve('')
		}
	})
}

export function createWxCode(path: string): Promise<string> {
	return getAccessToken().then((accessToken: string) => getMiniProgramCode(accessToken, path))
}

export function saveImageToPhotosAlbum(imageUrl: string): void {
	// 将 Base64 编码的图片数据转换为临时文件
	const fsm = wx.getFileSystemManager()
	const FILE_BASE_NAME = 'tmp_base64src' // 临时文件名
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(imageUrl) || []
	if (!format) {
		console.error('ERROR_BASE64SRC_PARSE')
		return
	}
	const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`
	const buffer = wx.base64ToArrayBuffer(bodyData)

	fsm.writeFile({
		filePath,
		data: buffer,
		encoding: 'binary',
		success: () => {
			// 调用保存到相册的 API
			wx.saveImageToPhotosAlbum({
				filePath,
				success: () => {
					wx.showToast({
						title: '保存成功',
						icon: 'success',
					})
				},
				fail: err => {
					console.error('保存失败', err)
					wx.showToast({
						title: '保存失败',
						icon: 'none',
					})
				},
			})
		},
		fail: err => {
			console.error('写文件失败', err)
		},
	})
}
