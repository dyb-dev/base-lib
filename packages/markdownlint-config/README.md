# @dyb-dev/markdownlint-config

`@dyb-dev/markdownlint-config` 是一个基于 markdownlint-cli2 的 Markdown 代码规范检查配置包，内置了一套统一的规则集，支持标题、列表、代码块、表格、链接等 Markdown 常见语法的规范检查。此包旨在为你的项目提供统一和一致的 Markdown 文档编写风格。

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/markdownlint-config@latest -D

# 使用 pnpm
pnpm add @dyb-dev/markdownlint-config@latest -D

# 使用 yarn
yarn add @dyb-dev/markdownlint-config@latest -D
```

## 使用方法

在你的 markdownlint-cli2 配置文件中扩展此配置。你可以在 `.markdownlint-cli2.mjs` 或 `.markdownlint-cli2.cjs` 文件中进行配置：

`.markdownlint-cli2.mjs` 文件示例

```js
import markdownlintConfig from "@dyb-dev/markdownlint-config"
export default markdownlintConfig
```

`.markdownlint-cli2.cjs` 文件示例

```js
const markdownlintConfig = require("@dyb-dev/markdownlint-config")
module.exports = markdownlintConfig
```

## 功能支持

-   **规则集统一管理**: 内置一套经过筛选和调整的 `markdownlint` 规则集，避免每个项目重复配置。
-   **Front Matter 兼容**: 自动识别并跳过文档开头的 Front Matter 区块，避免误报。
-   **Gitignore 联动**: 默认启用 `gitignore`，自动排除 `.gitignore` 中列出的文件，无需重复配置。
-   **常见目录排除**: 默认排除 `node_modules`、`dist`、`.history` 等常见无需检查的目录。
-   **编辑器行为一致**: 基于 `markdownlint-cli2` 配置文件格式，可与 `vscode-markdownlint` 编辑器插件共享同一套规则，保证命令行检查与编辑器提示行为一致。
-   **可扩展**: 支持在引入配置后自行追加或覆盖 `globs`、`ignores`、`config` 等属性，灵活适配不同项目需求。

## 常见问题

### 安装包后无法使用格式化

如果在安装 @dyb-dev/markdownlint-config 后无法使用格式化功能，可能是因为编辑器尚未加载新的配置。解决方法是 重启 编辑器，然后重新尝试格式化操作。
