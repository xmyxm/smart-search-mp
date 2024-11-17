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
		name: '到综',
		showType: 'food',
		cate: 1,
		dpPath: 'packages/dpmapp-gc-dealdetail/pages/deal/dealdetail/dealdetail',
		dpRegex: '(https?:\\/\\/[^\\s\\u4e00-\\u9fa5]+)',
		mtPath: 'index/pages/poi/poi?showtype=food&cate=1&id=[id]',
		mtRegex: 'dpurl\\.cn\\/([a-zA-Z0-9]+)',
		checked: true,
	},
]