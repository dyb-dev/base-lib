# @dyb-dev/create-project

## 简介

`@dyb-dev/create-project` 是一个用于构建项目模板的命令行脚手架工具，支持通过命令行快速构建项目模板，简化项目初始化过程。

## 使用方法

该工具支持使用 `npm`、`pnpm`、`yarn` 和 `bun` 来构建项目。以下示例使用 `pnpm`：

```bash
pnpm create @dyb-dev/create-project
```

该命令将触发交互式 CLI，您可以按照提示进行操作，包括选择项目名称、包名以及项目模板。

## 选项

-   `<my-project>`: 指定项目名称
-   `--force`: 是否强制覆盖已存在的项目目录

命令行示例：

```bash
pnpm create @dyb-dev/create-project my-project --force
```

## 支持的项目模板

当前支持的项目模板列表如下：

| 项目模板                   | 描述                                            | URL                                                                         |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| **web-mobile-template**    | 基于 `vue3全家桶` 搭建的 Web 移动端模板         | [web-mobile-template](https://github.com/dyb-dev/web-mobile-template)       |
| **uniapp-mp-wx-template**  | 基于 `uni-app + vue3 + ts` 搭建的微信小程序模板 | [uniapp-mp-wx-template](https://github.com/dyb-dev/uniapp-mp-wx-template)   |
| **fn-lib-template**        | 基于 `vite` 搭建的 TS 函数库模版                | [fn-lib-template](https://github.com/dyb-dev/fn-lib-template)               |
| **component-lib-template** | 基于 `vite` 搭建的 vue3 + ts 组件库模版         | [component-lib-template](https://github.com/dyb-dev/component-lib-template) |
| **lib-docs-template**      | 基于 `vitepress` 搭建的库文档模板               | [lib-docs-template](https://github.com/dyb-dev/lib-docs-template)           |

## 贡献指南

如果您发现任何问题或希望贡献代码，请提交 issue 或 pull request 到 GitHub 仓库：

-   [GitHub 仓库](https://github.com/dyb-dev/base-lib)

## 许可证

[MIT License](LICENSE)