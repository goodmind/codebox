
import flow from '@goodmind/flow-js'
import taskService from '../lib/taskService'

function check(code, { name }) {
  return flow.checkContent(`/static/${name}.js`, code);
}

export default taskService({
  serviceName: 'prettier',
  async task(ctx, bodyRaw) {
    const body = Object.assign({}, {
      code: `//@flow\n\nconst foo: 'expect error' = 0`,
      config: {},
    }, bodyRaw)
    const code = body.code
    const config = Object.assign({}, {name: 'repl'}, body.config)
    const result = check(code, config)
    return {
      code: result,
      config: config,
    }
  },
})
