export interface StorageKeyType {
	[key: string]: string
}

export const STORAGE_KEY: StorageKeyType = {
	WEBVIEW_MPURL_HISTORY_LIST: 'WEBVIEW_MPURL_HISTORY_LIST',
	WEBVIEW_MPURL_INPUT_CONTENT: 'WEBVIEW_MPURL_INPUT_CONTENT',
	POI_URL_HISTORY_LIST: 'POI_URL_HISTORY_LIST',
	POI_URL_INPUT_CONTENT: 'POI_URL_INPUT_CONTENT',
	WXCODE_INPUT_CONTENT: 'WXCODE_INPUT_CONTENT',
	WXCODE_HISTORY_LIST: 'WXCODE_HISTORY_LIST',
	OPENMP_HISTORY_LIST: 'OPENMP_HISTORY_LIST',
	TUAN_URL_HISTORY_LIST: 'TUAN_URL_HISTORY_LIST',
	TUAN_URL_INPUT_CONTENT: 'TUAN_URL_INPUT_CONTENT',
	QRCODE_URL_HISTORY_LIST: 'QRCODE_URL_HISTORY_LIST',
	QRCODE_URL_INPUT_CONTENT: 'QRCODE_URL_INPUT_CONTENT',
}
