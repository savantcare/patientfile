module.exports = {
  title: 'Patient file documentation',
  plugins: ['vuepress-plugin-table-of-contents'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Savant', link: 'https://www.savantcare.com/' },
      { text: 'Repo', link: 'https://www.github.com/savantcare/patientfile' }
    ],
    sidebar: [
      '/',
      ['/tech/','Tech why'],
      ['/ui/', 'UI'],
      ['/components/','Components'],
      ['/todo', 'Todo'],
     
    ]
  }
}
