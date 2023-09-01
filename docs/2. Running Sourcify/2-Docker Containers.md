---
id: docker
title: Docker Containers
description: Containerized Sourcify Modules
slug: /docker-containers
---

# Docker Containers

Different modules of Sourcify are built and run in Docker containers. The containers `build-*.yaml` are used for building the Docker images. These images are then pushed to the [ethereum/source-verify Docker hub](https://hub.docker.com/r/ethereum/source-verify/tags) with the CI workflows `build-publish-*` under [.circleci/config.yaml](https://github.com/ethereum/sourcify/blob/staging/.circleci/config.yml). For example the server container is built with the [environments/build-server.yaml](https://github.com/ethereum/sourcify/blob/staging/environments/build-server.yaml) which has the context [src/Dockerfile.server](https://github.com/ethereum/sourcify/blob/staging/src/Dockerfile.server) file.

You can run the services with the `docker-compose up` command. For example the following command runs the server, ui, and repo in the background (`-d`).

Make sure to set the Docker variables in the `.env` file properly:

```bash
# Docker config
## Relevant if your're running in a container
## Where to mount the downloaded compilers directory on the host machine
SOLC_REPO_HOST=/home/gather/staging/data/solc-bin/linux-amd64
SOLJSON_REPO_HOST=/home/gather/staging/data/solc-bin/bin
# Repository path in the host machine
REPOSITORY_PATH_HOST=/tmp/sourcify/repository
## Ports to access containers from the host
SERVER_EXTERNAL_PORT=5555
UI_EXTERNAL_PORT=1234
REPOSITORY_SERVER_EXTERNAL_PORT=10000
MONITOR_EXTERNAL_PORT=3000
IPFS_GW_EXTERNAL_PORT=5050
IPFS_LIBP2P_EXTERNAL_PORT=4002
IPFS_API_EXTERNAL_PORT=5002
SERVER_URL=https://staging.sourcify.dev/server
```

Run containers with:

```bash
cd environments/
```

```bash
docker-compose -f repository.yaml -f server.yaml -f ui.yaml up -f monitor.yaml -d
```
