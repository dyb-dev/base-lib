/*
 * @FileDesc: Eslint Next 配置
 */

/** CONST: react 配置 */
const reactConfig = require("./react.cjs")

module.exports = {
    ...reactConfig,
    overrides: [
        ...reactConfig.overrides,
        // #region CODE: next 配置
        {
            files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
            extends: ["plugin:@next/next/core-web-vitals"]
        }
        // #endregion
    ]
}
