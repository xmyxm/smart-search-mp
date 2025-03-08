import { getPageUrl, PageNameDTO } from '../lib/util'
import customLog from './custom-log'
import frame from './frame'
import BaseReporter from '../lib/base-reporter'
export class PerfReporter extends BaseReporter {
	constructor(e) {
		super(e), (this.counter = new Map()), (this.isCheckedSingleReportConfig = !1), (this.isSingleReport = !1)
	}
	requestSeriviceParamsMaker(e, t) {
		const { project: r, version: s, token: o, userid: a } = this.core.getConfig(),
			i = this.getENV(t, Date.now(), o, s, a),
			n = { main: [] }
		e.data.logs.forEach(e => {
			const t = this.pushContentLogs2requestLog(e)
			e.indepentChannelName
				? n[e.indepentChannelName]
					? n[e.indepentChannelName].push(t)
					: (n[e.indepentChannelName] = [t])
				: n.main.push(t)
		})
		const g = Object.keys(n).map(e => {
			const t = { category: r, env: i, logs: n[e] }
			return { url: PerfReporter.CHANNEL_MAP_URL[e], body: 'main' === e ? [t] : t }
		})
		return 1 === g.length ? g[0] : g
	}
	pushContentLogs2requestLog(e) {
		return { type: e.metricName, value: e.value, tags: e.tags, ts: e.timestamp }
	}
	checkSingleReportConfig() {
		if (!this.isCheckedSingleReportConfig) {
			this.isCheckedSingleReportConfig = !0
			try {
				const e = frame.getStorageSync('__perf_enable_single_report__')
				;(this.isSingleReport = e + '' == '1'), this.isSingleReport && customLog.log('你配置了 log 单发')
			} catch (e) {
				customLog.error('storage 取值失败')
			}
		}
	}
	push(e) {
		this.checkSingleReportConfig()
		const t = this.requestContentProcesser(e)
		customLog.log('加入上报队列 ', { type: t.metricName, value: t.value, tags: t.tags, ts: t.timestamp }),
			super.pushCore(t, this.isSingleReport)
	}
	requestContentProcesser(e) {
		if (
			(e.tags || (e.tags = {}), e.timestamp || (e.timestamp = Date.now()), e.tags.pageName instanceof PageNameDTO)
		) {
			const t = e.tags.pageName.getRewritePageName(),
				r = e.tags.pageName.toString()
			;(e.tags.pageName = t || r), t && (e.tags.originPageName = r)
		}
		if (!e.tags.pageName) {
			const t = getPageUrl() || ''
			t || customLog.warn('通过 getCurrentPages 依然获取不到 pageName, 可能因为在 onLaunch 里面调用，请手动传'),
				(e.tags.pageName = t)
		}
		return (
			e.tags.pageName.startsWith('/') && (e.tags.pageName = e.tags.pageName.slice(1)),
			(e.tags = Object.assign({}, this.core.ctx.globalTags, e.tags)),
			(e.tags.perfVersion = this.core.perfVersion),
			e.sampleRate && e.sampleRate < 1 && (e.tags.sample_rate = e.sampleRate),
			e
		)
	}
	increaseCounter(e, t = 1) {
		this.counter.set(e, this.counter.has(e) ? this.counter.get(e) + t : t)
	}
	getCounter(e) {
		return this.counter.get(e)
	}
	getENV(e, t, r, s, o) {
		return {
			deviceType: e.deviceType,
			libVersion: e.libVersion,
			mpPlatform: e.mpPlatform,
			nativeVersion: e.nativeVersion,
			networkType: e.networkType,
			os: e.os,
			osVersion: e.osVersion,
			pixelRatio: e.pixelRatio,
			screenHeight: e.screenHeight,
			screenWidth: e.screenWidth,
			windowHeight: e.windowHeight,
			ts: t,
			token: r,
			appVersion: s,
			userid: o,
			perfVersion: this.core.perfVersion,
		}
	}
	report() {
		super.report(), this.counter.clear()
	}
}
PerfReporter.CHANNEL_MAP_URL = {
	main: 'https://report.mmmmmm.net',
	prism: 'https://prism.report.dddddd.net',
}
