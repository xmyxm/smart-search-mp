/**
 * 激活与更新服务卡片
 * @param access_token 
 * @param data 
 * @returns 
 */
export function setUserNotify(access_token: string, data: object): Promise<string> {
	return new Promise(resolve => {
		const url = `https://qqweb.top/api/wxsetusernotify?access_token=${access_token}`
		wx.request({
			url,
			method: 'POST',
			data,
			header: {
				'content-type': 'application/json', // 默认值
			},
			success: (res: any) => {
				if (res.data.data) {
					resolve(res.data.data)
				} else {
					console.error('激活与更新服务卡片失败', res)
					resolve('')
				}
			},
			fail: err => {
				console.error('激活与更新服务卡片异常', err)
				resolve('')
			},
		})
	})
}

/**
 * 通过ticket换取二维码 URL
 * @param ticket 
 * @returns 
 */
export function getQRcodeImgUrl(ticket: string): Promise<string> {
	return new Promise(resolve => {
		const url = `https://qqweb.top/api/fuwuhaoshowqrcode?ticket=${ticket}`
		wx.request({
			url,
			method: 'GET',
			header: {
				'content-type': 'application/json', // 默认值
			},
			success: (res: any) => {
				if (res.data.data) {
					const url: string = res.data.url
					resolve(ticket)
				} else {
					console.error('通过ticket换取二维码失败', res)
					resolve('')
				}
			},
			fail: err => {
				console.error('通过ticket换取二维码异常', err)
				resolve('')
			},
		})
	})
}

