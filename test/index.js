'use strict'

const Sttp = require('..')
const Lab = require('@hapi/lab')
const Server = require('./test-server')
const { expect } = require('@hapi/code')

const { describe, it, before, after } = (exports.lab = Lab.script())

describe('Sttp', () => {
  before(async () => {
    await Server.start()
  })

  after(async () => {
    await Server.stop()
  })

  it('sends a get request', async () => {
    const response = await Sttp.get('http://localhost:4000/')
    expect(response.status()).to.equal(200)
    expect(response.payload()).to.equal('Success')
  })
})
