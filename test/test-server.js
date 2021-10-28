'use strict'

const Koa = require('koa')

class TestServer {
  constructor () {
    this.koa = new Koa()
    this.server = undefined
  }

  static port () {
    return 2021
  }

  static create () {
    return new this()
  }

  /**
   * Add the given middleware `handler` to the Koa server instance.
   *
   * @param {Koa.Middleware} handler
   *
   * @returns {this}
   */
  withMiddleware (handler) {
    this.koa.use(handler)

    return this
  }

  async start () {
    await new Promise(resolve => {
      this.server = this.koa.listen(TestServer.port(), () => resolve())
    })
  }

  async stop () {
    if (!this.server) {
      return
    }

    await new Promise(resolve => {
      this.server.close(() => resolve())
    })
  }
}

module.exports = TestServer
