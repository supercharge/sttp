# Changelog


## [1.4.0](https://github.com/supercharge/sttp/compare/v1.3.0...v1.4.0) - 2023-05-29

### Added
- add `response.statusText()` method: returns the response status text (related to the response status code)
  - for example, a return value for a response with status 201 is `Created`
- test Node.js v20

### Removed
- drop testing of Node.js v19 in favor of Node.js v20


## [1.3.0](https://github.com/supercharge/sttp/compare/v1.2.0...v1.3.0) - 2022-01-23

### Added
- add `.axios()` method: returns the underlying Axios instance
  - this is useful when registering Axios adapters or middleware


## [1.2.0](https://github.com/supercharge/sttp/compare/v1.1.0...v1.2.0) - 2021-12-13

### Added
- make `payload` parameter optional for `.post`, `.put`, and `.patch` requests
- update typings for query parameter parameter in `.delete` and `.options` methods


## [1.1.0](https://github.com/supercharge/sttp/compare/v1.0.0...v1.1.0) - 2021-12-06

### Added
- export `SttpResponse` class
- merge `PendingRequest` into `Sttp` class

### Removed
- removed intermediate `PendingRequest` class


## 1.0.0 - 2021-11-11

### Added
- `1.0.0` release 🚀 🎉
