import { APPID_KEY } from '../../../enum/appid'

export interface PlatformInfoType {
	icon: string
	path: string
	pathCP: string
	urlCP: string
	appid: string
	name: string
	select: boolean
}

export const platformInfoList: PlatformInfoType[] = [
	{
		icon: 'https://p0.meituan.net/travelcube/069b81796406c1d9f1c99eb645e0c60610092.png',
		path: 'pages/webview/webview?url=',
		pathCP: '',
		urlCP: 'token=*&openId=*&cityId=*&longitude=*&latitude=*',
		appid: APPID_KEY.DIANPING_MP_MAIN,
		name: '大众点评',
		select: true,
	},
]
