class EventEmitter {
	constructor() {
		this.map = new Map()
	}
	emit(t, ...s) {
		const e = this.map.get(t)
		if (e) for (const a of e) a(...s)
	}
	on(t, s) {
		this.map.has(t) || this.map.set(t, []), this.map.get(t).push(s)
	}
}
export default EventEmitter
