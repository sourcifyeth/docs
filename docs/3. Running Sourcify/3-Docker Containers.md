---
id: docker
title: Docker Containers
description: Containerized Sourcify Modules
slug: /docker-containers
---

# Docker Containers

Different modules of Sourcify are built and run in Docker containers. The containers `build-*.yaml` are used for building the Docker images. These images are then pushed to the [ethereum/source-verify Docker hub](https://hub.docker.com/r/ethereum/source-verify/tags) with the CI workflows `build-publish-*` under [.circleci/config.yaml](https://github.com/ethereum/sourcify/blob/master/.circleci/config.yml). For example the server container is built with the [environments/build-server.yaml](https://github.com/ethereum/sourcify/blob/master/environments/build-server.yaml) which has the context [src/Dockerfile.server](https://github.com/ethereum/sourcify/blob/master/src/Dockerfile.server) file.
