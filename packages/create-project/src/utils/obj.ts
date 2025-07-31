/*
 * @Author: dyb-dev
 * @Date: 2024-10-20 01:42:33
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-07-31 23:52:13
 * @FilePath: /base-lib/packages/create-project/src/utils/obj.ts
 * @Description: 对象相关工具函数
 */

/**
 * FUN: 是否为对象
 *
 * @author dyb-dev
 * @date 20/10/2024/  02:06:32
 * @param {*} val - 任意值
 * @returns {*} {boolean} - 返回是否为对象
 */
export const isObject = (val: any) => val && typeof val === "object"

/**
 * FUN: 合并数组并去重
 *
 * @author dyb-dev
 * @date 20/10/2024/  02:06:45
 * @param {any[]} a 目标数组1
 * @param {any[]} b 目标数组2
 * @returns {*} {any[]} - 返回合并后的数组
 */
export const mergeArrayWithDedupe = (a: any[], b: any[]) => Array.from(new Set([...a, ...b]))

/**
 * FUN: 深度合并对象
 *
 * @author dyb-dev
 * @date 20/10/2024/  02:07:17
 * @param {{ [x: string]: any }} target 目标对象
 * @param {{ [x: string]: any }} obj 待合并的对象
 * @returns {*} {any} - 返回合并后的对象
 */
export const deepMerge = (target: { [x: string]: any }, obj: { [x: string]: any }) => {

    // 遍历新对象的所有键
    for (const key of Object.keys(obj)) {

        // 获取目标对象和新对象中当前键的值
        const oldVal = target[key]
        const newVal = obj[key]

        // 如果两个值都是数组，则合并并去重
        if (Array.isArray(oldVal) && Array.isArray(newVal)) {

            target[key] = mergeArrayWithDedupe(oldVal, newVal)

        }
        // 如果两个值都是对象，则递归合并
        else if (isObject(oldVal) && isObject(newVal)) {

            target[key] = deepMerge(oldVal, newVal)

        }
        // 否则直接用新对象的值覆盖目标对象的值
        else {

            target[key] = newVal

        }

    }

    // 返回合并后的目标对象
    return target

}
