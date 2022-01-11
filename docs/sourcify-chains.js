// declare empty vars here to allow copy pasting the returned object from sourcify/services/core/src/sourcify-chains.ts
const ETHERSCAN_REGEX = "";
const ETHERSCAN_SUFFIX = "";
const BLOCKSCOUT_SUFFIX = "";
const getCustomURL = () => null;
const createArchiveEndpoint = () => null;
const getBlockscoutRegex = () => null;
const TELOS_SUFFIX = "";

export default {
  1: {
    fullnode: {
      dappnode: "http://geth.dappnode:8545",
    },
    supported: true,
    monitored: true,
    contractFetchAddress: "https://etherscan.io/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("mainnet", "eth", true), getCustomURL("mainnet", "eth")],
    txRegex: ETHERSCAN_REGEX,
    archiveWeb3: createArchiveEndpoint("mainnet", "eth", true),
  },
  3: {
    fullnode: {
      dappnode: "http://ropsten.dappnode:8545",
    },
    supported: true,
    monitored: true,
    contractFetchAddress: "https://ropsten.etherscan.io/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("ropsten", "eth", true), getCustomURL("ropsten", "eth")],
    txRegex: ETHERSCAN_REGEX,
    archiveWeb3: createArchiveEndpoint("ropsten", "eth", true),
  },
  4: {
    fullnode: {
      dappnode: "http://rinkeby.dappnode:8545",
    },
    supported: true,
    monitored: true,
    contractFetchAddress: "https://rinkeby.etherscan.io/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("rinkeby", "eth", true), getCustomURL("rinkeby", "eth")],
    txRegex: ETHERSCAN_REGEX,
    archiveWeb3: createArchiveEndpoint("rinkeby", "eth", true),
  },
  5: {
    fullnode: {
      dappnode: "http://goerli-geth.dappnode:8545",
    },
    supported: true,
    monitored: true,
    contractFetchAddress: "https://goerli.etherscan.io/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("goerli", "eth", true), getCustomURL("goerli", "eth")],
    txRegex: ETHERSCAN_REGEX,
    archiveWeb3: createArchiveEndpoint("goerli", "eth", true),
  },
  42: {
    fullnode: {
      dappnode: "http://kovan.dappnode:8545",
    },
    supported: true,
    monitored: true,
    contractFetchAddress: "https://kovan.etherscan.io/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("kovan", "eth")],
    txRegex: ETHERSCAN_REGEX,
    archiveWeb3: createArchiveEndpoint("kovan", "eth"),
  },
  56: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://bscscan.com/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  77: {
    supported: true,
    monitored: true,
    contractFetchAddress:
      "https://blockscout.com/poa/sokol/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex("/poa/sokol"),
  },
  82: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://scan.meter.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  97: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://testnet.bscscan.com/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  100: {
    supported: true,
    monitored: true,
    contractFetchAddress:
      "https://blockscout.com/xdai/mainnet/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex("/xdai/mainnet"),
  },
  137: {
    supported: true,
    monitored: true,
    contractFetchAddress: "https://polygonscan.com/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("mainnet", "polygon")],
    txRegex: ETHERSCAN_REGEX,
  },
  42220: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://explorer.celo.org/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  44787: {
    supported: true,
    monitored: false,
    contractFetchAddress:
      "https://alfajores-blockscout.celo-testnet.org/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  62320: {
    supported: true,
    monitored: false,
    contractFetchAddress:
      "https://baklava-blockscout.celo-testnet.org/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  80001: {
    supported: true,
    monitored: true,
    contractFetchAddress: "https://mumbai.polygonscan.com/" + ETHERSCAN_SUFFIX,
    rpc: [getCustomURL("mumbai", "polygon")],
    txRegex: ETHERSCAN_REGEX,
  },
  421611: {
    supported: true,
    monitored: true,
    graphQLFetchAddress: "https://rinkeby-indexer.arbitrum.io/graphql",
  },
  42161: {
    supported: true,
    monitored: true,
    contractFetchAddress: "https://arbiscan.io" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  43113: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://testnet.snowtrace.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  43114: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://snowtrace.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  5700: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://tanenbaum.io/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  40: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://mainnet.telos.net/" + TELOS_SUFFIX,
    isTelos: true,
  },
  41: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://testnet.telos.net/" + TELOS_SUFFIX,
    isTelos: true,
  },
  8: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://ubiqscan.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  4216137055: {
    supported: true,
    monitored: false,
    contractFetchAddress:
      "https://frankenstein-explorer.oneledger.network/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  10: {
    supported: true,
    monitored: true,
    contractFetchAddress: "https://optimistic.etherscan.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  69: {
    supported: true,
    monitored: true,
    contractFetchAddress:
      "https://kovan-optimistic.etherscan.io/" + ETHERSCAN_SUFFIX,
    txRegex: ETHERSCAN_REGEX,
  },
  28: {
    supported: true,
    monitored: true,
    contractFetchAddress:
      "https://blockexplorer.rinkeby.boba.network/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  288: {
    supported: true,
    monitored: true,
    contractFetchAddress:
      "https://blockexplorer.boba.network/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
  106: {
    supported: true,
    monitored: false,
    contractFetchAddress: "https://evmexplorer.velas.com/" + BLOCKSCOUT_SUFFIX,
    txRegex: getBlockscoutRegex(),
  },
};
