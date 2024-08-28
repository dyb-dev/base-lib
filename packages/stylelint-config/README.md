# @dyb-dev/stylelint-config

`@dyb-dev/stylelint-config` 是一个全面的 Stylelint 配置包，支持 CSS、SCSS、LESS 格式化，以及样式排序等功能。此包旨在为你的项目提供统一和一致的编码风格。

## 安装

使用以下命令安装此包，具体取决于你使用的包管理器：

```shell
# 使用 npm
npm install @dyb-dev/stylelint-config -D

# 使用 pnpm
pnpm add @dyb-dev/stylelint-config -D

# 使用 yarn
yarn add @dyb-dev/stylelint-config -D
```

## 使用方法

在你的 Stylelint 配置文件中扩展此配置。你可以在 `.stylelintrc` 或 `.stylelintrc.mjs` 或 `.stylelintrc.cjs` 文件中进行配置：

`.stylelintrc` 文件示例

```json
{
    "extends": ["@dyb-dev/stylelint-config"]
}
```

`.stylelintrc.mjs` 文件示例

```js
export default {
    extends: ["@dyb-dev/stylelint-config"]
}
```

`.stylelintrc.cjs` 文件示例

```js
module.exports = {
    extends: ["@dyb-dev/stylelint-config"]
}
```

## 功能支持

-   **CSS 格式化**: 支持对 CSS 文件的格式化，确保样式代码符合规范。
-   **SCSS 格式化**: 支持对 SCSS 文件的格式化，保证 SCSS 代码风格统一。
-   **LESS 格式化**: 提供对 LESS 文件的格式化支持，确保 LESS 代码一致性。
-   **样式排序**: 提供样式排序功能，确保样式代码按照预定义规则排序，提高可维护性。

## 常见问题

### 安装包后无法使用格式化

如果在安装 @dyb-dev/stylelint-config 后无法使用格式化功能，可能是因为编辑器尚未加载新的配置。解决方法是 重启 编辑器，然后重新尝试格式化操作。
