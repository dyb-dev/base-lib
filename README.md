# base-lib

`base-lib` 是项目中常用的基础库，旨在提供项目中常用的配置和工具，包括 ESLint、Prettier、Stylelint、TypeScript 配置等。该库利用了 pnpm 工作空间进行管理，多个子包共享依赖并进行版本管理。

## 环境要求

-   **Node.js**: `>=18.0.0`
-   **pnpm**: `>=8.15.5`

## 子包信息

此项目包含以下子包:

| 子包名称                                            | 描述                     |
| --------------------------------------------------- | ------------------------ |
| [**create-project**](./packages/create-project)     | 快速构建项目的脚手架工具 |
| [**eslint-config**](./packages/eslint-config)       | 自定义 ESLint 配置       |
| [**prettier-config**](./packages/prettier-config)   | 自定义 Prettier 配置     |
| [**stylelint-config**](./packages/stylelint-config) | 自定义 Stylelint 配置    |
| [**ts-config**](./packages/ts-config)               | 自定义 TypeScript 配置   |

## 安装

使用以下命令安装所有依赖：

```bash
pnpm install
```

安装完成后，`pnpm` 将通过以下脚本自动构建所有子包：

```json
"postinstall": "pnpm -r run build"
```

该脚本的目的是在安装依赖后，避免子包之间的互相引用导致报错的情况，自动执行构建流程。

## 许可证

此项目使用 `MIT` 许可证。
