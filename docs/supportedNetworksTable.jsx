import React, { useEffect, useState } from "react";

const Yes = () => <div className="centered-flex">✅</div>;
const No = () => <div className="centered-flex">❌</div>;
const C = ({ children }) => <div className="centered-flex">{children}</div>;
const R = ({ children }) => (
  <div style={{ textAlign: "right", fontFamily: "monospace" }}>{children}</div>
);

const Table = () => {
  const [sourcifyChains, setSourcifyChains] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    fetch("https://sourcify.dev/server/chains")
      .then((res) => res.json())
      .then((chains) => setSourcifyChains(chains))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return "Error fetching chains from the Sourcify server\n" + error;
  }

  if (!sourcifyChains) {
    return "Loading";
  }

  const rows = sourcifyChains.map((chain, i) => {
    return (
      <tr key={`network-row-${i}`}>
        <td>{chain.title || chain.name}</td>
        <td>
          <R>{chain.chainId}</R>
        </td>
        <td>{chain.supported ? <Yes /> : <No />}</td>
        <td>{chain.monitored ? <Yes /> : <No />}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Network</th>
          <th>Chain ID</th>
          <th>Verification*</th>
          <th>Monitoring**</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
