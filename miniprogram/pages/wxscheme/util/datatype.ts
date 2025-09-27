export interface typeInfoListType {
	type: string,
	name: string,
	checked: boolean,
}

export interface WxcodeStateType {
	typeInfo: typeInfoListType,
	typeInfoList: typeInfoListType[],
	path: string
	queryStr: string
}
