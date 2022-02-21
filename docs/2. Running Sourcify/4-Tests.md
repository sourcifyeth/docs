---
id: tests
title: Tests
slug: /tests
---

# Tests

## Running

There are tests for two modules:

- Server and monitor: `test/`
- Validation: `services/validation/test`

Run all tests with

```
npx lerna run test --stream
```

## Network tests

Additionally, tests for supported networks are defined under `test/networks/network-tests.js`. These test don't run with the above command `npx lerna run test --stream` as only tests directly under `test/` folder are run and not recursively.

These test run verifications for already existing contracts on each network. On test networks, the contract with immuatables under `test/networks/sources/shared` are deployed and used for tests. For other networks test sources are stored under `test/networks/sources/{chainId}`. When found, contracts with immutables are used for testing.

It is possible to run the tests for all networks with `npm run test:networks`. This test will be run weekly with the `test-networks-regularly` CircleCI workflow to keep track of the supported networks. Also, when adding new networks, it is possible to run tests for a single network. See [Chain Support](/docs/chain-support).

## Sources

`test/sources` contains contracts, compilation artifacts and metadata files which can be used for
building test cases.

- **contracts/**: Solidity files (browser tests)
- **metadata/**: raw metadata files (browser tests)
- **pass/**: compilation artifacts which should verify (unit tests)
- **fail/**: compilation artifacts which should not verify (unit tests)
- **compiler.json**: compiler config for generating more cases

Test sources are compiled with 0x's [sol-compiler][22]. This lets you pick any compiler version or
settings by modifying the `compiler.json` file as needed.

To generate more test data, go to the `test/sources` directory, add Solidity files to the
`contracts` folder and run:

```
npx sol-compiler
```

Compilation artifacts will be written to an `artifacts` folder.

[22]: https://sol-compiler.com/
