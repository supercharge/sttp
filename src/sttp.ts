'use strict'

import { AxiosRequestHeaders } from 'axios'
import { SttpResponse } from './sttp-response'
import { PendingRequest } from './pending-request'

export class Sttp {
  /**
   * Create a reusable Sttp instance.
   *
   * @returns {PendingRequest}
   */
  static create (): PendingRequest {
    return new PendingRequest()
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  static withHeaders (headers: AxiosRequestHeaders): PendingRequest {
    return new PendingRequest().withHeaders(headers)
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingRequest}
   */
  static withQueryParams (queryParams: object): PendingRequest {
    return new PendingRequest().withQueryParams(queryParams)
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingRequest}
   */
  static withPayload (payload: any): PendingRequest {
    return new PendingRequest().withPayload(payload)
  }

  /**
   * Add basic authentication via `username` and `password` to the request.
   *
   * @param {String} username
   * @param {String} password
   *
   * @returns {PendingRequest}
   */
  static withBasicAuth (username: string, password: string): PendingRequest {
    return new PendingRequest().withBasicAuth(username, password)
  }

  /**
   * Add an authorization `token` to the request.
   *
   * @param {String} token
   * @param {String} type
   *
   * @returns {PendingRequest}
   */
  static withToken (token: string, type?: string): PendingRequest {
    return new PendingRequest().withToken(token, type)
  }

  /**
   * Merge your own custom Axios options into the request.
   *
   * @param {Object} options
   *
   * @returns {PendingRequest}
   */
  static withOptions (options: object): PendingRequest {
    return new PendingRequest().withOptions(options)
  }

  /**
   * Define the request timeout in seconds.
   *
   * @param {Number} timeout
   *
   * @returns {PendingRequest}
   */
  static withTimeoutInSeconds (timeout: number): PendingRequest {
    return new PendingRequest().withTimeoutInSeconds(timeout)
  }

  /**
   * Define the request timeout in milliseconds.
   *
   * @param {Number} timeout
   *
   * @returns {PendingRequest}
   */
  static withTimeout (timeout: number): PendingRequest {
    return new PendingRequest().withTimeout(timeout)
  }

  /**
   * Tell Sttp to send the request as JSON payload.
   *
   * @returns {PendingRequest}
   */
  static asJson (): PendingRequest {
    return new PendingRequest().asJson()
  }

  /**
   * Tell Sttp to send the request as form parameters,
   * encoded as URL query parameters.
   *
   * @returns {PendingRequest}
   */
  static asFormParams (): PendingRequest {
    return new PendingRequest().asFormParams()
  }

  /**
   * Set the `Accept` request header. This indicates what
   * content type the server should return.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  static accept (accept: string): PendingRequest {
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
  static acceptJson (): PendingRequest {
    return new PendingRequest().acceptJson()
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  static contentType (contentType: string): PendingRequest {
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
  static async get<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
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
  static async post<R> (url: string, payload: any): Promise<SttpResponse<R>> {
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
  static async put<R> (url: string, payload: any): Promise<SttpResponse<R>> {
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
  static async patch<R> (url: string, payload: any): Promise<SttpResponse<R>> {
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
  static async delete<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
    return new PendingRequest().delete(url, queryParams)
  }

  /**
   * Send an HTTP OPTIONS request, optionally with the given `queryParams`.
   *
   * @param {String} url
   * @param {Object} queryParams
   *
   * @returns {SttpResponse}
   *
   * @throws
   */
  static async options<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
    return new PendingRequest().options(url, queryParams)
  }
}
