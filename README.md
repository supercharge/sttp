<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Sttp</h3>
  </p>
  <p>
    A simple Axios wrapper for an enjoyable developer experience.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/sttp"><img src="https://img.shields.io/npm/v/@supercharge/sttp.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/sttp"><img src="https://img.shields.io/npm/dm/@supercharge/sttp.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
A short introduction for `@supercharge/sttp`.


## Installation

```
npm i @supercharge/sttp
```


## Docs
Find all the [details for `@supercharge/sttp` in the extensive Supercharge docs](https://superchargejs.com/docs/sttp).


## Usage
Using `@supercharge/sttp` is pretty straightforward.

For example, you may …:

```js
const Sttp = require('@supercharge/sttp')

const response = await Sttp
  .withQueryParams({ page: 3 })
  .withHeaders({ 'X-API-Token': 123 })
  .withPayload({ name: 'Supercharge' })
  .post('/url')
```


## Contributing
Do you miss a string function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@superchargejs](https://github.com/superchargejs/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
