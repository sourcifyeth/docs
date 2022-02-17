# Sourcify Docs

Documentation for [sourcify.eth](https://github.com/ethereum/sourcify).

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```
$ npm install
```

## Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

### Github Pages

The repo can be hosted at Github Pages easily

```
$ DEPLOYMENT_BRANCH=main GIT_USER=<Your GitHub username> USE_SSH=true npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Docker

The website can be served inside a minimal nginx container. [Dockerfile](/Dockerfile) will install and build the website, and serve the built files in container's port 80. The container can be run manually or via the [docker-compose.yaml](/docker-compose.yaml) which will run on port 2345 of the host.

Simply run

```
docker-compose up -d
```

If you made changes, rebuild the container to update:

```
docker-compose up --build -d
```
