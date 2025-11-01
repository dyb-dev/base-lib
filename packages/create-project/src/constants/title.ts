/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:04:30
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-07-31 23:51:49
 * @FilePath: /base-lib/packages/create-project/src/constants/title.ts
 * @Description: 标题相关常量
 */

import gradientString from "gradient-string"

import { version, description } from "../../package.json"

/** CONST: 默认标题 */
export const DEFAULT_TITLE = `${description} v${version}`

/** CONST: 渐变色的标题 */
export const GRADIENT_TITLE = gradientString([
    { color: "#42b883", pos: 0 },
    { color: "#42b883", pos: 0.1 },
    { color: "#35495e", pos: 1 }
])(DEFAULT_TITLE)
