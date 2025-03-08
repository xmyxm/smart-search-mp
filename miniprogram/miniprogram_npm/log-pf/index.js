import perfApp from './main/app'
import perfPage from './main/page'
import request from './main/request'
import perf from './main/perf'
import perfFSTComponent from './main/fst-component'
import AppCommonPlugin from './plugins/app-common.plugin'
import PageCommonPlugin from './plugins/page-common.plugin'
import CustomSpeedPlugin from './plugins/custom-speed.plugin'
import FMPPlugin from './plugins/fmp.plugin'
import SetDataPlugin from './plugins/setdata.plugin'
import NoContentPlugin from './plugins/no-content.plugin'
import CommonReportPlugin from './plugins/common-report.plugin'
import WxPerformStaticsPlugin from './plugins/wxperform-statics.plugin'
import ExceptionPlugin from './plugins/exception.plugin'
import perfComponent from './main/component'
import FstPlugin from './plugins/fst.plugin'
import CrashPlugin from './plugins/crash.plugin'
import MastekeyPlugin from './plugins/masterkey.plugin'

perf.use([
	AppCommonPlugin,
	PageCommonPlugin,
	CustomSpeedPlugin,
	FMPPlugin,
	SetDataPlugin,
	NoContentPlugin,
	CommonReportPlugin,
	WxPerformStaticsPlugin,
	ExceptionPlugin,
	FstPlugin,
	CrashPlugin,
	MastekeyPlugin,
])

export {
	perf,
	perfApp,
	perfPage,
	perfComponent,
	perfFSTComponent,
	request as perfRequest,
	AppCommonPlugin,
	PageCommonPlugin,
	CustomSpeedPlugin,
	FMPPlugin,
	SetDataPlugin,
	NoContentPlugin,
	CommonReportPlugin,
	WxPerformStaticsPlugin,
	ExceptionPlugin as ErrorPlugin,
	FstPlugin,
	CrashPlugin,
	MastekeyPlugin,
}
