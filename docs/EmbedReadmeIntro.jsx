import EmbedReadme from "./EmbedReadme";
const repo = "ethereum/sourcify";
const branch = "master";
const readmePath = "/README.md";
const rawBaseUrl = "https://raw.githubusercontent.com";
const pageBaseUrl = "https://github.com";

export default function EmbedReadmeIntro() {
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
