import { PlatformInfoType } from './platformdata'
import { ImgKeyType } from '../../../enum/img'

export interface MpUrlHistoryInfoType {
	icon: string
	appid: string
	mpUrl: string
	timeStamp: string
	time: string
}

export interface OpenMPStateType {
	imgInfoMap: ImgKeyType
	platformInfoList: PlatformInfoType[]
	appIdPlaceholderText: string
	pathPlaceholderText: string
	appid: string
	path: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
}
