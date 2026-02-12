import EmbedReadme from "../../EmbedReadme";
import React from "react";
const repo = "verifier-alliance/database-specs";
const branch = "master";
const readmePath = "/json-schemas/README.md";
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
      sections={["## Transformations", "## verified_contracts"]}
    />
  );
}
