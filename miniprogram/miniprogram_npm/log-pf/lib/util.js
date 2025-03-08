import customLog from '../core/custom-log'
export function getPageUrl() {
	const e = getCurrentPages() || []
	if (e.length) {
		const t = e[e.length - 1] || { route: 'other' },
			r = t.route || t.__route__
		return r.startsWith('/') ? r.slice(1) : r
	}
	return 'app'
}
export function defaults(e, t) {
	return t
		? (Object.keys(t).forEach(r => {
				const n = t[r]
				null != n && (e[r] = n)
		  }),
		  e)
		: e
}
export function uuid() {
	let e = new Date().getTime()
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
		const r = (e + 16 * Math.random()) % 16 | 0
		return (e = Math.floor(e / 16)), ('x' === t ? r : (3 & r) | 8).toString(16)
	})
}
export function calcDataSize(e) {
	return void 0 === e ? 0 : JSON.stringify(e).length
}
export function findDepencies(e) {
	const t = [],
		r = new Set()
	return (
		(function e(n) {
			for (const o of n) o.dependencies && e(o.dependencies()), r.has(o) || (t.push(o), r.add(o))
		})(e),
		t
	)
}
export function compareVersion(e, t) {
	const r = e.split('.'),
		n = t.split('.'),
		o = Math.max(r.length, n.length)
	for (; r.length < o; ) r.push('0')
	for (; n.length < o; ) n.push('0')
	for (let u = 0; u < o; u++) {
		const e = parseInt(r[u]),
			t = parseInt(n[u])
		if (e > t) return 1
		if (e < t) return -1
	}
	return 0
}
export const noopTips = function (e, t, r) {
	return () => {
		customLog.error(`调用此 API${t ? `(${t})` : ''} 你需要引入 ${e} 模块。${r || ''}`, new Error().stack)
	}
}
export function dateformat(e) {
	return new Date(e.getTime() + 288e5).toISOString().replace('T', ' ').split('.')[0]
}
export function debounce(e, t) {
	let r
	function n() {
		r && (clearTimeout(r), (r = null)),
			(r = setTimeout(function () {
				;(r = null), e()
			}, t))
	}
	return n(), n
}
export function isEqual(e, t) {
	const r = Object.keys(e),
		n = Object.keys(t)
	return r.length === n.length && n.every(r => t[r] === e[r])
}
export class PageNameDTO {
	constructor(e) {
		this.pageName = e || ''
	}
	setRewritePageName(e) {
		this.rewritedPageName = e
	}
	getRewritePageName() {
		return this.rewritedPageName
	}
	toString() {
		return this.pageName
	}
	valueOf() {
		return this.pageName
	}
	toJSON() {
		return this.pageName
	}
}
