import customLog from '../core/custom-log'
import frame, { perf_vendor } from '../core/frame'
import { getSystemInfo } from '../core/systeam-info'
export default class BaseReporter {
	constructor(e) {
		;(this.logs = []), (this.task = []), (this.isTaskProcssing = !1), (this.core = e)
	}
	pushCore(e, s = !1) {
		this.logs.push(e), s && this.report()
	}
	requestQueue(e) {
		if ((e && this.task.push(e), this.isTaskProcssing)) return
		this.task.pop()
			? this.uploadDeploy(e, () => {
					this.requestQueue()
			  })
			: (this.isTaskProcssing = !1)
	}
	uploadDeploy(e, s) {
		getSystemInfo().then(t => {
			customLog.log('上报数据', e.data.logs)
			return customLog.log('上传接口暂停=========')
			const r = this.requestSeriviceParamsMaker(e, t)
			let o
			;(o = Array.isArray(r)
				? Promise.all(r.map(e => this.requestService(e.url, e.body)))
				: this.requestService(r.url, r.body)),
				o.then(() => s())
		})
	}
	requestService(e, s) {
		const t = this.core.getConfigItem('request') || frame.request
		return new Promise(r => {
			t({
				url: e,
				method: 'POST',
				data: s,
				dataType: 'my' === perf_vendor ? 'text' : void 0,
				complete: e => r(e),
			})
		})
	}
	report() {
		if (this.core.getConfigItem('dev')) customLog.error('dev 模式下下不会真正上报埋点数据')
		else {
			if (0 === this.logs.length) return
			this.core.checkConfigRobust()
				? this.requestQueue({ data: { logs: this.logs } })
				: customLog.error('无法上报数据, project token version 配置都不能为空')
		}
		this.logs = []
	}
}
