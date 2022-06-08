---
id: check-by-addresses
title: Check by addresses (full match)
slug: /api/server/check-by-addresses
---

# Check by addresses (full match)

Checks if contract with the desired chain and address is verified and in the repository.

It will only search for **perfect matches**.

**URL** : `check-by-addresses?addresses={addresses}&chainIds={chainIds}`

**URL (deprecated)** : `checkByAddresses?addresses={addresses}&chainIds={chainIds}`

**Method** : `GET`

## Example

```
curl "https://sourcify.dev/server/check-by-addresses?addresses=0xEb30853fc616Bbb8f1444451A3c202cbcd08Fb47,0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4,0x0a06cc1Ce1105d90ce01752813449A029906aD7b&chainIds=1,3,4,5,42,137,43114"
```

## Response

**Code** : `200 OK`

**Content** :

```json
[
  {
    "address": "0xEb30853fc616Bbb8f1444451A3c202cbcd08Fb47",
    "status": "perfect",
    "chainIds": [
      "43114",
      "137"
    ]
  },
  {
    "address": "0x00878Ac0D6B8d981ae72BA7cDC967eA0Fae69df4",
    "status": "perfect",
    "chainIds": [
      "5"
    ]
  }
]
```
