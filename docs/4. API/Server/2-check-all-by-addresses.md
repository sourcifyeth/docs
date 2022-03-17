---
id: check-all-by-addresses
title: Check all by addresses (full or partial match)
slug: /api/server/check-all-by-addresses
---

# Check by addresses (full or partial match)

Checks if contract with the desired chain and address is verified and in the repository.

It will search for both perfect and partial matches.

**URL** : `check-all-by-addresses?addresses={addresses}&chainIds={chainIds}`

**URL (deprecated)** : `checkAllByAddresses?addresses={addresses}&chainIds={chainIds}`

**Method** : `GET`

## Example

```
curl "https://sourcify.dev/server/check-all-by-addresses?addresses=0xEb30853fc616Bbb8f1444451A3c202cbcd08Fb47,0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4,0x0a06cc1Ce1105d90ce01752813449A029906aD7b&chainIds=1,3,4,5,42,137,43114"
```

## Response

**Code** : `200 OK`

**Content** :

```json
[
  {
    "address": "0xEb30853fc616Bbb8f1444451A3c202cbcd08Fb47",
    "chainIds": [
      {
        "chainId": "43114",
        "status": "perfect"
      },
      {
        "chainId": "137",
        "status": "perfect"
      },
      {
        "chainId": "5",
        "status": "partial"
      }
    ]
  },
  {
    "address": "0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4",
    "chainIds": [
      {
        "chainId": "5",
        "status": "perfect"
      }
    ]
  },
  {
    "address": "0x0a06cc1Ce1105d90ce01752813449A029906aD7b",
    "chainIds": [
      {
        "chainId": "3",
        "status": "perfect"
      }
    ]
  }
]
```
