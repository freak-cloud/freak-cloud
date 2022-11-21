## Getting started

### Dependencies

* NodeJS v16 or higher.
* Latest release of npm.

### Installation

First, clone this repository to your computer.

Then, go to `/freak-cloud-host`, open up your terminal and install the packages through:

```
npm install
```


## Configure your client

You can configure your client through `config.js`. Basically you will need to export a config object from the file, which looks like this:

```js
export const config = {
    "PREFERRED_FEE": "Minimum preferred storage fee",
    "PRIVATE_KEY": "Your private key",
    "MAX_TIMEOUT": "Maximum expiration period"
}
```

The `PREFERRED_FEE` is set to `1000000000000000` and `MAX_TIMEOUT` is set to `2592000` by default, and `PRIVATE_KEY` is `0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e` which is one of Hardhat's default keys for testing purposes.

**Note: Remember to change the private key to your own private key and not use the provided private key for serious use!**
