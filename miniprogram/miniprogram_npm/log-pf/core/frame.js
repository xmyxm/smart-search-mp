let frame,
	vendor = 'wx'
'undefined' != typeof tt && tt.getSystemInfo
	? ((frame = tt), (vendor = 'tt'))
	: 'undefined' != typeof swan && swan.getSystemInfo
	? ((frame = swan), (vendor = 'swan'))
	: 'undefined' != typeof my
	? ((frame = my), (vendor = 'my'))
	: 'undefined' != typeof mmp
	? ((frame = wx), (vendor = 'mmp'))
	: 'undefined' != typeof ks
	? ((frame = ks), (vendor = 'ks'))
	: (frame = wx)
export const perf_vendor = vendor
export default frame
