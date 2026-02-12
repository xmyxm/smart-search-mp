/**
 * 查询小程序或者服务号 access_token
 * @param AppID 
 * @param AppSecret 
 * @returns 
 */
export function getAccessToken(AppID: string, AppSecret: string): Promise<string> {
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

/**
 * 查询小程序用户身份信息
 * @returns 
 */
export function getUserInfo(): Promise<any> {
	return new Promise(resolve => {
		wx.login({
			success (res) {
			  if (res.code) {
				const appid = 'wxddad6eb2e48f7db3'
				const secret = 'a04a537d9bfc2256717779a49ea0881f'
				const url = `https://qqweb.top/api/wxcode2session?appid=${appid}&secret=${secret}&js_code=${res.code}`
				wx.request({
					url,
					method: 'GET',
					header: {
						'content-type': 'application/json', // 默认值
					},
					success: (res: any) => {
						if (res.data.data) {
							resolve(res.data.data)
						} else {
							console.error('获取 userInfo 失败', res)
							resolve(null)
						}
					},
					fail: err => {
						console.error('获取 userInfo 异常', err)
						resolve(null)
					},
				})
			  } else {
				console.log('wx.login 失败' + res.errMsg);
				resolve(null)
			  }
			}
		});
	})
}
