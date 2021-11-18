module.exports = {
    // 博客首页标题
    title: 'WW\'s blog',
    // 博客首页介绍
    description: '小万的学习日记',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }], // 增加一个自定义的 favicon(网页标签的图标)
        // 实现PWA
        ['link', { rel: 'manifest', href: '/photo.jpg' }],
        ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
    ],
    serviceWorker: true,    // 是否开启PWA
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav:[ // 导航栏配置
        {text: '前端基础', link: '/accumulate/' },
        {text: '算法题库', link: '/algorithm/'},
        {text: 'gitgub', link: 'https://baidu.com'}      
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
}