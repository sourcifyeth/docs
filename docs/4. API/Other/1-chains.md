---
id: api-chains
slug: /api/chains
---

# Get Sourcify chains

Returns the chains (networks) added to the Sourcify. Contains both supported, unsupported, monitored, unmonitored chains. Formatted as a merge ofthe https://chainid.network/chains.json and [sourcify-chains.ts](https://github.com/ethereum/sourcify/blob/master/services/core/src/sourcify-chains.ts) output.

**URL** : `/chains`

**Method** : `GET`

## Responses

**Code** : `200 OK`

**Content** :

```json
[
  {
    "name":"Ethereum Mainnet",
    "chain":"ETH",
    "network":"mainnet",
    "icon":"ethereum","rpc":["http://10.10.42.102:8541","https://eth-mainnet.alchemyapi.io/session/uVKT9HTDecBZGdlgmxin4Urp6sNr-pN8"],
    "faucets":[],
    "nativeCurrency":{"name":"Ether","symbol":"ETH","decimals":18},
    "infoURL":"https://ethereum.org",
    "shortName":"eth",
    "chainId":1,
    "networkId":1,
    "slip44":60,
    "ens":{"registry":"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},
    "explorers":[{"name":"etherscan","url":"https://etherscan.io","standard":"EIP3091"}],
    // sourcify-chains.ts fields:
    "supported":true,
    "monitored":true,
    "contractFetchAddress":"https://etherscan.io/address/${ADDRESS}",
    "txRegex": "at txn\\s+<a href='\\/tx\\/(.*?)'"
  },
  {
    "name":"Ethereum Testnet Ropsten",
    "chain":"ETH",
    "network":"ropsten",
    ...
  },
...
]
```

## Example

GET https://sourcify.dev/chains
