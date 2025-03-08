import frame from '../core/frame'
import PerfBasePlugin from '../lib/base-plugin'
export default class NoContentPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'NO_CONTENT')
	}
	pushToReport(e, t, o, n, a) {
		this.report({
			metricName: 'wxapp.page.no-content',
			value: t,
			tags: Object.assign(a || {}, { pageName: e, key: o, mode: n }),
		})
	}
	isPathMatch(e, t, o) {
		if (o) for (const n of o) if (n.test(e)) return !1
		if (!t) return !0
		for (const n of t) if (n.test(e)) return !0
		return !1
	}
	calcConfig(e, t) {
		var o
		const n = { timeout: null, containers: [], loadingHasLocalCfg: !1, contentHasLocalCfg: !1 }
		if (t) {
			const e = null === (o = t()) || void 0 === o ? void 0 : o.pageNoContent
			if (e) {
				if (((n.timeout = e.timeout), Reflect.has(e, 'loadingContainer'))) {
					n.loadingHasLocalCfg = !0
					const [t, o] =
						'object' == typeof e.loadingContainer
							? [e.loadingContainer.selector, e.loadingContainer.customTags]
							: [e.loadingContainer, void 0]
					t && n.containers.push({ selector: t, mode: 'loading', customTags: o })
				}
				if (Reflect.has(e, 'contentContainer')) {
					n.contentHasLocalCfg = !0
					const [t, o] =
						'object' == typeof e.contentContainer
							? [e.contentContainer.selector, e.contentContainer.customTags]
							: [e.contentContainer, void 0]
					t && n.containers.push({ selector: t, mode: 'content', customTags: o })
				}
			}
		}
		const a = this.core.getConfigItem('pageNoContent')
		return (
			!n.loadingHasLocalCfg &&
				a.loadingContainer.selector &&
				this.isPathMatch(e, a.loadingContainer.include, a.loadingContainer.exclude) &&
				n.containers.push({ selector: a.loadingContainer.selector, mode: 'loading' }),
			!n.contentHasLocalCfg &&
				a.contentContainer.selector &&
				this.isPathMatch(e, a.contentContainer.include, a.contentContainer.exclude) &&
				n.containers.push({ selector: a.contentContainer.selector, mode: 'content' }),
			n.timeout || (n.timeout = a.timeout),
			n.timeout < 1e4 &&
				(this.customLog.warn('白屏监控 timeout 最小值为 1000ms，已重置为最小值'), (n.timeout = 1e4)),
			n
		)
	}
	recorder(e, t) {
		if (!frame.createIntersectionObserver) return
		const { pageName: o, noContentDisposer: n } = t.__perfPageCtx
		e.perfSetPageConfig = e.perfSetPageConfig || e.metricsSetPageConfig
		const a = this.calcConfig(o.toString(), e.perfSetPageConfig),
			r = new Map()
		let i
		const s = e => {
			r.delete(e), 0 === r.size && clearTimeout(i)
		}
		a.containers.length > 0 &&
			((t.__perfPageCtx.noContentStage = {
				prevStage: 'noContentStart',
				spendTime: Date.now() - t.__perfPageCtx.startTime,
			}),
			t.__perfPageCtx.userLeaveStage.push('noContentStart'))
		let c = a.containers.length
		for (const g of a.containers) {
			const e = frame.createIntersectionObserver(null),
				p = () => {
					this.pushToReport(o, a.timeout, 'timeout', g.mode, g.customTags), n.clear(g.mode)
				}
			;(l = p),
				r.set(l, !0),
				i ||
					(i = setTimeout(() => {
						Array.from(r.keys()).forEach(e => {
							e(), r.delete(e)
						})
					}, a.timeout))
			let C = !1
			n.add(g.mode, () => {
				C || ((C = !0), e.disconnect(), s(p))
			}),
				e.relativeToViewport().observe(`${g.selector}`, e => {
					if (
						('loading' === g.mode && 0 === e.intersectionRatio) ||
						('content' === g.mode && e.intersectionRatio > 0)
					) {
						const e = new Date().getTime() - t.__perfPageCtx.startTime
						this.pushToReport(o, e, 'success', g.mode, g.customTags),
							n.clear(g.mode),
							c--,
							0 === c &&
								((t.__perfPageCtx.noContentStage = { prevStage: 'noContentEnd', spendTime: e }),
								t.__perfPageCtx.userLeaveStage.push('noContentEnd'))
					}
				})
		}
		var l
	}
	shouldReportNoContentStage(e) {
		const t = e.__perfPageCtx.noContentStage
		t &&
			((e.__perfPageCtx.noContentStage = null),
			this.report({
				metricName: 'noContentStart' === t.prevStage ? 'wxapp.page.noContentStart' : 'wxapp.page.noContentEnd',
				value: t.spendTime,
				tags: { pageName: e.__perfPageCtx.pageName },
			}))
	}
	applyer(e) {
		const { onLoad: t, onHide: o, onUnload: n } = e,
			a = this
		;(e.onLoad = function (o) {
			;(this.__perfPageCtx.noContentDisposer = {
				loading: [],
				content: [],
				add: (e, t) => {
					this.__perfPageCtx.noContentDisposer[e].push(t)
				},
				clear: e => {
					;('all' === e
						? this.__perfPageCtx.noContentDisposer.loading.concat(
								this.__perfPageCtx.noContentDisposer.content,
						  )
						: this.__perfPageCtx.noContentDisposer[e]
					).forEach(e => e())
				},
			}),
				a.recorder(e, this),
				null == t || t.call(this, o)
		}),
			(e.onHide = function () {
				this.__perfPageCtx.noContentDisposer.clear('all'),
					a.shouldReportNoContentStage(this),
					null == o || o.call(this)
			}),
			(e.onUnload = function () {
				this.__perfPageCtx.noContentDisposer.clear('all'),
					a.shouldReportNoContentStage(this),
					null == n || n.call(this)
			})
	}
}
NoContentPlugin.pluginType = 'collector'
