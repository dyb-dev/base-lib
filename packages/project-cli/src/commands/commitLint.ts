/*
 * @FileDesc: git提交信息校验执行函数
 */

import { readFileSync } from "node:fs"

/**
 * CONST: 提交效验正则
 * - init: 项目初始化
 * - feat: 添加新特性
 * - fix: 修复bug
 * - docs: 仅仅修改文档
 * - style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
 * - refactor: 代码重构，没有加新功能或者修复bug
 * - perf: 优化相关，比如提升性能、体验
 * - test: 增加测试用例
 * - build: 依赖相关的内容
 * - ci: ci配置相关，例如对k8s，docker的配置文件的修改
 * - chore: 改变构建流程、或者增加依赖库、工具等
 * - revert: 回滚到上一个版本
 * - type: 仅仅新增、删除、修改了ts类型
 */
const commitRE =
    /^(revert: )?((\p{Emoji})(\s))?(init|feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|type)(\(.+\))?:\s.{1,60}$/u

/** CONST: 合并效验正则 */
const mergeRE = /Merge /

/**
 * FUN: git提交信息校验
 *
 * @author dyb-dev
 * @date 21/10/2024/  21:54:37
 * @param {string} gitParams git提交信息
 */
export const commitLint = (gitParams: string) => {

    // 读取 git 提交信息并去除首尾空格
    const _commitMsg = readFileSync(gitParams, "utf-8").trim()

    // 如果提交信息不符合 commitRE 或 mergeRE 的格式
    if (!commitRE.test(_commitMsg) && !mergeRE.test(_commitMsg)) {

        console.error(
            `无效的提交信息: "${_commitMsg}"。

  正确的提交信息格式要求如下，便于自动生成变更日志。

  示例:

  - fix(区域): 修复样式问题
  - feat(区域): 添加新功能
  - docs(区域): 修改文档中的错误

  允许的提交类型:

  - init: 项目初始化
  - feat: 添加新特性
  - fix: 修复bug
  - docs: 仅仅修改文档
  - style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  - refactor: 代码重构，没有加新功能或者修复bug
  - perf: 优化相关，比如提升性能、体验
  - test: 增加测试用例
  - build: 依赖相关的内容
  - ci: ci配置相关，例如对k8s，docker的配置文件的修改
  - chore: 改变构建流程、或者增加依赖库、工具等
  - revert: 回滚到上一个版本
  - type: 仅仅新增、删除、修改了ts类型
  - Merge branch 'foo' into 'bar'
  `
        )

        // 提交失败，退出程序并返回状态码 1
        process.exit(1)

    }

}
