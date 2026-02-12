---
id: storage-services
title: Storage Services
slug: /storage-services
---

# Storage Services

Sourcify stores the result of compilation and verification in multiple ways so data remains available across different systems.

## Database

Sourcify's main source of information is its own [database](/docs/repository/sourcify-database/).

## External verifier submissions

Sourcify is forwarding successful matches to external verifiers (Routescan, Blockscout and Etherscan). See [Automatic verification on external verifiers](/docs/external-verifiers/) for details.

## IPFS via Filebase

Sourcify stores verification artifacts in [Filebase](https://filebase.com/), an S3-compatible service that mirrors content on IPFS). This setup keeps [metadata files](/docs/metadata) available through IPFS. See [the playground](https://playground.sourcify.dev) to understand how to fetch the metadata file through IPFS starting from the contract's bytecode.

## Verifier Alliance

Sourcify stores the verification data in the [Verifier Alliance](https://verifieralliance.org), a shared database between Routescan, Blockscout, and Sourcify.
