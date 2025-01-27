# @dyb-dev/project-cli

`@dyb-dev/project-cli` 是一个用于项目中常用操作的自动化脚手架工具，帮助你快速进行项目中的各类常见操作。

## 环境要求

-   **Node.js**: `>=18.0.0`
-   **pnpm**: `>=8.15.5`

## 安装

该工具支持使用 `npm`、`pnpm`、`yarn` 和 `bun` 来安装。以下示例使用 `pnpm`：

```bash
pnpm i @dyb-dev/project-cli -D
```

## 版本

可以通过以下命令查看 CLI 工具的版本：

```bash
project-cli -V
```

## 帮助

可以通过以下命令查看 CLI 工具的使用说明：

```bash
project-cli -h
```

## 校验 Git 提交信息

你可以使用 `commit-lint` 命令来校验 Git 提交信息是否符合项目的提交规范。可以配合例如 `husky` 等工具来使用，这里以 `husky` 来示例：

首先，第一步安装 `husky`:

```bash
pnpm i husky -D
```

然后在 `package.json` 中添加以下脚本:

```json
"scripts": {
    "prepare": "husky"
}
```

接下来，创建 `.husky` 目录，并创建 `commit-msg` 文件，添加以下内容：

```bash
# Git提交时自动效验提交信息
project-cli commit-lint $1
```

最后，删除 `node_modules` 并重新安装依赖：

```bash
rm -rf node_modules
pnpm install
```

Git 提交信息示例:

```bash
# 格式要求

# -   `init`: 项目初始化
# -   `feat`: 添加新特性
# -   `fix`: 修复bug
# -   `docs`: 仅仅修改文档
# -   `style`: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
# -   `refactor`: 代码重构，没有加新功能或者修复bug
# -   `perf`: 优化相关，比如提升性能、体验
# -   `test`: 增加测试用例
# -   `build`: 依赖相关的内容
# -   `ci`: ci配置相关，例如对k8s，docker的配置文件的修改
# -   `chore`: 改变构建流程、或者增加依赖库、工具等
# -   `revert`: 回滚到上一个版本
# -   `type`: 仅仅新增、删除、修改了ts类型

fix(区域): 修复样式问题
```

## 一键发布功能

你可以使用 `release` 命令来帮助您轻松地发布新版本。

使用示例：

```bash
project-cli release
```

执行命令后根据操作提示进行操作即可。

## 贡献指南

如果您发现任何问题或希望贡献代码，请提交 issue 或 pull request 到 GitHub 仓库：

-   [GitHub 仓库](https://github.com/dyb-dev/base-lib)

## 许可证

[MIT License](LICENSE)
