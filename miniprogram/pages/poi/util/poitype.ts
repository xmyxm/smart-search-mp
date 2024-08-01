export interface poiTypeInfoType {
	name: string
	showType: string
	cate: number | number[]
	dpPath: string
	dpRegex: string
	mtPath: string
	mtRegex: string
	checked: boolean
}

export const poiTypeInfoList: poiTypeInfoType[] = [
	{
		name: '美食',
		showType: 'food',
		cate: 1,
		dpPath: 'pages/poi/poi?shopUuid=[id]',
		dpRegex: 'shopshare\\/([a-zA-Z0-9]+)\\?',
		mtPath: 'index/pages/poi/poi?showtype=food&cate=1&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: true,
	},
	{
		name: '酒店',
		showType: 'hotel',
		cate: 20,
		dpPath: 'packages/hotel/pages/poi/pages/index/index?shopUuid=[id]&shopId=[id]', // 点评无法使用，必须传真实shopId
		dpRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		mtPath: 'index/pages/poi/poi?showtype=hotel&cate=20&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: false,
	},
	{
		name: '电影院',
		showType: 'cinema',
		cate: 99,
		dpPath: 'packages/movie/pages/cinema/cinema?shopUuid=[id]',
		dpRegex: 'appshare\\/shop\\/([a-zA-Z0-9]+)',
		mtPath: 'index/pages/poi/poi?showtype=cinema&cate=99&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: false,
	},
	{
		name: '旅游',
		showType: 'travel',
		cate: [78, 195],
		dpPath: 'packages/trip/mpvue-pages/pages/poi/poi?shopuuid=[id]&poiId=[id]',
		dpRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		mtPath: 'index/pages/poi/poi?showtype=travel&cate=78&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: false,
	},
	{
		name: '购物',
		showType: 'shopping',
		cate: 0,
		dpPath: 'packages/detail/pages/detail/detail?shopUuid=[id]&shopId=[id]',
		dpRegex: 'shopshare\\/([a-zA-Z0-9]+)\\?',
		mtPath: 'index/pages/poi/poi?showtype=shopping&cate=0&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: false,
	},
	{
		name: '海外酒店',
		showType: 'OverseaHotel',
		cate: 0,
		dpPath: 'packages/oversea-hotel/pages/poi-detail-webview/index?shopId=[id]&shopuuid=[id]', // 点评无法使用，必须传真实shopId
		dpRegex: 'poiId=([0-9]+)',
		mtPath: 'index/pages/poi/poi?showtype=OverseaHotel&cate=0&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: false,
	},
]
