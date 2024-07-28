export interface PlatformInfoType {
	icon: string
	appid: string
	name: string
	select: boolean
}

export const platformInfoList: PlatformInfoType[] = [
	{
		icon: 'https://p0.meituan.net/travelcube/069b81796406c1d9f1c99eb645e0c60610092.png',
		appid: 'wx734c1ad7b3562129',
		name: '大众点评',
		select: true,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/6d7d801c69049f0ce45ddda8703b93e07067.png',
		appid: 'wxde8ac0a21135c07d',
		name: '美团',
		select: false,
	},
]
