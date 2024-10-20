/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:04:30
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-20 17:53:19
 * @FilePath: /base-lib/packages/create-project/src/constants/title.ts
 * @Description: 标题相关常量
 */

import gradientString from "gradient-string"

import pkg from "../../package.json"

/** STATIC: 默认标题 */
const DEFAULT_TITLE = pkg.description

/** STATIC: 渐变色的标题 */
const GRADIENT_TITLE = gradientString([
    { color: "#42b883", pos: 0 },
    { color: "#42b883", pos: 0.1 },
    { color: "#35495e", pos: 1 }
])(DEFAULT_TITLE)

export { DEFAULT_TITLE, GRADIENT_TITLE }
