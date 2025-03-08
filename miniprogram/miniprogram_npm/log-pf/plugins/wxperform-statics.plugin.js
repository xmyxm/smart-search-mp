import { eventEmitter } from '../core/container'
import frame from '../core/frame'
import { getSystemInfoSync } from '../core/systeam-info'
import PerfBasePlugin from '../lib/base-plugin'
import { compareVersion } from '../lib/util'
export default class WxPerformStaticsPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments),
			(this.name = 'WX_PERFORM_STATICS'),
			(this.isObserved = !1),
			(this.isAppLoad = !1),
			(this.isAppReady = !1),
			(this.isAppLvcFmpRecord = { fmp: !1, lvc: !1 })
	}
	observer() {
		if (!this.isObserved) {
			this.isObserved = !0
			try {
				const e = getSystemInfoSync(),
					t = e.SDKVersion
				if (
					frame.getPerformance &&
					(('wx' === e.mpPlatform && compareVersion(t, '2.11.0') >= 0) ||
						('mmp' === e.mpPlatform && e.mmpVersion && compareVersion(e.mmpVersion, '5.16.0') >= 0))
				) {
					const e = frame.getPerformance()
					e.createObserver(e => {
						const t = e.getEntries() || [],
							a = {}
						if (
							(t.forEach(e => {
								a[e.name] = e
							}),
							a.appLaunch && a.firstRender)
						) {
							const { evaluateScript: e, appLaunch: t, firstRender: p } = a,
								r = p.startTime + p.duration - t.startTime
							;(this.core.ctx.appLaunchStartTimeByWxPerf = t.startTime), eventEmitter.emit('appLaunch')
							const i = [{ metricName: 'wxapp.app.tti', value: r, tags: { pageName: p.path } }]
							e && e.duration && i.push({ metricName: 'wxapp.app.eval', value: e.duration }),
								this.report(i)
						} else if (a.firstRender) {
							const { firstRender: e, route: t } = a,
								p = null == t ? void 0 : t.startTime
							if (p) {
								const t = e.startTime + e.duration - p
								this.report({ metricName: 'wxapp.page.tti', value: t, tags: { pageName: e.path } })
							}
						}
					}).observe({ entryTypes: ['render', 'script', 'navigation'] })
				}
			} catch (e) {
				this.customLog.warn('微信 performance 获取失败, 此模块不可用', e)
			}
		}
	}
	appFirstLvcFmpFactory(e) {
		const t = this
		return function (a = {}) {
			if (t.isAppLvcFmpRecord[e] || t.core.ctx.isPageLeavedOnceMore) return
			;(t.isAppLvcFmpRecord[e] = !0), (a.key = a.key || 'success')
			const p = a.endTime || Date.now(),
				r = 'fmp' === e ? 'wxapp.app.api.fmp' : 'wxapp.app.api.lvc'
			t.core.ctx.appLaunchStartTimeByWxPerf
				? t.report({ metricName: r, value: p - t.core.ctx.appLaunchStartTimeByWxPerf, tags: a }, 'app')
				: eventEmitter.on('appLaunch', () => {
						t.report({ metricName: r, value: p - t.core.ctx.appLaunchStartTimeByWxPerf, tags: a }, 'app')
				  })
			const [i, c] =
				'fmp' === e ? ['wxapp.app.fmp', 'wxapp.app.code.fmp'] : ['wxapp.app.lvc', 'wxapp.app.code.lvc']
			t.report([
				{
					metricName: i,
					value: t.core.ctx.appStartTime ? p - t.core.ctx.appStartTime : -1,
					tags: Object.assign(Object.assign({}, a), {
						performance: t.core.ctx.appLaunchStartTimeByWxPerf,
						codeStart: t.core.ctx.codeStartTime,
						onLaunch: t.core.ctx.appStartTime,
					}),
				},
				{ metricName: c, value: p - t.core.ctx.codeStartTime, tags: Object.assign({}, a) },
			])
		}
	}
	appApiLifetime(e, t) {
		const a = this.core.ctx
		if (!a.appStartTime || a.recordPageCount > 1 || getCurrentPages().length > 1) return
		const p = 'load' === e ? 'wxapp.app.api.load' : 'wxapp.app.api.ready',
			r = Date.now(),
			i = () => {
				this.report(
					{ metricName: p, value: r - this.core.ctx.appLaunchStartTimeByWxPerf, tags: { pageName: t } },
					'app',
				)
			}
		this.core.ctx.appLaunchStartTimeByWxPerf ? i() : eventEmitter.on('appLaunch', () => i())
	}
	applyer(e, t) {
		const a = this
		if ('inApp' === e) {
			const e = t,
				{ onLaunch: p } = e
			return (
				(e.onLaunch = function (e) {
					a.observer(), null == p || p.call(this, e)
				}),
				e
			)
		}
		if ('inPage' === e || 'inComp' === e) {
			const p = 'inPage' === e ? t : t.methods,
				{ onLoad: r, onReady: i } = p
			return (
				(p.onLoad = function (e) {
					const t = this.__perfPageCtx.pageName
					a.isAppLoad || ((a.isAppLoad = !0), a.appApiLifetime('load', t)), null == r || r.call(this, e)
				}),
				void (p.onReady = function () {
					const e = this.__perfPageCtx.pageName
					a.isAppReady || ((a.isAppReady = !0), a.appApiLifetime('ready', e)), null == i || i.call(this)
				})
			)
		}
		return { appFmp: this.appFirstLvcFmpFactory('fmp'), appLvc: this.appFirstLvcFmpFactory('lvc') }
	}
}
WxPerformStaticsPlugin.pluginType = 'reporter'
