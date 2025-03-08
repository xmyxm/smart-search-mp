import { perfReporter } from '../core/container'
import frame from '../core/frame'
import PerfBasePlugin from '../lib/base-plugin'
export default class ExceptionPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'ERREXCEPTIONOR')
	}
	applyer(e) {
		const { onLaunch: r } = e,
			n = this
		e.onLaunch = function (e) {
			frame.onMemoryWarning &&
				frame.onMemoryWarning(e => {
					const r = {
							5: 'TRIM_MEMORY_RUNNING_MODERATE',
							10: 'TRIM_MEMORY_RUNNING_LOW',
							15: 'TRIM_MEMORY_RUNNING_CRITICAL',
						}[e.level],
						o = getCurrentPages().map(e => (e && e.route) || 'other') || []
					n.report({
						metricName: 'wxapp.memory.warning',
						value: 1,
						tags: { currPageNum: o.length, pages: o.join(','), key: r },
					}),
						perfReporter.report()
				}),
				null == r || r.call(this, e)
		}
	}
}
ExceptionPlugin.pluginType = 'collector'
