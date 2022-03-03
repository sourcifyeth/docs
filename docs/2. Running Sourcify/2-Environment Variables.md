---
id: env-vars
title: Environment Variables
description: Environment variable settings
slug: /env-vars
---

# Environment Variables

Sourcify looks at `environments/.env` file when running and assigning environment variables.

Current deployment reads from the two templates:

- `environments/.env.latest` on the staging branch
- `environments/.env.stable` on the master branch

The variables set as `VARIABLE=xxx` are secrets. During deployment and end-to-end testing, these are replaced with the script `scripts/find_replace.sh` using the decrypted values in `environments/.env.secrets.gpg`. The secrets file (and the ipfs keys) can be decrypted using `scripts/decrypt.sh`, and encrypted using `scripts/encrypt.sh`, both scripts requiring the `SECRET_KEY` environment variable.

You can copy `.env-latest` and rename to `.env` initially. Then set the variables below accordingly.

```bash
# Monitor config
MONITOR_EXTERNAL_PORT=3000
MONITOR_PORT=80
MONITOR_FETCH_TIMEOUT=300000

# UI config
UI_EXTERNAL_PORT=1234 # Port on host when containerized see environments/ui.yaml
UI_DRAFT_EXTERNAL_PORT=1236 # Port of draft ui on host when containerized
UI_PORT=1234

# Server config
SERVER_EXTERNAL_PORT=5000 # Port on host when containerized see environments/server.yaml
SERVER_PORT=5000 # Port server runs on. Change to another value for local run e.g. 5000
SERVER_URL=https://localhost:5000/ # Change to localhost:$SERVER_PORT for local run
SOLC_REPO_HOST=/tmp/solc # Path where Solidity compiler binaries will be saved. e.g. /home/user/solc/bin
SOLC_REPO=/home/data/solc-bin/linux-amd64 # Path inside the container where Solidity compiler binaries will be saved
SOLJSON_REPO_HOST=/tmp/repo # Path where Solidity JS (solc-js) compilers are saved e.g. /home/user/solc/js
SOLJSON_REPO=/home/data/solc-bin/soljson # Path inside the container where Solidity JS (solc-js) compilers are saved.
SESSION_SECRET=xxx # Secret used to sign the session ID cookie

# Localchain config # Used for testing with Ganache network.
LOCALCHAIN_PORT=8545
LOCALCHAIN_EXTERNAL_PORT=8545
LOCALCHAIN_URL=http://localchain:8545

# Repository config
REPOSITORY_EXTERNAL_PORT=10000 # Port on host see environments/repository.yaml
REPOSITORY_PORT=80 # Port on container see environments/repository.yaml
REPOSITORY_URL=https://localhost:1000  # Change to localhost:$REPOSITORY_EXTERNAL_PORT running locally
REPOSITORY_PATH=/tmp/repository # Path on host where verified contracts will be saved
DATABASE_PATH=/tmp/database # Unused

# S3 config # For regular backups
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
BUCKET_NAME=s3://sourcify-backup-s3

# IPFS config
IPFS_SECRET=xxx # Key for managing IPNS name
IPFS_GW_EXTERNAL_PORT=8080 # Gateway port on host with Docker see environments/ipfs.yaml
IPFS_LIBP2P_EXTERNAL_PORT=4001 # Swarm port on host with Docker see environments/ipfs.yaml
IPFS_API_EXTERNAL_PORT=5001 # IPFS API port on host with Docker see environments/ipfs.yaml
IPNS=k51qzi5uqu5dkuzo866rys9qexfvbfdwxjc20njcln808mzjrhnorgu5rh30lb
IPFS_URL=https://ipfs.io/ipfs/ # URL to an IPFS gateway e.g. https://ipfs.io/ipfs/ or if you run a local IPFS node http://localhost:8080/ipfs/ or http://ipfs-container-name:8080/ipfs/ etc.
# IPs to announce with the ipfs id
PUBLIC_IP=xxx # Public IP of the host for announcing Swarm Addresses
LOCAL_IP=xxx # Local IP of the host for announcing Swarm Addresses in LAN

# Fetch config
FETCH_TIMEOUT=3000 # IPFS fetching timeout

# ENS config
ENS_SECRET=xxx # Not used

# Database config # Postgres DB config for storing contract creation transactions. See https://github.com/sourcifyeth/go-ethereum#go-ethereum-sourcify
POSTGRES_USER=sourcify
POSTGRES_PASSWORD=password
POSTGRES_DB=sourcify
HOST=postgres
POSTGRES_PORT=5432

# Monitoring config # Not used
LOKI_URL=http://loki:3100/loki/api/v1/push

# NPM config
NPM_TOKEN=xxx # To publish to npm

# Custom nodes # if you want to use own RPCs
NODE_ADDRESS=http://10.10.42.102
NODE_PORT_MAINNET=8541
NODE_PORT_RINKEBY=8544
NODE_PORT_GOERLI=8545
NODE_PORT_ROPSTEN=8543

# Other config
TESTING=false
TAG=latest
NODE_ENV=development
INFURA_ID=xxx # Not used
ALCHEMY_ID_ETH_MAINNET=xxx
ALCHEMY_ID_ETH_GOERLI=xxx
ALCHEMY_ID_ETH_RINKEBY=xxx
ALCHEMY_ID_ETH_ROPSTEN=xxx
ALCHEMY_ID_ETH_KOVAN=xxx
ALCHEMY_ID_POLYGON_MAINNET=xxx
ALCHEMY_ID_POLYGON_MUMBAI=xxx
```
