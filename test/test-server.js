'use strict'

const Koa = require('koa')
const KoaBody = require('koa-body')

class TestServer {
  constructor () {
    this.server = undefined
    this.koa = new Koa()

    this.withMiddleware(KoaBody({
      multipart: true,
      jsonStrict: false
    }))
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

  async start (port) {
    await new Promise(resolve => {
      this.server = this.koa.listen(port || TestServer.port(), () => resolve())
    })
  }

  async stop () {
    if (!this.server) {
      return
    }

    return await new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error) {
          return reject(error)
        }

        resolve()
      })
    })
  }
}

module.exports = TestServer
