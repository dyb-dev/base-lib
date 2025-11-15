/*
 * @FileDesc: 项目模板相关常量
 */

import prompts from "prompts"

/** CONST: 默认项目名称 */
export const DEFAULT_PROJECT_NAME = "default-project"

/** CONST: 项目模板列表 */
export const PROJECT_TEMPLATE_LIST = [
    {
        title: "next-ssr-web-template",
        description: "基于`Next.js`搭建的 SSR Web 模板",
        value: "https://github.com/dyb-dev/next-ssr-web-template.git"
    },
    {
        title: "react-web-template",
        description: "基于`react全家桶`搭建的Web移动端模板",
        value: "https://github.com/dyb-dev/react-web-template.git"
    },
    {
        title: "vue-web-template",
        description: "基于`vue3全家桶`搭建的Web移动端模板",
        value: "https://github.com/dyb-dev/vue-web-template.git"
    },
    {
        title: "uniapp-mp-wx-template",
        description: "基于`uni-app + vue3 + ts`搭建的微信小程序模板",
        value: "https://github.com/dyb-dev/uniapp-mp-wx-template.git"
    },
    {
        title: "fn-lib-template",
        description: "基于`vite`搭建的TS函数库模版",
        value: "https://github.com/dyb-dev/fn-lib-template.git"
    },
    {
        title: "component-lib-template",
        description: "基于`vite`搭建的vue3+ts组件库模版",
        value: "https://github.com/dyb-dev/component-lib-template.git"
    },
    {
        title: "lib-docs-template",
        description: "基于`vitepress`搭建的库文档模板",
        value: "https://github.com/dyb-dev/lib-docs-template.git"
    }
] as prompts.Choice[]
