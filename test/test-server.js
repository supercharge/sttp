'use strict'

const Hapi = require('@hapi/hapi')

class TestServer {
  static get server () {
    if (!this._server) {
      this._server = new Hapi.Server({
        host: 'localhost',
        port: 4000
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
      }
    ])

    return this
  }
}

module.exports = TestServer
