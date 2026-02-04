import EmbedReadme from "../../EmbedReadme";
import React from "react";
const repo = "verifier-alliance/verifier-alliance.github.io";
const branch = "main";
const readmePath = "/docs/3. transformations.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function() {
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
