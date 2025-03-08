import { core, perfReporter } from '../core/container'
import customLog from '../core/custom-log'
import { getPageUrl, noopTips, PageNameDTO } from '../lib/util'
const perfPage = function (e, o) {
	const { onHide: t, onUnload: a } = e
	;(e.perfSetData = noopTips('SETDATA', 'this.perfSetData')),
		(e.perfStartPoint = noopTips('CUSTOM_SPEED', 'this.perfStartPoint'))
	const n = function () {
		;(core.ctx.isPageLeavedOnceMore = !0),
			Promise.resolve().then(() => {
				perfReporter.report()
			})
	}
	;(e.onHide = function () {
		n.call(this), null == t || t.call(this)
	}),
		(e.onUnload = function () {
			n.call(this), null == a || a.call(this)
		}),
		core.applyPlugins('FST', [e]),
		core.applyPlugins('PAGE_COMMON_METRIC', ['inPage', e]),
		core.applyPlugins('WX_PERFORM_STATICS', ['inPage', e]),
		core.applyPlugins('CUSTOM_SPEED', ['inPage', e]),
		core.applyPlugins('FMP', ['inPage', e]),
		core.applyPlugins('SETDATA', ['inPage', e]),
		core.applyPlugins('NO_CONTENT', [e]),
		core.applyPlugins('CRASH', ['inPage', e])
	const { onLoad: r, onShow: i } = e
	;(e.onLoad = function (e) {
		const o = Date.now()
		;(this.__perfPageCtx = { startTime: o, pageName: new PageNameDTO(getPageUrl()), userLeaveStage: ['onLoad'] }),
			(core.ctx.currentPageStartTime = o),
			null == r || r.call(this, e)
	}),
		(e.onShow = function (e) {
			this.metricsToken &&
				(customLog.warn('你重新设置了 Token 为: ' + this.metricsToken),
				core.updateConfigItem('token', this.metricsToken)),
				null == i || i.call(this, e)
		}),
		(e.perfRewritePageName = function (e) {
			if (!this.__perfPageCtx) return customLog.error('请在 onLoad 后调用此方法')
			this.__perfPageCtx.pageName instanceof PageNameDTO &&
				(this.__perfPageCtx.pageName.setRewritePageName(e),
				customLog.warn('此页面之后上报的 pageName 已经被改写为:' + e))
		})
	;(o || core.getConfigItem('page'))(e)
}
export default perfPage
