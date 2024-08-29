/*
 * @Author: dyb-dev
 * @Date: 2024-08-28 23:06:16
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-08-29 22:25:57
 * @FilePath: /base-lib/packages/ts-config/types/tool.d.ts
 * @Description: ts常用类型工具模块
 */

/**
 * 用于表示一个通用的函数类型
 *
 * @template Params - 函数的参数类型，默认值为 `any`。可以是单个类型或类型的元组。
 * @template ReturnType - 函数的返回值类型，默认值为 `any`。可以是单个类型或联合类型。
 * @returns 一个接受类型 `Params` 参数并返回类型 `ReturnType` 的函数类型
 * @example
 * // 一个带有 2 个参数的函数类型示例
 * // 参数类型分别是 number, string
 * // 返回值类型为 string 或 Promise<string>
 * TFunction<[number, string], string | Promise<string>>
 */
declare type TFunction<Params = any, ReturnType = any> = Params extends any[]
    ? (...args: Params) => ReturnType
    : (...args: [Params]) => ReturnType

/**
 * 用于提取元组或对象类型的键，并根据传递的条件进行过滤
 *
 * @template Target - 元组类型或纯对象类型
 * @template Keys - 键的类型，可以是单个键或联合类型，默认为 `never`
 * @template Mode - 决定是排除（"exclude"）还是包含（"include"）这些键，默认值为 "exclude"
 * @returns 根据 Mode 参数返回处理后的键的联合类型
 */
declare type TKeys<
    Target extends readonly any[] | object,
    Keys extends Exclude<keyof Target, keyof any[]> = never,
    Mode extends "exclude" | "include" = "exclude"
> = Mode extends "exclude" ? Exclude<Exclude<keyof Target, keyof any[]>, Keys> : Extract<Exclude<keyof Target, keyof any[]>, Keys>

/**
 * 用于生成包含 N 个指定类型的元组类型
 *
 * @template TargetType - 要重复的类型，即元组中每个元素的类型
 * @template Length - 元组的目标长度
 * @template Accumulator - 用于内部递归累积的数组，无需传递，默认值为 []
 * @returns 包含 Length 个类型 TargetType 元素的元组类型
 */
declare type TTupleOf<TargetType, Length extends number, Accumulator extends any[] = []> = Accumulator["length"] extends Length
    ? Accumulator
    : TTupleOf<TargetType, Length, [...Accumulator, TargetType]>

/**
 * 用于生成指定范围内的数字元组类型
 *
 * @template Start - 范围的起始数字
 * @template End - 范围的结束数字
 * @template OutputType - 输出的类型，可以是 'string' 或 'number'，默认为 'number'
 * @template Accumulator - 用于内部递归累积的数组，无需传递，默认值为 []
 * @template StartAccumulator - 用于内部从起始数字生成的累积数组，无需传递
 * @template EndAccumulator - 用于内部表示结束数字生成的累积数组，无需传递
 * @returns 包含指定范围内数字的元组类型
 */
declare type TNumberRangeTuple<
    Start extends number,
    End extends number,
    OutputType extends "string" | "number" = "number",
    Accumulator extends any[] = [],
    StartAccumulator extends any[] = TTupleOf<Start, Start>,
    EndAccumulator extends any[] = [...TTupleOf<End, End>, End]
> = StartAccumulator["length"] extends EndAccumulator["length"]
    ? Accumulator
    : TNumberRangeTuple<
          Start,
          End,
          OutputType,
          [...Accumulator, OutputType extends "number" ? StartAccumulator["length"] : `${StartAccumulator["length"]}`],
          [...StartAccumulator, StartAccumulator["length"]],
          EndAccumulator
      >

/**
 * 用于生成指定范围内的数字联合类型
 *
 * @template Start - 范围的起始数字
 * @template End - 范围的结束数字
 * @template OutputType - 输出的类型，可以是 'string' 或 'number'，默认为 'number'
 * @returns 包含指定范围内数字的联合类型
 */
declare type TNumberRange<Start extends number, End extends number, OutputType extends "string" | "number" = "number"> =
    TNumberRangeTuple<Start, End, OutputType> extends infer R ? (R extends any[] ? R[number] : never) : never

/**
 * 用于生成指定范围内的动态属性类型
 *
 * @template Start - 范围的起始数字
 * @template End - 范围的结束数字
 * @template KeyPrefix - 属性的前缀，默认值为空字符串
 * @template ValueType - 属性的值类型，默认值为 string
 * @returns 包含指定范围内数字作为后缀的动态属性类型
 */
declare type TDynamicProperties<Start extends number, End extends number, KeyPrefix extends string = "", ValueType = string> = {
    [key in `${KeyPrefix}${TNumberRange<Start, End>}`]: ValueType
}

/**
 * 条件性地将指定类型中的某些属性变为可选或必选。
 *
 * @template TargetType - 目标类型
 * @template Keys - 需要变为可选或必选的属性键的联合类型
 * @template Mode - 指定模式，可为 'optional' 或 'required'，默认值为 'optional'。如果为 'optional'，则将指定属性变为可选；如果为 'required'，则将指定属性变为必选
 * @returns 处理后的新类型，其中指定的属性根据条件变为可选或必选
 */
declare type TModifyProperties<
    TargetType,
    Keys extends keyof TargetType,
    Mode extends "optional" | "required" = "optional"
> = Mode extends "optional"
    ? Omit<TargetType, Keys> & Partial<Pick<TargetType, Keys>>
    : Omit<TargetType, Keys> & Required<Pick<TargetType, Keys>>
