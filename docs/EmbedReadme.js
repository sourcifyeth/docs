import React, { useEffect, useState } from "react";
import { parse } from "marked";

export default function EmbedReadme({ repo, branch, readmePath, rawBaseUrl, pageBaseUrl }) {
  const [content, setContent] = useState();

  useEffect(() => {
    fetch(rawBaseUrl + "/" + repo + "/" + branch + readmePath)
      .then((response) => response.text())
      .then((text) => {
        // Replace relative markdown links with absolute ones
        // Matches markdown links that don't start with "http"
        const processedText = text.replace(/\[([^\]]+)\]\((?!http)([^)]+)\)/g, (match, title, path) => {
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
        });
        setContent(parse(processedText));
      });
  }, []);

  if (!content) return "Loading from " + rawBaseUrl + readmePath + "...";
  return (
    <div>
      <div>
        <i>
          Content from <a href={`${pageBaseUrl}/${repo}/tree/${branch}${readmePath}`}>{repo + readmePath}</a>
        </i>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />{" "}
    </div>
  );
}
