import { PlatformInfoType, EnvVersionInfoType } from './platformdata'
import { ImgKeyType } from '../../../enum/img'

export interface MpUrlHistoryInfoType {
	icon: string
	appid: string
	mpUrl: string
	envVersion: string
	timeStamp: string
	time: string
}

export interface OpenMPStateType {
	imgInfoMap: ImgKeyType
	envVersionList: EnvVersionInfoType[]
	envVersionInfo: EnvVersionInfoType
	platformInfoList: PlatformInfoType[]
	appIdPlaceholderText: string
	pathPlaceholderText: string
	appid: string
	path: string
	mpUrlHistoryList: MpUrlHistoryInfoType[]
}
