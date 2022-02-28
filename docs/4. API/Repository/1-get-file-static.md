---
id: get-file-static
slug: /api/repository/get-file-static
---

# Get file from /repository

Retrieve staticly served files over the server.

**URL** : `/server/repository/contracts/:full_match | partial_match/:chain/:address/:filePath`

**Method** : `GET`

## Responses

**Condition** : The file is found at the path.

**Code** : `200 OK`

**Content** : File content

### OR

**Condition** : The file is not found at the path

**Code** : `404 Not Found`

**Content** :

```
Cannot GET <URL>
```

## Example

GET [https://sourcify.dev/server/repository/contracts/full_match/1/0xca2ad74003502af6B727e846Fab40D6cb8Da0035/metadata.json](https://sourcify.dev/server/repository/contracts/full_match/1/0xca2ad74003502af6B727e846Fab40D6cb8Da0035/metadata.json)
