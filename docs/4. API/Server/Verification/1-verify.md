---
id: verify
title: Verify contract
slug: /api/server/verify
---

# Attempt contract verification

Sends provided files for verification.

**URL** : `/verify` or `/`

**Method** : `POST`

**Content-Type** : `multipart/form-data` or `application/json`

Regardless of the Content-Type, the body should provide:

- `address`
- `chain`
- `chosenContract` (optional) index of the contract, if the provided files contain multiple metadata files (i.e. multiple contracts). For instance [hardhat outputs](/docs/how-to-verify/#with-hardhat-output) contain the metadata file of all contracts used.
- `contextVariables` (optional) are used to simulate the contract creation by executing the contract's creation code with these variables. For example, if the contract sets the `immutable owner` to `msg.sender`, then the `msgSender` has to be provided for a match. These will be saved under the contract folder as `context-variables.json` later for the reproducability of the verification.
- `creatorTxHash` (optional) the transaction that created the contract. Will be used to compare creation bytecodes if the contracts was created by a simple contract creation tx which contains the contract's creation bytecode. If left empty, the Sourcify server will fetch it from an API or block explorer given in [`sourcify-chains.ts`](https://github.com/ethereum/sourcify/blob/staging/src/sourcify-chains.ts). When the contract is verified with this field (or when it's fetched by the Sourcify server), the tx hash will be saved in `creator-tx-hash.txt` in the contract folder.

If using `multipart/form-data`, the files should be in a field named `files`. You can also pass `abiEncodedConstructorArguments` and `msgSender` directly in form-data as form-data does not allow nested objects.
If using `application/json`, the files should be in an object under the key `files` so the whole object is of the form:

```json
{
    "address": ...,
    "chain": ...,
    "files": {
        "metadata-1.json": ...,
        "metadata-2.json": ...,
        "file-name1.sol": ...,
        "file-name2.sol": ...
    },
    // optional
    "chosenContract": 1,
    // optional
    "contextVariables": {
      "abiEncodedConstructorArguments": ...,
      "msgSender": ...
    },
    // optional
    "creatorTxHash": ...
}
```

## Responses

**Condition** : The recompiled contract matches the deployed version `perfect`ly.

**Code** : `200 OK`

**Content** :

```json
{
  "result": [
    {
      "address": "0x0001Db7722Fb4211C24d4aC5E1127353116323d3",
      "status": "perfect"
    }
  ]
}
```

---

**Condition** : The recompiled contract matches the deployed version `partial`ly.

**Code** : `200 OK`

**Content** :

```json
{
  "result": [
    {
      "address": "0x0001Db7722Fb4211C24d4aC5E1127353116323d3",
      "status": "partial"
    }
  ]
}
```

---

**Condition** : The contract at the provided address and chain has already been sourcified at timestamp indicated by `storageTimestamp`.

**Code** : `200 OK`

**Content** :

```json
{
  "result": [
    {
      "address": "0x0001Db7722Fb4211C24d4aC5E1127353116323d3",
      "status": "perfect",
      "storageTimestamp": "2020-11-10T14:12:15.665Z"
    }
  ]
}
```

---

**Condition** : Missing or invalid parameters received.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "message": "Validation Error: address, chain",
  "errors": [
    {
      "field": "address",
      "message": "Invalid value"
    },
    {
      "field": "chain",
      "message": "Invalid value"
    }
  ]
}
```

---

**Condition** : Provided valid address and chain input, but no files. This is interpreted as simply checking whether the contract at the provided address and chain has already been sourcified.

**Code** : `404 Not Found`

**Content** :

```json
{
  "error": "The contract at the provided address has not yet been sourcified."
}
```

---

**Condition** : Recompiled bytecode does not match the deployed bytecode.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "error": "The deployed and recompiled bytecode don't match."
}
```

---

**Condition** : The provided chain does not have a contract deployed at the provided address.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "error": "Contract name: RandomName. Ethereum Mainnet does not have a contract deployed at 0x7c90F0C9Eb46391c93d0545dDF4658d3B8DF1866."
}
```

---

**Condition** : The provided chain is temporarily unavailable.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "error": "Contract name: RandomName. Ethereum Mainnet is temporarily unavailable."
}
```

---

**Condition** : Some resources are missing and could not be fetched.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "error": "Resource missing; unsuccessful fetching: browser/RandomName.sol"
}
```

---

**Condition** : Verifying contracts with immutable variables is not supported for the provided chain.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
  "error": "Contract name: RandomName. Verifying contracts with immutable variables is not supported for Ethereum Mainnet."
}
```
