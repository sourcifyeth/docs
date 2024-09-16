import React, { useState, useEffect } from "react";
import LoadingOverlay from "../../src/components/LoadingOverlay";

const RepositoryStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalSize, setTotalSize] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const manifestUrl = "https://repo-backup.sourcify.app/manifest.json";

      try {
        const manifestResponse = await fetch(manifestUrl);
        const manifestData = await manifestResponse.json();

        const totalSizeBytes = manifestData.files.reduce((acc, file) => acc + file.sizeInBytes, 0);
        const totalSizeGB = totalSizeBytes / (1024 * 1024 * 1024); // Convert to GB

        setTotalSize(totalSizeGB);

        const date = new Date(manifestData.timestamp);
        const formattedDate = date
          .toUTCString()
          .replace(/^[A-Za-z]+, /, "")
          .replace(/:\d{2} /, " ");
        setTimestamp(formattedDate);
      } catch (error) {
        console.error("Error fetching manifest:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Calculating the repository size..." />;
  }

  return (
    <div>
      <p>
        As of {timestamp} the <strong>compressed</strong> size of the repository files is:{" "}
        <strong>{totalSize.toFixed(2)} GB</strong>
      </p>
    </div>
  );
};

export default RepositoryStats;
