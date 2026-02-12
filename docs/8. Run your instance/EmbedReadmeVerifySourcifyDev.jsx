import EmbedReadme from "../EmbedReadme";
import React from "react";
const repo = "sourcifyeth/verify.sourcify.dev";
const branch = "main";
const readmePath = "/README.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function EmbedReadmeVerifySourcifyDev() {
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
