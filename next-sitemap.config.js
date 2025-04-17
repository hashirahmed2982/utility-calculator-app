/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://yourwebsite.com', // Replace with your actual URL
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/server-sitemap.xml'], // optional
  };
  