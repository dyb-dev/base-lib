# base-lib

`base-lib` 是项目中常用的基础库，旨在提供项目中常用的配置和工具，包括 ESLint、Prettier、Stylelint、TypeScript 配置等。该库利用了 pnpm 工作空间进行管理，多个子包共享依赖并进行版本管理。

## 环境要求

-   **Node.js**: `>=18.0.0`
-   **pnpm**: `>=9.0.0`

## 子包信息

此项目包含以下子包:

| 子包名称                                            | 描述                             |
| --------------------------------------------------- | -------------------------------- |
| [**create-project**](./packages/create-project)     | 快速构建项目的脚手架工具         |
| [**project-cli**](./packages/project-cli)           | 项目中常用操作的自动化脚手架工具 |
| [**eslint-config**](./packages/eslint-config)       | 自定义 ESLint 配置               |
| [**prettier-config**](./packages/prettier-config)   | 自定义 Prettier 配置             |
| [**stylelint-config**](./packages/stylelint-config) | 自定义 Stylelint 配置            |
| [**ts-config**](./packages/ts-config)               | 自定义 TypeScript 配置           |

## 安装

使用以下命令安装所有依赖：

```bash
pnpm install
```

安装过程中，`pnpm` 将通过以下脚本初始化 `husky` 工具:

```json
"prepare": "husky"
```

安装完成后，`pnpm` 将通过以下脚本自动构建所有子包：

```json
// 该脚本的目的是在安装依赖后，避免子包之间的互相引用导致报错的情况，自动执行构建流程。
"postinstall": "pnpm -r run build"
```

## 贡献指南

如果您发现任何问题或希望贡献代码，请提交 issue 或 pull request 到 GitHub 仓库：

-   [GitHub 仓库](https://github.com/dyb-dev/base-lib)

## 许可证

[MIT License](LICENSE)
