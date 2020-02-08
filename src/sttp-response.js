'use strict'

class SttpResponse {
  constructor (response) {
    this.response = response
  }

  get status () {
    return this.response.status
  }

  get data () {
    return this.payload()
  }

  get headers () {
    return this.response.status
  }

  payload () {
    return this.response.data
  }

  isSuccess () {
    return this.response.status >= 200 && this.response.status < 300
  }

  isRedirect () {
    return this.response.status >= 300 && this.response.status < 400
  }

  isClientError () {
    return this.response.status >= 400 && this.response.status < 500
  }

  isServerError () {
    return this.response.status >= 500
  }
}

module.exports = SttpResponse
