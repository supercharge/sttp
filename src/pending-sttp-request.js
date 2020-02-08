'use strict'

const Axios = require('axios')
const Merge = require('deepmerge')
const SttpResponse = require('./sttp-response')

class Sttp {
  constructor () {
    this.options = {}
    this._payloadFormat = 'json'
  }

  withHeaders (headers) {
    this.options = Merge(this.options, {
      headers
    })

    return this
  }

  withQueryParams (queryParams) {
    this.options = Merge(this.options, {
      params: queryParams
    })

    return this
  }

  withPayload (payload) {
    this.payload = payload

    return this
  }

  asFormParams () {
    return this
      .payloadFormat('formParams')
      .contentType('application/x-www-form-urlencoded')
  }

  payloadFormat (format) {
    this._payloadFormat = format

    return this
  }

  accept (accept) {
    return this.withHeaders({
      Accept: accept
    })
  }

  contentType (contentType) {
    return this.withHeaders({
      'Content-Type': contentType
    })
  }

  async get (url, queryParams = {}) {
    return this.withQueryParams(queryParams).send('GET', url)
  }

  async post (url, payload = {}) {
    return this.withPayload(payload).send('POST', url)
  }

  async put (url, payload = {}) {
    return this.withPayload(payload).send('PUT', url)
  }

  async patch (url, payload = {}) {
    return this.withPayload(payload).send('PATCH', url)
  }

  async delete (url, queryParams = {}) {
    return this.withQueryParams(queryParams).send('DELETE', url)
  }

  async send (method, url) {
    try {
      return new SttpResponse(
        await this.createAndSendRequest(method, url)
      )
    } catch (error) {
      if (error.request) {
        throw new Error('Failed to send request', error.request)
      }

      return new SttpResponse(error.response)
    }
  }

  async createAndSendRequest (method, url) {
    return Axios({
      url,
      method,
      ...this.options
    })
  }
}

module.exports = Sttp
