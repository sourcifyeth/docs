import React, { useEffect, useState, useMemo } from "react";
import { renderToString } from "react-dom/server";
import ReactTooltip from "react-tooltip";
import LoadingOverlay from "../src/components/LoadingOverlay";
import Chart from "./Chart";

const R = ({ children }) => <div style={{ textAlign: "right", fontFamily: "monospace" }}>{children}</div>;

const Table = () => {
  const [sourcifyChains, setSourcifyChains] = useState<any>();
  const [error, setError] = useState("");
  const [stats, setStats] = useState<any>();

  const sourcifyChainMap = useMemo(() => {
    return sourcifyChains?.reduce(function (acc, currentChain) {
      acc[currentChain.chainId] = currentChain;
      return acc;
    }, {});
  }, [sourcifyChains]);

  const addMonitoredSupportFrom = async (url, supportedChains) => {
    try {
      // Try to fetch monitor information
      const req = await fetch(url);
      const res = await req.json();
      res.forEach((monitoredChain) => {
        const foundChain = supportedChains.find((supportedChain) => supportedChain.chainId === monitoredChain.chainId);
        if (!foundChain) return; // Could be that a chain that is not supported by Sourcify
        foundChain.monitored = true;
      });
    } catch (e) {
      setError("Cannot get monitor data from url: " + url);
    }
  };

  useEffect(() => {
    fetch("https://sourcify.dev/server/chains")
      .then((res) => res.json())
      .then(async (chains) => {
        await addMonitoredSupportFrom(
          "https://raw.githubusercontent.com/argotorg/sourcify/staging/services/monitor/monitorChains.json",
          chains
        );
        sortChains(chains);
        setSourcifyChains(chains);
      })
      .catch((err) => setError("Error fetching chains from the Sourcify server\n\n" + err.message));
  }, []);

  useEffect(() => {
    fetch(`https://sourcify.dev/static/stats.json`)
      .then((res) => res.json())
      .then((json) => setStats(json))
      .catch(() => {});
  }, []);

  function sortChains(chains) {
    return chains.sort((a, b) => {
      const ETHEREUM_CHAINS = [1, 5, 11155111, 1700, 3, 4];
      const hasEthereumA = ETHEREUM_CHAINS.includes(parseInt(a.chainId));
      const hasEthereumB = ETHEREUM_CHAINS.includes(parseInt(b.chainId));

      const isMonitoredA = a.monitored === true;
      const isMonitoredB = b.monitored === true;

      // Ethereum chains on top
      if (hasEthereumA && !hasEthereumB) {
        return -1;
      } else if (!hasEthereumA && hasEthereumB) {
        return 1;
      }

      // 'monitored' come next
      if (isMonitoredA && !isMonitoredB) {
        return -1;
      } else if (!isMonitoredA && isMonitoredB) {
        return 1;
      }

      // Chains with trace support come next
      const hasTraceA = a?.traceSupportedRPCs?.length > 0;
      const hasTraceB = b?.traceSupportedRPCs?.length > 0;

      if (hasTraceA && !hasTraceB) {
        return -1;
      } else if (!hasTraceA && hasTraceB) {
        return 1;
      }

      // Chains with Etherscan API come next
      const hasEtherscanA = a?.etherscanAPI;
      const hasEtherscanB = b?.etherscanAPI;

      if (hasEtherscanA && !hasEtherscanB) {
        return -1;
      } else if (!hasEtherscanA && hasEtherscanB) {
        return 1;
      }

      // Sort the rest alphabetically by chain.name
      return a.name.localeCompare(b.name);
    });
  }

  if (!sourcifyChains) {
    return (
      <div style={{ margin: "8rem" }}>
        <LoadingOverlay message="Loading Sourcify chains" />
      </div>
    );
  }
  const rows = sourcifyChains.map((chain, i) => {
    return (
      <tr key={`chain-row-${i}`} style={!chain.supported ? { color: "#ccc" } : {}}>
        <td>{chain.title || chain.name}</td>
        <td>
          <R>{chain.chainId}</R>
        </td>
        <td style={{ textAlign: "center", fontSize: "0.85rem" }}>
          {chain.supported ? "Verification" : "Not Supported"} <br />
          {chain.monitored ? "Monitoring" : ""}
        </td>
        <td style={{ textAlign: "center" }}>{chain?.traceSupportedRPCs?.length > 0 ? "✅" : ""}</td>
        <td style={{ textAlign: "center" }}>{chain.etherscanAPI ? "✅" : ""}</td>
      </tr>
    );
  });
  return (
    <>
      <ReactTooltip effect="solid" />
      <div>
        {stats ? (
          <>
            <h2>Chains by Verified Contracts</h2>
            <Chart stats={stats} sourcifyChainMap={sourcifyChainMap} sourcifyChains={sourcifyChains} />
          </>
        ) : (
          <div style={{ margin: "8rem" }}>
            <LoadingOverlay message="Loading Sourcify stats" />
          </div>
        )}
      </div>
      <div>
        <h2>Chains by Type of Support</h2>
        {error && <div style={{ textAlign: "center", color: "indianRed" }}>{error}</div>}
        {sourcifyChains.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            {" "}
            Current number of EVM chains and their support type:
            <ul>
              <li>
                <a href="/docs/monitoring">Monitoring (i.e. automatic verification)</a> and Verification support:{" "}
                <b>{sourcifyChains.filter((c) => c.monitored).length}</b>
              </li>
              <li>
                Verification support: <b>{sourcifyChains.filter((c) => c.supported).length}</b>
              </li>
              <li>
                That has an RPC with trace support:{" "}
                <b>{sourcifyChains.filter((c) => c.traceSupportedRPCs?.length > 0).length}</b>
              </li>
              <li>
                Not Supported (deprecated): <b>{sourcifyChains.filter((c) => !c.supported).length}</b>
              </li>
              <li>
                <b>Total: {sourcifyChains.length}</b>
              </li>
            </ul>
          </div>
        )}
        <ReactTooltip effect="solid" delayHide={500} clickable={true} id="rpc-trace-support" />
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Chain ID</th>
              <th>Support Type</th>
              <th
                data-html={true}
                data-tip={renderToString(
                  <div style={{ maxWidth: "300px" }}>
                    <p>This allows verifying contracts created with factories with the creation bytecode.</p>
                    <p>
                      If not supported, contracts can be verified normally with the runtime bytecode, but also with the
                      creation bytecode if they were created by an EOA, ie. the creation bytecode is in the transaction
                      payload that created the contract.
                    </p>
                  </div>
                )}
                data-for="rpc-trace-support"
              >
                RPCs with trace support{" "}
                <span
                  style={{
                    border: "1px solid",
                    borderRadius: "100%",
                    width: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "gray",
                  }}
                >
                  ?
                </span>
              </th>
              <th>Import from Etherscan</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
