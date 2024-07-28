import { PlatformInfoType } from './platformdata'

export interface PoiPathHistoryInfoType {
	appid: string
	icon: string
	poiPath: string
	timeStamp: string
	time: string
}

export interface WebviewStateType {
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	content: string
	poiPathHistoryList: PoiPathHistoryInfoType[]
	showModal: boolean
	modalContent: string
}
