var __rest =
	(this && this.__rest) ||
	function (r, e) {
		var o = {}
		for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && e.indexOf(t) < 0 && (o[t] = r[t])
		if (null != r && 'function' == typeof Object.getOwnPropertySymbols) {
			var n = 0
			for (t = Object.getOwnPropertySymbols(r); n < t.length; n++)
				e.indexOf(t[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, t[n]) && (o[t[n]] = r[t[n]])
		}
		return o
	}
import { core } from '../core/container'
import customLog from '../core/custom-log'
import BaseReporter from '../lib/base-reporter'
import { dateformat, debounce, defaults, uuid } from '../lib/util'
const MODULE_EXP = /https:\/\/usr\/(.*?)(?=\/app-service.js)/
export default class CrashManager extends BaseReporter {
	constructor() {
		super(core), (this.errorCounter = new Map()), (this._initOptions = {})
	}
	requestSeriviceParamsMaker(r, e) {
		const o = r.data.logs,
			{ token: t, version: n, userid: s, crash: i, city: a } = this.core.getConfig(),
			c = this._initOptions,
			{ project: p, crashReportDebounceTime: u, token: h } = c,
			g = __rest(c, ['project', 'crashReportDebounceTime', 'token'])
		return {
			url: CrashManager.CRASH_REQUEST_URL,
			body: o.map(r =>
				Object.assign(
					Object.assign(
						Object.assign(
							{
								token: h || t,
								project: p || i.project,
								appVersion: n,
								deviceId: s,
								timeout: u || i.timeout,
								city: a,
							},
							g,
						),
						{
							category: 'fe_perf_public',
							type: 'mp',
							os: e.os,
							osVersion: e.osVersion,
							deviceManufacturer: e.brand,
							deviceModel: e.model,
							platform: e.platform,
							platformVersion: e.SDKVersion,
							network: e.networkType,
							perfVersion: this.core.perfVersion,
						},
					),
					r,
				),
			),
		}
	}
	onError(r = '', e) {
		const o = this.errorCounter.get(r)
		o || this._onErrorCore(r, e), this.errorCounter.set(r, o ? o + 1 : 1)
	}
	onUnhandledRejection(r) {
		let e = !1
		const { reason: o } = r
		try {
			o &&
				'string' == typeof o &&
				(-1 !== o.indexOf('SDKScriptError') || -1 !== o.indexOf('webviewScriptError')) &&
				(e = !0),
				e || this._pushError(CrashManager.errorMaker(o, 'jsError'))
		} catch (t) {
			customLog.log('perf-inside-error onError', t), this.reportSDKError(t)
		}
		this._debounceReport()
	}
	addError(r, e = 'CustomError') {
		r.message || (r = CrashManager.errorMaker(r, e)), this._pushError(r)
	}
	init(r) {
		this._initOptions = defaults({ crashReportDebounceTime: 1e3 }, r)
	}
	onHide() {
		for (const [r, e] of this.errorCounter)
			this._canIgnore(r) ||
				1 === e ||
				this._pushError(CrashManager.errorMaker(`${r}: and ${e - 1} more times`, 'jsError'))
		this.report(), this.errorCounter.clear()
	}
	_canIgnore(r) {
		if (r && 'string' == typeof r) {
			if (-1 !== r.indexOf('SDKScriptError')) return !0
			if (-1 !== r.indexOf('webviewScriptError')) return !0
		}
		return !1
	}
	_onErrorCore(r = '', e = 'jsError') {
		try {
			this._canIgnore(r) || this._pushError(CrashManager.errorMaker(r, e, 'fatal'))
		} catch (o) {
			this.reportSDKError(o), customLog.error('perf-inside-error onError', o)
		}
		this._debounceReport()
	}
	reportSDKError(r) {
		this.addError(r.message + ';' + r.stack, 'CrashSDKError')
	}
	_debounceReport() {
		const r = this._initOptions.crashReportDebounceTime || this.core.getConfigItem('crash').timeout
		this._debounced ? this._debounced() : (this._debounced = debounce(this.report.bind(this), r))
	}
	report() {
		super.report()
	}
	_pushError(r) {
		customLog.log('加入 crash 上报队列', r), super.pushCore(r)
	}
	static errorMaker(r, e = 'jsError', o = 'fatal', t) {
		let n
		if (((n = dateformat(t || new Date())), 'string' == typeof r)) return CrashManager.errorInfoBuilder(r, e, o, n)
		if (r instanceof Error) {
			const t = r.message + ';' + r.stack
			return CrashManager.errorInfoBuilder(t, e, o, n)
		}
		return 'object' == typeof r ? CrashManager.errorInfoBuilder(JSON.stringify(r), e, o, n) : r
	}
	static errorInfoBuilder(r, e, o, t) {
		let n = MODULE_EXP.exec(r)
		n = n && n[1]
		let s =
			(n || 'unknow') +
				'--' +
				r
					.replace('thirdScriptError', '')
					.replace('MiniProgramError', n || '')
					.replace(/\n/, '')
					.split(/;|\t|\n/)[0] || 'unknow error'
		s = s.substring(0, 128)
		const i = { message: s, log: r, simpleLog: s, exceptionType: e, exceptionLevel: o, guid: uuid(), occurTime: t }
		return n && (i.module = n), Object.assign(CrashManager.getCrashingPageRouteInfo(), i)
	}
	static getCrashingPageRouteInfo() {
		const r = getCurrentPages(),
			e = r[r.length - 1] ? r[r.length - 1] : { route: 'app' },
			o = e.__origin_route__ || e.route || 'unknow'
		return {
			lastPage: o,
			pageStack: r
				.map(r => {
					const e = r || { options: {}, route: 'unknow' },
						o = Object.entries(e.options)
							.map(([r, e]) => `${r}=${e}`)
							.join('&')
					return (e.__origin_route__ || e.route) + (o ? '?' + o : '')
				})
				.reverse()
				.join('\n'),
			module: o.split('/')[0],
		}
	}
}
CrashManager.CRASH_REQUEST_URL = 'https://report.yyyyyy.net/perf/public/'
