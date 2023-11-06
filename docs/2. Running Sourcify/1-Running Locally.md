---
id: run-local
title: Running Sourcify Locally
slug: /run-locally
---

# Running Sourcify Locally

## Requirements

- Node.js v16

## Clone

First clone the repository

```bash
git clone https://github.com/ethereum/sourcify.git && cd sourcify
```

## Install and Build

Install dependencies

```
npm install
```

This will install dependencies for the server (root folder) as well as the UI (`ui/` folder) and other `packages/` with [lerna](https://lerna.js.org/docs/introduction).

Then build with

```
npx lerna run build
```

which will build each of the packages.

## Create .env for server

Make a copy of the `services/server/.env.dev` and rename it to `services/server/.env`.

## Running the Server

### Set Environment Variables

Set the variables below for the file paths. You can also change the other optional environment variables.

```bash
REPOSITORY_PATH= # Path on host where verified contracts will be saved e.g. /home/user/sourcify/repository
SOLC_REPO= # Path where Solidity compiler binaries will be saved. e.g. /home/user/solc/linux-amd64
SOLJSON_REPO= # Path where Solidity JS (solc-js) compilers are saved e.g. /home/user/solc/js
```

You also need to provide either Alchemy API keys or your own JSON-RPC node URL for Ethereum networks. If both provided, it will first query the `NODE_URL_{chain}` and fall back to Alchemy.

```bash
ALCHEMY_ID=xxx
```

```bash
# Custom nodes
NODE_URL_MAINNET=
NODE_URL_GOERLI=
NODE_URL_SEPOLIA=
```

For other networks with Alchemy support such as Polygon, Optimism, Arbitrum etc., you also need to provide an API key. You can check those networks in the [`services/core/src/sourcify-chains.ts`](https://github.com/ethereum/sourcify/blob/staging/src/sourcify-chains.ts#L113). For the chains without an `rpc` field in `sourcify-chains.ts`, the default RPCs from in [`services/core/src/chains.json`](https://github.com/ethereum/sourcify/blob/staging/src/chains.json) will be used.

Infura is needed only for the Palm Network and not used for Ethereum, Arbitrum, Optimism, Polygon etc.

```bash
INFURA_ID=xxx
```

Fill also the Auth0 environment variables, if you want to skip this step you can set the variables as follows, but the functionality will not work.

```
AUTH0_AUDIENCE=null
AUTH0_ISSUERBASEURL=null
AUTH0_TOKENSIGNINGALG=
AUTH0_CLIENTID=
```

### Run

Start the server

```bash
npm run server:start
```

### Running with docker

The server docker container uses the .env file into `services/server/`, in particular these are the environment variables that need to be set in order to mount the host volumes into the container.

```
DOCKER_HOST_SERVER_PORT= # this is the host port that is going to be forwarded to SERVER_PORT
DOCKER_HOST_SOLC_REPO= # this is the host volume that is going to be mounted to SOLC_REPO
DOCKER_HOST_SOLJSON_REPO= # this is the host volume that is going to be mounted to SOLJSON_REPO
DOCKER_HOST_REPOSITORY_PATH= # this is the host volume that is going to be mounted to REPOSITORY_PATH
```

Then simply run `docker-compose up` from `services/server/`

## Running the Monitor

### Config

#### Chains to Monitor

First you need to provide which chains to monitor in a json file.

```json
[
  {
    "chainId": 1,
    "name": "Ethereum Mainnet",
    "rpc": ["http://localhost:8545", "https://mainnet.infura.io/v3/{INFURA_API_KEY}"],
  },
  {
    "chainId": 11155111,
    "name": "Ethereum Sepolia Testnet",
    "rpc": ["http://localhost:8545", "https://rpc2.sepolia.org/ "],
  },
  ...
]
```

Infura and Alchemy keys must be formatted as above in `{}`

See `./chains.json` for a full example and to see which chains we monitor ourselves. You can also use the [chainid.network/chains.json](https://chainid.network/chains.json) to find chains.

#### Monitor Config

Optionally you can pass a monitor config in a `config.json` file. If you don't, the default config `src/defaultConfig.js` will be used. If you leave any field blank, it will be filled with the default config.

The structure of the file is as such:

```js
  decentralizedStorages: {
    ipfs: {
      enabled: true,
      gateways: ["https://ipfs.io/ipfs/", "http://localhost:8080/ipfs/"],
      // Time when the request to the gateway will timeout i.e. canceled in ms
      timeout: 30000,
      // Time between each request to the gateway in ms
      interval: 5000,
      // Number of retries before giving up
      retries: 5,
    },
    // can also have swarm
  },
  // Sourcify instances to verify the contracts on. Can be multiple
  sourcifyServerURLs: ["https://sourcify.dev/server/", "http://localhost:5555/"],
  defaultChainConfig: {
    // Block to start monitoring from. If undefined, it will start from the latest block by asking the RPC `eth_blockNumber`
    startBlock: undefined,
    // Time between each block check in ms. This value is dynamically adjusted based on the block time.
    // When a block is successfully fetched, it's decreased by `blockIntervalFactor`, and vice versa.
    blockInterval: 10000,
    // The factor to increase/decrease the block interval by. Must be greater than 1.
    blockIntervalFactor: 1.1,
    // The upper and lower limit of the block interval in ms
    blockIntervalUpperLimit: 300000,
    blockIntervalLowerLimit: 100,
    // Time between each `eth_getCode` requets in ms
    bytecodeInterval: 5000,
    // Number of retries before giving up getting the contract bytecode.
    bytecodeNumberOfTries: 5,
  },
  // Can also pass each chain the same config as above. Non specified fields will be filled with the defaultChainConfig. Non specified chains will use the whole defaultChainConfig.
  chainConfigs: {
    1: {
      startBlock: 10000000,
      blockInterval: 12000, // Ethereum mainnet is set to 12s
    }
  }
```

#### Environment variables

By default you can pass the following environment variables in `.env.template` for authenticating with the RPCs:

```bash
# If your RPCs are Alchemy or Infura
# In the rpc url it must have {INFURA_API_KEY} or {ALCHEMY_API_KEY}
ALCHEMY_API_KEY=
INFURA_API_KEY=

# ethpandaops.io authentication
CF_ACCESS_CLIENT_ID=
CF_ACCESS_CLIENT_SECRET=
```

### Running with Docker

The recommended way to run the Sourcify Monitor is via Docker.

You need to pass the `chains.json` and `config.json` files to the container. You can do this by mounting them as volumes:

```bash
docker run \
  -v /path/to/chains.json:/home/app/services/monitor/chains.json \
  -v /path/to/config.json:/home/app/services/monitor/config.json \
  -e ALCHEMY_API_KEY=xxx \
  -e INFURA_API_KEY=xxx \
  ethereum/source-verify:monitor-stable
```

The containers are at [Docker Hub](https://hub.docker.com/r/ethereum/source-verify/tags).

### Running without Docker

- [Node.js](https://nodejs.org/en/) v18 or higher

Clone the [Sourcify monorepo](https://github.com/ethereum/sourcify)

```bash
git clone git@github.com:ethereum/sourcify.git
cd sourcify
```

Add environment variables to `.env.template` and rename it to `.env`

```bash
ALCHEMY_API_KEY=
INFURA_API_KEY=
```

```bash
npm install && npx lerna run build
```

```bash
cd services/monitor
npm start
```

## Running the UI

### Set Environment Variables

Create a copy of `ui/.env.development` and name it to `ui/.env.development.local`. Set the environment variables accordingly

```bash
REACT_APP_SERVER_URL=http://localhost:5555
REACT_APP_REPOSITORY_SERVER_URL=https://localhost:10000
REACT_APP_IPNS=repo.staging.sourcify.dev
REACT_APP_TAG=latest
```

`REACT_APP_AUTH0` variables are needed for authenticating CREATE2 verification. You can create an account in https://auth0.com/ and enter credentials with the correct callback.

### Run

```bash
cd ui/
npm start
```

## Running the Repository

The repository (https://repo.sourcify.dev) is a simple web UI on top of the file directory of the verified contracts. It runs [a fork of h5ai](https://github.com/sourcifyeth/h5ai) and is a submodule under the folder `/h5ai-nginx` in the Sourcify git repo. The origin is at [sourcifyeth/h5ai-nginx](https://github.com/sourcifyeth/h5ai-nginx/).

The easiest way to run the contract repository is to directly run the docker container using the docker-compose file `environments/repository.yaml`.

First, set the environment variables in `environments/.env` for the container:

```bash
# Repository path in the host machine
REPOSITORY_PATH_HOST=/path/to/repo
```

Make sure the folder exists with `mkdir -p /path/to/repo`

```bash
docker-compose -f environments/repository.yaml up
```

This will pull and run the `ethereum/source-verify:repository-${TAG}` docker container from [our Docker hub](https://hub.docker.com/r/ethereum/source-verify) on port `REPOSITORY_SERVER_EXTERNAL_PORT`.

You can also build your own container by changing the `image` of the container to a local container `build` context:

However you need to pull the `/h5ai-nginx` submodule as the folder will be initially empty:

```bash
git submodule update --init --recursive
```

```yaml
# environments/repository.yaml
services:
  repository:
    <<: *project-base
    # Comment/remove this line
    # image: ethereum/source-verify:repository-${TAG}
    # Add build fields like below.
    build:
      context: ../h5ai-nginx # Point to the /h5ai-nginx folder
      dockerfile: Dockerfile
    container_name: repository-${TAG}
    volumes:
```
