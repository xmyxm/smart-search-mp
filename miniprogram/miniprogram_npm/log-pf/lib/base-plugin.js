var __rest =
	(this && this.__rest) ||
	function (t, e) {
		var r = {}
		for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o])
		if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
			var s = 0
			for (o = Object.getOwnPropertySymbols(t); s < o.length; s++)
				e.indexOf(o[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, o[s]) && (r[o[s]] = t[o[s]])
		}
		return r
	}
import { perfReporter } from '../core/container'
export default class PerfBasePlugin {
	constructor(t) {
		;(this.core = t.core), (this.customLog = t.customLog)
	}
	report(t, e) {
		const r = this.core.sampling(e)
		if (!r.pass) return
		;(Array.isArray(t) ? t : [t]).forEach(t => {
			t.timestamp || (t.timestamp = Date.now())
			const { timestamp: e = Date.now() } = t,
				o = __rest(t, ['timestamp']),
				s = Object.assign(Object.assign({}, o), { timestamp: e })
			r.rate < 1 && (s.sampleRate = r.rate), perfReporter.push(s)
		})
	}
}
