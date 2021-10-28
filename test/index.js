'use strict'

const { Sttp } = require('../dist')
const Server = require('./test-server')

const baseUrl = 'http://localhost:2020'

describe('Sttp', () => {
  beforeAll(async () => {
    await Server.start()
  })

  afterAll(async () => {
    await Server.stop()
  })

  it('sends a get request', async () => {
    const response = await Sttp.get(baseUrl)
    expect(response.status()).toEqual(200)
    expect(response.payload()).toEqual('Success')
  })

  it('sends a get request with headers', async () => {
    const response = await Sttp.withHeaders({
      name: 'Marcus'
    }).get(`${baseUrl}/with-headers`)

    expect(response.status()).toEqual(200)
    expect(response.payload()).toMatchObject({ name: 'Marcus' })
  })
})
