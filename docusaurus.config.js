// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sourcify Docs",
  tagline: "Documentation for sourcify.dev",
  url: "https://docs.sourcify.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "ethereum", // Usually your GitHub org/user name.
  projectName: "sourcify", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/sourcifyeth/docs",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/edit/main/website/blog/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Sourcify",
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
          {
            href: "https://github.com/ethereum/sourcify",
            label: "GitHub",
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
                to: "/docs/api/index",
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
                href: "https://github.com/ethereum/sourcifyeth",
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
                label: "Gitter",
                href: "https://gitter.im/ethereum/source-verify",
              },
              {
                label: "Matrix Chat",
                href: "https://matrix.to/#/#ethereum_source-verify:gitter.im",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sourcify. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
