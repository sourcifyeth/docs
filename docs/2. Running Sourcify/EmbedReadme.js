import React, { useEffect, useState } from "react";
import { parse } from "marked";

export default function EmbedReadme({ url }) {
  const [content, setContent] = useState();

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => setContent(parse(text)));
  }, []);

  if (!content) return "Loading from " + url + "...";
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
