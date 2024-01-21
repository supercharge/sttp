'use strict'

const Axios = require('axios')
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

test('.create()', async () => {
  const client = Sttp.create()
  client
    .withHeaders({ 'x-client': 'sttp' })
    .withQueryParams({ name: 'Supercharge' })

  const response1 = await client.get(baseUrl)
  expect(response1.status()).toEqual(200)
  expect(response1.payload()).toMatchObject({
    query: { name: 'Supercharge' },
    headers: { 'x-client': 'sttp' }
  })

  client.withPayload({ foo: 'bar' })

  const response2 = await client.post(baseUrl)
  expect(response2.status()).toEqual(200)
  expect(response2.payload()).toMatchObject({
    payload: { foo: 'bar' },
    query: { name: 'Supercharge' },
    headers: { 'x-client': 'sttp' }
  })
})

test('.removeQueryParams()', async () => {
  const client = Sttp.create()
  client
    .withHeaders({ 'x-client': 'sttp' })
    .withQueryParams({ name: 'Supercharge', age: '25' })

  // Assuming the removeQueryParams method removes all query parameters
  client.removeQueryParams()

  const response = await client.get(baseUrl)

  // After removing query parameters, the payload should not contain any query parameters
  expect(response.payload()).toMatchObject({
    query: {},
    headers: { 'x-client': 'sttp' }
  })
})

test('.axios()', () => {
  const client = Sttp.create()
  const instance = client.axios()

  expect(instance).toBeDefined()
  expect(instance.name).toBe('wrap')
})

test('.axiosStatic()', () => {
  const axios = Sttp.create().axiosStatic()

  expect(axios).toEqual(Axios)
})

test('sends a get request', async () => {
  const response = await Sttp.get(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends a get request with params', async () => {
  const response = await Sttp.get(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    query: { name: 'Supercharge' }
  })
})

test('sends a post request', async () => {
  const response = await Sttp.post(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends a post request with payload', async () => {
  const response = await Sttp.post(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    payload: { name: 'Supercharge' }
  })
})

test('sends a put request', async () => {
  const response = await Sttp.put(baseUrl)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { 'content-type': 'application/json' }
  })
})

test('sends a put request with payload', async () => {
  const response = await Sttp.put(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    payload: { name: 'Supercharge' }
  })
})

test('sends a delete request', async () => {
  const response = await Sttp.delete(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends a delete request with query params', async () => {
  const response = await Sttp.delete(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    query: { name: 'Supercharge' }
  })
})

test('sends a patch request', async () => {
  const response = await Sttp.patch(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends a patch request with query params', async () => {
  const response = await Sttp.patch(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    payload: { name: 'Supercharge' }
  })
})

test('sends an options request', async () => {
  const response = await Sttp.options(baseUrl)
  expect(response.status()).toEqual(200)
})

test('sends an options request with query params', async () => {
  const response = await Sttp.options(baseUrl, { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    query: { name: 'Supercharge' }
  })
})

test('.withBaseUrl', async () => {
  const response = await Sttp
    .withBaseUrl(baseUrl)
    .get('/v2', { name: 'Supercharge' })

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ query: { name: 'Supercharge' } })

  expect(() => Sttp.withBaseUrl()).toThrow('The base URL must be a string')
  expect(() => Sttp.withBaseUrl({})).toThrow('The base URL must be a string')
  expect(() => Sttp.withBaseUrl(null)).toThrow('The base URL must be a string')
})

test('.withHeaders()', async () => {
  const response = await Sttp
    .withHeaders({ name: 'Supercharge' })
    .get(`${baseUrl}/with-headers`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { name: 'Supercharge' } })
})

test('.withQueryParams()', async () => {
  const response = await Sttp
    .withQueryParams({ name: 'Supercharge' })
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ query: { name: 'Supercharge' } })
})

test('.withPayload()', async () => {
  const responseForGetRequest = await Sttp
    .withPayload({ name: 'Supercharge' })
    .get(`${baseUrl}/with-payload`)

  expect(responseForGetRequest.status()).toEqual(200)
  expect(responseForGetRequest.payload()).toMatchObject({ query: {}, payload: {} })

  const responseForPostRequest = await Sttp
    .withPayload({ name: 'Supercharge' })
    .post(`${baseUrl}/with-payload`)

  expect(responseForPostRequest.payload()).toMatchObject({ payload: { name: 'Supercharge' } })
})

test('.withBasicAuth(): username', async () => {
  const config = await Sttp
    .withBasicAuth('username')
    .requestConfig()

  expect(config.auth).toEqual({ username: 'username', password: undefined })

  const response = await Sttp
    .withBasicAuth('username')
    .get(`${baseUrl}/with-basic-auth`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { authorization: 'Basic dXNlcm5hbWU6' } })
})

test('.withBasicAuth(): password', async () => {
  const config = await Sttp
    .withBasicAuth(undefined, 'password')
    .requestConfig()

  expect(config.auth).toEqual({ username: undefined, password: 'password' })

  const response = await Sttp
    .withBasicAuth(undefined, 'password')
    .get(`${baseUrl}/with-basic-auth`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { authorization: 'Basic OnBhc3N3b3Jk' } })
})

test('.withBasicAuth(): username and password', async () => {
  const config = await Sttp
    .withBasicAuth(undefined, 'password')
    .requestConfig()

  expect(config.auth).toEqual({ username: undefined, password: 'password' })

  const response = await Sttp
    .withBasicAuth('username', 'password')
    .get(`${baseUrl}/with-basic-auth`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ headers: { authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' } })
})

test('.withBasicAuth(): neither username nor password', async () => {
  const config = await Sttp
    .withBasicAuth()
    .requestConfig()

  expect(config.auth).toEqual({ username: undefined, password: undefined })

  const response = await Sttp
    .withBasicAuth()
    .get(`${baseUrl}/with-basic-auth`)

  expect(response.status()).toEqual(200)
  expect(response.payload().headers.authorization).not.toBeUndefined()
})

test('.withTimeout()', async () => {
  const config = await Sttp
    .withTimeout(2)
    .requestConfig()

  expect(config.timeout).toEqual(2)
})

test('.withTimeoutInSeconds()', async () => {
  const config = await Sttp
    .withTimeoutInSeconds(2)
    .requestConfig()

  expect(config.timeout).toEqual(2000)
})

test('.withToken()', async () => {
  const response = await Sttp
    .withToken('token')
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { authorization: 'Bearer token' }
  })
})

test('.withToken() and type', async () => {
  const response = await Sttp
    .withToken('token', 'X-Bearer')
    .get(`${baseUrl}/with-query-params`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { authorization: 'X-Bearer token' }
  })
})

test('.withOptions()', async () => {
  const response = await Sttp
    .withOptions({ data: { name: 'Supercharge' } })
    .withToken('token')
    .post(`${baseUrl}/with-options`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    payload: { name: 'Supercharge' },
    headers: { authorization: 'Bearer token' }
  })
})

test('.asJson()', async () => {
  const response = await Sttp
    .asJson()
    .withPayload({ name: 'Supercharge' })
    .post(`${baseUrl}/with-options`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { 'content-type': 'application/json' },
    payload: { name: 'Supercharge' }
  })
})

test('.asFormParams()', async () => {
  const response = await Sttp
    .asFormParams()
    .withPayload({ name: 'Supercharge' })
    .post(`${baseUrl}/with-options`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    payload: { name: 'Supercharge' }
  })
})

test('.accept()', async () => {
  const response = await Sttp
    .accept('text/supercharge')
    .get(`${baseUrl}/accept`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { accept: 'text/supercharge' }
  })
})

test('.acceptJson()', async () => {
  const response = await Sttp
    .acceptJson()
    .get(`${baseUrl}/accept`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { accept: 'application/json' }
  })
})

test('.contentType()', async () => {
  const response = await Sttp
    .contentType('application/supercharge')
    .get(`${baseUrl}/accept`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({
    headers: { 'content-type': 'application/supercharge' }
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

test('fails to send request to unavailable server', async () => {
  await expect(
    Sttp.get('http://unavailable.server/path')
  ).rejects.toThrow()
})

test.run()
