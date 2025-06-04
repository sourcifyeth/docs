import EmbedReadme from "../EmbedReadme";
import React from "react";
const repo = "sourcifyeth/repo.sourcify.dev";
const branch = "main";
const readmePath = "/README.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function EmbedReadmeRepoSourcifyDev() {
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
