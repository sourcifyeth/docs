---
id: run-local
title: Running Sourcify Locally
slug: /run-locally
---

# Running Sourcify Locally

Two main components of the Sourcify is the server and the UI. You can run them locally to verify contracts.

## Requirements

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
  - node v10 needed for the frontend
- npm

## Clone

First clone the repository

```bash
git clone https://github.com/ethereum/sourcify.git && cd sourcify
```

## Set environment variables

Most of the settings are set with environment variables under the `environments/.env` file. You can copy the `environments/.env-latest` file and rename it to `.env` initially. You should at least configure the variables below to run the server and UI.

See [Environment Variables](/docs/env-vars) section for details.

```bash
FQDN=localhost # Fully Qualified Domain Name
SERVER_URL=https://localhost:5000 # localhost:$SERVER_EXTERNAL_PORT
SOLC_REPO_HOST= # Path where Solidity compiler binaries will be saved. e.g. /home/user/solc/bin
SOLJSON_REPO_HOST= # Path where Solidity JS (solc-js) compilers are saved e.g. /home/user/solc/js
REPOSITORY_PATH= # Path on host where verified contracts will be saved e.g. /home/user/sourcify/repository
IPFS_URL= # URL to an IPFS gateway e.g. https://ipfs.io/ipfs/ or if you run a local IPFS node http://localhost:8080/ipfs/ or http://ipfs-container-name:8080/ipfs/ etc.
```

### RPC keys

Set [Alchemy](https://www.alchemy.com/) API keys for each Ethereum and Polygon network you want to use. You can use the same key for all networks. Replace the RPC links to your liking in [`services/core/src/sourcify-chains.ts`](https://github.com/ethereum/sourcify/blob/master/services/core/src/sourcify-chains.ts) to your liking if you won't be using Alchemy. For the chains without an RPC in `sourcify-chains.ts`, the default RPCs from in [`services/core/src/chains.json`](https://github.com/ethereum/sourcify/blob/master/services/core/src/chains.json) will be used.

```
ALCHEMY_ID_ETH_MAINNET=
ALCHEMY_ID_ETH_GOERLI=
ALCHEMY_ID_ETH_RINKEBY=
ALCHEMY_ID_ETH_ROPSTEN=
ALCHEMY_ID_ETH_KOVAN=
ALCHEMY_ID_POLYGON_MAINNET=
ALCHEMY_ID_POLYGON_MUMBAI=
```

## Install

Sourcify is organized as a monorepo and uses [lerna](https://github.com/lerna/lerna) to manage the dependencies and its packages. Install with

```bash
npx lerna bootstrap
```

Build modules

```bash
npx lerna run build
```

## Run

### Server

Start the server

```bash
npm run server:start
```

### UI

UI requires node version 10.\* because of the [node-sass](https://github.com/sass/node-sass#node-version-support-policy) package version.

In a new terminal session install and use node version 10

```bash
nvm install 10
```

```bash
nvm use 10
```

Start the UI

```bash
npm run dev:ui
```
