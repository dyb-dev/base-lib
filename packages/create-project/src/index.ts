/*
 * @FileDesc: 程序入口文件
 */

import { existsSync, rmdirSync, mkdirSync, writeFileSync } from "node:fs"
import { basename, join, resolve, relative } from "node:path"
import { parseArgs } from "node:util"

import { red, green, bold } from "kolorist"
import prompts from "prompts"

import { DEFAULT_PROJECT_NAME, PROJECT_TEMPLATE_LIST, DEFAULT_TITLE, GRADIENT_TITLE } from "./constants"
import {
    canSkipEmptying,
    isValidPackageName,
    toValidPackageName,
    downloadTemplate,
    getCommand,
    renderTemplate,
    emptyDir
} from "./utils"

/**
 * FUN: 初始化
 *
 * @author dyb-dev
 * @date 19/10/2024/  20:10:42
 */
const init = async () => {

    try {

        // 制造空行
        console.log()
        /** 检查当前标准输出是否是终端（isTTY）且支持至少 256 色（颜色深度 >= 8），如果满足条件则使用带渐变颜色的标题，否则使用默认标题 */
        console.log(bold(process.stdout.isTTY && process.stdout.getColorDepth() >= 8 ? GRADIENT_TITLE : DEFAULT_TITLE))
        console.log()

        /** 命令行参数列表 */
        const _commandLineArgList = process.argv.slice(2)

        /** 命令行参数选项 */
        const _commandLineArgOptions = {
            /** 是否强制覆盖已存在的目录 */
            force: { type: "boolean" }
        } as const

        // 解析参数
        // parsedOptions 代表 -- 开头的参数对象
        // positionalArgs 代表不带 -- 的位置参数数组
        const { values: parsedOptions, positionals: positionalArgs } = parseArgs({
            args: _commandLineArgList,
            options: _commandLineArgOptions,
            // 禁用严格模式，如果参数不在 `_commandLineArgOptions` 中，不会抛出错误
            strict: false
        })

        /** 当前工作目录 */
        const _currentWorkingDir = process.cwd()

        /** 项目名称参数 */
        let _projectNameArg = positionalArgs[0] || ""
        /** 获取项目根目录路径 */
        let _projectRootDir = ""
        /** 项目名称 */
        let _projectName = ""
        /** 是否强制覆盖 */
        const _forceOverwrite = !!parsedOptions.force

        /** 交互结果 */
        let result: {
            /** 项目名称 */
            projectName?: string
            /** 包名 */
            packageName?: string
            /** 是否强制覆盖已存在的目录 */
            shouldOverwrite?: boolean
            /** 项目模板 url 链接 */
            templateUrl?: string
        } = {}

        result = await prompts([
            {
                // 字段名称
                name: "projectName",
                // 控件类型
                type: _projectNameArg ? null : "text",
                // 左侧提示信息
                message: "请输入项目名称[输入 `.` 在 `当前目录` 构建项目]:",
                // 默认值
                initial: DEFAULT_PROJECT_NAME,
                onState: state => {

                    _projectNameArg = String(state.value).trim() || DEFAULT_PROJECT_NAME

                }
            },
            {
                name: "shouldOverwrite",
                type: () => {

                    // 拼接项目根目录路径
                    _projectRootDir = join(_currentWorkingDir, _projectNameArg)
                    // 获取项目名称
                    _projectName = basename(_projectRootDir)

                    return canSkipEmptying(_projectRootDir) || _forceOverwrite ? null : "toggle"

                },
                message: () => `目录 \`${_projectName}\` 内容不为空，是否删除该目录所有文件并继续?`,
                initial: false,
                active: "是",
                inactive: "否"
            },
            {
                name: "overwriteChecker",
                message: "检查是否需要覆盖",
                type: shouldOverwrite => {

                    // 如果取消强制覆盖，直接停止执行报错
                    if (shouldOverwrite === false) {

                        throw red("✖") + " 您已取消删除,操作已被终止"

                    }
                    return null

                }
            },
            {
                name: "packageName",
                type: () => isValidPackageName(_projectName) ? null : "text",
                message: "请输入包名:",
                initial: () => toValidPackageName(_projectName),
                validate: packageName =>
                    isValidPackageName(packageName) ||
                    `\`${packageName}\` 为无效的package.json名字,可使用 \`${toValidPackageName(packageName)}\` 替代`
            },
            {
                name: "templateUrl",
                type: "select",
                message: "请选择您要拉取的项目模板:",
                initial: 0,
                choices: () => PROJECT_TEMPLATE_LIST
            }
        ])

        /** 交互结果 */
        const { packageName = _projectName, shouldOverwrite = _forceOverwrite, templateUrl } = result

        // 如果没有选择拉取的模板直接报错
        if (!templateUrl) {

            throw red("✖") + " 您的操作已被终止"

        }

        // 如果项目根目录已经存在，且允许强制覆盖
        if (existsSync(_projectRootDir) && shouldOverwrite) {

            // 清空项目根目录
            emptyDir(_projectRootDir)

        }
        else if (!existsSync(_projectRootDir)) {

            // 如果目录不存在，创建目录
            mkdirSync(_projectRootDir)

        }

        console.log(`\n开始构建项目 ${_projectRootDir} ...`)

        // 下载项目模板
        await downloadTemplate(_projectRootDir, templateUrl)

        /** 临时的项目模板目录 */
        const _tempProjectTemplateDir = resolve(__dirname, "temp-project-template")

        // 如果临时的模板根目录存在，删除
        if (existsSync(_tempProjectTemplateDir)) {

            emptyDir(_tempProjectTemplateDir)

        }
        // 创建临时的模板根目录
        mkdirSync(_tempProjectTemplateDir)

        // 初始的 package.json 配置
        const _pkg = { name: packageName, version: "0.0.1" }
        // 写入 package.json 文件
        writeFileSync(resolve(_tempProjectTemplateDir, "package.json"), JSON.stringify(_pkg, null, 4))

        // 渲染模板
        const render = (templateName: string) => {

            const _templateDir = resolve(_tempProjectTemplateDir, templateName)
            renderTemplate(_templateDir, _projectRootDir)

        }

        // 渲染 package.json,将临时目录的 package.json 和 拉取的模板的 package.json 合并
        render("package.json")

        // 清空临时的项目模板目录
        emptyDir(_tempProjectTemplateDir)
        // 删除临时的项目模板目录
        rmdirSync(_tempProjectTemplateDir)

        console.log("\n项目构建完成,可执行以下命令:\n")

        // 如果项目根目录和当前工作目录不一致
        if (_projectRootDir !== _currentWorkingDir) {

            // 相对路径
            const _cdProjectName = relative(_currentWorkingDir, _projectRootDir)
            console.log(`  ${bold(green(`cd ${_cdProjectName.includes(" ") ? `"${_cdProjectName}"` : _cdProjectName}`))}`)

        }

        // 获取当前的包管理器
        const _userAgent = process.env.npm_config_user_agent ?? ""
        // 包管理器
        const _packageManager = /pnpm/.test(_userAgent) ? "pnpm" : /yarn/.test(_userAgent) ? "yarn" : "npm"

        console.log(`  ${bold(green(getCommand(_packageManager, "install")))}`)
        console.log()

    }
    catch (error) {

        console.error(error)
        // 强制退出当前运行的进程，并返回一个指定的退出码
        process.exit(1)

    }

}

// 执行初始化
init()
