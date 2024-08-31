import { APPID_KEY } from '../../../enum/appid'

export interface PlatformInfoType {
	icon: string
	appid: string
	name: string
	select: boolean
}

export const platformInfoList: PlatformInfoType[] = [
	{
		icon: 'https://p0.meituan.net/travelcube/069b81796406c1d9f1c99eb645e0c60610092.png',
		appid: APPID_KEY.DIANPING_MP_MAIN,
		name: '大众点评',
		select: true,
	},
	// 美团反扒动作加强关闭poiId明文分享通道
	// {
	// 	icon: 'https://p0.meituan.net/travelcube/6d7d801c69049f0ce45ddda8703b93e07067.png',
	// 	appid: APPID_KEY.MEITUAN_MP_MAIN,
	// 	name: '美团',
	// 	select: false,
	// },
]
