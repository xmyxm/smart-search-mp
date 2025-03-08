const supportLogType = ['log', 'warn', 'error', 'info', 'dir']
let isdebug = !1
export function toggleIsDebug(o) {
	isdebug = o
}
export const customLog = {}
supportLogType.forEach(o => {
	'log' === o
		? (customLog.log = function () {
				if (isdebug) return console.log('[36m%s[0m', '[Perf Debug Log] ', ...arguments)
		  })
		: (customLog[o] = function () {
				if ('error' === o || isdebug) return console[o]('[Perf Debug Log] ', ...arguments)
		  })
})
export default customLog
