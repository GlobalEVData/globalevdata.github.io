export const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Home', link: '/' },
        // { text: 'About', link: '/about' },
        { text: 'Map', link: '/map' },
        { text: 'Data', link: '/data' },
        { text: 'Publications', link: '/publications' },
        { text: 'News', link: '/News' },
        { text: 'Team', link: '/team' },
        {
            text: 'About',
            items: [
              { text: 'Contact Us', link: '/contact' },
              { text: 'Statistics', link: '/report' },
              { text: 'Subscribe', link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u' }
            ]
          }
    ],
    // https://docs.google.com/forms/d/e/1FAIpQLSee3mhBgstlslpNp1UDsA4isU6-iz9m7eFLyJQVAOQuAHwDQg/viewform?usp=dialog

    logo: '/logo.png',
    head: [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ],

    footer: {
        copyright: 'GlobalEVData © 2024 - Present | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> @ <a href="https://www.polyu.edu.hk/"> HKPolyU </a>'

    },

    // search: {
    //     provider: 'local'
    // },


}