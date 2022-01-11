import React, { useEffect, useState } from "react";
import sourcifyChains from "./sourcify-chains";

const Yes = () => <div className="centered-flex">✅</div>;
const No = () => <div className="centered-flex">❌</div>;
const C = ({ children }) => <div className="centered-flex">{children}</div>;
const R = ({ children }) => (
  <div style={{ textAlign: "right", fontFamily: "monospace" }}>{children}</div>
);

const Table = () => {
  const [chains, setChains] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    fetch("https://chainid.network/chains.json")
      .then((res) => res.json())
      .then((chains) => setChains(chains))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      "Error fetching chains from https://chainid.network/chains.json\n" + error
    );
  }

  if (!chains) {
    return "Loading";
  }

  const idToChain = (id) => {
    return chains.find((chain) => chain.chainId == id);
  };

  // Have Ethereum chains on top.
  const ethereumChainIds = [1, 3, 4, 5, 42];
  const etherumChains = ethereumChainIds.map((id) => idToChain(id));
  const otherChainIds = Object.keys(sourcifyChains).filter(
    (key) => ![1, 3, 4, 5, 42].includes(parseInt(key))
  );
  const otherChains = otherChainIds
    .map((id) => idToChain(id))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const allChains = etherumChains.concat(otherChains);

  console.log(allChains);
  const rows = allChains.map((chain, i) => {
    return (
      <tr>
        <td>{chain.title || chain.name}</td>
        <td>
          <R>{chain.chainId}</R>
        </td>
        <td>{sourcifyChains[chain.chainId].supported ? <Yes /> : <No />}</td>
        <td>{sourcifyChains[chain.chainId].monitored ? <Yes /> : <No />}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <th>Network</th>
        <th>Chain ID</th>
        <th>Verification*</th>
        <th>Monitoring**</th>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
