/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:44:49
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-07-31 23:52:26
 * @FilePath: /base-lib/packages/create-project/src/utils/package.ts
 * @Description: 包相关工具函数
 */

/**
 * FUN: 是否是一个合法的 npm 包名
 *
 * @author dyb-dev
 * @date 19/10/2024/  22:03:53
 * @param {*} packageName - 包名
 * @returns {*}  {boolean} - 返回是否是一个合法的 npm 包名
 */
export const isValidPackageName = (packageName: any): boolean =>
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(packageName)

/**
 * FUN: 将无效的包名转换为有效的包名
 *
 * @author dyb-dev
 * @date 19/10/2024/  22:09:42
 * @param {string} packageName - 包名
 * @returns {*}  {string} - 返回有效的包名
 */
export const toValidPackageName = (packageName: string): string =>
    packageName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^[._]/, "")
        .replace(/[^a-z0-9-~]+/g, "-")

/**
 * FUN: 排序依赖
 *
 * 按照依赖类型对 package.json 文件中的依赖项进行排序，以使其更有序和易读。
 *
 * @author dyb-dev
 * @date 19/10/2024/  23:00:04
 * @param {Record<string,any>} packageJson - package.json 对象
 * @returns {*} {Record<string,any>} - 排序后的 package.json 对象
 */
export const sortDependencies = (packageJson: Record<string, any>) => {

    // 存储排序后的结果
    const _sorted: any = {}

    // 要处理的依赖类型数组，包括依赖、开发依赖、可选依赖等
    const _depTypes = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]

    // 遍历每种依赖类型
    for (const depType of _depTypes) {

        // 如果 packageJson 中存在该依赖类型
        if (packageJson[depType]) {

            // 初始化该依赖类型的排序结果
            _sorted[depType] = {}

            // 对依赖项按名称排序
            Object.keys(packageJson[depType])
                .sort()
                // 遍历排序后的依赖项名称，并将其添加到 _sorted 中
                .forEach(name => {

                    _sorted[depType][name] = packageJson[depType][name]

                })

        }

    }

    // 返回一个新的 packageJson 对象，其中包括原始内容和排序后的依赖项
    return {
        ...packageJson,
        ..._sorted
    }

}

/**
 * FUN: 获取命令
 *
 * @author dyb-dev
 * @date 19/10/2024/  23:40:48
 * @param {string} packageManager - 包管理器
 * @param {string} [scriptName] - 脚本名称
 * @param {string} [args] - 参数
 * @returns {*}  {string} - 命令
 */
export const getCommand = (packageManager: string, scriptName: string, args?: string): string => {

    if (scriptName === "install") {

        return packageManager === "yarn" ? "yarn" : `${packageManager} install`

    }

    if (args) {

        return packageManager === "npm" ? `npm run ${scriptName} -- ${args}` : `${packageManager} ${scriptName} ${args}`

    }
    return packageManager === "npm" ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`

}
