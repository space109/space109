## Guide for Testing Smart Contracts
<br/>

### Prerequisites

```bash
$ npm install -g truffle
$ npm i
```

<br/>

### ```truffle-config.js``` 설정

<br/>
아래 부분을 테스트 환경에 맞게 변경

```js
module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",    
      port: 7545,           
      network_id: "*",    
     },
     ...
  }
}
```

위 --network 옵션을 지정하지 않고 truffle test 실행  시, "development"를 기본으로 지정함.

```bash
$ truffle test --network <network-name>
```
<br/>

### 테스트 코드 실행

```bash
$ truffle test ./test/NFTCreateorTest.js
$ truffle test ./test/SaleTest.js
```

<br/>
<br/>

# NFT 프론트엔드


### Installation

``` bash
$ npm install

```


### Basic Usage


``` bash
$ npm run start
```
