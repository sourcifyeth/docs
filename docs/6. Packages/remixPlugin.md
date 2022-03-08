---
id: remix_plugin
title: Remix Plugin
slug: /packages/remix_plugin
---

# Sourcify Remix Plugin

Sourcify has a remix plugin to aid with contract verification and lookup.
The plugin can be found in this repository [https://github.com/sourcifyeth/remix-sourcify](https://github.com/sourcifyeth/remix-sourcify)

## Verifying
[![Verifier](https://cdn.loom.com/sessions/thumbnails/b203977174b3444ea5b223ae45250580-with-play.gif)](https://www.loom.com/share/b203977174b3444ea5b223ae45250580 "Verifier")

## Fetching
[![Fetcher](https://cdn.loom.com/sessions/thumbnails/5b6cb81a9fae4dd1ad3cee6a1e658af1-with-play.gif)](https://www.loom.com/share/5b6cb81a9fae4dd1ad3cee6a1e658af1 "Fetcher")

## Installation
1. Navigate to the Remix Plugin manager
2. Search for `Sourcify` and click on Activate when you see it.
3. Another option would be to click on the Sourcify logo on Remix Homepage to activate the plugin

## Usage

### Verification:
1. Compile smart contract using the Remix solidity compiler
2. Navigate to sourcify plugin, the compiled contract is auto-magically loaded and ready for you to verify.

### Lookup:
1. Select the appropriate chain
2. Provide the correct contract address
3. Click on Fetch to retrieve the contract

> Note: The contract fetched will be immediately opened on Remix, so you are able to instantly see the contracts you looked-up.

## Contribution

Development requires interaction with [Remix plugins directory](https://github.com/ethereum/remix-plugins-directory).

When publishing a new version of the plugin:
 - build and test (`npm run build` and `npm run serve`)
 - publish to IPFS (target the dist folder with this [script](https://github.com/ethereum/remix-plugins-directory/blob/master/tools/ipfs-upload/bin/upload-remix-plugin))

 ```bash
  git clone https://github.com/ethereum/remix-plugins-directory
  cd remix-plugins-directory/tools
  npm i
  node ipfs-upload/bin/upload-remix-plugin <path to dist folder>
 ```

 - load plugin locally, using the generated IPFS Url
    1. Click on the plugin icon
    2. Click on add local plugin
    3. Specify plugin URL. In this case our IPFS URL, for example: `ipfs://xxxxx`
    4. And Voila 🎉
 - Make a PR changing the IPFS URL (and possibly other properties) in the plugin [profile](https://github.com/ethereum/remix-plugins-directory/blob/master/plugins/source-verifier/profile.json)