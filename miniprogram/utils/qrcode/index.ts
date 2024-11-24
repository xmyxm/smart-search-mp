import Qrcode from './qrcode'

export function createQrcode(text: string) {
	let imgBase64Url = ''
	try {
		var typeNumber = getTypeNumber(text)
		var errorCorrectionLevel = 'L'
		var qr = Qrcode(typeNumber, errorCorrectionLevel)
		qr.addData(text)
		qr.make()
		imgBase64Url = qr.createDataURL(8, 25)
	} catch (errmsg: any) {
		wx.showToast({
			title: errmsg,
			icon: 'none',
			duration: 2000,
		})
	}
	return imgBase64Url
}

function getTypeNumber(text: string) {
	const length = text.length
	if (length <= 25) return 1
	if (length <= 47) return 2
	if (length <= 77) return 3
	if (length <= 114) return 4
	if (length <= 154) return 5
	if (length <= 195) return 6
	if (length <= 224) return 7
	if (length <= 279) return 8
	if (length <= 335) return 9
	if (length <= 395) return 10
	if (length <= 468) return 11
	if (length <= 535) return 12
	if (length <= 619) return 13
	if (length <= 667) return 14
	if (length <= 758) return 15
	if (length <= 854) return 16
	if (length <= 938) return 17
	if (length <= 1046) return 18
	if (length <= 1153) return 19
	if (length <= 1249) return 20
	if (length <= 1352) return 21
	if (length <= 1460) return 22
	if (length <= 1588) return 23
	if (length <= 1704) return 24
	if (length <= 1853) return 25
	if (length <= 1990) return 26
	if (length <= 2132) return 27
	if (length <= 2223) return 28
	if (length <= 2369) return 29
	if (length <= 2520) return 30
	if (length <= 2677) return 31
	if (length <= 2840) return 32
	if (length <= 3009) return 33
	if (length <= 3183) return 34
	if (length <= 3351) return 35
	if (length <= 3537) return 36
	if (length <= 3729) return 37
	if (length <= 3927) return 38
	if (length <= 4087) return 39
	if (length <= 4296) return 40
	throw new Error('文本过长，无法生成二维码')
}
