import PerfBasePlugin from '../lib/base-plugin'
import { calcDataSize } from '../lib/util'
export default class PageCommonPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments),
			(this.name = 'PAGE_COMMON_METRIC'),
			(this.isAppLoad = !1),
			(this.isAppReady = !1),
			(this.lifetimeOrder = { onLoad: 1, onShow: 2, onReady: 3, noContentStart: 4, noContentEnd: 5, fmp: 6 })
	}
	reportAppByLifetime(e, a) {
		const t = this.core.ctx
		if (!t.appStartTime || t.recordPageCount > 1 || getCurrentPages().length > 1) return
		const [p, o] =
				'load' === e ? ['wxapp.app.load', 'wxapp.app.code.load'] : ['wxapp.app.ready', 'wxapp.app.code.ready'],
			r = Date.now()
		this.report(
			[
				{ metricName: p, value: r - t.appStartTime, tags: { pageName: a } },
				{ metricName: o, value: r - t.codeStartTime, tags: { pageName: a } },
			],
			'app',
		)
	}
	pushDataSizeToReport(e, a) {
		const t = calcDataSize(e)
		this.report({ metricName: 'wxapp.page.dataSize', value: t, tags: { pageName: a } })
	}
	pushUserLeaveStageToReport(e, a, t) {
		if (!a || 0 === a.length) return
		const p = a.sort((e, a) => (this.lifetimeOrder[e] > this.lifetimeOrder[a] ? 1 : -1)),
			o = p[p.length - 1]
		o && this.report({ metricName: 'wxapp.page.leave', value: t, tags: { pageName: e, prevStage: o } })
	}
	applyer(e, a) {
		const t = 'inPage' === e ? a : a.methods,
			{ onLoad: p, onShow: o, onReady: r, onHide: i, onUnload: s, onTabItemTap: n } = t,
			g = this
		;(t.onLoad = function (e) {
			g.core.ctx.recordPageCount++
			const a = this.__perfPageCtx.pageName
			g.isAppLoad || (g.reportAppByLifetime('load', a), (g.isAppLoad = !0)),
				g.report(
					{ metricName: 'wxapp.page.load', value: 1, tags: { pageName: this.__perfPageCtx.pageName } },
					'pageShow',
				),
				null == p || p.call(this, e)
		}),
			(t.onShow = function (e) {
				g.report(
					{
						metricName: 'wxapp.page.show',
						value: Date.now() - this.__perfPageCtx.startTime,
						tags: { pageName: this.__perfPageCtx.pageName },
					},
					'pageShow',
				),
					this.__perfPageCtx.userLeaveStage.push('onShow'),
					null == o || o.call(this, e)
			}),
			(t.onReady = function () {
				const e = this.__perfPageCtx.pageName
				g.report(
					{
						metricName: 'wxapp.page.ready',
						value: Date.now() - this.__perfPageCtx.startTime,
						tags: { pageName: this.__perfPageCtx.pageName },
					},
					'pageReady',
				),
					this.__perfPageCtx.userLeaveStage.push('onReady'),
					g.isAppReady || (g.reportAppByLifetime('ready', e), (g.isAppReady = !0)),
					null == r || r.call(this)
			}),
			(t.onHide = function () {
				const e = this.__perfPageCtx.pageName
				g.pushDataSizeToReport(this.data, e),
					g.pushUserLeaveStageToReport(
						e,
						this.__perfPageCtx.userLeaveStage,
						Date.now() - this.__perfPageCtx.startTime,
					),
					null == i || i.call(this)
			}),
			(t.onUnload = function () {
				const e = this.__perfPageCtx.pageName
				g.pushDataSizeToReport(this.data, e),
					g.pushUserLeaveStageToReport(
						e,
						this.__perfPageCtx.userLeaveStage,
						Date.now() - this.__perfPageCtx.startTime,
					),
					null == s || s.call(this)
			}),
			(t.onTabItemTap = function (e) {
				g.core.ctx.recordPageCount++, null == n || n.call(this, e)
			})
	}
}
PageCommonPlugin.pluginType = 'collector'
