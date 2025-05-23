import { APPID_KEY } from '../../../enum/appid'

export interface PlatformInfoType {
	icon: string
	appid: string
	name: string
	defaultPath: string
	select: boolean
}

export const platformInfoList: PlatformInfoType[] = [
	{
		icon: 'https://p0.meituan.net/travelcube/9cffd9c228980b999abc0fac7755369a13482.png',
		defaultPath: '',
		appid: '',
		name: '其它',
		select: true,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/069b81796406c1d9f1c99eb645e0c60610092.png',
		defaultPath: '/pages/home/home',
		appid: APPID_KEY.DIANPING_MP_MAIN,
		name: '大众点评',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/6d7d801c69049f0ce45ddda8703b93e07067.png',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_MAIN,
		name: '美团',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/64987dcc63952feb618cf0100e61dc289621.png',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_WAIMAI,
		name: '美团·外卖',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/5bfbe1c92e02871ac3f548f04479cd9e4283.png',
		defaultPath: '/pages/home/index',
		appid: APPID_KEY.MEITUAN_MP_HOTEL,
		name: '美团·酒店',
		select: false,
	},
]

export interface EnvVersionInfoType {
	name: string
	envVersion: string
	checked: boolean
	disabled: boolean
}

export const envVersionList: EnvVersionInfoType[] = [
	{
		name: '正式版',
		envVersion: 'release',
		checked: true,
		disabled: false,
	},
	{
		name: '体验版',
		envVersion: 'trial',
		checked: false,
		disabled: true,
	},
	{
		name: '	开发版',
		envVersion: 'develop',
		checked: false,
		disabled: true,
	},
]
