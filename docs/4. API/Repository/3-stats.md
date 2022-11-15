---
id: stats
slug: /api/repository/stats
---

# Repository statistics

Gets the Repository statistics, returning a list of the count of `full_match` and `partial_match` for each chain

**URL** : `http://<repository-host>/stats.json`

**Method** : `GET`

## Example

GET https://repo.sourcify.dev/stats.json

## Responses

**Condition** : The stats are return succefully.

**Code** : `200 OK`

**Content** :

```json
{
  "11155111": {
    "full_match": 147,
    "partial_match": 1
  },
  "71401": {
    "full_match": 34,
    "partial_match": 2
  },
  "62621": {
    "full_match": 23,
    "partial_match": 2
  },
  "41": {
    "full_match": 235,
    "partial_match": 8
  },
  "5700": {
    "full_match": 10,
    "partial_match": 1
  },
  "44787": {
    "full_match": 3756,
    "partial_match": 111
  },
  "43113": {
    "full_match": 11448,
    "partial_match": 40
  },
  "534": {
    "full_match": 10,
    "partial_match": 1
  },
  "57": {
    "full_match": 13,
    "partial_match": 0
  },
  "1285": {
    "full_match": 18,
    "partial_match": 18
  },
  "420666": {
    "full_match": 26,
    "partial_match": 2
  },
  "82": {
    "full_match": 191,
    "partial_match": 92
  },
  "288": {
    "full_match": 286,
    "partial_match": 54
  },
  "100": {
    "full_match": 2633,
    "partial_match": 573
  },
  "56": {
    "full_match": 464,
    "partial_match": 6150
  },
  "9001": {
    "full_match": 53,
    "partial_match": 4
  },
  "62320": {
    "full_match": 38,
    "partial_match": 2
  },
  "1284": {
    "full_match": 7,
    "partial_match": 0
  },
  "421613": {
    "full_match": 50,
    "partial_match": 0
  },
  "11111": {
    "full_match": 59,
    "partial_match": 0
  },
  "10": {
    "full_match": 1070,
    "partial_match": 32
  },
  "73799": {
    "full_match": 1,
    "partial_match": 0
  },
  "8": {
    "full_match": 9,
    "partial_match": 1
  },
  "43114": {
    "full_match": 7857,
    "partial_match": 74
  },
  "3": {
    "full_match": 66378,
    "partial_match": 10172
  },
  "80001": {
    "full_match": 61866,
    "partial_match": 314
  },
  "137": {
    "full_match": 23159,
    "partial_match": 245
  },
  "44": {
    "full_match": 1,
    "partial_match": 0
  },
  "1287": {
    "full_match": 9,
    "partial_match": 0
  },
  "122": {
    "full_match": 36,
    "partial_match": 14
  },
  "106": {
    "full_match": 30,
    "partial_match": 2
  },
  "77": {
    "full_match": 1044,
    "partial_match": 23
  },
  "69": {
    "full_match": 11378,
    "partial_match": 268
  },
  "1313161555": {
    "full_match": 20,
    "partial_match": 0
  },
  "4": {
    "full_match": 116512,
    "partial_match": 7346
  },
  "53935": {
    "full_match": 1,
    "partial_match": 1
  },
  "420": {
    "full_match": 64,
    "partial_match": 1
  },
  "83": {
    "full_match": 311,
    "partial_match": 12
  },
  "28": {
    "full_match": 358,
    "partial_match": 50
  },
  "103090": {
    "full_match": 1,
    "partial_match": 0
  },
  "42161": {
    "full_match": 1265,
    "partial_match": 6
  },
  "11297108109": {
    "full_match": 43,
    "partial_match": 9
  },
  "71402": {
    "full_match": 11,
    "partial_match": 5
  },
  "9000": {
    "full_match": 10,
    "partial_match": 3
  },
  "7700": {
    "full_match": 5,
    "partial_match": 31
  },
  "42220": {
    "full_match": 1952,
    "partial_match": 320
  },
  "1313161554": {
    "full_match": 39,
    "partial_match": 3
  },
  "42": {
    "full_match": 36876,
    "partial_match": 8355
  },
  "421611": {
    "full_match": 4198,
    "partial_match": 3
  },
  "97": {
    "full_match": 817,
    "partial_match": 3325
  },
  "40": {
    "full_match": 199,
    "partial_match": 36
  },
  "11297108099": {
    "full_match": 269,
    "partial_match": 6
  },
  "1": {
    "full_match": 35454,
    "partial_match": 9377
  },
  "5": {
    "full_match": 25435,
    "partial_match": 1415
  }
}
```
