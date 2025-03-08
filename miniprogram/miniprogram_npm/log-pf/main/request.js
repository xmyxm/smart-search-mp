import { core, perfReporter } from '../core/container'
const MAX_REQUEST_NUM = 50
function pushToRecord(e, r, t, o, s, u, n) {
	if (perfReporter.getCounter('requestNum') > 50) return
	const c = core.sampling('request')
	if (!c.pass) return
	const i = Date.now()
	perfReporter.increaseCounter('requestNum'),
		perfReporter.push({
			metricName: 'wxapp.request',
			timestamp: i,
			value: u,
			tags: Object.assign(n || {}, { url: e, key: r, resSize: s, connectType: t }),
			sampleRate: c.rate,
		}),
		o && perfReporter.push({ metricName: 'wxapp.request.reqSize', timestamp: i, value: o })
}
export default function request(e, r) {
	return new Promise((t, o) => {
		;(e.perfError = e.perfError || e.metricsError),
			(e.customTags = e.customTags || e.extra),
			void 0 === e.isRequest && (e.isRequest = !0)
		const { url: s, perfError: u, complete: n, success: c, customTags: i } = e,
			p = e.connectType,
			a = Date.now()
		let l = 0,
			m = 0
		;(e.complete = function (e) {
			if ('request:fail' !== e.errMsg) {
				let r = 'success'
				;(null == u ? void 0 : u(e)) && (r = 'error'), pushToRecord(s, r, p, m, l, Date.now() - a, i), t(e)
			} else o(e)
			null == n || n.call(this, e)
		}),
			(e.success = function (e) {
				var r, t
				;(l = null === (r = e.profile) || void 0 === r ? void 0 : r.receivedBytedCount),
					(m = null === (t = e.profile) || void 0 === t ? void 0 : t.sendBytesCount),
					null == c || c.call(this, e)
			})
		;(r || core.getConfigItem('request'))(e)
	})
}
