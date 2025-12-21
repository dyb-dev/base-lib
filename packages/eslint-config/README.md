# @dyb-dev/eslint-config

`@dyb-dev/eslint-config` 是一个全面的 ESLint 配置包，支持 JavaScript、TypeScript、Vue、React、Next、Jsonc、JsDoc 的格式化检查。此包旨在为你的项目提供统一和一致的编码风格。

> ⚠️ 注意：此配置包只支持 CommonJS 规范，请确保你的 ESLint 配置文件遵循 CommonJS 规范。

## 功能

-   **JavaScript 格式化**: 支持对普通 JavaScript 文件的代码规范检查
-   **TypeScript 格式化检查**: 确保你的 TypeScript 代码符合规范
-   **Vue 文件格式化**: 内置对 Vue 3 文件的支持，确保你的 Vue 组件代码风格统一
-   **React 文件格式化**: 内置对 React/TSX 文件的支持，包括 React Hooks & Next Core 规则
-   **Jsonc 文件格式化**: 支持 JSON with Comments 格式的文件格式化
-   **JsDoc 格式化**: 确保你的代码注释符合规范，提升代码可读性

## 环境

-   Node.js: >= 18.0.0
-   pnpm: >= 8.15.5 < 10.0.0
-   ESLint: ^8.0.0

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/eslint-config@latest -D

# 使用 pnpm
pnpm add @dyb-dev/eslint-config@latest -D

# 使用 yarn
yarn add @dyb-dev/eslint-config@latest -D
```

## 使用

### 基础配置

在你的 ESLint 配置文件中扩展此配置。你可以在 `.eslintrc` 或 `.eslintrc.cjs` 文件中进行配置：

**`.eslintrc` 文件示例**

```json
{
    "extends": ["@dyb-dev/eslint-config"]
}
```

**`.eslintrc.cjs` 文件示例**

```js
module.exports = {
    extends: ["@dyb-dev/eslint-config"]
}
```

### Vue 项目

如果你的项目使用 Vue，请使用 Vue 专用配置：

```json
{
    "extends": ["@dyb-dev/eslint-config/vue"]
}
```

或在 `.eslintrc.cjs` 中：

```js
module.exports = {
    extends: ["@dyb-dev/eslint-config/vue"]
}
```

### React 项目

如果你的项目使用 React，请使用 React 专用配置：

```json
{
    "extends": ["@dyb-dev/eslint-config/react"]
}
```

或在 `.eslintrc.cjs` 中：

```js
module.exports = {
    extends: ["@dyb-dev/eslint-config/react"]
}
```

### Next 项目

如果你的项目使用 Next，请使用 Next 专用配置：

```json
{
    "extends": ["@dyb-dev/eslint-config/next"]
}
```

或在 `.eslintrc.cjs` 中：

```js
module.exports = {
    extends: ["@dyb-dev/eslint-config/next"]
}
```

## 依赖说明

此配置包已内置以下主要依赖，无需额外安装：

-   `@next/eslint-plugin-next` - Next ESLint 插件
-   `@typescript-eslint/eslint-plugin` - TypeScript ESLint 插件
-   `@typescript-eslint/parser` - TypeScript 解析器
-   `eslint-plugin-vue` - Vue ESLint 插件
-   `eslint-plugin-react-hooks` - React Hooks ESLint 插件
-   `eslint-plugin-import` - Import/Export 规范插件
-   `eslint-plugin-jsdoc` - JSDoc 注释规范插件
-   `eslint-plugin-jsonc` - JSON/JSONC 格式化插件

## 常见问题

### 安装包后无法使用格式化

如果在安装 `@dyb-dev/eslint-config` 后无法使用格式化功能，可能是因为编辑器尚未加载新的配置。解决方法是**重启编辑器**，然后重新尝试格式化操作。
