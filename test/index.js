'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { Sttp } = require('../dist')
const Server = require('./test-server')

const baseUrl = 'http://localhost:2020'

test.before(async () => {
  await Server.start()
})

test.after(async () => {
  await Server.stop()
})

test('sends a get request', async () => {
  const response = await Sttp.get(baseUrl)
  expect(response.status()).toEqual(200)
  expect(response.payload()).toEqual('Success')
})

test('sends a get request with headers', async () => {
  const response = await Sttp.withHeaders({
    name: 'Marcus'
  }).get(`${baseUrl}/with-headers`)

  expect(response.status()).toEqual(200)
  expect(response.payload()).toMatchObject({ name: 'Marcus' })
})

test.run()
