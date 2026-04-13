import React, { useEffect, useState } from "react";

function formatBytes(bytes) {
  if (bytes >= 1e12) return (bytes / 1e12).toFixed(1) + " TB";
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + " GB";
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + " MB";
  return (bytes / 1e3).toFixed(1) + " KB";
}

function timeAgo(isoDate) {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/**
 * Fetches and displays parquet export and Postgres database sizes from stats.json.
 *
 * @param {"totals" | "full"} [variant="full"]
 *   "totals" - only show the two headline numbers (used on the Database page).
 *   "full"   - show totals + per-table breakdown (used on the Downloads page).
 */
export default function DatasetStats({ variant = "full" }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://export.sourcify.dev/v2/stats.json")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setStats)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <p style={{ color: "var(--ifm-color-warning)" }}>
        Could not load live dataset stats. Check{" "}
        <a href="https://export.sourcify.dev/v2/stats.json" target="_blank" rel="noopener noreferrer">
          export.sourcify.dev/v2/stats.json
        </a>{" "}
        directly.
      </p>
    );
  }

  if (!stats) {
    return <p>Loading dataset stats…</p>;
  }

  const totals = (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", margin: "1rem 0" }}>
      <div>
        <strong style={{ fontSize: "1.4rem" }}>{formatBytes(stats.parquet.totalBytes)}</strong>
        <div style={{ fontSize: "0.85rem", color: "var(--ifm-color-content-secondary)" }}>
          Parquet export size (zstd compression) · updated {timeAgo(stats.generatedAt)}
        </div>
      </div>
      <div>
        <strong style={{ fontSize: "1.4rem" }}>{formatBytes(stats.database.totalBytes)}</strong>
        <div style={{ fontSize: "0.85rem", color: "var(--ifm-color-content-secondary)" }}>
          Postgres database size (includes indexes &amp; TOAST)
        </div>
      </div>
    </div>
  );

  if (variant === "totals") {
    return totals;
  }

  // full variant: totals + per-table breakdown
  const tableNames = Object.keys(stats.parquet.tables);

  return (
    <div>
      {totals}
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Table</th>
            <th style={{ textAlign: "right" }}>Parquet size</th>
            <th style={{ textAlign: "right" }}>Parquet files</th>
            <th style={{ textAlign: "right" }}>DB size</th>
          </tr>
        </thead>
        <tbody>
          {tableNames.map((table) => (
            <tr key={table}>
              <td>
                <code>{table}</code>
              </td>
              <td style={{ textAlign: "right" }}>{formatBytes(stats.parquet.tables[table].bytes)}</td>
              <td style={{ textAlign: "right" }}>{stats.parquet.tables[table].fileCount}</td>
              <td style={{ textAlign: "right" }}>{formatBytes(stats.database.tables[table]?.bytes ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.8rem", color: "var(--ifm-color-content-secondary)", marginTop: "0.5rem" }}>
        DB sizes include indexes and TOAST. The total DB size is slightly larger than the sum of tables
        because it also includes system catalogs and unallocated space.
      </p>
    </div>
  );
}
