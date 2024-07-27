import { PlatformInfoType } from './platformdata'

export interface MpUrlHistoryInfoType {
	appid: string
	icon: string
	mpUrl: string
	timeStamp: string
	time: string
}

export interface WebviewStateType {
	placeholderText: string
	platformInfoList: PlatformInfoType[]
	content: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
}
