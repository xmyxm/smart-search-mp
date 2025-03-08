import frame, { perf_vendor } from './frame'
let getEnvPromise, networkTypePromise, networkType
const composeSysInfo = (e, o) => {
		const { SDKVersion: r, system: n, model: t, platform: s, version: m } = e,
			y = r ? r.split('.') : [1, 0]
		let i = s
		'devtools' !== i && (i = n.toLowerCase().match(/ios/) ? 'iOS' : 'Android')
		return Object.assign(Object.assign({}, e), {
			os: i,
			nativeVersion: m || '',
			libVersion: `${y[0]}.${y[1]}`,
			osVersion: n.replace(/[^0-9|.]/gi, ''),
			deviceType: t.replace(/\s/g, '_'),
			mpPlatform: perf_vendor,
			networkType: o,
		})
	},
	getCurrentNetworkType = function () {
		var o
		return (
			networkTypePromise ||
				((networkTypePromise = new Promise(e => {
					frame.getNetworkType({
						success: o => {
							e(o.networkType)
						},
						fail: () => {
							e('unknown')
						},
					})
				})),
				null === (e = frame.onNetworkStatusChange) ||
					void 0 === e ||
					e.call(frame, e => {
						networkType = e.networkType
					})),
			networkType ? Promise.resolve(networkType) : networkTypePromise.then(e => ((networkType = e), e))
		)
	}
let systemInfoCache
export function getSystemInfoSync() {
	if (systemInfoCache) return systemInfoCache
	try {
		const e = composeSysInfo(frame.getSystemInfoSync(), 'unknown')
		return (systemInfoCache = e), e
	} catch (e) {
		return console.error('获取 systeminfo 失败', e), {}
	}
}
export function getSystemInfo() {
	getEnvPromise ||
		(getEnvPromise = new Promise((e, o) => {
			frame.getSystemInfo({ success: e, fail: o })
		}))
	const e = getSystemInfoSync()
	return (networkTypePromise ||
		((networkTypePromise = new Promise(e => {
			frame.getNetworkType({
				success: o => {
					e(o.networkType)
				},
				fail: () => {
					e('unknown')
				},
			})
		})),
		null === (o = frame.onNetworkStatusChange) ||
			void 0 === o ||
			o.call(frame, e => {
				networkType = e.networkType
			})),
	networkType ? Promise.resolve(networkType) : networkTypePromise.then(e => ((networkType = e), e)))
		.then(o => ((e.networkType = o), e))
		.catch(o => (console.error('异步获取 systeminfo 失败', o), e))
	var o
}
