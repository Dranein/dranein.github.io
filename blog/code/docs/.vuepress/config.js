module.exports = {
    base: '/',
    title: '菜头丸的首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '菜头丸的前端学习记录', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/logo.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '小游戏', link: '/pages/articles/1024.md' },
                    { text: 'Vue', link: '/pages/vue/dragCard.md' },
                    { text: 'React', link: '/pages/react/city.md' },
                ]
            },
            { text: 'Github', link: 'https://github.com/dranein' },
        ],
        sidebar: {
            '/pages/articles/':[
                {
                    title: '小游戏',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['1024.md', '小游戏之1024'],
                        ['fish.md', '小游戏之爱心鱼'],
                        ['plane.md', '小游戏之飞机大战'],
                        ['redpack.md', '小游戏之红包雨']
                    ]
                }
            ],
            '/pages/react/':[
                {
                    title: 'React',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['city.md', '城市选择组件']
                    ]
                }
            ],
            '/pages/vue/':[
                {
                    title: 'Vue',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['dragCard.md', '拖拽排列卡片']
                    ]
                }
            ]
        }
    }
}