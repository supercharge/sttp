'use strict'

const Axios = require('axios')
const Merge = require('deepmerge')
const { tap } = require('@supercharge/goodies')
const SttpResponse = require('./sttp-response')

class PendingRequest {
  /**
   * Createa new pending HTTP request instance.
   */
  constructor () {
    this.options = {}

    this.asJson()
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  withHeaders (headers) {
    return tap(this, () => {
      this.options = Merge(this.options, { headers })
    })
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingRequest}
   */
  withQueryParams (queryParams) {
    return tap(this, () => {
      this.options = Merge(this.options, { params: queryParams })
    })
  }

  /**
   * Add basic authentication via `username` and `password` to the request.
   *
   * @param {String} username
   * @param {String} password
   *
   * @returns {PendingRequest}
   */
  withBasicAuth (username, password) {
    return tap(this, () => {
      this.options = Merge(this.options, {
        auth: { username, password }
      })
    })
  }

  /**
   * Add an authorization `token` to the request.
   *
   * @param {String} token
   * @param {String} type
   *
   * @returns {PendingRequest}
   */
  withToken (token, type = 'Bearer') {
    return this.withHeaders({
      Authorization: `${type} ${token}`.trim()
    })
  }

  /**
   * Merge your own custom Axios options into the request.
   *
   * @param {Object} options
   *
   * @returns {PendingRequest}
   */
  withOptions (options = {}) {
    return tap(this, () => {
      this.options = Merge(this.options, options)
    })
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingRequest}
   */
  withPayload (payload) {
    return tap(this, () => {
      this.payload = payload
    })
  }

  /**
   * Define the request timeout in seconds.
   *
   * @param {Number} timeout
   *
   * @returns {PendingRequest}
   */
  timeout (timeout) {
    return tap(this, () => {
      this.options = Merge(this.options, {
        timeout: timeout * 1000
      })
    })
  }

  /**
   * Tell Sttp to send the request as JSON payload.
   *
   * @returns {PendingRequest}
   */
  asJson () {
    return this
      .payloadFormat('json')
      .contentType('application/json')
  }

  /**
   * Tell Sttp to send the request as form parameters,
   * encoded as URL query parameters.
   *
   * @returns {PendingRequest}
   */
  asFormParams () {
    return this
      .payloadFormat('formParams')
      .contentType('application/x-www-form-urlencoded')
  }

  /**
   * Set the request payload format.
   *
   * @param {String} format
   *
   * @returns {PendingRequest}
   */
  payloadFormat (format) {
    return tap(this, () => {
      this.bodyFormat = format
    })
  }

  /**
   * Set the `Accept` request header. This indicates what
   * content type the server should return.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  accept (accept) {
    return this.withHeaders({
      Accept: accept
    })
  }

  /**
   * Set the `Accept` request header to JSON. This indicates
   * that the server should return JSON data.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  acceptJson () {
    return this.accept('application/json')
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  contentType (contentType) {
    return this.withHeaders({
      'Content-Type': contentType
    })
  }

  /**
   * Send an HTTP GET request, optionally with the given `queryParams`.
   *
   * @param {String} url
   * @param {Object} queryParams
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  async get (url, queryParams = {}) {
    return this
      .withQueryParams(queryParams)
      .send('GET', url)
  }

  /**
   * Send an HTTP POST request, optionally with the given `payload`.
   *
   * @param {String} url
   * @param {Object} payload
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  async post (url, payload = {}) {
    return this
      .withPayload(payload)
      .send('POST', url)
  }

  /**
   * Send an HTTP PUT request, optionally with the given `payload`.
   *
   * @param {String} url
   * @param {Object} payload
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  async put (url, payload = {}) {
    return this
      .withPayload(payload)
      .send('PUT', url)
  }

  /**
   * Send an HTTP PATCH request, optionally with the given `payload`.
   *
   * @param {String} url
   * @param {Object} payload
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  async patch (url, payload = {}) {
    return this
      .withPayload(payload)
      .send('PATCH', url)
  }

  /**
   * Send an HTTP DELETE request, optionally with the given `queryParams`.
   *
   * @param {String} url
   * @param {Object} queryParams
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  async delete (url, queryParams = {}) {
    return this
      .withQueryParams(queryParams)
      .send('DELETE', url)
  }

  /**
   * Send the HTTP request.
   *
   * @param {String} method
   * @param {String} url
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
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

  /**
   * Create and send the HTTP request.
   *
   * @param {String} method
   * @param {String} url
   *
   * @returns {Request}
   */
  async createAndSendRequest (method, url) {
    return Axios({
      url,
      method,
      ...this.options
    })
  }
}

module.exports = PendingRequest
