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
      payload: ctx.request.body,
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
  const response = await Sttp
    .withHeaders({ name: 'Supercharge' })
    .get(`${baseUrl}/with-headers`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { name: 'Supercharge' } })
})

test('Sttp.withQueryParams()', async () => {
  const response = await Sttp
    .withQueryParams({ name: 'Supercharge' })
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ query: { name: 'Supercharge' } })
})

test('Sttp.withToken()', async () => {
  const response = await Sttp
    .withToken('token')
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { authorization: 'Bearer token' }
  })
})

test('Sttp.withToken() and type', async () => {
  const response = await Sttp
    .withToken('token', 'X-Bearer')
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { authorization: 'X-Bearer token' }
  })
})

test('supports fluent interface', async () => {
  const response = await Sttp
    .withQueryParams({ id: 1 })
    .withHeaders({ 'x-auth': 'secret' })
    .withPayload({ name: 'Supercharge' })
    .withToken('bearer-token')
    .post(`${baseUrl}/fluent-interface`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    query: { id: '1' },
    payload: { name: 'Supercharge' },
    headers: {
      'x-auth': 'secret',
      authorization: 'Bearer bearer-token'
    }
  })
})

test.run()
