import PerfBasePlugin from '../lib/base-plugin'
export default class AppCommonPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'APP_COMMON_METRIC')
	}
	applyer(n) {
		const { onLaunch: e, onHide: l } = n,
			a = this
		return (
			(n.onLaunch = function (n) {
				;(a.core.ctx.appStartTime = Date.now()),
					a.report({
						metricName: 'wxapp.app.launch',
						value: 1,
						tags: { pageName: null == n ? void 0 : n.path },
					}),
					null == e || e.call(this, n)
			}),
			(n.onHide = function () {
				null == l || l.call(this)
			}),
			n
		)
	}
}
AppCommonPlugin.pluginType = 'collector'
