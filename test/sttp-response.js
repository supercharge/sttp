'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { Sttp } = require('../dist')
const Server = require('./test-server')

const baseUrl = 'http://localhost:2022'

async function send (server, callback) {
  await server.start(2022)
  try {
    await callback()
    await server.stop()
  } catch (error) {
    await server.stop()
    throw error
  }
}

test('response.headers()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.set('x-response', 'Supercharge')
    ctx.body = 'ok'
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.headers()).toMatchObject({ 'x-response': 'Supercharge' })
  })
})

test('response.data()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'ok'
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.data()).toBe('ok')
  })
})

test('response.payload()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'ok'
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.status()).toBe(200)
    expect(response.payload()).toBe('ok')
  })
})

test('response.status()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'ok'
    ctx.status = 201
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.status()).toBe(201)
  })
})

test('response.isSuccess()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'ok'
    ctx.status = 201
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.isSuccess()).toBe(true)
  })
})

test('response.isRedirect()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'ok'
    ctx.status = 301
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.isRedirect()).toBe(true)
  })
})

test('response.isError()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'yo teapot'
    ctx.status = 418
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.isError()).toBe(true)
  })
})

test('response.isClientError()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'not logged in'
    ctx.status = 401
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.isError()).toBe(true)
    expect(response.isClientError()).toBe(true)
    expect(response.isServerError()).toBe(false)
  })
})

test('response.isServerError()', async () => {
  const server = Server.create().withMiddleware(ctx => {
    ctx.body = 'server-error'
    ctx.status = 503
  })

  await send(server, async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.status()).toBe(503)
    expect(response.isError()).toBe(true)
    expect(response.isClientError()).toBe(false)
    expect(response.isServerError()).toBe(true)
  })
})

test.run()
