import Qrcode from './qrcode'

export function createQrcode(text: string, n: number = 0) {
	return new Promise(resolve => {
		try {
			const size = 240 // 假设二维码大小为240x240
			// 创建离屏 Canvas
			const offscreenCanvas = wx.createOffscreenCanvas({ type: '2d', width: size, height: size })
			const ctx = offscreenCanvas.getContext('2d')

			offscreenCanvas.width = size
			offscreenCanvas.height = size

			// 使用 qrcode.js 绘制二维码
			const errorCorrectionLevel = 'L'
			const typeNumber = n || getTypeNumber(text) || n
			const qr = Qrcode(typeNumber, errorCorrectionLevel)
			qr.addData(text)
			qr.make()

			// 计算模块大小
			const qrSize = qr.getModuleCount() // 获取二维码模块数
			console.log(`qrSize: ${qrSize}`)
			const cellSize = 240 / qrSize
			// 绘制到离屏 canvas 上
			qr.renderTo2dContext(ctx, cellSize)

			// 导出为 PNG 格式的 Data URL
			wx.canvasToTempFilePath({
				canvas: offscreenCanvas,
				success: res => {
					resolve(res.tempFilePath)
				},
			})
		} catch (errmsg: any) {
			wx.showToast({
				title: errmsg,
				icon: 'none',
				duration: 2000,
			})
			resolve('')
		}
	})
}

export function testqrcode() {
	const testList: any[] = []
	let count = 0
	for (var n = 1; n < 41; n++) {
		for (var i = count; i < 5001; i++) {
			const letter = 'A' // 你想要填充的字母
			const repeatedString = letter.repeat(i)
			const code = createQrcode(repeatedString, n)
			if (!code) {
				count = i
				const result = { n, maxlength: i }
				console.log('测试日志：', result)
				testList.push(result)
				break
			}
		}
	}
	console.log('测试结果：', testList)
}

const typeNumberInfoList = [
	{ typeNumber: 1, maxlength: 18 },
	{ typeNumber: 2, maxlength: 33 },
	{ typeNumber: 3, maxlength: 54 },
	{ typeNumber: 4, maxlength: 79 },
	{ typeNumber: 5, maxlength: 107 },
	{ typeNumber: 6, maxlength: 135 },
	{ typeNumber: 7, maxlength: 155 },
	{ typeNumber: 8, maxlength: 193 },
	{ typeNumber: 9, maxlength: 231 },
	{ typeNumber: 10, maxlength: 272 },
	{ typeNumber: 11, maxlength: 322 },
	{ typeNumber: 12, maxlength: 368 },
	{ typeNumber: 13, maxlength: 426 },
	{ typeNumber: 14, maxlength: 459 },
	{ typeNumber: 15, maxlength: 521 },
	{ typeNumber: 16, maxlength: 587 },
	{ typeNumber: 17, maxlength: 645 },
	{ typeNumber: 18, maxlength: 719 },
	{ typeNumber: 19, maxlength: 793 },
	{ typeNumber: 20, maxlength: 859 },
	{ typeNumber: 21, maxlength: 930 },
	{ typeNumber: 22, maxlength: 1004 },
	{ typeNumber: 23, maxlength: 1092 },
	{ typeNumber: 24, maxlength: 1172 },
	{ typeNumber: 25, maxlength: 1274 },
	{ typeNumber: 26, maxlength: 1368 },
	{ typeNumber: 27, maxlength: 1466 },
	{ typeNumber: 28, maxlength: 1529 },
	{ typeNumber: 29, maxlength: 1629 },
	{ typeNumber: 30, maxlength: 1733 },
	{ typeNumber: 31, maxlength: 1841 },
	{ typeNumber: 32, maxlength: 1953 },
	{ typeNumber: 33, maxlength: 2069 },
	{ typeNumber: 34, maxlength: 2189 },
	{ typeNumber: 35, maxlength: 2304 },
	{ typeNumber: 36, maxlength: 2432 },
	{ typeNumber: 37, maxlength: 2564 },
	{ typeNumber: 38, maxlength: 2700 },
	{ typeNumber: 39, maxlength: 2810 },
	{ typeNumber: 40, maxlength: 2954 },
]
export function getTypeNumber(text: string) {
	const length = text.length
	const typeNumberInfo = typeNumberInfoList.find(({ maxlength }) => length < maxlength)
	if (typeNumberInfo) {
		return typeNumberInfo.typeNumber
	} else {
		throw new Error('文本过长，无法生成二维码')
	}
}
