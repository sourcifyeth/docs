---
id: foundry
title: Foundry
slug: /tooling/foundry
---

# Foundry

Foundry natively supports Sourcify verification. You can verify contracts with the additional verify flags in Forge:

Deploy and verify a contract:

```
forge create --rpc-url <your_rpc_url> \
  --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 \
  --private-key <your_private_key> \
  src/MyToken.sol:MyToken \
  --verify \
  --verification-provider sourcify
```

```
forge verify-contract MyToken \
 0x55f7d4279CE387067f12561e7E0c194f5186cFba \
  --chain-id 11155111 \
  --verifier sourcify
```

```
forge verify-check 0x55f7d4279CE387067f12561e7E0c194f5186cFba \
  --chain-id 11155111 \
  --verifier sourcify
```
