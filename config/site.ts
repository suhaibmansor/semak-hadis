export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Next.js',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Semak',
      href: '/semak',
    },
    {
      title: 'SemakEnd',
      href: '/semak#hadisList',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
}
