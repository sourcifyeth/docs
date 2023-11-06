---
id: docker
title: Docker Containers
description: Containerized Sourcify Modules
slug: /docker-containers
---

# Server

Server is into the `services/server` folder. We provide a `docker-compose.yml` file for convenience.

To run in a container you can use this compose file and provide these environment variables for your host machine:

```bash
DOCKER_HOST_SERVER_PORT=
DOCKER_HOST_SOLC_REPO=
DOCKER_HOST_SOLJSON_REPO=
DOCKER_HOST_REPOSITORY_PATH=
```

Also update these as these will be different in the container than in your host machine:

```bash
SERVER_PORT=5555
SOLC_REPO=/data/solc-bin/linux-amd64
SOLJSON_REPO=/data/solc-bin/soljson
REPOSITORY_PATH=/data/repository
```

Then run:

```bash
docker-compose up
```

# Monitor

See [Running Locally](/docs/run-locally/#running-the-monitor) to learn more about the monitor's configuration.

```bash
docker run \
  -v /path/to/chains.json:/home/app/services/monitor/chains.json \
  -v /path/to/config.json:/home/app/services/monitor/config.json \
  -e ALCHEMY_API_KEY=xxx \
  -e INFURA_API_KEY=xxx \
  ethereum/source-verify:monitor-stable
```
