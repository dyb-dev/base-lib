/*
 * @FileDesc: 模板相关工具函数
 */

import { exec } from "node:child_process"
import { statSync, existsSync, copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync } from "node:fs"
import { basename, dirname, resolve } from "node:path"

import { red } from "kolorist"
import ora from "ora"

import { sortDependencies, deepMerge } from "./index"

/**
 * FUN: 下载项目模板
 *
 * @author dyb-dev
 * @date 20/10/2024/  01:54:33
 * @param {string} projectRootDir - 项目根目录，下载的模板会放在此目录下
 * @param {string} url - 模板地址，Git 仓库的 URL
 * @returns {Promise<boolean>} - 返回一个 Promise，表示模板是否下载成功
 */
export const downloadTemplate = (projectRootDir: string, url: string): Promise<boolean> => {

    return new Promise((resolve, reject) => {

        // 创建进度条，展示下载模板的进度
        const _progressBar = ora(`正在拉取项目模板 ${url}`).start()

        // git clone 命令，下载指定仓库的模板
        exec(`git clone --branch main ${url} ${projectRootDir}`, err => {

            // 如果 git clone 出现错误，更新进度条为失败状态
            if (err) {

                _progressBar.fail(`拉取项目模板失败 ${projectRootDir}`)
                reject(red("✖") + ` ${err.message}`)
                return

            }

            // 成功下载后，尝试删除 .git 文件夹，清除 Git 元数据
            try {

                rmSync(`${projectRootDir}/.git`, { recursive: true, force: true })

                // 删除 .github 文件夹
                const _githubDir = `${projectRootDir}/.github`
                // 如果 .github 文件夹存在，删除
                if (existsSync(_githubDir)) {

                    rmSync(_githubDir, { recursive: true, force: true })

                }

                console.log()
                // 显示进度条成功状态
                _progressBar.succeed(`拉取项目模板成功 ${projectRootDir}`)
                resolve(true)

            }
            catch (error: any) {

                // 如果删除文件夹失败，更新进度条为失败状态
                _progressBar.fail(`删除 .git 或 .github 文件夹失败 ${projectRootDir}`)
                reject(red("✖") + ` ${error.message}`)

            }

        })

    })

}

/**
 * FUN: 渲染模板
 *
 * 递归处理模板目录，并根据特定规则处理 package.json、extensions.json 等文件。
 * 对以 "_" 开头的文件进行重命名，_file 变为 .file
 *
 * @author dyb-dev
 * @date 20/10/2024/ 01:57:02
 * @param {string} src 源路径
 * @param {string} dest 目标路径
 */
export const renderTemplate = (src: string, dest: string) => {

    // 获取源路径的文件信息
    const _stats = statSync(src)

    // 如果它是一个目录，递归地渲染它的子目录和文件
    if (_stats.isDirectory()) {

        // 忽略 node_modules 目录
        if (basename(src) === "node_modules") {

            return

        }

        // 如果它是一个目录，递归地渲染它的子目录和文件
        mkdirSync(dest, { recursive: true })
        for (const file of readdirSync(src)) {

            renderTemplate(resolve(src, file), resolve(dest, file))

        }
        return

    }

    // 获取源文件名
    const _filename = basename(src)

    // 如果目标是一个目录，将文件名添加到目标路径中
    if (statSync(dest).isDirectory()) {

        dest = resolve(dest, _filename)

    }

    // 处理特殊文件的合并逻辑
    const mergeFileIfExists = (filename: string, mergeFunc: (existing: any, newContent: any) => any) => {

        // 如果文件存在，合并内容
        if (_filename === filename && existsSync(dest)) {

            const _existing = JSON.parse(readFileSync(dest, "utf8"))
            const _newContent = JSON.parse(readFileSync(src, "utf8"))
            const _merged = mergeFunc(_existing, _newContent)
            writeFileSync(dest, JSON.stringify(_merged, null, 4) + "\n")
            return true

        }
        return false

    }
    // 根据不同文件名进行合并处理
    if (mergeFileIfExists("package.json", (existing, newPackage) => sortDependencies(deepMerge(existing, newPackage)))) {

        return

    }
    if (mergeFileIfExists("extensions.json", deepMerge)) {

        return

    }
    if (mergeFileIfExists("settings.json", deepMerge)) {

        return

    }

    // 处理 _ 开头文件的重命名，例如 _gitignore -> .gitignore
    if (_filename.startsWith("_")) {

        dest = resolve(dirname(dest), _filename.replace(/^_/, "."))

    }

    // 处理 _gitignore 的追加逻辑
    if (_filename === "_gitignore" && existsSync(dest)) {

        const existing = readFileSync(dest, "utf8")
        const newGitignore = readFileSync(src, "utf8")
        writeFileSync(dest, existing + "\n" + newGitignore)
        return

    }

    // 复制文件到目标路径
    copyFileSync(src, dest)

}
