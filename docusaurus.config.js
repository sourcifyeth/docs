// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import lightCodeTheme from "prism-react-renderer/themes/github";
import darkCodeTheme from "prism-react-renderer/themes/dracula";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sourcify Docs",
  tagline: "Documentation for sourcify.eth",
  url: "https://docs.sourcify.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "sourcifyeth", // Usually your GitHub org/user name.
  projectName: "sourcifyeth.github.io", // Usually your repo name.
  trailingSlash: true,

  headTags: [
    {
      tagName: "script",
      attributes: {
        defer: "defer",
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "2dc16b59-e7f3-4637-b282-9505837db8d6",
      },
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/sourcifyeth/docs/blob/main/",
        },
        blog: {
          //   showReadingTime: true,
          //   // Please change this to your repo.
          blogSidebarTitle: "Blog posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/sourcifyeth/docs/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  // Add webpack configuration for polyfills
  plugins: [
    function (context, options) {
      return {
        name: "webpack-polyfill-plugin",
        configureWebpack(config, isServer) {
          return {
            resolve: {
              fallback: {
                buffer: require.resolve("buffer"),
                stream: require.resolve("stream-browserify"),
              },
            },
          };
        },
      };
    },
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/docs/exact-match-vs-match",
            from: "/docs/full-vs-partial-match",
          },
          {
            to: "/docs/what-is-source-code-verification",
            from: "/docs/vyper",
          },
          {
            to: "/docs/what-is-source-code-verification",
            from: "/docs/yul",
          },
          {
            to: "/docs/what-is-source-code-verification",
            from: "/docs/supported-languages",
          },
          {
            to: "/docs/repository/signature-database",
            from: "/docs/signature-database",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "https://raw.githubusercontent.com/sourcifyeth/assets/master/logo-assets-png/sourcify_blue_rounded.png",
      metadata: [
        {
          property: "og:title",
          content: "Sourcify Docs",
        },
        {
          property: "og:description",
          content: "Sourcify Documentation and Blog Page",
        },
        {
          name: "description",
          content: "Sourcify Documentation and Blog Page",
        },
        {
          name: "twitter:site",
          content: "@sourcifyeth",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
      ],
      navbar: {
        title: "sourcify.eth",
        logo: {
          alt: "Sourcify logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/argotorg/sourcify",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://github.com/sourcifyeth/docs",
            label: "Github (Docs)",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "API",
                to: "/docs/api",
              },
            ],
          },
          {
            title: "Sourcify",
            items: [
              {
                label: "sourcify.dev",
                href: "https://sourcify.dev",
              },
              {
                label: "Github",
                href: "https://github.com/argotorg/sourcify",
              },
              {
                label: "Docs Github",
                href: "https://github.com/sourcifyeth/docs",
              },
            ],
          },
          {
            title: "Contact",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/sourcifyeth",
              },
              {
                label: "Matrix Chat",
                href: "https://matrix.to/#/#ethereum_source-verify:gitter.im",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/6aqd9cfZ9s",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sourcify. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity", "bash"],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "8XS45JLX6A",

        // Public API key: it is safe to commit it
        apiKey: "691d0575a88687b7b39de22b6fb13fcb",

        indexName: "docs-sourcify",

        // Relevant for multiple languages or multiple versions. See https://docusaurus.io/docs/search
        contextualSearch: false,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        //... other Algolia params
      },
    }),
};

// Reverse the sidebar items ordering (including nested category items)
function reverseSidebarItems(items) {
  // Reverse items in categories
  const result = items.map((item) => {
    if (item.type === "category") {
      return { ...item, items: reverseSidebarItems(item.items) };
    }
    return item;
  });
  // Reverse items at current level
  result.reverse();
  return result;
}

module.exports = config;
