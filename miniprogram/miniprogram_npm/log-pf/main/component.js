import { core, perfReporter } from '../core/container'
import { perf_vendor } from '../core/frame'
import { getSystemInfoSync } from '../core/systeam-info'
import { compareVersion, getPageUrl, PageNameDTO } from '../lib/util'
const perfComponent = function (e, t = Component) {
	e.methods || (e.methods = {})
	const { onHide: o, onUnload: a } = e.methods,
		n = t => {
			var o
			const a = (null === (o = e.lifetimes) || void 0 === o ? void 0 : o.attached) || e.attached,
				n = function () {
					;(this.__perfPageCtx = {
						startTime: 'comp' === t ? Date.now() : void 0,
						pageName: new PageNameDTO(getPageUrl()),
						userLeaveStage: [],
					}),
						null == a || a.call(this)
				}
			if (e.lifetimes && e.lifetimes.attached)
				if ('wx' === perf_vendor) {
					const t = getSystemInfoSync().SDKVersion
					t && compareVersion(t, '2.2.3') > 0 ? (e.lifetimes.attached = n) : (e.attached = n)
				} else e.lifetimes.attached = n
			else e.attached = n
		}
	if (e.isPage) {
		const t = function () {
			;(core.ctx.isPageLeavedOnceMore = !0),
				Promise.resolve().then(() => {
					perfReporter.report()
				})
		}
		;(e.methods.onHide = function () {
			t.call(this), null == o || o.call(this)
		}),
			(e.methods.onUnload = function () {
				t.call(this), null == a || a.call(this)
			}),
			core.applyPlugins('PAGE_COMMON_METRIC', ['inComp', e]),
			core.applyPlugins('WX_PERFORM_STATICS', ['inComp', e])
	} else n('comp')
	core.applyPlugins('CUSTOM_SPEED', ['inComp', e]),
		core.applyPlugins('FMP', ['inComp', e]),
		core.applyPlugins('SETDATA', ['inComp', e]),
		core.applyPlugins('CRASH', ['inComp', e])
	const { onLoad: i } = e.methods
	return (
		e.isPage &&
			(n('page'),
			(e.methods.onLoad = function (e) {
				const t = Date.now()
				this.__perfPageCtx
					? (this.__perfPageCtx.startTime = t)
					: (this.__perfPageCtx = { startTime: t, pageName: new PageNameDTO(getPageUrl()) }),
					this.__perfPageCtx.userLeaveStage || (this.__perfPageCtx.userLeaveStage = []),
					this.__perfPageCtx.userLeaveStage.push('onLoad'),
					(core.ctx.currentPageStartTime = t),
					null == i || i.call(this, e)
			})),
		t(e)
	)
}
export default perfComponent
