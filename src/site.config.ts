import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: '敖烈的存档点',

  /** Will be used in index page & copyright declaration */
  author: '敖烈 / Yunus',

  /** Description metadata for your website. Can be used in page metadata. */
  description: '你怎么知道今天是星期四',

  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',

  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },

  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.jpg',
    alt: 'Avatar'
  },

  // in test
  head: [
    /* Telegram channel */
    {
      tag: 'meta',
      attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
      content: ''
    }
  ],
  customCss: [],
  titleDelimiter: '•',

  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  // Recommend:
  // - https://cdn.jsdelivr.net/npm
  // - https://cdn.smartcis.cn/npm
  // - https://unkpg.com
  // - https://cdn.cbd.int
  // - https://esm.sh

  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Docs', link: '/docs/list' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },

  footer: {
    // Registration information for ICP (optional)
    registration: {
      url: 'https://beian.miit.gov.cn/',
      text: '鲁ICP备2024106303号'
    },
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    social: { github: 'https://github.com/yunus0906/yunus-blog' }
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [
      { date: '2024-07-01', content: 'Lorem ipsum dolor sit amet.' },
      { date: '2024-07-01', content: 'vidit suscipit at mei.' },
      { date: '2024-07-01', content: 'Quem denique mea id.' }
    ],
    // Yourself link info
    applyTip: {
      name: theme.title,
      desc: theme.description || 'Null',
      url: 'https://blog.kfcvivo50.cc',
      avatar: 'https://blog.notd.cn/user-avatar.jpg'
    }
  },
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // Tailwindcss typography
  typography: {
    // https://github.com/tailwindlabs/tailwindcss-typography
    class:
      'break-words prose prose-pure dark:prose-invert dark:prose-pure prose-headings:font-medium'
  },
  // A lightbox library that can add zoom effect
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
    server: 'https://blog-line.notd.cn',
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment. (Email to receive replies. Login is unnecessary)'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
