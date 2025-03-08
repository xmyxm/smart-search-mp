/** 指标名称 */
export declare const enum PerfMetricNameEnum {
	/** 用于计算启动次数，launch 时间 */
	APP_LAUNCH = 'wxapp.app.launch',
	/** 自定义测速（页面灵活添加需要的测速点） */
	SPEED_CUSTOM = 'wxapp.speed.custom',
	/** 内存不足告警数 */
	MEMORY_WARNING = 'wxapp.memory.warning',
	/** 小程序启动首屏打开时间（小程序启动打开第一个页面时间 ） */
	APP_LOAD = 'wxapp.app.load',
	/** 小程序完成首次页面渲染时间（page.onReady - app.onLaunch） */
	APP_READY = 'wxapp.app.ready',
	/** 启动时间（从代码开始执行到 page.load 时间） */
	APP_CODE_LOAD = 'wxapp.app.code.load',
	/** 首次渲染时间（从代码开始执行到 page.ready 时间） */
	APP_CODE_READY = 'wxapp.app.code.ready',
	/** 页面 onLoad 计数 */
	PAGE_LOAD = 'wxapp.page.load',
	/** 页面首次显示时间（page.onShow - page.onLoad）*/
	PAGE_SHOW = 'wxapp.page.show',
	/** 完成首次页面渲染时间（page.onReady - page.onLoad） */
	PAGE_READY = 'wxapp.page.ready',
	/** 页面最终数据量大小（页面hide/unload时数据量大小） */
	PAGE_DATASIZE = 'wxapp.page.dataSize',
	/** 页面离开时候时间（页面退出时候最后一次的页面生命周期） */
	PAGE_LEAVE = 'wxapp.page.leave',
	/** 页面切换加载 从 微信 perf api 取值 */
	PAGE_TTI = 'wxapp.page.tti',
	/** 首屏启动 从 微信 perf api 取值 */
	APP_TTI = 'wxapp.app.tti',
	/** APP 的执行脚本加载时间 从 微信 perf api 取值 */
	APP_EVAL = 'wxapp.app.eval',
	/** 完成首次有效渲染结束时间（起点：onLaunch回调） 从微信 perf api 取值 */
	APP_FMP = 'wxapp.app.fmp',
	/** 用户自主埋点的 App lvc 时间（起点：onLaunch回调） 从微信 perf api 取值 */
	APP_LVC = 'wxapp.app.lvc',
	/** 完成首次有效渲染结束时间 从微信 perf api 取值 */
	APP_API_FMP = 'wxapp.app.api.fmp',
	/** wxapp.app.api.lv（起点：getPerformance api时间）c 从微信 perf api 取值 */
	APP_API_LVC = 'wxapp.app.api.lvc',
	/** 从微信 performance api 获取的页面 onload 时间（起点：getPerformance api时间） 从微信 perf api 取值 */
	APP_API_LOAD = 'wxapp.app.api.load',
	/** 首次渲染时间（从微信 performance api 获取的页面 onReady 时间） 从微信 perf api 取值 */
	APP_API_READY = 'wxapp.app.api.ready',
	/** 从代码执行开始到主动 fmp 埋点时间（起点：代码开始执行时间） 从微信 perf api 取值 */
	APP_CODE_FMP = 'wxapp.app.code.fmp',
	/** 从代码执行开始到主动 lvc 埋点时间（起点：代码开始执行时间） 从微信 perf api 取值 */
	APP_CODE_LVC = 'wxapp.app.code.lvc',
	/** 页面FMP时间（完成首次有效渲染结束时间） */
	PAGE_FMP_TIME = 'wxapp.page.fmp.time',
	/** 首次有效渲染数据量大小 */
	PAGE_FMP_DATASIZE = 'wxapp.page.fmp.dataSize',
	/** setData渲染时间（setData执行用时）*/
	DATA_TIME = 'wxapp.data.time',
	/** setData 的 data 数据量大小 */
	DATA_SIZE = 'wxapp.data.dataSize',
	/** 请求响应-接口耗时（请求耗时及响应体大小） */
	REQUEST = 'wxapp.request',
	/** 请求响应-接口请求包大小 */
	REQUEST_REQ_SIZE = 'wxapp.request.reqSize',
	/** 自定义占比 */
	RATE = 'wxapp.rate',
	/** 各个请求的socket响应时间及成功率，仅用于指标数据上报 */
	SOCKET = 'wxapp.socket',
	/** Socket总览（socket全局响应时间及成功率，仅用于指标数据上报） */
	SOCKET_OVERVIEW = 'wxapp.socket.overview',
	/** Webview页面H5加载时间 */
	WEBVIEW = 'wxapp.webview',
	/** 首屏时间 */
	PAGE_FST = 'wxapp.page.fst',
	/** 白屏时间 */
	NO_CONTENT = 'wxapp.page.no-content',
	/** 白屏开始的时间点 */
	NO_CONTENT_START = 'wxapp.page.noContentStart',
	/** 白屏已经结束的时间点 */
	NO_CONTENT_END = 'wxapp.page.noContentEnd',
	/** 首屏时间（秒开率），计算耗时 */
	FST_TIME = 'wxapp.page.fst',
	/** 首屏时间（秒开率），用于计算1s内比率 */
	FST_ONES_COUNT = 'wxapp.page.fst.count',
}
