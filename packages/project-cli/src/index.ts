/*
 * @Author: dyb-dev
 * @Date: 2024-10-21 16:19:02
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-11-02 04:04:33
 * @FilePath: /base-lib/packages/project-cli/src/index.ts
 * @Description: 程序入口文件
 */

import { Command } from "commander"
import { bold, green } from "kolorist"

import { version } from "../package.json"

import { commitLint } from "./commands"

/** 输出带绿色的标题 */
console.log(bold(green(`Project CLI v${version}\n`)))

/** 创建 CLI 程序对象 */
const program = new Command()

/** 设置版本号命令 可以使用 -V 选项查看版本 */
program.version(`v${version}`)

/**
 * 定义 `commit-lint` 子命令，用于校验提交信息
 * - <gitParams> 代表 git 提交信息参数
 * - description 代表命令描述，用于 -h 时展示
 */
program.command("commit-lint <gitParams>").description("校验Git提交信息").action(commitLint)

/** 解析命令行输入参数 */
program.parse(process.argv)
