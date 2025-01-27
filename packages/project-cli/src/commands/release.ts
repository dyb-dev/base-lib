/*
 * @Author: dyb-dev
 * @Date: 2024-12-11 17:22:25
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-01-28 03:51:28
 * @FilePath: /base-lib/packages/project-cli/src/commands/release.ts
 * @Description: 发布执行函数
 */

import { execSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

import { bold, green, red, yellow } from "picocolors"
import prompts from "prompts"
import { valid, inc, prerelease } from "semver"

import type { ReleaseType } from "semver"

/** 版本发布选项 */
interface IVersionReleaseOption {
    /** 选项标题 */
    title: `${ReleaseType} (${string})`
    /** 选项描述 */
    description: string
    /** 版本发布类型 */
    value: ReleaseType | `${ReleaseType}-${TVersionPreReleaseIdentifier}`
}

/** CONST: 主要版本发布选项 */
const MAJOR_MINOR_PATCH_OPTIONS: IVersionReleaseOption[] = [
    { title: "major (主版本号)", description: "", value: "major" },
    { title: "minor (次版本号)", description: "", value: "minor" },
    { title: "patch (补丁版本号)", description: "", value: "patch" }
]

/** CONST: 预发布主要版本选项 */
const PRE_MAJOR_MINOR_PATCH_OPTIONS: IVersionReleaseOption[] = [
    { title: "premajor (主版本号预发布)", description: "", value: "premajor-alpha" },
    { title: "preminor (次版本号预发布)", description: "", value: "preminor-alpha" },
    { title: "prepatch (补丁版本号预发布)", description: "", value: "prepatch-alpha" }
]

/** 版本预发布标识符 */
type TVersionPreReleaseIdentifier = "alpha" | "beta" | "rc"

/**
 * 版本预发布标识符选项类型
 */
interface IVersionPreReleaseIdentifierOption {
    /** 选项标题 */
    title: `${TVersionPreReleaseIdentifier} (${string})`
    /** 选项描述 */
    description: string
    /** 标识符值 */
    value: `prerelease-${TVersionPreReleaseIdentifier}`
}

/** CONST: 版本预发布标识符选项 */
const VERSION_PRE_RELEASE_IDENTIFIER_OPTIONS: IVersionPreReleaseIdentifierOption[] = [
    { title: "alpha (内部测试)", description: "", value: "prerelease-alpha" },
    { title: "beta (外部测试)", description: "", value: "prerelease-beta" },
    { title: "rc (候选发布)", description: "", value: "prerelease-rc" }
]

/**
 * 版本发布响应类型
 */
interface IVersionReleaseResponse {
    /** 版本发布类型 */
    versionReleaseType: ReleaseType
}

/**
 * FUN: 获取发布版本号
 *
 * @param {string} version 当前版本号
 * @returns {Promise<string>} 发布版本号
 */
const getReleaseVersion = async(version: string): Promise<string> => {

    /** 发布版本号 */
    let _releaseVersion = ""

    // 如果当前版本号有效
    if (valid(version)) {

        /** 获取预发布标识符信息 */
        const _prerelease = prerelease(version) as string[]
        /** 获取版本预发布标识符 */
        const _versionPreReleaseIdentifier = _prerelease ? _prerelease[0] : ""
        /** 版本发布选项 */
        let _versionReleaseOptions = _versionPreReleaseIdentifier
            ? [
                ...MAJOR_MINOR_PATCH_OPTIONS,
                ...VERSION_PRE_RELEASE_IDENTIFIER_OPTIONS.slice(
                    VERSION_PRE_RELEASE_IDENTIFIER_OPTIONS.findIndex(opt => {

                        const _preReleaseIdentifier = opt.value.split("-")[1]
                        return _preReleaseIdentifier === (_versionPreReleaseIdentifier || "alpha")

                    })
                )
            ]
            : [...MAJOR_MINOR_PATCH_OPTIONS, ...PRE_MAJOR_MINOR_PATCH_OPTIONS]

        // 生成选项描述
        _versionReleaseOptions = _versionReleaseOptions.map(item => {

            const _arr = item.value.split("-")
            /** 版本发布类型 */
            const _versionReleaseType = _arr[0] as ReleaseType
            /** 版本预发布标识 */
            const _preReleaseIdentifier = _arr[1] || ""
            /** 计算迭代完成后展示的版本号 */
            const _releaseVersion = inc(version, _versionReleaseType, _preReleaseIdentifier)
            item.description = `${version}->${_releaseVersion}`
            return item

        })

        // 选择版本发布类型和标识符
        const _response: IVersionReleaseResponse = await prompts([
            {
                type: "select",
                name: "versionReleaseType",
                message: "请选择版本发布类型:",
                choices: _versionReleaseOptions,
                initial: _versionReleaseOptions.findIndex(opt => {

                    const _versionReleaseType = opt.value.split("-")[0] as ReleaseType
                    return _versionReleaseType === "patch"

                })
            }
        ])

        // 判断是否生成发布版本号
        if (_response.versionReleaseType) {

            const _desc = _versionReleaseOptions.find(opt => opt.value === _response.versionReleaseType)?.description
            _releaseVersion = _desc?.split("->")[1] || ""

        }

    }
    else {

        // 当前版本号无效，提示用户输入发布的版本号
        const _response = await prompts({
            type: "text",
            name: "newVersion",
            message: "当前版本号无效，请输入新的版本号:",
            validate: value => valid(value) ? true : "版本号格式无效，请重新输入"
        })

        // 判断是否输入新版本号
        if (_response.newVersion) {

            _releaseVersion = _response.newVersion

        }

    }

    return _releaseVersion

}

/**
 * FUN: 设置 package.json 版本号
 *
 * @author dyb-dev
 * @date 27/01/2025/  19:45:27
 * @param {string} version - 版本号
 */
const setPackageVersion = (version: string) => {

    // 获取环境信息
    const { pkg, pkgJsonPath } = getEnvInfo()
    // 设置版本号
    pkg.version = version

    // 写入 package.json，缩进 4 个空格
    const _jsonString = JSON.stringify(pkg, null, 4)
    writeFileSync(pkgJsonPath, _jsonString, "utf8")

}

/**
 * FUN: 构建包
 *
 * @author dyb-dev
 * @date 27/01/2025/  19:56:02
 */
const buildPackage = () => {

    // 获取环境信息
    const { pkg, packageManager } = getEnvInfo()

    // 判断是否存在 build 脚本
    if (!pkg.scripts?.build) {

        console.warn(yellow("package.json 中不存在 build 脚本，取消 build 操作"))
        console.log()
        return

    }

    console.log(bold(`开始执行 ${green("build")} 操作`))

    // 同步执行构建命令，并将输出流传递给当前进程
    execSync(`${packageManager} run build`, { stdio: "inherit" })

    console.log(bold(`已完成 ${green("build")} 操作`))
    console.log()

}

/**
 * FUN: 检查指定目录是否包含 .git 目录
 *
 * @author dyb-dev
 * @date 27/01/2025/  20:21:11
 * @returns {boolean} 返回一个布尔值，表示指定目录是否包含 .git 目录
 */
const isGitInit = (): boolean => {

    try {

        // 获取环境信息
        const { currentWorkingDir } = getEnvInfo()
        // 检查指定目录是否包含 .git 目录
        execSync(`ls -d ${currentWorkingDir}/.git`, { stdio: "ignore" })
        // 如果命令成功执行
        return true

    }
    catch (error) {

        // 如果命令未成功执行
        return false

    }

}

/** Git提交信息类型选项 */
interface IGitCommitInfoTypeOption {
    /** 选项标题 */
    title: string
    /** 选项描述 */
    description: string
    /** 标识符值 */
    value: string
}

/** CONST: Git提交信息类型选项 */
const GIT_COMMIT_INFO_TYPE_OPTIONS: IGitCommitInfoTypeOption[] = [
    { title: "🎉 init (项目初始化)", description: "", value: "🎉 init" },
    { title: "✨ feat (添加新特性)", description: "", value: "✨ feat" },
    { title: "🐞 fix (修复bug)", description: "", value: "🐞 fix" },
    { title: "📃 docs (仅仅修改文档)", description: "", value: "📃 docs" },
    { title: "🌈 style (仅仅修改空格、格式等)", description: "", value: "🌈 style" },
    { title: "🦄 refactor (代码重构)", description: "", value: "🦄 refactor" },
    { title: "🎈 perf (优化性能/体验)", description: "", value: "🎈 perf" },
    { title: "🧪 test (增加测试用例)", description: "", value: "🧪 test" },
    { title: "🔧 build (依赖相关)", description: "", value: "🔧 build" },
    { title: "🐎 ci (CI配置相关)", description: "", value: "🐎 ci" },
    { title: "🐳 chore (构建流程/依赖库相关)", description: "", value: "🐳 chore" },
    { title: "↩ revert (回滚到上一个版本)", description: "", value: "↩ revert" },
    { title: "🔖 type (仅修改TS类型)", description: "", value: "🔖 type" }
]

interface ICommitGitChangesResponse {
    /** Git提交信息类型 */
    gitCommitInfoType: string
    /** Git提交信息描述 */
    gitCommitInfoDesc: string
}

/**
 * FUN: 提交Git更改
 *
 * @author dyb-dev
 * @date 27/01/2025/  21:01:01
 * @param {string} version - 版本号
 */
const commitGitChanges = async(version: string) => {

    // 选择git提交信息类型
    const _response: ICommitGitChangesResponse = await prompts([
        {
            type: "select",
            name: "gitCommitInfoType",
            message: "请选择Git提交信息类型:",
            choices: GIT_COMMIT_INFO_TYPE_OPTIONS,
            initial: 0
        },
        {
            type: "text",
            name: "gitCommitInfoDesc",
            message: "请输入Git提交信息描述:"
        }
    ])

    if (!_response.gitCommitInfoType) {

        throw "Git提交信息类型未设置"

    }

    if (!_response.gitCommitInfoDesc) {

        throw "Git提交信息描述未设置"

    }

    // 生成Git提交信息
    const _commitMsg = `${_response.gitCommitInfoType}: ${_response.gitCommitInfoDesc}`

    // 添加所有更改并提交到 Git
    execSync(`git add -A && git commit -m "${_commitMsg}"`, { stdio: "inherit" })

    // 提交带有版本号的Git 标签
    execSync(`git tag -a v${version} -m "${_commitMsg}"`, { stdio: "inherit" })

}

/**
 * FUN: 推送Git更改
 *
 * @author dyb-dev
 * @date 27/01/2025/  21:01:01
 */
const pushGitChanges = () => {

    // 获取环境信息
    const { gitRemote, gitCurrentBranch } = getEnvInfo()

    // 推送Git更改
    execSync(`git push ${gitRemote} ${gitCurrentBranch}`, { stdio: "inherit" })
    // 推送Git标签
    execSync(`git push ${gitRemote} ${gitCurrentBranch} --tags`, {
        stdio: "inherit"
    })

}

/**
 * FUN: 获取 npm 标签
 *
 * @author dyb-dev
 * @date 27/01/2025/  19:27:14
 * @param {string} version 当前版本号
 * @returns {*}  {string} npm标签
 */
const getNpmTag = (version: string): string => {

    /** 标签 */
    let _tag: string

    if (version.includes("alpha")) {

        // 内部测试版本
        _tag = "alpha"

    }
    else if (version.includes("beta")) {

        // 外部测试版本
        _tag = "beta"

    }
    else if (version.includes("rc")) {

        // 候选发布版本
        _tag = "rc"

    }
    else {

        // 正式版本
        _tag = "latest"

    }

    return _tag

}

/**
 * FUN: 发布包
 *
 * @author dyb-dev
 * @date 28/01/2025/  00:40:01
 * @param {string} version - 版本号
 */
const publishPackage = (version: string) => {

    // 获取环境信息
    const { pkg, packageManager } = getEnvInfo()

    // 判断是否为私有包
    if (pkg.private) {

        console.warn(yellow("package.json 中 private 为 true，取消 publish 操作"))
        console.log()
        return

    }

    console.log(bold(`开始执行 ${green("publish")} 操作`))
    console.log()

    // 获取 npm 标签
    const _tag = getNpmTag(version)

    // 构建发布命令
    let _command = `${packageManager} publish --tag ${_tag}`

    // 如果包管理器为 'pnpm'，则添加 '--no-git-checks' 参数，跳过 git 检查
    if (packageManager === "pnpm") {

        _command += " --no-git-checks"

    }

    // 发布包
    execSync(_command, { stdio: "inherit" })

    console.log()
    console.log(bold(`已完成 ${green("publish")} 操作`))
    console.log()

}

/**
 * FUN: 获取包管理器
 *
 * @author dyb-dev
 * @date 27/01/2025/  19:36:33
 * @returns {*}  {string} 包管理器
 */
const getPackageManager = (): string => {

    /** 获取当前运行命令的包管理器的信息 */
    const _userAgent = process.env.npm_config_user_agent ?? ""
    /** 获取包管理器 */
    const _packageManager = /pnpm/.test(_userAgent) ? "pnpm" : /yarn/.test(_userAgent) ? "yarn" : "npm"

    return _packageManager

}

/**
 * FUN: 获取Git远程仓库名称
 *
 * @author dyb-dev
 * @date 28/01/2025/  00:32:16
 * @returns {string} 远程仓库名称
 */
const getGitRemote = (): string => {

    /** git 远程仓库名称 */
    let _gitRemote = "origin"

    try {

        // 获取远程仓库名称
        _gitRemote = execSync("git remote", { encoding: "utf-8" }).split("\n")[0].trim() || "origin"
        return _gitRemote

    }
    catch (error) {

        console.error(`获取Git远程仓库名称失败，使用默认名称: ${_gitRemote}`)
        return _gitRemote

    }

}

/**
 * FUN: 获取Git当前分支名称
 *
 * @author dyb-dev
 * @date 28/01/2025/  00:34:46
 * @returns {string} 当前分支名称
 */
const getGitCurrentBranch = (): string => {

    /** git 当前分支名称 */
    let _gitCurrentBranch = "main"

    try {

        // 获取当前分支名称
        _gitCurrentBranch =
            execSync("git branch --show-current", {
                encoding: "utf-8"
            }).trim() || "main"

        return _gitCurrentBranch

    }
    catch (error) {

        console.error(`获取Git当前分支名称失败，使用默认名称: ${_gitCurrentBranch}`)
        return _gitCurrentBranch

    }

}

/** 环境信息 */
interface IEnvInfo {
    /** 当前工作目录 */
    currentWorkingDir: string
    /** package.json 文件路径 */
    pkgJsonPath: string
    /** package.json 文件内容对象 */
    pkg: Record<string, any>
    /** 包管理器 */
    packageManager: string
    /** git 远程仓库名称 */
    gitRemote: string
    /** git 当前分支名称 */
    gitCurrentBranch: string
}

/** LET: 环境信息 */
let envInfo: IEnvInfo

/**
 * FUN: 获取环境信息
 *
 * @author dyb-dev
 * @date 28/01/2025/  00:50:01
 * @returns {IEnvInfo} 环境信息
 */
const getEnvInfo = (): IEnvInfo => {

    if (!envInfo) {

        /** 当前工作目录 */
        const _currentWorkingDir = process.cwd()
        /** package.json 文件路径 */
        const _pkgJsonPath = join(_currentWorkingDir, "package.json")
        /** 原始 package.json 文件内容 */
        const _originPkg = JSON.parse(readFileSync(_pkgJsonPath, "utf-8"))

        // 设置环境信息
        envInfo = {
            currentWorkingDir: _currentWorkingDir,
            pkgJsonPath: _pkgJsonPath,
            pkg: _originPkg,
            packageManager: getPackageManager(),
            gitRemote: getGitRemote(),
            gitCurrentBranch: getGitCurrentBranch()
        }

    }

    return envInfo

}

/**
 * FUN: 发布
 *
 * @author dyb-dev
 * @date 11/12/2024/  20:21:38
 * @returns {*} {Promise<void>}
 */
const release = async(): Promise<void> => {

    try {

        console.log(bold("开始 release 进程"))
        console.log()

        // 获取环境信息
        const { pkg } = getEnvInfo()
        /** 旧版本号 */
        const _oldVersion = pkg.version

        console.log(`${bold("当前包名:")} ${green(pkg.name)} ${bold("当前版本:")} ${green(`v${_oldVersion}`)}`)
        console.log()

        // 获取发布版本号
        const _releaseVersion = await getReleaseVersion(_oldVersion)

        // 判断是否设置发布版本号
        if (!_releaseVersion) {

            throw "发布版本未设置"

        }

        // 设置 package.json 发布版本号
        setPackageVersion(_releaseVersion)

        console.log()
        console.log(`${bold("当前包名:")} ${green(pkg.name)} ${bold("发布版本:")} ${green(`v${_releaseVersion}`)}`)
        console.log()

        try {

            // 构建包
            buildPackage()

        }
        catch (error) {

            // 回滚版本号
            setPackageVersion(_oldVersion)
            throw "执行 build 操作失败，版本已回滚"

        }

        try {

            // 发布包
            publishPackage(_releaseVersion)

        }
        catch (error) {

            // 回滚版本号
            setPackageVersion(_oldVersion)
            throw "执行 publish 操作失败，版本已回滚"

        }

        // 判断是否初始化Git仓库
        if (isGitInit()) {

            console.log(bold(`开始执行 ${green("git commit")} 和 ${green("git push")} 操作`))
            console.log()

            // 提交Git更改
            await commitGitChanges(_releaseVersion)
            // 推送Git更改
            pushGitChanges()

            console.log()
            console.log(bold(`已完成 ${green("git commit")} 和 ${green("git push")} 操作`))
            console.log()

        }
        else {

            console.warn(yellow("Git仓库未初始化，取消 git commit 和 git push 操作"))
            console.log()

        }

        console.log(bold("已完成 release 进程"))
        console.log()

    }
    catch (error) {

        console.error(`${red("✖")} ${error}，已终止 release 进程`)
        console.log()

    }

}

export { release }
