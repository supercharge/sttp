'use strict'

import { SttpResponse } from './sttp-response'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export class Sttp {
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
   * Create a reusable Sttp instance.
   *
   * @returns {Sttp}
   */
  static create (): Sttp {
    return new this()
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
   * Use the given `baseUrl` for all requests.
   *
   * @param {String} baseUrl
   *
   * @returns {Sttp}
   */
  static withBaseUrl (baseUrl: string): Sttp {
    return new this().withBaseUrl(baseUrl)
  }

  /**
    * Use the given `baseUrl` for all requests.
    *
    * @param {String} baseUrl
    *
    * @returns {Sttp}
    */
  withBaseUrl (baseUrl: string): this {
    if (typeof baseUrl !== 'string') {
      throw new Error(`The base URL must be a string. Received "${typeof baseUrl}"`)
    }

    this.request.baseURL = baseUrl

    return this
  }

  /**
   * Add request headers.
   *
   * @param {AxiosRequestHeaders} headers
   *
   * @returns {Sttp}
   */
  static withHeaders (headers: AxiosRequestHeaders): Sttp {
    return new this().withHeaders(headers)
  }

  /**
    * Add request headers.
    *
    * @param {AxiosRequestHeaders} headers
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static withQueryParams (queryParams: object): Sttp {
    return new this().withQueryParams(queryParams)
  }

  /**
    * Add query parameters to the request.
    *
    * @param {Object} queryParams
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static withBasicAuth (username: string, password: string): Sttp {
    return new this().withBasicAuth(username, password)
  }

  /**
    * Add basic authentication via `username` and `password` to the request.
    *
    * @param {String} username
    * @param {String} password
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static withToken (token: string, type?: string): Sttp {
    return new this().withToken(token, type)
  }

  /**
    * Add an authorization `token` to the request.
    *
    * @param {String} token
    * @param {String} type
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static withOptions<D = any> (options: AxiosRequestConfig<D>): Sttp {
    return new this().withOptions(options)
  }

  /**
    * Merge your own custom Axios options into the request.
    *
    * @param {Object} options
    *
    * @returns {Sttp}
    */
  withOptions<D = any> (options: AxiosRequestConfig<D> = {}): this {
    Object.assign(this.request, options)

    return this
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {Sttp}
   */
  static withPayload (payload: any): Sttp {
    return new this().withPayload(payload)
  }

  /**
    * Add a request payload.
    *
    * @param {*} data
    *
    * @returns {Sttp}
    */
  withPayload (data: any): this {
    this.request.data = data

    return this
  }

  /**
   * Define the request timeout in milliseconds.
   *
   * @param {Number} timeout
   *
   * @returns {Sttp}
   */
  static withTimeout (timeout: number): Sttp {
    return new this().withTimeout(timeout)
  }

  /**
    * Define the request `timeout` in milliseconds.
    *
    * @param {Number} timeout
    *
    * @returns {Sttp}
    */
  withTimeout (timeout: number): this {
    this.request.timeout = timeout

    return this
  }

  /**
   * Define the request timeout in seconds.
   *
   * @param {Number} timeout
   *
   * @returns {Sttp}
   */
  static withTimeoutInSeconds (timeout: number): Sttp {
    return new this().withTimeoutInSeconds(timeout)
  }

  /**
    * Define the request `timeout` in seconds.
    *
    * @param {Number} timeout
    *
    * @returns {Sttp}
    */
  withTimeoutInSeconds (timeout: number): this {
    return this.withTimeout(timeout * 1000)
  }

  /**
   * Tell Sttp to send the request as JSON payload.
   *
   * @returns {Sttp}
   */
  static asJson (): Sttp {
    return new this().asJson()
  }

  /**
    * Tell Sttp to send the request as JSON payload.
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static asFormParams (): Sttp {
    return new this().asFormParams()
  }

  /**
    * Tell Sttp to send the request as form parameters,
    * encoded as URL query parameters.
    *
    * @returns {Sttp}
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
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static accept (accept: string): Sttp {
    return new this().accept(accept)
  }

  /**
    * Set the `Accept` request header. This indicates what
    * content type the server should return.
    *
    * @param {String} accept
    *
    * @returns {Sttp}
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
   * @returns {Sttp}
   */
  static acceptJson (): Sttp {
    return new this().acceptJson()
  }

  /**
    * Set the `Accept` request header to JSON. This indicates
    * that the server should return JSON data.
    *
    * @param {String} accept
    *
    * @returns {Sttp}
    */
  acceptJson (): this {
    return this.accept('application/json')
  }

  /**
   * Set the `Content-Type` request header.
   *
   * @param {String} accept
   *
   * @returns {Sttp}
   */
  static contentType (contentType: string): Sttp {
    return new this().contentType(contentType)
  }

  /**
    * Set the `Content-Type` request header.
    *
    * @param {String} contentType
    *
    * @returns {Sttp}
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
  static async get<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
    return new this().get(url, queryParams)
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
  static async post<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
    return new this().post(url, payload)
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
  async post<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
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
  static async put<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
    return new this().put(url, payload)
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
  async put<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
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
  static async patch<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
    return new this().patch(url, payload)
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
  async patch<R> (url: string, payload?: any): Promise<SttpResponse<R>> {
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
  static async delete<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
    return new this().delete(url, queryParams)
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
  async delete<R> (url: string, queryParams: object = {}): Promise<SttpResponse<R>> {
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
  static async options<R> (url: string, queryParams: object): Promise<SttpResponse<R>> {
    return new this().options(url, queryParams)
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
  async options<R> (url: string, queryParams: object = {}): Promise<SttpResponse<R>> {
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
