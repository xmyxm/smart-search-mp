import { PlatformInfoType } from './platformdata'
import { ImgKeyType } from '../../../enum/img'
import { poiTypeInfoType } from './poitype'

export interface PoiPathHistoryInfoType {
	appid: string
	icon: string
	poiPath: string
	timeStamp: string
	time: string
}

export interface PoiStateType {
	imgInfoMap: ImgKeyType
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	poiTypeInfoList: poiTypeInfoType[]
	selectPoiTypeInfo: poiTypeInfoType
	content: string
	poiPathHistoryList: PoiPathHistoryInfoType[]
	showModal: boolean
	modalContent: string
	modalAppId: string
}
