var __rest =
	(this && this.__rest) ||
	function (e, t) {
		var r = {}
		for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o])
		if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
			var a = 0
			for (o = Object.getOwnPropertySymbols(e); a < o.length; a++)
				t.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[a]) && (r[o[a]] = e[o[a]])
		}
		return r
	}
import PerfBasePlugin from '../lib/base-plugin'
import FMPPlugin from './fmp.plugin'
export default class CommonReportPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'COMMON_REPORT')
	}
	static dependencies() {
		return [FMPPlugin]
	}
	socketAdderFactory(e) {
		let t, r
		'socket' === e
			? ((r = 'wxapp.socket'), (t = 'socket'))
			: 'overview' === e
			? ((r = 'wxapp.socket.overview'), (t = 'socket'))
			: ((r = 'wxapp.rate'), (t = 'rate'))
		const o = this
		return function (e) {
			o.report({ metricName: r, value: e.value || 0, tags: { url: e.url, key: e.key } }, t)
		}
	}
	callFMP(e) {
		this.core.pickPluginIns('FMP').fmpForCustomAdd(e)
	}
	addFactory() {
		const e = this
		return function (t, r) {
			;(r = r || {}),
				'wxapp.page.fmp.time' === t
					? e.callFMP(r)
					: e.report({
							metricName: t,
							value: r.value || 0,
							tags: Object.assign({}, r),
							indepentChannelName: 'prism',
					  })
		}
	}
	applyer() {
		const e = this
		return {
			addWebView: function (t, r) {
				const o = r || {},
					{ value: a } = o,
					n = __rest(o, ['value']),
					c = Date.now(),
					i = 'number' == typeof a ? a : c - e.core.ctx.currentPageStartTime
				e.report(
					{
						metricName: 'wxapp.webview',
						value: i,
						timestamp: c,
						tags: Object.assign(n || {}, { key: t || 'load' }),
					},
					'webview',
				)
			},
			addSocket: e.socketAdderFactory('socket'),
			addSocketOverview: e.socketAdderFactory('overview'),
			addRate: e.socketAdderFactory('rate'),
			add: e.addFactory(),
		}
	}
}
CommonReportPlugin.pluginType = 'reporter'
