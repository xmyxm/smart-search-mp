import PerfBasePlugin from '../lib/base-plugin'
import frame from '../core/frame'
import { getSystemInfo } from '../core/systeam-info'
import { isEqual } from '../lib/util'
const PRESIST__PREFIX = 'PERF_SDK_MASTERKEY::'
export default class MastekeyPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'MASTER_KEY')
	}
	reportToMK(e, r) {
		try {
			if (!frame.getAccountInfoSync) return Promise.reject({ code: 2001, message: 'no getAccountInfoSync API' })
			if (!e.badgeId) return Promise.reject({ code: 2001, message: 'badgeId is Required' })
			const { miniProgram: o } = frame.getAccountInfoSync()
			return o.appId
				? this.composeParams(e, o).then(e => {
						const o = frame.getStorageSync(PRESIST__PREFIX + e.appId)
						return o && isEqual(o, e)
							? (this.customLog.log('万能钥匙：无需上报'),
							  Promise.resolve({ code: 1001, message: 'no need to report' }))
							: this.pushToMasterkey(e, r)
				  })
				: Promise.reject({ code: 2001, message: 'appId is Required' })
		} catch (o) {
			return (
				this.customLog.error('万能钥匙：', o),
				Promise.reject({ code: 2004, message: 'other exception', error: o })
			)
		}
	}
	pushToMasterkey(e, r) {
		const o = {
			badge_id: e.badgeId,
			app_name: e.appId,
			hd_brand: e.brand,
			os_name: e.os,
			os_version: e.appVersion,
			hd_model: e.hdModel,
			app_version: e.wxVersion,
			base_userid: e.userId,
			base_uuid: e.uuid,
			app_SDKVersion: e.SDKVersion,
			app_miniAppVersion: e.miniAppVersion,
			base_openid: e.openId,
			base_unionid: e.unionId,
			customized_urgent: r,
		}
		if (e.cityName) o.base_cityName = e.cityName
		else {
			if (!e.cityId || !e.cityIdType)
				return Promise.reject({ code: 2001, message: 'cityId & cityIdType is Required when cityName is Empty' })
			;(o.base_cityid = e.cityId), (o.base_cityType = e.cityIdType)
		}
		const t = {
			category_type: 'fe_perf',
			category: 'met-badge',
			logs: [{ type: 'badge', tags: o }],
			env: { ts: new Date().getTime() },
		}
		return this.postRequest(t).then(
			r => (
				1e3 === r.code &&
					(wx.setStorage({ key: PRESIST__PREFIX + e.appId, data: e }),
					this.customLog.log('万能钥匙：上报成功', t)),
				r
			),
		)
	}
	postRequest(e) {
		return new Promise((r, o) => {
			frame.request({
				url: 'https://xxx.xxxx.net/',
				method: 'POST',
				data: e,
				complete(e) {
					;-1 === e.errMsg.indexOf('request:fail')
						? r({ code: 1e3, message: 'success' })
						: o({ code: 2003, message: 'network error', error: e })
				},
			})
		})
	}
	composeParams(e, r) {
		return getSystemInfo().then(o =>
			Object.assign(
				{
					brand: o.brand,
					os: o.os,
					appVersion: o.osVersion,
					hdModel: o.model,
					wxVersion: o.version,
					miniAppVersion: r.version,
					appId: r.appId,
					SDKVersion: o.SDKVersion,
				},
				e,
			),
		)
	}
	reportToMKFactory() {
		const e = this
		return function (r, o) {
			return e.reportToMK(r, o || {})
		}
	}
	applyer() {
		return { reportToMK: this.reportToMKFactory() }
	}
}
MastekeyPlugin.pluginType = 'collector'
