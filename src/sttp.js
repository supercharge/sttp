'use strict'

const PendingSttpRequest = require('./pending-sttp-request')

class Sttp {
  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingSttpRequest}
   */
  static withHeaders (headers) {
    return new PendingSttpRequest().withHeaders(headers)
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingSttpRequest}
   */
  static withQueryParams (queryParams) {
    return new PendingSttpRequest().withQueryParams(queryParams)
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingSttpRequest}
   */
  static withPayload (payload) {
    return new PendingSttpRequest().withPayload(payload)
  }

  /**
   * Tell Sttp to send the request as form parameters,
   * encoded as URL query parameters.
   *
   * @returns {PendingSttpRequest}
   */
  static asFormParams () {
    return new PendingSttpRequest().asFormParams()
  }

  /**
   * Set the `Accept` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingSttpRequest}
   */
  static accept (accept) {
    return new PendingSttpRequest().accept(accept)
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingSttpRequest}
   */
  static contentType (contentType) {
    return new PendingSttpRequest().contentType(contentType)
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
    return new PendingSttpRequest().get(url, queryParams)
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
    return new PendingSttpRequest().post(url, payload)
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
    return new PendingSttpRequest().put(url, payload)
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
    return new PendingSttpRequest().patch(url, payload)
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
    return new PendingSttpRequest().delete(url, queryParams)
  }
}

module.exports = Sttp
