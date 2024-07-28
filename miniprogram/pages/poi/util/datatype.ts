import { PlatformInfoType } from './platformdata'
import { poiTypeInfoType } from './poitype'

export interface PoiPathHistoryInfoType {
	appid: string
	icon: string
	poiPath: string
	timeStamp: string
	time: string
}

export interface PoiStateType {
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	poiTypeInfoList: poiTypeInfoType[]
	selectPoiTypeInfo: poiTypeInfoType
	content: string
	poiPathHistoryList: PoiPathHistoryInfoType[]
	showModal: boolean
	modalContent: string
}
