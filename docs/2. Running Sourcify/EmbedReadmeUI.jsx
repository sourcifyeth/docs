import EmbedReadme from "../EmbedReadme";
import React from "react";
const repo = "sourcifyeth/ui";
const branch = "master";
const readmePath = "/README.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function EmbedReadmeUI() {
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
