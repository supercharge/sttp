'use strict'

const Sttp = require('..')
const Server = require('./test-server')

describe('Sttp', () => {
  beforeAll(async () => {
    await Server.start()
  })

  afterAll(async () => {
    await Server.stop()
  })

  it('sends a get request', async () => {
    const response = await Sttp.get('http://localhost:4000/')
    expect(response.status()).toEqual(200)
    expect(response.payload()).toEqual('Success')
  })

  it('sends a get request with headers', async () => {
    const response = await Sttp.withHeaders({
      name: 'Marcus'
    }).get('http://localhost:4000/with-headers')

    expect(response.status()).toEqual(200)
    expect(response.payload()).toMatchObject({ name: 'Marcus' })
  })
})
