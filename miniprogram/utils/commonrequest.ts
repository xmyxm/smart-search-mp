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

