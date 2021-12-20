module.exports = {
    // 博客首页标题
    title: 'WW\'s blog',
    // 博客首页介绍
    description: '小万的学习日记',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {
            rel: 'icon',
            href: '/logo.png',
            type: 'image/png'
        }], // 增加一个自定义的 favicon(网页标签的图标)
        // 实现PWA
        ['link', {
            rel: 'manifest',
            href: '/photo.jpg'
        }],
        ['link', {
            rel: 'apple-touch-icon',
            href: '/photo.jpg'
        }],
    ],
    serviceWorker: true, // 是否开启PWA
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            {
                text: '前端基础',
                link: '/accumulate/'
            },
            {
                text: '算法题库',
                link: '/algorithm/'
            },
            {
                text: 'gitgub',
                link: 'https://github.com/Elvira-wan'
            }
        ],
        // sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级, 最大会显示到h3标题
        displayAllHeaders: true,  // 默认显示所有页面的标题链接
        sidebar: {
            // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
            '/accumulate/': [
                '/accumulate/', // accumulate文件夹的README.md 不是下拉框形式
                // 若想将页面的标题设置为其他文字也可以使用一个数组定义
                // ['/path', 'tltle']
                {
                    title: '前端三剑客',
                    children: [
                        // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                        // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                        '/accumulate/base/HTML5', // 以docs为根目录来查找文件 
                        '/accumulate/base/CSS3',
                        {
                            title: 'JS相关概念',
                            children: [
                                '/accumulate/base/JS_base/JS', 
                                '/accumulate/base/JS_base/objectOriented',       
                                '/accumulate/base/JS_base/DOM', 
                                '/accumulate/base/JS_base/BOM', 
                                '/accumulate/base/JS_base/ES6',
                                '/accumulate/base/JS_base/regExp',
                            ]
                        },
                    ]
                },
                {
                    title: '前后端交互',
                    children: [
                        '/accumulate/network/computerNetwork',
                        '/accumulate/network/AJAX',
                        '/accumulate/network/cookie',
                    ]
                },
                {
                    title: '主流框架',
                    children: [
                        '/accumulate/frame/react',
                        '/accumulate/frame/vue',
                    ]
                }
            ],
            // docs文件夹下面的algorithm文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
            '/algorithm/': [
                '/algorithm/',       
            ]
        }
    }
}