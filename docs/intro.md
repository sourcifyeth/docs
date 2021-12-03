---
sidebar_position: 1
---

# Sourcify Docs

Sourcify is a Solidity source code and metadata verification tool and repository. Sourcify lets viewing the underlying Solidity source code of smart contracts by matching the deployed bytecode with the given source codes. There are two types or matches:

- **Full Match**: A full match is when the both the bytecode and the metadata hash of the contract at a given address matches the provided source files and the metadata file. This means the given source files are exactly the same as the ones that are compiled and deployed.

- **Partial Match**: A partial match indicates that the deployed and the recompiled bytecodes match excluding the metadata hashes. This means the functionality of the given source files is the same with the contract deployed (similar to Etherscan) but the provided source files can contain differences in variable names, comments, spaces etc.

Learn more about how Sourcify matches contracts [here](/docs/matches).

## Repository

Matched contracts are kept both in the Sourcify repository and on IPFS. See an example:

- Sourcify reposiory: [https://repo.sourcify.dev/contracts/full_match/1/0x000000001f91b581BF90b0D07A6259dc083Cc838](https://repo.sourcify.dev/contracts/full_match/1/0x000000001f91b581BF90b0D07A6259dc083Cc838)
- IPFS (via gateway): [https://gateway.ipfs.io/ipns/k51qzi5uqu5dll0ocge71eudqnrgnogmbr37gsgl12uubsinphjoknl6bbi41p/contracts/full_match/1/0x000000001f91b581BF90b0D07A6259dc083Cc838/](https://gateway.ipfs.io/ipns/k51qzi5uqu5dll0ocge71eudqnrgnogmbr37gsgl12uubsinphjoknl6bbi41p/contracts/full_match/1/0x000000001f91b581BF90b0D07A6259dc083Cc838/)

## API

Sourcify provides an API to verify contracts and to retrieve the files of matched contracts.

See [API docs](/docs/API)

## Run your own Sourcify instance

Sourcify is fully open sourced and we want it to be as decentralized as possible. Run your own Sourcify instance by following the instructions: [Run your own](/docs/run-your-own)

## Pin the IPFS repo

You can also help us decentralize the repository by pinning the IPFS repository. See [IPFS](/docs/ipfs)

## Network support

We support many EVM based networks. Ideally you can run your own Sourcify but if you want network support check out [Network Support](/docs/network-support).

## Questions

Make sure you check the [F.A.Q.](https://gateway.ipfs.io/ipns/k51qzi5uqu5dll0ocge71eudqnrgnogmbr37gsgl12uubsinphjoknl6bbi41p/contracts/full_match/1/0x000000001f91b581BF90b0D07A6259dc083Cc838/) and use the search bar in the docs. You can also reach out to us on [Gitter](https://gitter.im/ethereum/source-verify) or [Matrix chat](https://matrix.to/#/#ethereum_source-verify:gitter.im)
