---
sidebar_position: 1
slug: /api
---

# Overview

Sourcify provides a public server API for verification, and checking if a contract is verified, and a repository API for retrieving files.

## Repository

There are two ways to access files in the repository:

- [Get file from /repository](/docs/api/repository/get-file-static): `GET /repository/contracts/:full_match | partial_match/:chain/:address/:filePath`
- [Get file from repo.sourcify.dev](/docs/api/repository/get-file-repository): `GET http://<repository-host>/contracts/:full_match | partial_match/:chain/:address/:filePath`

## Server

Deployed server APIs are: `https://sourcify.dev/server` and `https://staging.sourcify.dev/server`.

- [Check by addresses](/docs/api/server/check-by-addresses) : `GET /check-by-addresses?addresses={address}&chainIds={chainIds}`
- [Get file tree (full match)](/docs/api/server/get-file-tree-full) : `GET /files/tree/:chain/:address`
- [Get file tree (full or partial match)](/docs/api/server/get-file-tree-all) : `GET /files/tree/any/:chain/:address`
- [Get source files (full match)](/docs/api/server/get-source-files-full) : `GET /files/:chain/:address`
- [Get source files (full or partial match)](/docs/api/server/get-source-files-all) : `GET /files/any/:chain/:address`
- [Get contract addresses (full or partial match)](/docs/api/server/get-contract-addresses-all) : `GET /files/contracts/:chain`

### Verification API (v1)

- [Verify](/docs/api/server/v1/verify) : `POST /` or `POST /verify`

### Verification API (v2 - session based)

- [Add input files](/docs/api/server/v2/add-input-files) : `POST /input-files`
- [Get session data](/docs/api/server/v2/get-session-data) : `GET /session-data`
- [Restart session](/docs/api/server/v2/restart-session) : `POST /restart-session`
- [Verify validated](/docs/api/server/v2/verify-validated) : `POST /verify-validated`

## Other

- [Get Sourcify chains](/docs/api/chains): `GET /chains`
- [Server health](/docs/API/health) : `GET /health`
