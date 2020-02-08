'use strict'

const PendingSttpRequest = require('./pending-sttp-request')

class Sttp {
  static withHeaders (headers) {
    return new PendingSttpRequest().withHeaders(headers)
  }

  static withQueryParams (queryParams) {
    return new PendingSttpRequest().withQueryParams(queryParams)
  }

  static withPayload (payload) {
    return new PendingSttpRequest().withPayload(payload)
  }

  static asFormParams () {
    return new PendingSttpRequest().asFormParams()
  }

  static accept (accept) {
    return new PendingSttpRequest().accept(accept)
  }

  static contentType (contentType) {
    return new PendingSttpRequest().contentType(contentType)
  }

  static async get (url, queryParams) {
    return new PendingSttpRequest().get(url, queryParams)
  }

  static async post (url, payload) {
    return new PendingSttpRequest().post(url, payload)
  }

  static async put (url, payload) {
    return new PendingSttpRequest().put(url, payload)
  }

  static async patch (url, payload) {
    return new PendingSttpRequest().patch(url, payload)
  }

  static async delete (url, queryParams) {
    return new PendingSttpRequest().delete(url, queryParams)
  }
}

module.exports = Sttp
