import EmbedReadme from "../EmbedReadme";
import React from "react";
const repo = "ethereum/sourcify";
const branch = "master";
const readmePath = "/services/server/README.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function EmbedReadmeServer() {
  return (
    <EmbedReadme
      repo={repo}
      branch={branch}
      readmePath={readmePath}
      rawBaseUrl={rawBaseUrl}
      pageBaseUrl={pageBaseUrl}
    />
  );
}
