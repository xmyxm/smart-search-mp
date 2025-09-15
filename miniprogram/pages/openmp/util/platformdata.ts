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
		name: '美团外卖',
		select: false,
	},
	{
		icon: 'https://p0.meituan.net/travelcube/5bfbe1c92e02871ac3f548f04479cd9e4283.png',
		defaultPath: '/pages/home/index',
		appid: APPID_KEY.MEITUAN_MP_HOTEL,
		name: '美团酒店',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/91edbb02b0f8027303d615358eb082658245.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_PINHAOFAN,
		name: '拼好饭',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/f69689aa8ea613173ccf4915a15b676913360.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_XIAOXIANGCHAOSHI,
		name: '小象超市',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/951c9636cb35fb8f828dad017d8a59536157.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_SANGOU,
		name: '美团闪购',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/18ae8ce3e29938e34cd92d44af337e617749.jpg.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_PAOTUI,
		name: '美团跑腿',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/d28bd2d2d995bfa824566455d040574b13167.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_YIYAO,
		name: '美团买药',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/e822c21ee53aa33cbe385a6cca3a5f9212736.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_QUANQUAN,
		name: '美团圈圈',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/46433c4a2931989d23a36e770dd07da75547.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_HUIWAN,
		name: '虾丸看我就GO',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/0404917d9baeb0fa0e8f1c788d2c855f9367.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_DACHE,
		name: '美团打车',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/c371240279398cf05483f91ed1ca02bb17227.jpg.webp',
		defaultPath: '/pages/landing/index',
		appid: APPID_KEY.MEITUAN_MP_JIEQIAN,
		name: '美团借钱',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/4e23ac9e1245a1d37e2ad24ac085d5355089.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_MINSU,
		name: '民宿公寓',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/b493fa91f2706269bfc9a3f49fef4ac99009.png.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_CHONGDIANBAO,
		name: '充电宝',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/40400a2a97003f6746cfb03d4ffa4c4e16812.jpg.webp',
		defaultPath: '/pages/index/index',
		appid: APPID_KEY.MEITUAN_MP_JINGDIANMENPIAO,
		name: '景点门票',
		select: false,
	},
	{
		icon: 'https://img.meituan.net/dpmobile/d582941d32e084b0a988343cf0f2bd0514445.jpg.webp',
		defaultPath: '/pages/home/index',
		appid: APPID_KEY.MEITUAN_MP_PEISONG,
		name: '配送智能交付',
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
		disabled: false,
	},
	{
		name: '	开发版',
		envVersion: 'develop',
		checked: false,
		disabled: false,
	},
]
