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
	{
		icon: 'https://p0.meituan.net/travelcube/6d7d801c69049f0ce45ddda8703b93e07067.png',
		path: 'index/pages/h5/pt/h5?weburl=',
		pathCP: '&f_token=0&f_utm=0&f_openIdCipher=0&f_ci=0&f_pos=0',
		urlCP: '',
		appid: APPID_KEY.MEITUAN_MP_MAIN,
		name: '美团',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/64987dcc63952feb618cf0100e61dc289621.png',
		path: 'pages/web-view/web-view?webviewUrl=',
		pathCP: '&type=DIRECT&wxapp_force_login=2',
		urlCP: '',
		appid: APPID_KEY.MEITUAN_MP_WAIMAI,
		name: '美团·外卖',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/5bfbe1c92e02871ac3f548f04479cd9e4283.png',
		path: 'pages/webview/index?url=',
		pathCP: '',
		urlCP: '',
		appid: APPID_KEY.MEITUAN_MP_HOTEL,
		name: '美团·酒店',
		select: false,
	},
	// {
	// 	icon: 'https://p0.meituan.net/travelcube/77a48d4489c3a22b5032a6ba067516335992.png',
	// 	path: 'pages/webview/webview?url=',
	// 	pathCP: '',
	// 	urlCP: '',
	// 	appid: APPID_KEY.MEITUAN_MP_HUISHENG,
	// 	name: '美团·惠省',
	// 	select: false,
	// },
]
