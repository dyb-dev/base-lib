# @dyb-dev/ts-config

`@dyb-dev/ts-config` 是一个全面的 TypeScript 配置包，提供项目中基础的 TypeScript 配置、Vue 和 Node.js 环境下的 TypeScript 配置，以及一些常用的自定义类型和类型工具。此包旨在为你的项目提供统一和一致的编码风格。

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/ts-config -D

# 使用 pnpm
pnpm add @dyb-dev/ts-config -D

# 使用 yarn
yarn add @dyb-dev/ts-config -D
```

## 使用方法

在你的 `tsconfig.json` 文件中扩展此配置：

`tsconfig.json` 基础 ts 配置文件示例

```json
{
    "extends": "@dyb-dev/ts-config",
    "include": ["**/*.ts", "**/*.d.ts", "**/*.tsx", "**/*.vue"],
    "exclude": ["node_modules", "**/node_modules", ".history"],
    "compilerOptions": {
        "types": ["@dyb-dev/ts-config/types"],
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.base.tsbuildinfo"
    }
}
```

`tsconfig.json` Vue 环境下 ts 配置示例

```json
{
    "extends": "@dyb-dev/ts-config/vue",
    "include": ["**/*.ts", "**/*.d.ts", "**/*.tsx", "**/*.vue"],
    "exclude": ["node_modules", "**/node_modules", ".history"],
    "compilerOptions": {
        "types": ["@dyb-dev/ts-config/types"],
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
    }
}
```

`tsconfig.json` Node.js 环境下 ts 配置示例

```json
{
    "extends": "@dyb-dev/ts-config/node",
    "include": ["**/*.ts", "**/*.d.ts", "**/*.tsx", "**/*.vue"],
    "exclude": ["node_modules", "**/node_modules", ".history"],
    "compilerOptions": {
        "types": ["@dyb-dev/ts-config/types"],
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
    }
}
```

## 功能支持

-   **基础的 TypeScript 配置**: 提供项目中常用的 TypeScript 编译选项，确保代码风格一致。
-   **Vue 环境的 TypeScript 配置**: 为 Vue 项目提供合适的 TypeScript 编译选项，支持 JSX/TSX 语法。
-   **Node.js 环境的 TypeScript 配置**: 为 Node.js 项目提供合适的 TypeScript 编译选项，支持现代模块解析和目标环境。
-   **常用的 TypeScript 自定义类型**: 包含常用的 TypeScript 类型定义和类型工具。
-   **TS 类型工具**: 提供用于处理复杂类型的工具函数，如类型提取、类型转换等。

## TypeScript 自定义类型示例

以下是一些常用的 TypeScript 自定义类型的使用示例：

### TBooleanString

```typescript
type ExampleBooleanString = TBooleanString // '0' | '1'
```

用于表示布尔值的字符串形式。'0' 代表 `false`，'1' 代表 `true`。

### TNumberString

```typescript
type ExampleNumberString = TNumberString // '1' | '2' | '3'...
```

用于表示数字的字符串形式，例如 `"1"`、`"2"` 等。

### TFunction

```typescript
type ExampleFunction = TFunction<[number, string], string | Promise<string>>
// (args: [number, string]) => string | Promise<string>
```

用于表示通用的函数类型，参数类型为 `[number, string]`，返回值类型为 `string` 或 `Promise<string>`。

### TKeys

```typescript
type ExampleKeys = TKeys<{ id: number; name: string }, "id", "exclude">
// 'name'
```

用于从对象或元组中提取键，并根据指定条件排除或包含特定键。

### TTupleOf

```typescript
type ExampleTuple = TTupleOf<string, 3> // [string, string, string]
```

用于生成指定长度的元组类型，这里生成了一个包含 3 个 `string` 类型元素的元组。

### TNumberRangeTuple

```typescript
type ExampleRangeTuple = TNumberRangeTuple<1, 3> // [1, 2, 3]
```

用于生成指定范围内的数字元组类型，这里生成了从 `1` 到 `3` 的数字元组。

### TNumberRange

```typescript
type ExampleRange = TNumberRange<1, 3> // 1 | 2 | 3
```

用于生成指定范围内的数字联合类型，这里生成了 `1` 到 `3` 的数字联合类型。

### TDynamicProperties

```typescript
type ExampleDynamic = TDynamicProperties<1, 3, "prop_">
// { prop_1: string; prop_2: string; prop_3: string; }
```

用于生成带有动态属性名的类型，这里生成了 `prop_1` 到 `prop_3` 的属性，每个属性的值类型为 `string`。

### TModifyProperties

```typescript
type ExampleModified = TModifyProperties<{ id: number; name: string }, "name", "optional">
// { id: number; name?: string; }
```

用于条件性地将对象类型中的某些属性变为可选或必选，这里将 `name` 属性变为了可选。

## 常见问题

### 安装包后无法使用

如果在安装 @dyb-dev/ts-config 后无法使用，可能是因为编辑器尚未加载新的配置。解决方法是重启编辑器。
