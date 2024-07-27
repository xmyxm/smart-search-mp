export interface PlatformInfoType {
	icon: string
	path: string
	appid: string
	name: string
	select: boolean
}

export const platformInfoList: PlatformInfoType[] = [
	{
		icon: 'https://p0.meituan.net/travelcube/069b81796406c1d9f1c99eb645e0c60610092.png',
		path: 'pages/webview/webview?url=',
		appid: 'wx734c1ad7b3562129',
		name: '大众点评',
		select: true,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/6d7d801c69049f0ce45ddda8703b93e07067.png',
		path: 'index/pages/h5/pt/h5?weburl=',
		appid: 'wxde8ac0a21135c07d',
		name: '美团',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/64987dcc63952feb618cf0100e61dc289621.png',
		path: 'pages/web-view/web-view?webviewUrl=',
		appid: 'wx2c348cf579062e56',
		name: '美团·外卖',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/5bfbe1c92e02871ac3f548f04479cd9e4283.png',
		path: 'pages/webview/index?url=',
		appid: 'wx7649daed8f2335c4',
		name: '美团·酒店',
		select: false,
	},
	// {
	// 	icon: 'https://p0.meituan.net/travelcube/77a48d4489c3a22b5032a6ba067516335992.png',
	// 	path: 'pages/webview/webview?url=',
	// 	appid: 'wx0b42a347aafbe0d0',
	// 	name: '美团·惠省',
	// 	select: false,
	// },
]
