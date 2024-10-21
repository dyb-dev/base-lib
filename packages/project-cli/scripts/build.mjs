/*
 * @Author: dyb-dev
 * @Date: 2024-10-21 16:44:36
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-21 23:01:04
 * @FilePath: /base-lib/packages/project-cli/scripts/build.mjs
 * @Description: 构建脚本
 */

import { build } from "esbuild"

// 使用 esbuild 进行构建，配置构建选项
build({
    // 将所有依赖项打包成一个文件
    bundle: true,
    // 入口文件
    entryPoints: ["src/index.ts"],
    // 输出文件路径和文件名
    outfile: "dist/index.cjs",
    // 输出格式为 CommonJS 模块
    format: "cjs",
    // 目标平台为 Node.js
    platform: "node",
    // 目标 Node.js 版本为 14.16.0+
    target: "node14"
})
