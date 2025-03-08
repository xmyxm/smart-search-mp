import PerfBasePlugin from '../lib/base-plugin'
import { calcDataSize, defaults } from '../lib/util'
import FMPPlugin from './fmp.plugin'
export default class SetDataPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'SETDATA')
	}
	static dependencies() {
		return [FMPPlugin]
	}
	pushToRecord(e, t, a, i) {
		const n = { key: t, pageName: e },
			r = [{ metricName: 'wxapp.data.time', value: a, tags: n }]
		i && r.push({ metricName: 'wxapp.data.dataSize', value: i, tags: n }), this.report(r, 'data')
	}
	callFMP(e, t, a, i) {
		this.core.pickPluginIns('FMP').fmp(e, t, a, i)
	}
	applyer(e, t) {
		const a = this,
			i = 'inPage' === e ? t : t.methods
		;(i.perfSetData = function (e, t, i) {
			const [n, r] = 'function' == typeof t ? [i, t] : [t, i],
				s = defaults({ key: 'page', fmp: !1, ignore: !1 }, n),
				o = this.__perfPageCtx.pageName,
				l = Date.now(),
				p = () => {
					if (!s.ignore) {
						const t = Date.now(),
							i = Reflect.has(s, 'duration') ? s.duration : t - l,
							n = s.needSize ? calcDataSize(e) : 0
						a.pushToRecord(o, s.key, i, n)
					}
					null == r || r()
				}
			if (s.fmp) {
				const t = defaults(
					{ key: s.key, ignore: s.ignore, needSize: s.needSize, duration: s.duration },
					s.fmpParams,
				)
				!t.extra && s.extra && (t.extra = s.extra), a.callFMP(this, e, t, p)
			} else this.setData(e, p)
		}),
			(i.metricsSetData = i.perfSetData)
	}
}
SetDataPlugin.pluginType = 'collector'
