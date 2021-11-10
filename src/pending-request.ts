'use strict'

import { SttpResponse } from './sttp-response'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export class PendingRequest {
  /**
   * The request configuration.
   */
  private request: AxiosRequestConfig

  /**
   * The request configuration.
   */
  private readonly axios: AxiosInstance

  /**
   * The payload format for a JSON or form-url-encoded request.
   */
  private bodyFormat: BodyFormat = 'json'

  /**
   * Createa new pending HTTP request instance.
   */
  constructor () {
    this.request = {}
    this.axios = Axios.create()

    this.asJson()
  }

  /**
   * Returns the Axios request config.
   *
   * @returns {AxiosRequestConfig}
   */
  requestConfig (): AxiosRequestConfig {
    return this.request
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  withHeaders (headers: AxiosRequestHeaders): this {
    Object.assign(this.request, { headers: { ...this.request.headers, ...headers } })

    return this
  }

  /**
   * Add query parameters to the request.
   *
   * @param {Object} queryParams
   *
   * @returns {PendingRequest}
   */
  withQueryParams (queryParams: object): this {
    Object.assign(this.request, { params: { ...this.request.params, ...queryParams } })

    return this
  }

  /**
   * Add basic authentication via `username` and `password` to the request.
   *
   * @param {String} username
   * @param {String} password
   *
   * @returns {PendingRequest}
   */
  withBasicAuth (username: string, password: string): this {
    this.request.auth = { username, password }

    return this
  }

  /**
   * Add an authorization `token` to the request.
   *
   * @param {String} token
   * @param {String} type
   *
   * @returns {PendingRequest}
   */
  withToken (token: string, type: string = 'Bearer'): this {
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
  withOptions<D = any> (options: AxiosRequestConfig<D> = {}): this {
    Object.assign(this.request, options)

    return this
  }

  /**
   * Add a request payload.
   *
   * @param {*} data
   *
   * @returns {PendingRequest}
   */
  withPayload (data: any): this {
    this.request.data = data

    return this
  }

  /**
   * Define the request `timeout` in milliseconds.
   *
   * @param {Number} timeout
   *
   * @returns {PendingRequest}
   */
  withTimeout (timeout: number): this {
    this.request.timeout = timeout

    return this
  }

  /**
   * Define the request `timeout` in seconds.
   *
   * @param {Number} timeout
   *
   * @returns {PendingRequest}
   */
  withTimeoutInSeconds (timeout: number): this {
    return this.withTimeout(timeout * 1000)
  }

  /**
   * Tell Sttp to send the request as JSON payload.
   *
   * @returns {PendingRequest}
   */
  asJson (): this {
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
  asFormParams (): this {
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
  payloadFormat (format: BodyFormat): this {
    this.bodyFormat = format

    return this
  }

  /**
   * Set the `Accept` request header. This indicates what
   * content type the server should return.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  accept (accept: string): this {
    return this.withHeaders({ Accept: accept })
  }

  /**
   * Set the `Accept` request header to JSON. This indicates
   * that the server should return JSON data.
   *
   * @param {String} accept
   *
   * @returns {PendingRequest}
   */
  acceptJson (): this {
    return this.accept('application/json')
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} contentType
   *
   * @returns {PendingRequest}
   */
  contentType (contentType: string): this {
    return this.withHeaders({ 'Content-Type': contentType })
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
  async get<R> (url: string, queryParams: object = {}): Promise<SttpResponse<R>> {
    this.withQueryParams(queryParams)

    return this.send<R>('GET', url)
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
  async post<R> (url: string, payload: any): Promise<SttpResponse<R>> {
    if (payload) {
      this.withPayload(payload)
    }

    return this.send<R>('POST', url)
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
  async put<R> (url: string, payload: any): Promise<SttpResponse<R>> {
    if (payload) {
      this.withPayload(payload)
    }

    return this.send<R>('PUT', url)
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
  async patch<R> (url: string, payload: any): Promise<SttpResponse<R>> {
    if (payload) {
      this.withPayload(payload)
    }

    return this.send<R>('PATCH', url)
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
  async delete<R> (url: string, queryParams = {}): Promise<SttpResponse<R>> {
    this.withQueryParams(queryParams)

    return this.send<R>('DELETE', url)
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
  async options<R> (url: string, queryParams = {}): Promise<SttpResponse<R>> {
    this.withQueryParams(queryParams)

    return this.send<R>('OPTIONS', url)
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
  async send<R> (method: HttpMethod, url: string): Promise<SttpResponse<R>> {
    try {
      return new SttpResponse<R>(
        await this.createAndSendRequest(method, url)
      )
    } catch (error: any) {
      if (error.response) {
        return new SttpResponse(error.response)
      }

      throw error
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
  async createAndSendRequest (method: HttpMethod, url: string): Promise<AxiosResponse> {
    return await this.axios({
      url,
      method,
      withCredentials: true,
      ...this.request,
      data: this.prepareRequestPayload()
    })
  }

  /**
   * Returns the request payload depending on the selected request payload format.
   */
  prepareRequestPayload (): any {
    return this.bodyFormat === 'formParams'
      ? new URLSearchParams(this.request.data).toString()
      : this.request.data
  }
}

type BodyFormat = 'json' | 'formParams'

type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
