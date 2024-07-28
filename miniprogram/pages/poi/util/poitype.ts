export interface poiTypeInfoType {
	name: string
	showType: string
	cate: number | number[]
	dpPath: string
	mtPath: string
	checked: boolean
}

export const poiTypeInfoList: poiTypeInfoType[] = [
	{
		name: '美食',
		showType: 'food',
		cate: 1,
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=food&cate=1&id=',
		checked: true,
	},
	{
		name: '酒店',
		showType: 'hotel',
		cate: 20,
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=hotel&cate=20&id=',
		checked: false,
	},
	{
		name: '电影院',
		showType: 'cinema',
		cate: 99,
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=cinema&cate=99&id=',
		checked: false,
	},
	{
		name: '旅游',
		showType: 'travel',
		cate: [78, 195],
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=travel&cate=78&id=',
		checked: false,
	},
	{
		name: '购物',
		showType: 'shopping',
		cate: 0,
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=shopping&cate=0&id=',
		checked: false,
	},
	{
		name: '海外酒店',
		showType: 'OverseaHotel',
		cate: 0,
		dpPath: 'pages/poi/poi?shopUuid=',
		mtPath: 'index/pages/poi/poi?showtype=OverseaHotel&cate=0&id=',
		checked: false,
	},
]
