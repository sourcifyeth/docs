import React, { useEffect, useState } from "react";
import LoadingOverlay from "../../src/components/LoadingOverlay";

export default function EtherscanInstancesTable() {
  const [etherscanInstances, setEtherscanInstances] = useState<any>();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://sourcify.dev/server/chains")
      .then((res) => res.json())
      .then((sourcifyChains) => {
        const etherscanChains = sourcifyChains.filter(
          (chain) => !!chain.etherscanAPI
        );
        setEtherscanInstances(etherscanChains);
      })
      .catch((err) =>
        setError(
          "Error fetching chains from the Sourcify server\n\n" + err.message
        )
      );
  }, []);

  if (error) {
    return (
      <div style={{ margin: "8rem", color: "tomato" }}>
        <p>{error}</p>
      </div>
    );
  }
  if (!etherscanInstances) {
    return (
      <div style={{ margin: "8rem" }}>
        <LoadingOverlay message="Fetching chains" />
      </div>
    );
  }

  const rows = etherscanInstances.map((chain, i) => {
    const etherscanLink = chain.etherscanAPI
      .replace("api.", "")
      .replace("api-", "");
    return (
      <tr key={`chain-row-${i}`}>
        <td>{chain.title || chain.name}</td>
        <td>
          <div style={{ textAlign: "right", fontFamily: "monospace" }}>
            {chain.chainId}
          </div>
        </td>
        <td>
          <a href={etherscanLink} target="_blank">
            {etherscanLink}
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Chain Name</th>
            <th rowSpan={2}>Chain ID</th>
            <th colSpan={2}>Etherscan Instance Link</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
