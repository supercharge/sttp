'use strict'

class SttpResponse {
  /**
   * Create a new SttpResponse instance.
   *
   * @param {Object} response
   */
  constructor (response) {
    this.response = response
  }

  /**
   * Returns the response status.
   *
   * @returns {Number}
   */
  get status () {
    return this.response.status
  }

  /**
   * Returns the response payload.
   *
   * @returns {*}
   */
  get data () {
    return this.payload()
  }

  /**
   * Returns the response headers.
   *
   * @returns {Object}
   */
  get headers () {
    return this.response.status
  }

  /**
   * Returns the response payload.
   *
   * @returns {*}
   */
  payload () {
    return this.response.data
  }

  /**
   * Determine whether the response is successful (status 2xx).
   *
   * @returns {Boolean}
   */
  isSuccess () {
    return this.response.status >= 200 && this.response.status < 300
  }

  /**
   * Determine whether the response is a redirect (status 3xx).
   *
   * @returns {Boolean}
   */
  isRedirect () {
    return this.response.status >= 300 && this.response.status < 400
  }

  /**
   * Determine whether the response is a client error (status 4xx).
   *
   * @returns {Boolean}
   */
  isClientError () {
    return this.response.status >= 400 && this.response.status < 500
  }

  /**
   * Determine whether the response is a server error (status 5xx).
   *
   * @returns {Boolean}
   */
  isServerError () {
    return this.response.status >= 500
  }
}

module.exports = SttpResponse
