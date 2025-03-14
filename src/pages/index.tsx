import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomepageFeatures from "../components/HomepageFeatures";
import "./global.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();

  // Workarount to redirect to the docs directly
  useEffect(() => {
    history.push("/docs/intro");
  }, []);
  return (
    <Layout title={`${siteConfig.title}`} description="Documentation for Sourcify sourcify.dev">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
