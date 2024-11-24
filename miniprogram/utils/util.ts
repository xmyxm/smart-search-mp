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
