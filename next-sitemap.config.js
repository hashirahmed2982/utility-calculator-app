/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.utilitycalculators.online',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml'],
  additionalPaths: async (config) => {
    return [
      { loc: '/loan' },
      { loc: '/mortgage' },
      { loc: '/auto-loan' },
      { loc: '/interest' },
      { loc: '/payment' },
      { loc: '/gpa' },
      { loc: '/bmi' },
      { loc: '/bmr' },
      { loc: '/percentage' },
      
      // Add more static pages here
    ]
  }
}
