import { core } from '../core/container'
import customLog from '../core/custom-log'
import { getPageUrl } from '../lib/util'
const perfFSTComponent = function (t, e = Component) {
	const o = t.lifetimes && t.lifetimes.attached,
		c = t.attached,
		r = function () {
			const t = getPageUrl(),
				e = core.getConfigItem('fst')
			return !e.exclude.has(t) && (!!e.include.has(t) || !!e.includeAll)
		},
		a = function () {
			const t = this.setData
			this.setData = function (e, o) {
				null == t ||
					t.call(this, e, () => {
						try {
							const t = core.ctx.fstPageThisMapWebviewId.get(this.__wxWebviewId__ || this.__webviewId__)
							t &&
								(t.__perfPageCtx.fstCore && t.__perfPageCtx.fstCore.sampling(t),
								t.__fstReport && t.__fstReport.sampling(t))
						} catch (t) {
							customLog.error('[FST] Hook setData error: ', t)
						}
						null == o || o()
					})
			}
		}
	return (
		o
			? (t.lifetimes.attached = function (...t) {
					try {
						r.call(this) && a.call(this)
					} catch (e) {
						customLog.error('[FST] Hook lifetimes attached error: ', e)
					}
					o.call(this, ...t)
			  })
			: (t.attached = function (...t) {
					try {
						r.call(this) && a.call(this)
					} catch (e) {
						customLog.log('[FST] Hook attached error: ', e)
					}
					c && c.call(this, t)
			  }),
		e(t)
	)
}
export default perfFSTComponent
