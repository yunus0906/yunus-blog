import type { SiteConfig, MenuLinks, SocialLinks } from '@/types'

export const siteConfig: SiteConfig = {
  // === Required meta properties ===
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: '敖烈 / Yunus',
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: '敖烈的存档点',
  // Meta property used to generate your sitemap and canonical URLs in your final build
  site: 'https://blog.kfcvivo50.cc',
  // Meta property used as the default description meta property
  description: 'Stay hungry, stay foolish',
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: 'zh-CN, en-US',
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: 'en_US',
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: 'en-US',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },

  // === Customize options ===
  pageSize: 8, // blog page size for pagination
  externalLinkArrow: true, // show external link arrow
  // Registration information for ICP (optional)
  registration: {
    url: 'https://beian.miit.gov.cn/',
    text: '鲁ICP备2024106303号'
  },

  // Comment system service backend link
  walineServerUrl: 'https://blog-line.notd.cn',

  // Link info
  applyFriendTip: {
    name: '敖烈的存档点',
    slogan: '咖啡因来自咖啡果',
    url: 'https://blog.kfcvivo50.cc',
    avatar: 'https://blog.notd.cn/user-avatar.jpg'
  }
}

// Will be used in Footer.astro
export const socialLinks: SocialLinks = [
  {
    name: 'mail',
    url: 'mailto:notd0535@gmail.com'
  },
  {
    name: 'github',
    url: 'https://github.com/yunus0906'
  }
]

export const menuLinks: MenuLinks = [
  {
    link: '/blog',
    label: 'Blog'
  },
  {
    link: '/projects',
    label: 'Projects'
  },
  {
    link: '/links',
    label: 'Links'
  },
  {
    link: '/about',
    label: 'About'
  }
]
