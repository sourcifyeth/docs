---
id: tests
title: Tests
slug: /tests
---

# Tests

## Running

Run all tests with

```
npx lerna run lerna-test
```

## Chain tests

Additionally, tests for supported chains are defined under `test/chains/chain-tests.js`. These test don't run with the above command `npx lerna run test --stream` as only tests directly under `test/` folder are run and not recursively.

It is possible to run the tests for all chains with `npm run test:chains` inside the `services/server` package. This test will be run weekly with the `test-chains-regularly` CircleCI workflow to keep track of the supported chains. Also, when adding new chains, it is possible to run tests for a single chain. See [Chain Support](/docs/chain-support).
