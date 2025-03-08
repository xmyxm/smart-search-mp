/** 上报模块名称 */
export declare const enum PluginNameEnum {
	/** APP 通用 启动指标上报模块 */
	APP_COMMON_METRIC = 'APP_COMMON_METRIC',
	/** 页面通用上报 */
	PAGE_COMMON_METRIC = 'PAGE_COMMON_METRIC',
	/** 自定义测速 */
	CUSTOM_SPEED = 'CUSTOM_SPEED',
	/** page FMP */
	FMP = 'FMP',
	/** setData */
	SETDATA = 'SETDATA',
	/** 白屏监控 */
	NO_CONTENT = 'NO_CONTENT',
	/** 直接用的通用上报，例如直接 perf.addWebview */
	COMMON_REPORT = 'COMMON_REPORT',
	/** 微信独有的性能数据上报 */
	WX_PERFORM_STATICS = 'WX_PERFORM_STATICS',
	/** 异常信息上报 */
	EXCEPTION = 'ERREXCEPTIONOR',
	/** FST */
	FST = 'FST',
	/** Crash */
	CRASH = 'CRASH',
	/** 万能钥匙 */
	MASTER_KEY = 'MASTER_KEY',
}
