# @dyb-dev/eslint-config

`@dyb-dev/eslint-config` 是一个全面的 ESLint 配置包，支持 JavaScript、TypeScript、Vue、Jsonc、JsDoc格式化检查。此包旨在为你的项目提供统一和一致的编码风格。

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/eslint-config -D

# 使用 pnpm
pnpm add @dyb-dev/eslint-config -D

# 使用 yarn
yarn add @dyb-dev/eslint-config -D
```

## 使用方法

在你的 ESLint 配置文件中扩展此配置。你可以在 .eslintrc 或 .eslintrc.cjs 文件中进行配置：

.eslintrc 文件示例

```json
{
    "extends": ["@dyb-dev/eslint-config"]
}
```

## 功能支持

-   **JavaScript 格式化**: 支持对普通 JavaScript 文件的代码规范检查。
-   **TypeScript 格式化检查**: 确保你的 TypeScript 代码符合规范，但请注意，你需要额外安装 `npm install typescript -D` 依赖。
-   **Vue 文件格式化**: 内置对 Vue 文件的支持，确保你的 Vue 组件代码风格统一。
-   **Jsonc 文件格式化**: 支持 JSON with Comments 格式的文件格式化。
-   **JsDoc 格式化**: 确保你的代码注释符合规范，提升代码可读性。
