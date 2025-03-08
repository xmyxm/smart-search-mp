import PerfBasePlugin from '../lib/base-plugin'
import CrashManager from '../main/crash-manager'
export default class CrashPlugin extends PerfBasePlugin {
	constructor(n) {
		super(n), (this.name = 'CRASH'), (this.manmger = new CrashManager())
	}
	addErrorFactory() {
		const n = this
		return function (r, o) {
			n.manmger.addError(r, o)
		}
	}
	applyer(n, r) {
		const o = this
		if ('inApp' === n) {
			const n = r,
				{ onError: e, onUnhandledRejection: a } = n
			;(n.onError = function (n) {
				o.manmger.onError(n, 'jsError'), null == e || e.call(this, n)
			}),
				(n.onUnhandledRejection = function (n) {
					o.manmger.onUnhandledRejection(n), null == a || a.call(this, n)
				})
		} else {
			if ('inPerf' === n) {
				return { addError: o.addErrorFactory() }
			}
			{
				const e = 'inPage' === n ? r : r.methods,
					{ onHide: a, onUnload: i } = e
				;(e.onHide = function () {
					o.manmger.onHide(), null == a || a.call(this)
				}),
					(e.onUnload = function () {
						o.manmger.onHide(), null == i || i.call(this)
					})
			}
		}
	}
}
CrashPlugin.pluginType = 'collector'
