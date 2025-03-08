import { noopTips } from '../lib/util'
export default class Perf {
	constructor(e) {
		;(this.addPoint = noopTips('CUSTOM_SPEED', 'perf.addPoint')),
			(this.addWebview = noopTips('COMMON_REPORT', 'perf.addWebview')),
			(this.addSocketOverview = noopTips('COMMON_REPORT', 'perf.addSocketOverview')),
			(this.addSocket = noopTips('COMMON_REPORT', 'perf.addSocket')),
			(this.addRate = noopTips('COMMON_REPORT', 'perf.addRate')),
			(this.add = noopTips('COMMON_REPORT', 'perf.add')),
			(this.appFmp = noopTips('WX_PERFORM_STATICS', 'perf.appFmp')),
			(this.appLvc = noopTips('WX_PERFORM_STATICS', 'perf.appLvc')),
			(this.addError = noopTips('CRASH', 'perf.addError')),
			(this.reportMKMessage = noopTips('MASTER_KEY', 'perf.reportMKMessage')),
			(this.core = e)
	}
	init(e) {
		return this.core.init(e)
	}
	injectPlugin() {
		const e = this.core.applyPlugins('COMMON_REPORT', [])
		e &&
			((this.addWebview = e.addWebView),
			(this.addSocket = e.addSocket),
			(this.addSocketOverview = e.addSocketOverview),
			(this.addRate = e.addRate),
			(this.add = e.add))
		const t = this.core.applyPlugins('WX_PERFORM_STATICS', ['inPerf'])
		t && ((this.appFmp = t.appFmp), (this.appLvc = t.appLvc))
		const i = this.core.applyPlugins('CUSTOM_SPEED', ['inPerf'])
		i && (this.addPoint = i.addPoint)
		const s = this.core.applyPlugins('CRASH', ['inPerf'])
		s && (this.addError = s.addError)
		const o = this.core.applyPlugins('MASTER_KEY', [])
		o && (this.reportMKMessage = o.reportToMK)
	}
	use(e) {
		this.core.usePlugins(e), this.injectPlugin()
	}
	setUserId(e) {
		this.core.updateConfigItem('userid', e)
	}
	update(e, t) {
		this.core.updateConfigItem(e, t)
	}
	setGlobalTags(e) {
		const t = {}
		e &&
			Object.keys(e).forEach(i => {
				const s = e[i]
				'object' != typeof s && (t[i] = s)
			}),
			this.core.setGlobalTags(t)
	}
}
