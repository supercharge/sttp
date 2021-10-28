'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { Sttp } = require('../dist')
const Server = require('./test-server')

let server
const baseUrl = `http://localhost:${Server.port()}`

test.before(async () => {
  server = Server.create().withMiddleware(ctx => {
    ctx.response.body = {
      headers: ctx.request.headers,
      payload: ctx.body,
      query: ctx.request.query
    }
  })

  await server.start()
})

test.after(async () => {
  await server.stop()
})

test('sends a get request', async () => {
  const response = await Sttp.get(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends a get request with headers', async () => {
  const response = await Sttp.withHeaders({
    name: 'Marcus'
  }).get(`${baseUrl}/with-headers`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { name: 'Marcus' } })
})

test.run()
