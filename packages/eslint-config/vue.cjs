/*
 * @FileDesc: Eslint Vue 配置
 */

/** CONST: 基础配置 */
const baseConfig = require("./base.cjs")

module.exports = {
    ...baseConfig,
    overrides: [
        ...baseConfig.overrides,
        // #region CODE: vue 配置
        {
            files: ["**/*.vue"],
            extends: ["plugin:vue/vue3-recommended"],
            rules: {
                // 强制组件使用emit事件名为 camelCase 或者 kebab-case 格式
                "vue/custom-event-name-casing": ["error", "kebab-case"],
                // 禁止使用组件事件时，例如驼峰形式：@componentsShowEvent，提示错误的规则
                "vue/v-on-event-hyphenation": "off",
                // 关闭禁止v-html指令的规则
                "vue/no-v-html": "off",
                // 关闭强制属性顺序的规则
                "vue/attributes-order": "off",
                // 关闭v-for指令必须使用:key的规则
                "vue/require-v-for-key": "off",
                // 关闭props默认值的强制规则
                "vue/require-default-prop": "off",
                // 关闭禁止未使用的组件的规则
                "vue/no-unused-components": "error",
                // 关闭组件名必须为多单词的规则
                "vue/multi-word-component-names": "off",
                // 关闭禁止在setup中解构props的规则
                "vue/no-setup-props-destructure": "off",
                // 关闭计算属性必须返回值的规则
                "vue/return-in-computed-property": "off",
                // 关闭单行元素必须换行符
                "vue/singleline-html-element-content-newline": 0,
                // 关闭多行元素必须换行符也是一样的
                "vue/multiline-html-element-content-newline": 0,
                // 要求每一行标签的最大属性不超五个
                "vue/max-attributes-per-line": ["error", { singleline: 5 }],
                // 要求html标签的缩进为需要4个空格
                "vue/html-indent": [
                    "error",
                    4,
                    {
                        attribute: 1,
                        baseIndent: 1,
                        closeBracket: 0,
                        alignAttributesVertically: true,
                        ignores: []
                    }
                ],
                // 取消关闭标签不能自闭合的限制设置
                "vue/html-self-closing": [
                    "error",
                    {
                        html: {
                            void: "always",
                            normal: "never",
                            component: "always"
                        },
                        svg: "always",
                        math: "always"
                    }
                ]
            }
        }
        // #endregion
    ]
}
