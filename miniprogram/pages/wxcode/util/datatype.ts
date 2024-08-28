import { PlatformInfoType } from './platformdata'
import { ImgKeyType } from '../../../enum/img'

export interface MpUrlHistoryInfoType {
	appid: string
	icon: string
	mpUrl: string
	base64: string
	timeStamp: string
	time: string
}

export interface WxcodeStateType {
	imgInfoMap: ImgKeyType
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	content: string
	modalContent: string
	modalPath: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
	showModal: boolean
}
