/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:43:18
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-10-20 02:48:14
 * @FilePath: /base-lib/packages/create-project/src/utils/dir.ts
 * @Description: 目录相关工具函数
 */

import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "node:fs"
import { resolve } from "node:path"

/**
 * FUN: 判断目录是否可以跳过清空操作
 * - 如果目录不存在，或者目录为空，或者只有 .git 文件，则可以跳过清空操作。
 *
 * @author dyb-dev
 * @date 19/10/2024/  22:05:40
 * @param {string} dir - 需要检查的目录路径
 * @returns {*} {boolean} - 如果可以跳过清空返回 true，否则返回 false
 */
const canSkipEmptying = (dir: string): boolean => {

    // 如果目录不存在，返回 true，表示可以跳过清空（因为没有需要清空的内容）
    if (!existsSync(dir)) {

        return true

    }

    // 读取该目录下的文件列表
    const _files = readdirSync(dir)

    // 如果目录是空的（没有文件），返回 true，表示可以跳过清空
    if (_files.length === 0) {

        return true

    }

    // 如果目录中只有一个文件，并且这个文件是 '.git' 文件夹，返回 true，表示可以跳过清空
    if (_files.length === 1 && _files[0] === ".git") {

        return true

    }

    // 如果目录存在且包含其他文件，返回 false，表示不能跳过清空
    return false

}

/**
 * FUN: 清空目录
 *
 * @author dyb-dev
 * @date 19/10/2024/  22:39:09
 * @param {string} dir - 目录
 */
const emptyDir = (dir: string): void => {

    // 如果目录不存在，直接返回
    if (!existsSync(dir)) {

        return

    }

    // 后序遍历目录，删除文件和目录
    postOrderDirectoryTraverse(
        dir,
        (dir: string) => rmdirSync(dir),
        (file: string) => unlinkSync(file)
    )

}

/**
 * FUN: 后序遍历目录
 *
 * @author dyb-dev
 * @date 19/10/2024/  22:37:24
 * @param {string} dir - 需要遍历的目录
 * @param dirCallback - 目录回调
 * @param fileCallback - 文件回调
 */
const postOrderDirectoryTraverse = (
    dir: string,
    dirCallback: { (dir: string): void; (arg0: string): void },
    fileCallback: { (file: string): void; (arg0: string): void }
) => {

    for (const filename of readdirSync(dir)) {

        // 忽略 .git 目录
        if (filename === ".git") {

            continue

        }

        const _fullPath = resolve(dir, filename)

        // 如果是目录，递归遍历
        if (lstatSync(_fullPath).isDirectory()) {

            // 递归遍历
            postOrderDirectoryTraverse(_fullPath, dirCallback, fileCallback)
            // 目录回调
            dirCallback(_fullPath)
            continue

        }
        // 文件回调
        fileCallback(_fullPath)

    }

}

export { canSkipEmptying, emptyDir, postOrderDirectoryTraverse }
