// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Goodtok Docs',
  tagline: 'A better shopping experience for your customers',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://goodtok.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fonoster', // Usually your GitHub org/user name.
  projectName: 'goodtok', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Needs gtag
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
        lastVersion: 'current',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: ({ docPath }) => {
          return `https://holocron.so/github/pr/fonoster/goodtok/main/editor/docs/docs/${docPath}`
        },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      })
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Goodtok Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/fonoster/goodtok',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Docs',
                to: '/docs/welcome',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/fonoster/goodtok/discussions',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/4QWgSz4hTC',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/fonoster',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://learn.fonoster.com/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/fonoster/goodtok',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fonoster, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
