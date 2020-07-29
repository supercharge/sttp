'use strict'

import { AxiosResponse } from 'axios'

export class SttpResponse<T = any> {
  /**
   * The Axios response object.
   */
  private readonly response: AxiosResponse

  /**
   * Wrap the given Axios `response` into a new response instance.
   *
   * @param {AxiosResponse} response
   */
  constructor (response: AxiosResponse) {
    this.response = response
  }

  /**
   * Returns the response status.
   *
   * @returns {Number}
   */
  status (): number {
    return this.response.status
  }

  /**
   * Returns the response payload.
   *
   * @returns {*}
   */
  data (): T {
    return this.payload()
  }

  /**
   * Returns the response headers.
   *
   * @returns {Object}
   */
  headers (): Object {
    return this.response.headers
  }

  /**
   * Returns the response payload.
   *
   * @returns {*}
   */
  payload (): T {
    return this.response.data
  }

  /**
   * Determine whether the response is successful (status 2xx).
   *
   * @returns {Boolean}
   */
  isSuccess (): boolean {
    return this.response.status >= 200 && this.response.status < 300
  }

  /**
   * Determine whether the response is a redirect (status 3xx).
   *
   * @returns {Boolean}
   */
  isRedirect (): boolean {
    return this.response.status >= 300 && this.response.status < 400
  }

  /**
   * Determine whether the response is a client error (status 4xx).
   *
   * @returns {Boolean}
   */
  isClientError (): boolean {
    return this.response.status >= 400 && this.response.status < 500
  }

  /**
   * Determine whether the response is a server error (status 5xx).
   *
   * @returns {Boolean}
   */
  isServerError (): boolean {
    return this.response.status >= 500
  }
}
