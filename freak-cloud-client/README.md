## Getting started

### Dependencies

* NodeJS v16 or higher.
* Latest release of npm.

### Installation

First, clone this repository to your computer.

Then, go to `/freak-cloud-client`, open up your terminal and install the packages through:

```
npm install
```


## Configure your client

You can configure your client through `config.js`. Basically you will need to export a config object from the file, which looks like this:

```js
export const config = {
    "RPC_PORT": "PORT of the RPC server",
    "PRIVATE_KEY": "Your private key"
}
```

The `RPC_PORT` is set to `2907` by default, and `PRIVATE_KEY` is `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` which is one of Hardhat's default keys for testing purposes.

**Note: Remember to change the private key to your own private key and not use the provided private key for serious use!**


## The API spec

Check out [`APIs.md`](./APIs.md) for a specification on how to use the client's apis.
