export interface poiTypeInfoType {
	name: string
	showType: string
	cate: number | number[]
	checked: boolean
}

export const poiTypeInfoList: poiTypeInfoType[] = [
	{ name: '美食', showType: 'food', cate: 1, checked: true },
	{ name: '酒店', showType: 'hotel', cate: 20, checked: false },
	{ name: '电影院', showType: 'cinema', cate: 99, checked: false },
	{ name: '旅游', showType: 'travel', cate: [78, 195], checked: false },
	{ name: '购物', showType: 'shopping', cate: 0, checked: false },
	{ name: '海外酒店', showType: 'OverseaHotel', cate: 0, checked: false },
]
