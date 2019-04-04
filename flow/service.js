
import flow from '@goodmind/flow-js'
import taskService from '../lib/taskService'

import {
  bom,
  core,
  cssom,
  dom,
  indexeddb,
  intl,
  node,
  react,
  streams,
} from './typedef'

let start
try {
  console.log('start flow')
  start = Date.now()
  flow.registerFile('/static/bom.js', bom)
  flow.registerFile('/static/core.js', core)
  flow.registerFile('/static/cssom.js', cssom)
  flow.registerFile('/static/dom.js', dom)
  flow.registerFile('/static/indexeddb.js', indexeddb)
  flow.registerFile('/static/intl.js', intl)
  flow.registerFile('/static/node.js', node)
  flow.registerFile('/static/react.js', react)
  flow.registerFile('/static/streams.js', streams)

  flow.setLibs([
    '/static/bom.js',
    '/static/core.js',
    '/static/cssom.js',
    '/static/dom.js',
    '/static/indexeddb.js',
    '/static/intl.js',
    '/static/node.js',
    '/static/react.js',
    '/static/streams.js',
  ])
} catch (err) {
  console.error(err)
} finally {
  console.log('flow registered', Date.now() - start)
}

function check(code, { name }) {
  return flow.checkContent(`/static/${name}.js`, code);
}

export default taskService({
  serviceName: 'flow',
  async task(ctx, bodyRaw) {
    const body = Object.assign({}, {
      code: `//@flow\n\nconst foo: 'expect error' = 0`,
      config: {},
    }, bodyRaw)
    const code = body.code
    const config = Object.assign({}, {name: 'repl'}, body.config)
    console.log('[flow] start request %s', code)
    let result = 'fail'
    try {
      result = check(code, config)
    } catch (err) {
      console.error(err)
    }
    console.log('finish flow request', result)
    return {
      code: result,
      config: config,
    }
  },
})
