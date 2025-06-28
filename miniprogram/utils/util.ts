export const formatTime = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = (n: number) => {
	const s = n.toString()
	return s[1] ? s : `0${s}`
}

function isToday(date: Date) {
	const today = new Date()
	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	)
}

export const formatMiniTime = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	if (isToday(date)) {
		return `${[hour, minute, second].map(formatNumber).join(':')}`
	}

	return `${[year, month, day].map(formatNumber).join('/')}`
}

export function parseUrlParams(url: string) {
	const params = {}
	// 找到问号后面的查询字符串
	const queryString = url.split('?')[1]
	if (queryString) {
		// 将查询字符串按 & 分割成键值对
		const pairs = queryString.split('&')
		pairs.forEach(pair => {
			const [key, value] = pair.split('=')
			if (key) {
				;(params as Record<string, string>)[decodeURIComponent(key)] = decodeURIComponent(value || '')
			}
		})
	}
	return params
}

/**
 * 动态添加参数到小程序URL，原URL参数优先级最高
 * @param url 原始URL（如 `pages/index/index?token=123`）
 * @param newParams 要添加的新参数（支持字符串或对象）
 * @returns 处理后的URL
 */
export function addParamsToUrl(
	url: string,
	newParams: string | Record<string, string | number | boolean> = {},
): string {
	// 分离路径和查询参数
	const [path, query] = url.split('?')

	// 解析现有参数（原URL参数）
	const params: Record<string, string> = {}
	if (query) {
		query.split('&').forEach(pair => {
			const [key, value] = pair.split('=')
			if (key) params[key] = decodeURIComponent(value || '')
		})
	}

	if (newParams) {
		// 统一将 newParams 转为对象
		const parsedNewParams: Record<string, string> = {}

		if (typeof newParams === 'string') {
			// 处理字符串形式（如 "token=123&openId=abc"）
			newParams.split('&').forEach(pair => {
				const [key, value] = pair.split('=')
				if (key) parsedNewParams[key] = decodeURIComponent(value || '')
			})
		} else if (typeof newParams === 'object' && newParams !== null) {
			// 处理对象形式（如 {token: '123', openId: 'abc'}）
			Object.entries(newParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					parsedNewParams[key] = String(value)
				}
			})
		}

		// 合并新参数，原参数优先级更高（不覆盖）
		Object.keys(parsedNewParams).forEach(key => {
			if (params[key] === undefined && parsedNewParams[key] !== undefined) {
				params[key] = parsedNewParams[key]
			}
		})
	}
	// 重新构建查询字符串
	const queryStr = Object.keys(params)
		.map(key => `${key}=${encodeURIComponent(params[key])}`)
		.join('&')

	return queryStr ? `${path}?${queryStr}` : path
}
