import { PathType } from './pathtype'

interface openLinkInfoType {
	type: number
	name: string
	path: string
	icon: string
	appid?: string | undefined
}

export const openLinkList: openLinkInfoType[] = [
	{
		type: PathType.MiniProgramPath,
		name: '小程序商详页地址生成工具',
		path: '/pages/poi/poi',
		icon: 'https://p0.meituan.net/travelcube/68d7862158e80d68a58de49a72b20a3e3367.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '微信小程序二维码生成工具',
		path: '/pages/wxcode/wxcode',
		icon: 'https://p0.meituan.net/travelcube/422caf7cda2547fb68db21e63d6af27d7070.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '页面链接或文本生成二维码',
		path: '/pages/qrcode/qrcode',
		icon: 'https://p1.meituan.net/travelcube/7b3e4f470bcce5666643da1af631b47e4814.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '小程序 Webview 链接生成工具',
		path: '/pages/webview/webview',
		icon: 'https://p0.meituan.net/travelcube/6c684c00868675f1cb5c55d72065c8fa4613.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '小程序团详页地址生成工具',
		path: '/pages/tuan/tuan',
		icon: 'https://p0.meituan.net/travelcube/3ddddca1992162ae622ff1fe85bda02d4116.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '跳转任意小程序页面',
		path: '/pages/openmp/openmp',
		icon: 'https://p0.meituan.net/travelcube/26901b7a81a1be9047f8bc87c01ef3376020.png',
	},
	{
		type: PathType.MiniProgramApp,
		name: '拉起半屏小程序体验',
		appid: 'wx734c1ad7b3562129',
		path: '/pages/home/home',
		icon: 'https://p0.meituan.net/travelcube/b28a6ce5dab0a43d560fc5a12edc26461934.png',
	},
	{
		type: PathType.MiniProgramPath,
		name: '小程序插件体验',
		path: '/pages/plugin/plugin',
		icon: 'https://p0.meituan.net/travelcube/e4737f1059f1c7a184ba36064444ecfe3515.png',
	},
]
