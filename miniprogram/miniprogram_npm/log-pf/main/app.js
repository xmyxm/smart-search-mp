import { core } from '../core/container'
const perfApp = function (p, i = App) {
	;(p.initPerf = function (p) {
		return core.init(p)
	}),
		(p.initMetrics = p.initPerf),
		core.applyPlugins('ERREXCEPTIONOR', [p]),
		core.applyPlugins('CRASH', ['inApp', p]),
		core.applyPlugins('WX_PERFORM_STATICS', ['inApp', p]),
		core.applyPlugins('APP_COMMON_METRIC', [p]),
		i(p)
}
export default perfApp
