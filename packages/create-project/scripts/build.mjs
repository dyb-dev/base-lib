/*
 * @author: dyb-dev
 * @date: 19/10/2024/ 19:10:98
 * @lastAuthor: dyb-dev
 * @lastEditTime: 19/10/2024/ 19:10:49
 * @filePath: /base-lib/packages/create-project/scripts/build.mjs
 * @description: 构建脚本
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
    target: "node14",
    // 需要排除的模块
    external: ["electron"],
    // 插件列表
    plugins: [
        {
            // 插件的名称
            name: "alias",
            // 插件的行为
            setup({ onResolve, resolve }) {

                // 通过过滤正则表达式，匹配 'prompts' 模块并进行别名解析
                onResolve({ filter: /^prompts$/, namespace: "file" }, async({ importer, resolveDir }) => {

                    // 使用自定义逻辑指定解析 'prompts/lib/index.js' 模块，构建结果大小减少 50%
                    const result = await resolve("prompts/lib/index.js", {
                        importer,
                        resolveDir,
                        kind: "import-statement"
                    })

                    // 返回解析结果
                    return result

                })

            }
        }
    ]
})
