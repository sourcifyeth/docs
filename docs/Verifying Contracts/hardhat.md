---
title: Hardhat Verification
slug: /verify/hardhat
---

# Hardhat Verification

Hardhat stores the outputs of the compilations under the `artifacts/build-info/` folder inside the project. The `.json` file under the folder contains the [Standard JSON Input/Output](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) of the Solidity compiler for all contracts.

Since [v2.6.8](https://github.com/nomiclabs/hardhat/releases/tag/hardhat%402.6.8), Hardhat outputs the metadata files of each contract by default under the JSON's `.output.contracts.<contract-path>.<contract-name>.metadata` field. You don't have to extract the metadata manually. To verify via the Hardhat output:

1. Drag and drop the `.json` file at [sourcify.dev](https://sourcify.dev).
2. Select the main contract deployed at the address you want to verify.
3. Input the address and network and click "Verify".

<div>
  <video width="100%" height="100%" playsinline autoplay muted controls>
    <source src="/videos/hardhat-sourcify.mp4" type="video/mp4" />
  </video>
</div>

## Earlier than v2.6.8

If you use an earlier version of Hardhat than 2.6.8 you can modify the `hardhat-config.js` manually to output metadata inside the `build-info/` file:

```json
{
...
solidity: {
  settings: {
        optimizer: optimizerConfig,
        outputSelection: {
          "*": {
            "*": [
              "abi",
              "evm.bytecode",
              "evm.deployedBytecode",
              "evm.methodIdentifiers",
              "metadata",
            ],
            "": ["ast"],
          },
        },
      },
  }
}
```

In theory, if you haven't changed any of the compilation settings, it should result in the same metadata file and you should get a full match. Otherwise you will be able to get a partial match only.
