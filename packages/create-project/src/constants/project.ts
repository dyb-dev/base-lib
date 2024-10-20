/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:03:34
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-20 13:57:03
 * @FilePath: /base-lib/packages/create-project/src/constants/project.ts
 * @Description: 项目模板相关常量
 */

import prompts from "prompts"

/** STATIC: 默认项目名称 */
const DEFAULT_PROJECT_NAME = "default-project"

/** STATIC: 项目模板列表 */
const PROJECT_TEMPLATE_LIST = [
    {
        title: "web-mobile-template",
        description: "基于`vue3全家桶`搭建的Web移动端模板",
        value: "https://github.com/dyb-dev/web-mobile-template.git"
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

export { DEFAULT_PROJECT_NAME, PROJECT_TEMPLATE_LIST }