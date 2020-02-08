'use strict'

const Axios = require('axios')
const Merge = require('deepmerge')
const SttpResponse = require('./sttp-response')

class PendingSttpRequest {
  constructor () {
    this.options = {}
    this._payloadFormat = 'json'
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingSttpRequest}
   */
  withHeaders (headers) {
    this.options = Merge(this.options, {
      headers
    })

    return this
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingSttpRequest}
   */
  withQueryParams (queryParams) {
    this.options = Merge(this.options, {
      params: queryParams
    })

    return this
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingSttpRequest}
   */
  withPayload (payload) {
    this.payload = payload

    return this
  }

  /**
   * Tell Sttp to send the request as form parameters,
   * encoded as URL query parameters.
   *
   * @returns {PendingSttpRequest}
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
   * @returns {PendingSttpRequest}
   */
  payloadFormat (format) {
    this._payloadFormat = format

    return this
  }

  /**
   * Set the `Accept` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingSttpRequest}
   */
  accept (accept) {
    return this.withHeaders({
      Accept: accept
    })
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingSttpRequest}
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

module.exports = PendingSttpRequest
