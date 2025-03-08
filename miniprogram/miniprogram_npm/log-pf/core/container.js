import EventEmitter from '../lib/event'
import Core from './core'
import Perf from './perf'
import { PerfReporter } from './reporter'
export const core = new Core()
export const perfReporter = new PerfReporter(core)
export const perf = new Perf(core)
export const eventEmitter = new EventEmitter()
