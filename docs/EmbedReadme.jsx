import React, { useEffect, useState } from "react";
import { parse } from "marked";

const HEADING_REGEX = /^\s*(#{1,6})\s+(.+?)\s*#*\s*$/;
const FENCE_REGEX = /^\s*(`{3,}|~{3,})/;

function selectMarkdownSections(markdown, sections) {
  if (!Array.isArray(sections) || !sections.length) {
    return markdown;
  }

  const sectionKeys = sections
    .map((spec) => {
      const match = spec?.match(HEADING_REGEX);
      if (!match) {
        return null;
      }
      return `${match[1].length}:${match[2].trim().toLowerCase()}`;
    })
    .filter(Boolean);
  if (!sectionKeys.length) {
    return markdown;
  }

  const lines = markdown.split(/\r?\n/);
  const headings = [];
  let fenceMarker = null;

  lines.forEach((line, index) => {
    const fenceMatch = line.match(FENCE_REGEX);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      fenceMarker = fenceMarker === marker ? null : marker;
      return;
    }

    if (fenceMarker) {
      return;
    }

    const headingMatch = line.match(HEADING_REGEX);
    if (!headingMatch) {
      return;
    }

    headings.push({
      index,
      level: headingMatch[1].length,
      key: `${headingMatch[1].length}:${headingMatch[2].trim().toLowerCase()}`,
    });
  });

  if (!headings.length) {
    return markdown;
  }

  const selectedSections = [];
  const usedSectionKeys = new Set();

  for (const sectionKey of sectionKeys) {
    if (usedSectionKeys.has(sectionKey)) {
      continue;
    }
    usedSectionKeys.add(sectionKey);

    const sectionStart = headings.find((heading) => heading.key === sectionKey);
    if (!sectionStart) {
      continue;
    }

    const nextHeading = headings.find(
      (heading) => heading.index > sectionStart.index && heading.level <= sectionStart.level
    );
    const sectionEnd = nextHeading ? nextHeading.index : lines.length;
    selectedSections.push(lines.slice(sectionStart.index, sectionEnd).join("\n"));
  }

  if (!selectedSections.length) {
    return markdown;
  }

  return selectedSections.join("\n\n");
}

/**
 * @param {object} props
 * @param {string} props.repo GitHub repo in "owner/name" format.
 * @param {string} props.branch Branch name to fetch the README from.
 * @param {string} props.readmePath Path to the README in the repo (e.g. "/packages/x/README.md").
 * @param {string} props.rawBaseUrl Base URL for raw file content (e.g. "https://raw.githubusercontent.com").
 * @param {string} props.pageBaseUrl Base URL for repository links (e.g. "https://github.com").
 * @param {string[]} [props.sections] Optional markdown heading selectors to include (e.g. ["## Intro", "### API"]).
 * If omitted or empty, the full README is embedded.
 */
export default function EmbedReadme({
  repo,
  branch,
  readmePath,
  rawBaseUrl,
  pageBaseUrl,
  sections,
}) {
  const [content, setContent] = useState(null);
  const sectionsKey = Array.isArray(sections) ? sections.join("\n") : "";

  useEffect(() => {
    fetch(rawBaseUrl + "/" + repo + "/" + branch + readmePath)
      .then((response) => response.text())
      .then((text) => {
        const sectionText = selectMarkdownSections(text, sections);
        // Replace relative markdown links with absolute ones
        // Matches markdown links that don't start with "http"
        const processedText = sectionText.replace(
          /\[([^\]]+)\]\((?!http)([^)]+)\)/g,
          (match, title, path) => {
            // Handle anchor links
            if (path.startsWith("#")) {
              return `[${title}](${pageBaseUrl}/${repo}/tree/${branch}${readmePath}${path})`;
            }

            // Resolve relative paths (including ../)
            const currentPath = readmePath.split("/").slice(0, -1);
            const pathParts = path.split("/");

            let resolvedPath = [...currentPath];
            for (const part of pathParts) {
              if (part === "..") {
                resolvedPath.pop();
              } else {
                resolvedPath.push(part);
              }
            }

            return `[${title}](${pageBaseUrl}/${repo}/tree/${branch}/${resolvedPath.join("/")})`;
          }
        );
        setContent(parse(processedText));
      });
  }, [repo, branch, readmePath, rawBaseUrl, pageBaseUrl, sectionsKey]);

  if (!content) return "Loading from " + rawBaseUrl + readmePath + "...";
  return (
    <div>
      <div>
        <i>
          Content from <a href={`${pageBaseUrl}/${repo}/tree/${branch}${readmePath}`}>{repo + readmePath}</a>
        </i>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
