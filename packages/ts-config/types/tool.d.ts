/*
 * @Author: dyb-dev
 * @Date: 2024-08-28 23:06:16
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-03-02 16:44:01
 * @FilePath: /base-lib/packages/ts-config/types/tool.d.ts
 * @Description: ts常用类型工具模块
 */

/**
 * 用于提取元组或对象类型的键，并根据传递的条件进行过滤
 *
 * @template Target - 元组类型或纯对象类型
 * @template Keys - 键的类型，可以是单个键或联合类型，默认为 `never`
 * @template Mode - 决定是排除（"exclude"）还是包含（"include"）这些键，默认值为 "exclude"
 * @returns 根据 Mode 参数返回处理后的键的联合类型
 *
 * @example
 * // 示例一：对象类型
 * type ObjectExample = {
 *     id: number;
 *     name: string;
 *     age: number;
 * };
 *
 * type ExcludedKeys = TKeys<ObjectExample, 'id' | 'name'>;
 * // 结果: "age"（排除 id 和 name 后的剩余键）
 *
 * type IncludedKeys = TKeys<ObjectExample, 'id' | 'name', 'include'>;
 * // 结果: "id" | "name"（仅包含 id 和 name）
 *
 * @example
 * // 示例二：数组类型
 * type TupleExample = [string, number, boolean];
 *
 * type TupleKeys = TKeys<TupleExample>;
 * // 结果: "0" | "1" | "2"（数组索引键）
 *
 * type FilteredTupleKeys = TKeys<TupleExample, '0', 'exclude'>;
 * // 结果: "1" | "2"（排除索引 0 后的键）
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
 *
 * @example
 * type ThreeStrings = TTupleOf<string, 3>;
 * // 结果: [string, string, string]
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
 *
 * @example
 * type RangeTuple = TNumberRangeTuple<1, 3>;
 * // 结果: [1, 2, 3]
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
 *
 * @example
 * type Range = TNumberRange<1, 3>;
 * // 结果: 1 | 2 | 3
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
 *
 * @example
 * type Properties = TDynamicProperties<1, 3, 'page_', boolean>;
 * // 结果:
 * // {
 * //     page_1: boolean;
 * //     page_2: boolean;
 * //     page_3: boolean;
 * // }
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
 *
 * @example
 * type User = {
 *     id: number;
 *     name: string;
 *     age: number;
 * };
 *
 * type OptionalUser = TModifyProperties<User, 'name' | 'age'>;
 * // 结果:
 * // {
 * //     id: number;
 * //     name?: string;
 * //     age?: number;
 * // }
 *
 * type RequiredUser = TModifyProperties<User, 'name', 'required'>;
 * // 结果:
 * // {
 * //     id: number;
 * //     name: string;
 * //     age?: number;
 * // }
 */
declare type TModifyProperties<
    TargetType,
    Keys extends keyof TargetType,
    Mode extends "optional" | "required" = "optional"
> = Mode extends "optional"
    ? Omit<TargetType, Keys> & Partial<Pick<TargetType, Keys>>
    : Omit<TargetType, Keys> & Required<Pick<TargetType, Keys>>

/**
 * 为对象的指定属性名添加指定前缀或后缀，并根据模式决定哪些属性生效，其他属性保持不变
 *
 * @template Target - 目标对象类型
 * @template Affix - 要添加的前缀或后缀（必传）
 * @template Position - 添加位置，'prefix' 表示前缀，'suffix' 表示后缀，默认是 'prefix'
 * @template SelectedKeys - 需要添加前/后缀的属性名，默认为全部属性
 * @template Mode - 控制模式，'include' 表示只有选中的属性生效，'exclude' 表示只有选中的属性不生效，默认是 'include'
 * @returns 新对象类型，选中的属性名加上前/后缀，类型保持原样，未选中的属性名和类型不变
 *
 * @example
 * type Result2 = TAddAffixProperties<{ name: string; age: number }, 'fetch', 'prefix', 'name', 'include'>;
 * // 结果:
 * // {
 * //     fetchName: string;
 * //     age: number;
 * // }
 */
declare type TAddAffixProperties<
    Target,
    Affix extends string,
    Position extends "prefix" | "suffix" = "prefix",
    SelectedKeys extends keyof Target = keyof Target,
    Mode extends "exclude" | "include" = "include"
> = {
    [Key in keyof Target as (
        Mode extends "include"
            ? Key extends SelectedKeys
                ? "affix"
                : "original"
            : Key extends SelectedKeys
              ? "original"
              : "affix"
    ) extends "affix"
        ? Position extends "prefix"
            ? `${Affix}${Capitalize<Key & string>}`
            : `${Key & string}${Capitalize<Affix>}`
        : Key]: Target[Key]
}

/**
 * 用于将对象类型转换为键值对形式的元组联合类型
 *
 * @template Target - 目标对象类型
 * @template Key - 目标对象中的属性键类型，默认为 TTarget 的所有键
 * @returns 目标对象的属性键值对组成的元组联合类型
 *
 * @example
 * interface Model {
 *     name: string;
 *     age: number;
 *     locations: string[] | null;
 * }
 *
 * type ModelEntries = TObjectEntries<Model>;
 * // 结果:
 * // ['name', string] |
 * // ['age', number] |
 * // ['locations', string[] | null]
 */
declare type TObjectEntries<Target extends Record<string, any>, Key = keyof Target> = Key extends keyof Target
    ? [Key, Target[Key]]
    : []

/**
 * 仅保留字面量属性名（排除字符串索引、数字索引、符号索引）
 *
 * @template Key - 要判断的属性名类型
 * @returns 如果属性名是字面量类型（如 'name'），则返回该属性名；否则返回 never
 *
 * @example
 * type Result1 = TLiteralKeyOnly<'name'>;
 * // 结果: 'name'
 *
 * type Result2 = TLiteralKeyOnly<string>;
 * // 结果: never
 */
declare type TLiteralKeyOnly<Key> = string extends Key
    ? never
    : number extends Key
      ? never
      : boolean extends Key
        ? never
        : symbol extends Key
          ? never
          : Key

/**
 * 移除对象上的索引签名，仅保留字面量属性名及其对应类型
 *
 * @template Obj - 目标对象类型
 * @returns 仅包含字面量属性名及其对应类型的新对象类型
 *
 * @example
 * type Foo = {
 *     [key: string]: any;
 *     foo: string;
 * };
 * type Result = TRemoveIndexSignature<Foo>;
 * // 结果: { foo: string }
 */
declare type TRemoveIndexSignature<Obj> = {
    [Key in keyof Obj as TLiteralKeyOnly<Key>]: Obj[Key]
}

/**
 * 用于生成联合类型的全排列数组类型
 *
 * @template Union - 需要生成排列的联合类型
 * @template RemainingUnion - 当前剩余的元素联合类型（递归用），默认与 Union 相同
 * @returns 包含所有排列顺序的元组类型联合体
 *
 * @example
 * type perm = TPermutation<'A' | 'B' | 'C'>;
 * // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
 */
declare type TPermutation<Union, RemainingUnion = Union> = [Union] extends [never]
    ? []
    : RemainingUnion extends RemainingUnion
      ? [RemainingUnion, ...TPermutation<Exclude<Union, RemainingUnion>>]
      : never

/**
 * 用于递归解析元组或数组中的 Promise，返回解析后的值类型组成的元组类型
 *
 * @template Array - 包含多个 Promise 或普通值的元组类型
 * @returns 解析后的值组成的元组类型
 *
 * @example
 * type Result = TPromiseParseAll<[Promise<string>, number, Promise<boolean>]>;
 * // 结果: [string, number, boolean]
 */
declare type TPromiseParseAll<Array extends any[]> = Array extends [infer First, ...infer Rest]
    ? First extends Promise<infer Result>
        ? [Result, ...TPromiseParseAll<Rest>]
        : [First, ...TPromiseParseAll<Rest>]
    : []

/**
 * 用于对一组 Promise 进行整体解析，返回解析后的值组成的元组类型的 Promise
 *
 * @template Array - 包含多个 Promise 或普通值的元组类型
 * @returns 解析后的值组成的元组类型的 Promise
 *
 * @example
 * type Result = TPromiseAll<[Promise<string>, number, Promise<boolean>]>;
 * // 结果: Promise<[string, number, boolean]>
 */
declare type TPromiseAll<Array extends any[]> = Promise<TPromiseParseAll<Array>>

/**
 * 去除字符串两端的指定字符（默认为空白字符：空格、换行、制表符）
 *
 * @template TString - 要处理的字符串类型
 * @template Chars - 要去除的字符集合，默认是空白字符（空格、换行、制表符）
 * @returns 去除两端指定字符后的字符串类型
 *
 * @example
 * type Trimmed = TTrim<'   Hello World   '>;
 * // 结果: 'Hello World'
 *
 * type TrimmedCustom = TTrim<'---Hello World---', '-'>;
 * // 结果: 'Hello World'
 */
declare type TTrim<TString extends string, Chars extends string = " " | "\n" | "\t"> = TString extends
    | `${Chars}${infer Rest}`
    | `${infer Rest}${Chars}`
    ? TTrim<Rest, Chars>
    : TString

/**
 * 将字符串字面量类型转换为数字字面量类型
 *
 * @template TString - 要转换的字符串字面量类型
 * @returns 如果字符串可以转换为有效的数字，则返回对应的数字字面量类型；否则返回原始类型
 *
 * @example
 * type Result1 = TToNumber<'123'>;
 * // 结果: 123
 *
 * type Result2 = TToNumber<'abc'>;
 * // 结果: 'abc'
 */
declare type TToNumber<TString> = TString extends `${infer TNumber extends number}` ? TNumber : TString

/**
 * 将联合类型转换为交叉类型
 *
 * @template Union - 目标联合类型
 * @returns 由联合类型转换成的交叉类型
 *
 * @example
 * type Result = TUnionToIntersection<{a: 1} | {b: 2} | {c: 3}>;
 * // 结果: {a: 1} & {b: 2} & {c: 3}
 */
declare type TUnionToIntersection<Union> = (Union extends any ? (arg: Union) => any : never) extends (
    arg: infer Intersection
) => any
    ? Intersection
    : never

/**
 * 提取联合类型中的最后一个成员
 *
 * @template Union - 目标联合类型
 * @returns 联合类型中的最后一个成员
 *
 * @example
 * type Last = TUnionLast<'a' | 'b' | 'c'>;
 * // 结果: 'c'
 */
declare type TUnionLast<Union> =
    TUnionToIntersection<Union extends Union ? () => Union : never> extends () => infer Last ? Last : never

/**
 * 将联合类型转换为元组类型，顺序为联合类型的自然顺序
 *
 * @template Union - 目标联合类型
 * @returns 由联合类型的成员组成的元组类型
 *
 * @example
 * type Tuple = TUnionToTuple<'a' | 'b' | 'c'>;
 * // 结果: ['a', 'b', 'c']
 */
declare type TUnionToTuple<Union> = [Union] extends [never]
    ? []
    : [...TUnionToTuple<Exclude<Union, TUnionLast<Union>>>, TUnionLast<Union>]

/**
 * 判断两个类型是否完全相等
 * 注意：当下为严格模式，会检查 readonly、? 等修饰符，非严格模式可用 extends 判断
 *
 * @template Left - 第一个类型
 * @template Right - 第二个类型
 * @returns 如果两个类型完全相等，则返回 true；否则返回 false
 *
 * @example
 * type Result1 = TEqual<1, 1>;
 * // 结果: true
 *
 * type Result2 = TEqual<{a: string}, {a: string}>;
 * // 结果: true
 */
declare type TEqual<Left, Right> = (<T>() => T extends Left ? 1 : 2) extends <T>() => T extends Right ? 1 : 2 ? true : false

/**
 * 判断类型是否为 never
 *
 * @template Type - 要判断的类型
 * @returns 如果类型为 never，则返回 true；否则返回 false
 *
 * @example
 * type Result = TIsNever<never>;
 * // 结果: true
 */
declare type TIsNever<Type> = [Type] extends [never] ? true : false

/**
 * 判断类型是否为联合类型
 *
 * @template Type - 要判断的类型
 * @template Base - 保留初始类型，用于对比当前分发的成员，内部使用，默认与 TType 相同
 * @returns 如果类型是联合类型，则返回 true；否则返回 false
 *
 * @example
 * type Result = TIsUnion<'a' | 'b' | 'c'>;
 * // 结果: true
 */
declare type TIsUnion<Type, Base = Type> =
    TIsNever<Type> extends true ? false : Type extends Type ? ([Base] extends [Type] ? false : true) : never

/**
 * 按指定深度扁平化数组类型
 *
 * @template Array - 要处理的数组类型
 * @template MaxDepth - 扁平化的最大层级，默认为 1
 * @template CurrentDepth - 当前递归深度，内部使用，初始为空数组
 * @returns 扁平化后的数组类型
 *
 * @example
 * type Result = TFlattenDepth<[1, [2, [3, [4]]]], 2>;
 * // 结果: [1, 2, 3, [4]]
 */
declare type TFlattenDepth<
    Array extends unknown[],
    MaxDepth extends number = 1,
    CurrentDepth extends 1[] = []
> = CurrentDepth["length"] extends MaxDepth
    ? Array
    : Array extends [infer Head, ...infer Tail]
      ? Head extends unknown[]
          ? [...TFlattenDepth<Head, MaxDepth, [...CurrentDepth, 1]>, ...TFlattenDepth<Tail, MaxDepth, CurrentDepth>]
          : [Head, ...TFlattenDepth<Tail, MaxDepth, CurrentDepth>]
      : []
