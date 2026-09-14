/*
 * @FileDesc: Markdownlint 配置
 */

module.exports = {
    // 是否自动修复
    fix: true,
    // 是否显示命中的文件列表
    showFound: true,
    // 是否忽略 .gitignore 中列出的文件
    gitignore: true,
    // 是否禁用规则注释
    noInlineConfig: true,
    // 忽略文档开头的 front matter 区块
    frontMatter: "(^---\\s*$[^]*?^---\\s*$)(\\r\\n|\\r|\\n|$)",
    // 包含文件
    globs: ["**/*.md", "**/*.markdown"],
    // 排除文件
    ignores: ["**/.history/**", "**/dist/**", "**/node_modules/**"],
    // 规则配置
    config: {
        // 是否启用默认内置规则
        default: true,
        // 无序列表缩进
        MD007: { indent: 4 },
        // 是否禁止使用 Tab 缩进
        MD010: true,
        // 是否限制行长度
        MD013: false,
        // 是否禁止重复标题
        MD024: false,
        // 是否限制列表符号后的空格数
        MD030: false,
        // 是否禁止内联 HTML
        MD033: false,
        // 是否禁止用加粗/斜体代替标题
        MD036: false,
        // 是否要求文档首行必须是一级标题
        MD041: false
    }
}
