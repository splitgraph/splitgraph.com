const siteConfig = {
  title: 'Splitgraph',
  tagline: 'Publish data where it lives',
  url: 'https://splitgraph.com',
  baseUrl: '/',

  // Used for publishing and more
  projectName: 'splitgraph',
  organizationName: 'splitgraph',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {href: '/sphinx/api/splitgraph.html', label: 'API'}
    //{blog: true, label: 'Blog'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/sg_logo.svg',
  footerIcon: 'img/sg_logo.svg',
  favicon: 'img/sg_logo.svg',

  /* Colors for website */
  colors: {
    primaryColor: '#36678D',
    secondaryColor: '#D5F6FF',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Splitgraph Limited`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/sg_logo.svg',
  twitterImage: 'img/sg_logo.svg',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
