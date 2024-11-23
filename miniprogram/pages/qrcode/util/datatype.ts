import { ImgKeyType } from '../../../enum/img'

export interface UrlHistoryInfoType {
	url: string
	timeStamp: string
	time: string
}

export interface QrcodeStateType {
	imgInfoMap: ImgKeyType
	placeholderText: string
	content: string
	urlHistoryList: UrlHistoryInfoType[]
	showModal: boolean
	modalImgBase64Url: string
	modalUrl: string
}