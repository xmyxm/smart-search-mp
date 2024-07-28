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
