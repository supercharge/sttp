'use strict'

const PendingRequest = require('./pending-request')

class Sttp {
  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  static withHeaders (headers) {
    return new PendingRequest().withHeaders(headers)
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingRequest}
   */
  static withQueryParams (queryParams) {
    return new PendingRequest().withQueryParams(queryParams)
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingRequest}
   */
  static withPayload (payload) {
    return new PendingRequest().withPayload(payload)
  }

  /**
   * Tell Sttp to send the request as JSON payload.
   *
   * @returns {PendingRequest}
   */
  static asJson () {
    return new PendingRequest().asJson()
  }

  /**
   * Tell Sttp to send the request as form parameters,
   * encoded as URL query parameters.
   *
   * @returns {PendingRequest}
   */
  static asFormParams () {
    return new PendingRequest().asFormParams()
  }

  /**
   * Set the `Accept` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  static accept (accept) {
    return new PendingRequest().accept(accept)
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
    return new PendingRequest().acceptJson()
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  static contentType (contentType) {
    return new PendingRequest().contentType(contentType)
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
  static async get (url, queryParams) {
    return new PendingRequest().get(url, queryParams)
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
  static async post (url, payload) {
    return new PendingRequest().post(url, payload)
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
  static async put (url, payload) {
    return new PendingRequest().put(url, payload)
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
  static async patch (url, payload) {
    return new PendingRequest().patch(url, payload)
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
  static async delete (url, queryParams) {
    return new PendingRequest().delete(url, queryParams)
  }
}

module.exports = Sttp
