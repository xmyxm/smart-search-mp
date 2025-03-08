var __rest =
	(this && this.__rest) ||
	function (t, e) {
		var s = {}
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (s[n] = t[n])
		if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
			var o = 0
			for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)
				e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (s[n[o]] = t[n[o]])
		}
		return s
	}
import PerfBasePlugin from '../lib/base-plugin'
import { PageNameDTO, uuid } from '../lib/util'
export default class CustomSpeedPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments),
			(this.name = 'CUSTOM_SPEED'),
			(this.addPointGlobalStepMap = new Map()),
			(this.pageNamePointIdsMap = new Map()),
			(this.customPoints = new Map())
	}
	register(t, e, s) {
		const n = uuid()
		this.customPoints.set(n, { values: [], params: null }),
			this.pageNamePointIdsMap.has(e.toString()) || this.pageNamePointIdsMap.set(e.toString(), []),
			this.pageNamePointIdsMap.get(e.toString()).push(n),
			this.customPoints.get(n).values.push({ ts: Date.now(), index: 0, skip: !1, step: '0', pageName: e })
		let o = 8,
			a = 1
		return (
			'number' == typeof (null == s ? void 0 : s.num) && s.num < o && ((o = s.num), (a = s.num)),
			(this.customPoints.get(n).params = { key: t, maxNum: o, minNum: a }),
			n
		)
	}
	pushPointToReport(t, e = !1) {
		const s = this.customPoints
		if (!s.has(t)) return
		const n = s.get(t),
			o = n.values,
			a = n.params
		if (o.length - 1 < a.minNum) return
		if (e && o.length - 1 !== a.minNum) return
		const { pushList: i } = o.reduce(
			(t, e, s, n) => {
				if (0 === s || e.skip) return t
				t.hasNoSkip = !0
				const { step: o, duration: i, ts: p, pageName: r } = e,
					u = 'number' == typeof i ? i : p - n[s - 1].ts
				return (
					t.pushList.push({
						metricName: 'wxapp.speed.custom',
						value: u,
						tags: { pageName: r, key: a.key, step: o + '' },
						timestamp: p,
					}),
					t
				)
			},
			{ hasNoSkip: !1, pushList: [] },
		)
		this.report(i, 'customSpeed'), this.customPoints.delete(t)
	}
	addPoint(t, e, s) {
		if (!t) return
		if (!this.customPoints.has(t)) return
		const n = this.customPoints.get(t).values
		if (n.length < 1) return void this.customLog.warn('请保证 startPoint 调用早于 addPoint')
		const o = n.filter(t => !t.skip).length,
			{ key: a, maxNum: i } = this.customPoints.get(t).params
		if (o > i) return void this.customLog.warn(`${a}测速最多支持${i}个有效点，多于的点将不被记录`)
		const { step: p = n.length + '', duration: r, skip: u = !1 } = s || {}
		n.push({ index: n.length, ts: Date.now(), pageName: e, step: p + '', duration: r, skip: u })
	}
	addPointGlobalFactory() {
		const t = this
		return function (e) {
			t.addPointGlobalStepMap.has(e.key)
				? t.addPointGlobalStepMap.set(e.key, t.addPointGlobalStepMap.get(e.key) + 1)
				: t.addPointGlobalStepMap.set(e.key, 1)
			const { pageName: s, key: n, duration: o, step: a } = e,
				i = __rest(e, ['pageName', 'key', 'duration', 'step'])
			let p = a
			p || (p = t.addPointGlobalStepMap.get(n) + ''),
				t.report(
					{
						metricName: 'wxapp.speed.custom',
						value: o,
						tags: Object.assign(Object.assign({}, i), {
							pageName: new PageNameDTO(s),
							key: n,
							step: p + '',
						}),
					},
					'customSpeed',
				)
		}
	}
	applyer(t, e) {
		const s = this
		if ('inPage' !== t && 'inComp' !== t) {
			return { addPoint: this.addPointGlobalFactory() }
		}
		{
			const n = 'inPage' === t ? e : e.methods
			;(n.perfStartPoint = function (t, e) {
				const n = this.__perfPageCtx.pageName,
					o = s.register(t, n, e)
				return {
					pointId: o,
					add(t) {
						return s.addPoint(o, n, t), this
					},
					end() {
						s.pushPointToReport(o)
					},
				}
			}),
				(n.startMetricsPoint = n.perfStartPoint)
			const { onUnload: o } = n
			n.onUnload = function () {
				const t = this.__perfPageCtx.pageName,
					e = s.pageNamePointIdsMap.get(t.toString())
				null == e ||
					e.forEach(t => {
						s.pushPointToReport(t, !0), s.customPoints.delete(t)
					}),
					s.pageNamePointIdsMap.delete(t.toString()),
					null == o || o.call(this)
			}
		}
	}
}
CustomSpeedPlugin.pluginType = 'collector'
