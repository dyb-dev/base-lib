# @dyb-dev/prettier-config

`@dyb-dev/prettier-config` 是一个全面的 Prettier 配置包，支持 JavaScript、TypeScript、Vue、Jsonc、JsDoc格式化检查，且额外支持 Html、Markdown、.d.ts格式化检查。此包旨在为你的项目提供统一和一致的编码风格。

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/prettier-config@latest -D

# 使用 pnpm
pnpm add @dyb-dev/prettier-config@latest -D

# 使用 yarn
yarn add @dyb-dev/prettier-config@latest -D
```

## 使用方法

在你的 Prettier 配置文件中扩展此配置。你可以在 `.prettierrc.mjs` 或 `.prettierrc.cjs` 文件中进行配置：

`.prettierrc.mjs` 文件示例

```js
import prettierConfig from "@dyb-dev/prettier-config"
export default prettierConfig
```

`.prettierrc.cjs` 文件示例

```js
const prettierConfig = require("@dyb-dev/prettier-config")
module.exports = prettierConfig
```

## 功能支持

-   **JavaScript 格式化**: 支持对普通 JavaScript 文件的代码规范检查。
-   **TypeScript 格式化检查**: 确保你的 TypeScript 代码符合规范，但请注意，你需要额外安装 `typescript` 依赖（`npm install typescript -D`）。
-   **Vue 文件格式化**: 内置对 Vue 文件的支持，确保你的 Vue 组件代码风格统一。
-   **Jsonc 文件格式化**: 支持 JSON with Comments 格式的文件格式化。
-   **JsDoc 格式化**: 确保你的代码注释符合规范，提升代码可读性。
-   **Html 文件格式化**: 支持 HTML 文件的格式化，确保网页结构清晰规范。
-   **Markdown 文件格式化**: 提供对 Markdown 文件的格式化支持，确保文档内容易读且统一。
-   **.d.ts 文件格式化**: 针对 TypeScript 的类型声明文件进行格式化，确保类型定义清晰一致。

## 常见问题

### 安装包后无法使用格式化

如果在安装 @dyb-dev/prettier-config 后无法使用格式化功能，可能是因为编辑器尚未加载新的配置。解决方法是 重启 编辑器，然后重新尝试格式化操作。
