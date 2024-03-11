import React, { useState, useEffect } from "react";
import LoadingOverlay from "../src/components/LoadingOverlay";

const RepositoryStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullMatches, setFullMatches] = useState(0);
  const [partialMatches, setPartialMatches] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const statsResponse = await fetch("https://repo.sourcify.dev/stats.json");
      const statsData = await statsResponse.json();

      let fullMatchSizeKByte = 0;
      let partialMatchSizeKByte = 0;

      Object.values(statsData).forEach((entry) => {
        fullMatchSizeKByte += entry.full_match_size_kbyte;
        partialMatchSizeKByte += entry.partial_match_size_kbyte;
      });

      setFullMatches(fullMatchSizeKByte / (1024 * 1024)); // Convert to GB
      setPartialMatches(partialMatchSizeKByte / (1024 * 1024)); // Convert to GB

      const manifestResponse = await fetch("https://repo.sourcify.dev/manifest.json");
      const manifestData = await manifestResponse.json();

      const date = new Date(manifestData.timestamp);
      setTimestamp(date.toUTCString());

      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Calculating the repository size" />;
  }

  return (
    <div>
      <p>As of {timestamp} the size of the repository files is as follows:</p>
      <ul>
        <li>Full Matches: {fullMatches.toFixed(2)} GB</li>
        <li>Partial Matches: {partialMatches.toFixed(2)} GB</li>
        <li>
          <strong>Total size: {(fullMatches + partialMatches).toFixed(2)} GB</strong>
        </li>
      </ul>
    </div>
  );
};

export default RepositoryStats;
