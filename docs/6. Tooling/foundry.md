---
id: foundry
title: Foundry
slug: /tooling/foundry
---

# Foundry

Foundry natively supports Sourcify verification. You can verify contracts with the additional verify flags in Forge:

```
forge create Contract --verify --verification-provider sourcify
```

```
forge verify-contract <address> --verifier sourcify
```

```
forge verify-check <address> --verifier sourcify
```
