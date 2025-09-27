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

function getWxDataCode(
	accessToken: string,
	path: string = '',
	query: string = '',
	api_path: string = '',
): Promise<string> {
	return new Promise(resolve => {
		if (accessToken) {
			let url = `https://qqweb.top/api/${api_path}?access_token=${accessToken}&path=${encodeURIComponent(path)}&query=${encodeURIComponent(query)}`
			wx.request({
				url,
				method: 'GET',
				header: {
					'content-type': 'application/json', // 默认值
				},
				success: (res: any) => {
					if (res.statusCode === 200) {
						if (res.data.data) {
							resolve(res.data.data)
						} else {
							console.error('生成小程序链接失败', res)
						}
					} else {
						console.error('生成小程序链接接口异常', res)
					}
					resolve('')
				},
				fail: err => {
					console.error('生成小程序链接代码异常', err)
					resolve('')
				},
			})
		} else {
			console.error('缺少生成小程序链接的必要 accessToken')
			resolve('')
		}
	})
}

export function createUrlLink(path: string, query: string): Promise<string> {
	const API_PATH = 'wxurllink'
	return getAccessToken().then((accessToken: string) => getWxDataCode(accessToken, path, query, API_PATH))
}

export function createUrlScheme(path: string, query: string): Promise<string> {
	const API_PATH = 'wxscheme'
	return getAccessToken().then((accessToken: string) => getWxDataCode(accessToken, path, query, API_PATH))
}
