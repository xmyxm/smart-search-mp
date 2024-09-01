import { ImgKeyType } from '../../../enum/img'

export interface MpUrlHistoryInfoType {
	appid: string
	mpUrl: string
	timeStamp: string
	time: string
}

export interface OpenMPStateType {
	imgInfoMap: ImgKeyType
	appIdPlaceholderText: string
	pathPlaceholderText: string
	appid: string
	path: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
}
