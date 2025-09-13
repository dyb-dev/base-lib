/*
 * @Author: dyb-dev
 * @Date: 2024-08-28 14:32:57
 * @LastEditors: dyb-dev
 * @LastEditTime: 2025-09-14 01:05:40
 * @FilePath: /base-lib/packages/stylelint-config/index.mjs
 * @Description: Stylelint 配置
 */

export default {
    // 全局默认严重程度
    defaultSeverity: "error",
    // 全局解析器
    customSyntax: "postcss",
    // 是否允许stylelint-disable注释忽略规则
    ignoreDisables: false,
    // 是否允许在使用stylelint-disable注释时强制添加描述
    reportDescriptionlessDisables: false,
    // 不允许存在没有使用的stylelint-disable注释
    reportNeedlessDisables: false,
    // 不允许stylelint-disable注释在不正确的作用域内使用
    reportInvalidScopeDisables: true,
    // 指定忽略文件，默认忽略node_modules，也可使用.stylelintignore 文件，.stylelintignore优先级 > ignoreFiles
    ignoreFiles: [],
    // 允许使用函数，可在格式化前或格式化后执行自定义操作（包名，绝对、相对路径）（注意：不建议使用，因为不支持自动修复功能）
    processors: [],
    // 插件 （包名）
    plugins: ["stylelint-order"],
    // 继承规则 （包名）"stylelint-prettier/recommended"必须放在前面
    extends: ["stylelint-prettier/recommended", "stylelint-config-rational-order"],
    // 全局规则 方式1：null（禁用），方式2：[选项1，选项2]，选项2可配置（disableFix：是否禁用修复，message：自定义错误提示，reportDisables：是否禁用注释忽略规则，severity：错误提示严重性）
    rules: {
        // #region CODE: stylelint内置规则

        // 为true sass有些语法会报错
        "at-rule-no-unknown": null,
        // 关闭强制使用kebab-case规范的类名
        "selector-class-pattern": null,
        // 限制scss中&字符嵌套深度 例如：.grand-grand-child 的嵌套深度为3
        "max-nesting-depth": 10,
        // 限制选择器深度 例如：.parent .child .grand-child 的嵌套深度为2
        "selector-max-compound-selectors": 10,
        // ccs函数名必须使用 kebab-case 规范
        "function-no-unknown": [
            true,
            {
                ignoreFunctions: ["/^[a-z]+(-[a-z]+)*$/"]
            }
        ],
        // 检查单位是否有效，忽略 "rpx" 单位，不会对其进行报错或警告，视为有效单位
        // "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],

        // #endregion

        // stylelint-order插件 指定不同类型声明的期望顺序 css变量 > $变量  > 属性样式 > @函数 > 选择器
        "order/order": ["custom-properties", "dollar-variables", "declarations", "at-rules", "rules"]
    },
    // 指定特定文件，可以单独设置设置解析器、插件、继承规则、规则，优先级比全局规则更高
    overrides: [
        {
            files: ["**/*.vue"],
            customSyntax: "postcss-html",
            extends: ["stylelint-config-recommended-vue"],
            rules: {
                // 忽略未知的伪类选择器
                "selector-pseudo-class-no-unknown": [
                    true,
                    {
                        ignorePseudoClasses: ["deep", "global"]
                    }
                ],
                // 忽略未知的伪元素
                "selector-pseudo-element-no-unknown": [
                    true,
                    {
                        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"]
                    }
                ]
            }
        },
        {
            files: ["**/*.scss"],
            customSyntax: "postcss-scss",
            extends: ["stylelint-config-recommended-scss"]
        },
        {
            files: ["**/*.less"],
            customSyntax: "postcss-less",
            extends: ["stylelint-config-recommended-less"]
        },
        {
            files: ["**/*.module.{css,scss,less}"],
            extends: ["stylelint-config-css-modules"]
        }
    ]
}
