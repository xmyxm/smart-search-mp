import PerfBasePlugin from '../lib/base-plugin'
import frame, { perf_vendor } from '../core/frame'
import { getSystemInfoSync } from '../core/systeam-info'
import customLog from '../core/custom-log'
var FST_STATUS_CODE
!(function (t) {
	;(t[(t.INIT = -1)] = 'INIT'),
		(t[(t.NORMAL = 1)] = 'NORMAL'),
		(t[(t.COMPUTE_BY_INTERACTIVE = 101)] = 'COMPUTE_BY_INTERACTIVE'),
		(t[(t.COMPUTE_ON_HIDE = 102)] = 'COMPUTE_ON_HIDE'),
		(t[(t.COMPUTE_ON_UNLOAD = 103)] = 'COMPUTE_ON_UNLOAD'),
		(t[(t.NOT_STABLE = 201)] = 'NOT_STABLE'),
		(t[(t.ERROR_COMPUTE_FAILED = 400)] = 'ERROR_COMPUTE_FAILED'),
		(t[(t.ERROR_CONTENT_BLANK = 401)] = 'ERROR_CONTENT_BLANK'),
		(t[(t.ERROR_NO_SETDATA_BEFORE_JUDGE = 402)] = 'ERROR_NO_SETDATA_BEFORE_JUDGE'),
		(t[(t.ERROR_CAUSE_OTHER_EXCEPTIONS = 499)] = 'ERROR_CAUSE_OTHER_EXCEPTIONS')
})(FST_STATUS_CODE || (FST_STATUS_CODE = {}))
class FSTCore {
	constructor(t, e) {
		;(this.core = t), (this.pageThis = e), (this.continueFstJudge = !0), (this.reported = !1)
		const s = e.__wxWebviewId__ || e.__webviewId__
		s && ((this.fstPageId = s), t.ctx.fstPageThisMapWebviewId.set(s, e))
		const i = getSystemInfoSync()
		;(this.viewPortHeight = i.windowHeight || 699),
			(this.fst = 0),
			(this.fstStatusCode = -1),
			(this.fstStartTime = 0),
			(this.firstInteractiveTime = 0),
			(this.didSetData = !1),
			(this.mutaRecords = [])
	}
	startRecord() {
		this.fstStartTime = Date.now()
		const t = frame.createSelectorQuery()
		t &&
			t
				.selectViewport()
				.boundingClientRect()
				.exec(t => {
					t && t[0] && (this.viewPortHeight = t[0].height)
				})
	}
	sampling(t) {
		if (!this.continueFstJudge) return
		this.didSetData = !0
		const e = Date.now(),
			s = t ? t.createSelectorQuery() : frame.createSelectorQuery()
		s &&
			s
				.select('.__fst_judge_target, .fst-root >>> .__fst_judge_target')
				.boundingClientRect()
				.exec(t => {
					if (!t || !t[0]) return
					const s = t[0].top,
						i = { timestamp: e, targetTop: s }
					this.mutaRecords && this.mutaRecords.push(i), this.checkReachBottom(i)
				})
	}
	checkReachBottom(t) {
		this.continueFstJudge &&
			this.viewPortHeight &&
			t &&
			0 !== this.viewPortHeight &&
			t.targetTop > this.viewPortHeight &&
			((this.continueFstJudge = !1),
			(this.fst = t.timestamp - this.fstStartTime),
			this.setStatusCode(1),
			customLog.log('|FST| ReachBottom fst:', this.fst))
	}
	setStatusCode(t) {
		;-1 === this.fstStatusCode && (this.fstStatusCode = t)
	}
	tryComputeFst(t) {
		var e, s
		if (!this.continueFstJudge || 0 !== this.fst || -1 !== this.fstStatusCode) return
		if (!this.didSetData && 0 === this.mutaRecords.length) return void this.setStatusCode(402)
		const i = new Date().getTime(),
			o = this.mutaRecords[this.mutaRecords.length - 1],
			r = null !== (e = null == o ? void 0 : o.targetTop) && void 0 !== e ? e : 0
		if (r <= 0) return void this.setStatusCode(401)
		let a = o
		const n = [...this.mutaRecords].reverse()
		for (const c of n) {
			if (!(null == c ? void 0 : c.targetTop) || Math.abs(c.targetTop - r) > 10) break
			a = c || o
		}
		const h = null !== (s = null == a ? void 0 : a.timestamp) && void 0 !== s ? s : 0
		0 !== h
			? i - h < 100
				? this.setStatusCode(201)
				: ((this.fst = h - this.fstStartTime), this.setStatusCode(t))
			: this.setStatusCode(499)
	}
	stopRecord() {
		this.continueFstJudge = !1
	}
	onUserInteractive() {
		this.firstInteractiveTime > 0 ||
			((this.firstInteractiveTime = Date.now()), this.tryComputeFst(101), this.stopRecord())
	}
	getReportData() {
		if (!this.reported)
			return (
				(this.reported = !0),
				this.fst
					? { fstStatusCode: this.fstStatusCode, fstTime: this.fst, fstPageId: this.fstPageId }
					: (this.setStatusCode(400), null)
			)
	}
}
export default class FstPlugin extends PerfBasePlugin {
	constructor() {
		super(...arguments), (this.name = 'FST')
	}
	vendorAllow() {
		return 'wx' === perf_vendor || 'mmp' === perf_vendor || 'tt' === perf_vendor || 'ks' === perf_vendor
	}
	isEnableFST(t) {
		if (!t) return !1
		const e = this.core.getConfigItem('fst')
		return !e.exclude.has(t) && (!!e.include.has(t) || !!e.includeAll)
	}
	pushToRecord(t, e, s, i, o) {
		const r = Object.assign({}, o, { pageName: t, fstStatusCode: i }),
			a = [{ metricName: 'wxapp.page.fst', value: s, tags: r }]
		s <= 1e3 && a.push({ metricName: 'wxapp.page.fst.count', value: 1, tags: r }),
			this.report(a, 'fst'),
			this.core.ctx.fstPageThisMapWebviewId.delete(e)
	}
	applyer(t) {
		const { onHide: e, onLoad: s, onUnload: i } = t,
			o = this
		if (((t.__fstBindCaptureTouchStart = () => null), !o.vendorAllow())) return t
		;(t.__fstBindCaptureTouchStart = function () {
			var t
			this.__perfPageCtx.fstIsEnable &&
				(null === (t = this.__perfPageCtx.fstCore) || void 0 === t || t.onUserInteractive())
		}),
			(t.onLoad = function (t) {
				const e = this.__perfPageCtx.pageName,
					i = o.isEnableFST(e.toString())
				if (((this.__perfPageCtx.fstIsEnable = i), i)) {
					;(this.__perfPageCtx.fstCore = new FSTCore(o.core, this)), this.__perfPageCtx.fstCore.startRecord()
					const t = this.setData
					this.setData = function (e, s) {
						t.call(this, e, () => {
							var t
							try {
								null === (t = this.__perfPageCtx.fstCore) || void 0 === t || t.sampling()
							} catch (e) {
								customLog.error('|FST| Hook setData cb error: ', e)
							}
							null == s || s()
						})
					}
				}
				null == s || s.call(this, t)
			})
		const r = function (t) {
			if (this.__perfPageCtx.fstIsEnable && this.__perfPageCtx.fstCore) {
				this.__perfPageCtx.fstCore.tryComputeFst(t), this.__perfPageCtx.fstCore.stopRecord()
				const e = this.__perfPageCtx.fstCore.getReportData()
				if (e) {
					const t = 'object' == typeof this.fstTags ? this.fstTags : null
					o.pushToRecord(this.__perfPageCtx.pageName, e.fstPageId, e.fstTime, e.fstStatusCode, t)
				}
				this.__perfPageCtx.fstCore = null
			}
		}
		return (
			(t.onHide = function () {
				r.call(this, 102), null == e || e.call(this)
			}),
			(t.onUnload = function () {
				r.call(this, 103), null == i || i.call(this)
			}),
			t
		)
	}
}
FstPlugin.pluginType = 'collector'
