# blockstore-core <!-- omit in toc -->

[![ipfs.io](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io)
[![IRC](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Discord](https://img.shields.io/discord/806902334369824788?style=flat-square)](https://discord.gg/ipfs)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/js-blockstore-core.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-blockstore-core)
[![CI](https://img.shields.io/github/workflow/status/ipfs/js-blockstore-core/test%20&%20maybe%20release/master?style=flat-square)](https://github.com/ipfs/js-blockstore-core/actions/workflows/js-test-and-release.yml)

> Contains various implementations of the API contract described in interface-blockstore

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Implementations](#implementations)
- [Usage](#usage)
  - [BaseBlockstore](#baseblockstore)
  - [MemoryBlockstore](#memoryblockstore)
- [Contribute](#contribute)
- [License](#license)
- [Contribute](#contribute-1)

## Install

```console
$ npm i blockstore-core
```

## Implementations

- Base: [`src/base`](src/base.js)
- Memory: [`src/memory`](src/memory.js)

## Usage

### BaseBlockstore

Provides a complete implementation of the Blockstore interface.  You must implement `.get`, `.put`, etc.

```js
import { BaseBlockstore } from 'blockstore-core/base'

class MyCustomBlockstore extends BaseBlockstore {
  put (key, val, options) {
    // store a block
  }

  get (key, options) {
    // retrieve a block
  }

  // ...etc
}
```

### MemoryBlockstore

A simple Blockstore that stores blocks in memory.

```js
import { MemoryBlockstore } from 'blockstore-core/memory'

const store = new MemoryBlockstore()
```

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/js-ipfs-unixfs-importer/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/js-ipfs-unixfs-importer/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)
