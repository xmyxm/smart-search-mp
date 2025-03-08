import PerfBasePlugin from '../lib/base-plugin'
import { calcDataSize, defaults, PageNameDTO } from '../lib/util'
import customLog from '../core/custom-log'
export default class FMPPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'FMP'), (this.recoredPageFMP = new Map())
	}
	pushToRecord(e, t, a, r, o, s) {
		if (
			(this.recoredPageFMP.has(e.toString()) || this.recoredPageFMP.set(e.toString(), new Set()),
			this.recoredPageFMP.get(e.toString()).has(t))
		)
			return
		this.recoredPageFMP.get(e.toString()).add(t)
		const i = defaults(o || {}, { key: t, pageName: e, extra: s }),
			p = [{ metricName: 'wxapp.page.fmp.time', value: a, tags: i }]
		r && p.push({ metricName: 'wxapp.page.fmp.dataSize', value: r, tags: i }), this.report(p, 'fmp')
	}
	fmpForCustomAdd(e) {
		if (!(e = e || {}).pageName) return void customLog.error('pageName is required when .add() method used for FMP')
		const t = { key: e.key || 'page', pageName: e.pageName }
		e.extra && (t.extra = e.extra)
		const a = e.duration || Date.now() - this.core.ctx.currentPageStartTime
		this.pushToRecord(new PageNameDTO(t.pageName), t.key, a, e.size, t, t.extra)
	}
	fmp(e, t, a, r) {
		const o = defaults({ key: 'page', ignore: !1, needSize: !0 }, a),
			{ pageName: s, startTime: i } = e.__perfPageCtx
		e.setData(t, () => {
			if (!o.ignore) {
				const a = Date.now(),
					r = Reflect.has(o, 'duration') ? o.duration : a - i,
					p = o.needSize ? calcDataSize(t) : 0
				this.pushToRecord(s, o.key, r, p, o.customTags, o.extra), e.__perfPageCtx.userLeaveStage.push('fmp')
			}
			null == r || r()
		})
	}
	applyer(e, t) {
		const a = this,
			r = 'inPage' === e ? t : t.methods
		;(r.perfFMP = function (e, t, r) {
			const [o, s] = 'function' == typeof t ? [r, t] : [t, r]
			a.fmp(this, e, o, s)
		}),
			(r.metricsFMP = r.perfFMP)
	}
}
FMPPlugin.pluginType = 'collector'
