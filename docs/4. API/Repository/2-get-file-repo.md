---
id: get-file-repo
slug: /api/server/get-file-repo
---

# Get file from repo.sourcify.dev

Gets the file from the repository server (http://repo.sourcify.dev and http://repo.staging.sourcify.dev)

**URL** : `http://<repository-host>/contracts/:full_match | partial_match/:chain/:address/:filePath`

**Method** : `GET`

## Responses

**Condition** : The file is found at the path.

**Code** : `200 OK`

**Content** : File content

### OR

**Condition** : Chain is not available as both full match or partial match in the repository.

**Code** : `404 Not Found`

**Content** :

```
404 Not Found
```

## Example

GET https://repo.sourcify.dev/contracts/full_match/100/0xC4c622862a8F548997699bE24EA4bc504e5cA865/metadata.json
