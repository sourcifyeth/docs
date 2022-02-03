---
title: Adding EVM Chains to Sourcify
slug: /chain-support
---

# Chain Support

Do you want to verify contracts on an EVM chain? Great! We don't want to be the single source of truth and encourage you to run your own Sourcify instance, for a new chain or for chains that already have support.

If you still want to request an EVM chain to be supported by Sourcify, you can open a pull request in the repository with the **target branch staging**.

Also,

- Provide a test contract on the chain with address, source code, and metadata file in the pull request. Both for the testnet and the mainnet. This is required for us to test if the RPC and the verification is working.

- Make sure the chain is listed in [chains.json](https://github.com/ethereum/sourcify/services/core/src/chains.json). This file is kept in sync with [chainlist.org](https://chainlist.org/chains.json) and **should not be edited**.

- Add the chain details in [sourcify-chains.ts](https://github.com/ethereum/sourcify/services/core/src/sourcify-chains.ts) similar to other chains with `supported: true` and `monitored: false. If your chain uses an Etherscan or Blockscout fork, use the same regex for other chains with the same block explorer. This field is used for bytecode extraction when the onchain bytecode is not sufficient for verification. It is not a requirement.

- Add the chain to the front-end in [constants.ts](https://github.com/ethereum/sourcify/ui/src/common/constants.ts)
