import { PlatformInfoType } from './platformdata'
import { ImgKeyType } from '../../../enum/img'

export interface MpUrlHistoryInfoType {
	appid: string
	icon: string
	mpUrl: string
	timeStamp: string
	time: string
}

export interface WebviewStateType {
	imgInfoMap: ImgKeyType
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	content: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
	showModal: boolean
	modalContent: string
	modalAppId: string
}
