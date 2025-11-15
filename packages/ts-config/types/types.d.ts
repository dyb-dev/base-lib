/*
 * @FileDesc: ts常用类型模块
 */

/**
 * 用于表示所有原始类型
 */
type TPrimitive = string | number | boolean | null | undefined

/**
 * 用于表示布尔值的字符串形式。
 * 该类型的值限定为 '0' 或 '1'，其中 '0' 代表布尔值 false，'1' 代表布尔值 true。
 */
type TBooleanString = "0" | "1"

/**
 * 用于表示数字的字符串形式。
 */
type TNumberString = `${number}`

/**
 * 用于表示 setTimeout 函数的返回值
 */
type TTimeoutId = ReturnType<typeof setTimeout>

/**
 * 用于表示 setInterval 函数的返回值
 */
type TIntervalId = ReturnType<typeof setInterval>
