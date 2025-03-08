import customLog, { toggleIsDebug } from './custom-log'
import { defaults, findDepencies } from '../lib/util'
import frame from './frame'
export default class Core {
	constructor() {
		;(this.__config = this.getDefaultConfig()),
			(this.__collectorPluginsMap = new Map()),
			(this.isInited = !1),
			(this.perfVersion = '1.4.0'),
			(this.ctx = {
				appStartTime: 0,
				recordPageCount: 0,
				isPageLeavedOnceMore: !1,
				codeStartTime: Date.now(),
				currentPageStartTime: 0,
				appLaunchStartTimeByWxPerf: null,
				fstPageThisMapWebviewId: new Map(),
				globalTags: {},
			})
	}
	applyPlugins(e, t) {
		const o = this.__collectorPluginsMap.get(e)
		return o ? o.applyer(...t) : (customLog.log(`你没有载入 ${e} 模块，此处该模块功能不可用`), null)
	}
	getConfigItem(e) {
		return this.__config[e]
	}
	updateConfigItem(e, t) {
		this.__config[e] = t
	}
	getConfig() {
		return this.__config
	}
	checkConfigRobust() {
		const { project: e, token: t, version: o } = this.__config
		return e && t && o
	}
	sampling(e) {
		var t
		const o = { pass: !0, rate: 1 }
		if (this.getConfigItem('dev')) return o
		const s = this.getConfigItem('sample')
		return (
			'whole' === s.type
				? ((o.pass = s.wholePass), (o.rate = s.value))
				: ((o.rate = null !== (t = s.value[e || '']) && void 0 !== t ? t : 1),
				  (o.pass = o.rate > Math.random())),
			o
		)
	}
	getDefaultConfig() {
		return {
			project: 'metrics_wxapp',
			version: '1.0.0',
			token: null,
			page: Page,
			request: frame.request,
			dev: !1,
			debug: !1,
			userid: '',
			whiteScreen: 1e3,
			autoTest: !1,
			localtest: !1,
			autoReport: { enable: !1, tick: 5e3 },
			sample: { type: 'single', value: Object.assign({}, Core._defaultReportSample) },
			fst: { include: new Set(), includeAll: !1, exclude: new Set() },
			hooks: {},
			pageNoContent: { timeout: 1e4, loadingContainer: { selector: null }, contentContainer: { selector: null } },
			suffix: { from: !1 },
			crash: {},
		}
	}
	initConfig(e) {
		const t = this.getDefaultConfig(),
			{
				token: o,
				version: s,
				page: n,
				dev: i,
				debug: a,
				enableFstPages: l,
				enableFstAllPages: r,
				excludeFstPages: g,
				sample: u,
				pageNoContent: c,
				userid: p,
				project: f,
				crashReportDebounceTime: m,
				city: d,
			} = e
		defaults(t, { version: s, page: n, dev: i, debug: a, userid: p }),
			(t.token = 'object' == typeof o ? o.wx || o.mmp : o),
			r && (t.fst.includeAll = !0),
			l && (t.fst.include = new Set(l)),
			g && (t.fst.exclude = new Set(g)),
			u &&
				('object' == typeof u
					? ((t.sample.type = 'single'), defaults(t.sample.value, u))
					: (t.sample = { type: 'whole', value: u, wholePass: u > Math.random() })),
			c && defaults(t.pageNoContent, c),
			(f || m) && (t.crash = { project: f, timeout: m }),
			d && (t.city = d),
			(this.__config = t)
	}
	usePlugins(e) {
		if (!e || 0 === e.length) return void customLog.log('没有指定使用的 plugin')
		findDepencies(e).forEach(e => {
			const t = new e({ core: this, customLog: customLog })
			customLog.log(`你引入了 [${t.name}] 模块`),
				this.__collectorPluginsMap.has(t.name)
					? customLog.error('重复引用了模块:' + t.name + '已跳过')
					: this.__collectorPluginsMap.set(t.name, t)
		})
	}
	pickPluginIns(e) {
		const t = this.__collectorPluginsMap.get(e)
		if (!t) throw new Error(`Perf 依赖的模块 ${e} 没有提前挂载成功`)
		return t
	}
	init(e) {
		this.isInited && console.warn('[perf] 重复 init，会以最后一次 init 的参数为准'),
			(this.isInited = !0),
			this.initConfig(e),
			toggleIsDebug(this.getConfigItem('debug'))
	}
	setGlobalTags(e) {
		Object.assign(this.ctx.globalTags, e)
	}
}
Core._defaultReportSample = {
	app: 1,
	pageShow: 1,
	pageReady: 1,
	pageSize: 1,
	customSpeed: 1,
	request: 1,
	fmp: 1,
	data: 1,
	rate: 1,
	socket: 1,
	pageNoContent: 1,
	webview: 1,
	fst: 1,
}
