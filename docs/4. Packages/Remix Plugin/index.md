---
id: remix_plugin
title: Overview
slug: /packages/remix_plugin
---

# Verification with Libraries

If the contract to be verified has libraries Sourcify will extract them and save in a file called `library-map.json` in the repository.

Check out these examples:

- [Görli 0x023735217A43724042055D0C365e108517EC69Cb](https://repo.sourcify.dev/contracts/full_match/5/0x023735217A43724042055D0C365e108517EC69Cb/)
- [Rikeby 0x705bF4e3CCbF37B0cE5dE86B3F606e640A2a40BD](https://repo.sourcify.dev/contracts/full_match/4/0x705bF4e3CCbF37B0cE5dE86B3F606e640A2a40BD/)

Sourcify recompiles the contract and currently looks for library address placeholders starting with `__$` and find the library address in the deployed contract at the same position.

:::caution

Since Solidity [v0.7.5](https://docs.soliditylang.org/en/v0.7.5/contracts.html#:~:text=__%2430bbc0abd4d6364515865950d3e0d10953%24__), the placeholders are of format `__$<libraryNameHash>$__` but before [v0.7.5](https://docs.soliditylang.org/en/v0.7.4/contracts.html#:~:text=contain%20placeholders%20of%20the%20form) the format was `__<LibraryName>__`. Therefore Sourcify currently cannot extract library addresses for older versions.

:::
