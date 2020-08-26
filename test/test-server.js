'use strict'

const Hapi = require('@hapi/hapi')

class TestServer {
  static get server () {
    if (!this._server) {
      this._server = new Hapi.Server({
        host: 'localhost',
        port: 2020
      })
    }

    return this._server
  }

  static async start () {
    await this.addRoutes().server.start()
  }

  static async stop () {
    await this.server.stop()
  }

  static addRoutes () {
    this.server.route([
      {
        method: 'GET',
        path: '/',
        handler: () => {
          return 'Success'
        }
      },
      {
        method: 'GET',
        path: '/with-headers',
        handler: request => {
          return request.headers
        }
      }
    ])

    return this
  }
}

module.exports = TestServer
